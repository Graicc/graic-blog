---
title: Putting custom firmware on a flight controller with rust
subtitle: embassy my beloved
published: false
---

No probe-rs because DFU

cargo dfu

Hold the boot button down when plugging in

Zadig
- cargo dfu needs libusb-win32
- betaflight needs WinUSB https://betaflight.com/docs/development/USB-Flashing

https://github.com/betaflight/config/blob/master/configs/OMNIBUSF4SD/config.h

embassy_usb_logger

Probably want to use internal oscillator
