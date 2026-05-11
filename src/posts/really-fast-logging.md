---
title: Really Fast Microcontroller Black Box Sensor Logging 
subtitle: Or, DMA is all you need
published: false
---

<script>
import Footnote from "$lib/Footnote.svelte"
</script>

When reading sensor values on a microcontroller (e.g. for a [flight computer](https://github.com/NCSU-High-Powered-Rocketry-Club/FIRM/)), it is important to record these readings for later analysis as a [black box](https://en.wikipedia.org/wiki/Flight_recorder), or for mocking sensor data during testing.

It is possible to do this with almost no overhead by doing less work.

## Background

<!-- This article makes references to STM32F405 and SD card specific behavior since it's what I'm using, but the techniques are general enough to apply broadly. -->

This article assumes you are logging to flash memory (either an IC or an SD card).

It also assumes that you are writing your own drivers to talk to sensors. You should be! They aren't that scary, and you'll be able to get a lot higher performance out of your system.

## Logging With a Buffer

You can't write individual bytes to a flash chip. [Flash memory](https://en.wikipedia.org/wiki/Flash_memory) erases whole pages (typically 512 bytes) at a time to write new information. As a result, we must store data in an intermediate buffer that is written to memory in one go.

As we read sensor values, they are written into this buffer. Once the buffer is full, we write the whole thing to storage. After the data is written, we can reset the buffer and start putting more information in the start (in practice, you wouldn't clear out the existing data, you would just write over it).

There are additional overheads in the protocols used when writing to a flash chip, so it is more efficient to use a larger buffer size. This way, the costs are [amortized](https://en.wikipedia.org/wiki/Amortized_analysis) across many sensor readings, lowering the average cost of logging a single data point.

If you're using an SD card with a filesystem, you should match the file system sector size and your buffer size.

## Double Buffering

While having a large buffer is great, when you reach the end of the buffer you still have to pause logging until it is done writing. With worst case SD card latencies in the [100s of milliseconds](https://jitter.nl/blog/2019/07/31/microsd-performance-on-memory-constrained-devices/), this is unacceptable.

To solve this, we need two things. A second buffer, and the ability to write to storage in the background.

The hard part is Writing to storage in the background. You (probably) only have one core, so how can you write bytes onto the wire without occupying the CPU's time?
Fortunately, this is a common enough problem that there is already a solution in the hardware.

Most microcontrollers (hopefully yours!) have something called a [Direct Memory Access (DMA) controller](https://en.wikipedia.org/wiki/Direct_memory_access).
At the most basic level, a DMA controller is instructed by the processor to copy a sequence of bytes from one region in memory to
another. It does this in the background, freeing up the processor to do other work.
<!-- <Footnote word="another. "> In programming terms, this functions as an asynchronous memcpy. </Footnote>  -->

All peripherals on a microcontroller are memory mapped. That means that sending bytes over the write to storage (e.g. over [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface)) is done by writing the data to a specific address in memory.

Instead of configuring our DMA controller to copy the buffer to another region of memory, we can configure it to copy each byte in the buffer to the specific transmit address used by our peripheral.
By doing so, the microcontroller can transmit the log data without having to wait for the transfer to <Footnote word="complete."> The DMA controller can be used to do some crazy tricks, even making an [AM radio with no CPU usage](https://youtu.be/1FEBX8l2_5w?t=2452). </Footnote>

The easier part is adding a second buffer. When one buffer fills up, you start writing it to storage and switch to the other one. That way, you can immediately begin logging more data, without having to wait for the write to finish. However, this introduces a potential race condition. The write must finish before the other buffer fills up. If it did not, you would try to start a second write to storage while the first one is still ongoing, which would break things. Make sure to measure the latency of your system to ensure that this will not happen.

## Arena Allocator

Memory allocators are objects that provide programs with a specific amount of memory upon request. The program asks for a certain number of bytes, and the memory allocator returns a pointer to a region of that size. The program can then use that memory for any purpose, and then return the memory to the allocator when it is finished.

<!-- On a typical computer, the operating system provides a memory allocator that can handle requests of any size. Unfortunately, on a microcontroller, there is no operating system, nor is there enough memory to dynamically allocate it. -->

An [arena allocator](https://en.wikipedia.org/wiki/Region-based_memory_management) is a specific type of memory allocator where all allocations are freed at once. Internally, the arena has two things. A continuous span of bytes that it uses to serve memory requests, and a counter indicating where the end of used memory is. when it receives a memory allocation request (a malloc), it returns a pointer to the start of unused memory. It then bumps the counter to the new edge of used memory. When the arena is freed, the counter is reset to the start of the span of bytes.

This sounds a lot like our buffer! In fact, we can treat our log buffer as a memory allocator. Instead of storing our sensor readings on the stack, we can store them directly in the log buffer.
You need some place in memory to store the sensor readings while you operate on them, so it mind as well be in the <Footnote word="log buffer. "> On modern processors, this can be bad for cache locality. Fortunately for us, the additional cost to access random memory addresses is very small on microcontrollers (since all memory accesses are slow). </Footnote> 

This brings us to the final piece of the puzzle:

## Log Raw Sensor Readings

In order to really maximize performance, you should log the raw bytes received from your sensor.

Many sensors support performing a burst read, where you receive all the data the sensor has at once.
Using a burst read looks something like this:

```c
char[BURST_READ_SIZE] packet;
sensor_spi_read_data(address, packet);
ParsedPacket parsed_packet = parse_packet(packet);
```
Before you can turn these bytes into values, you need to store them somewhere. instead of storing it on the stack, you can store them directly in the log buffer. Like so:

```c
char* packet = logger_malloc(BURST_READ_SIZE);
sensor_spi_burst_read_data(address, packet);
ParsedPacket parsed_packet = parse_packet(packet);
```

This way, you avoid having to copy any information into the logging buffer, since it is there from the start.

## Other Notes

This is a general overview of this technique, so there are a few things missing for an actual implementation. Firstly, you'll need a byte before the sensor data that identifies the type of data it contains. You'll probably also want a timestamp before it as well. You can save some more space by ignoring the higher bits of your clock, as long as there will be a packet recorded before the clock overflows.

You should also store metadata at the start of the file, before any data occurs. The most important thing to store here is a format version, so you can make breaking changes later. You may need to make sure that this data stays [word aligned](https://en.wikipedia.org/wiki/Data_structure_alignment) for your raw sensor packets to be usable.

For some further reading:
- My implementation of this logging architecture: [logger.h](https://github.com/NCSU-High-Powered-Rocketry-Club/FIRM/blob/24faa08123f76ac86e557b9e03822e250cde4918/STM32/Core/Inc/logger.h) [logger.c](https://github.com/NCSU-High-Powered-Rocketry-Club/FIRM/blob/24faa08123f76ac86e557b9e03822e250cde4918/STM32/Core/Src/logger.c)
- SD card logging with DMA, was used as the reference implementation for my DMA implementation. Contains some useful notes about filesystems and preallocating your files: [MathewMorrow/STM32-SD-Logging-DMA](https://github.com/MathewMorrow/STM32-SD-Logging-DMA)
