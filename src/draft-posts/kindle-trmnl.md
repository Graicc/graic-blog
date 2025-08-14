---
title: Kindle weather display with TRMNL
subtitle: Subtitle
---

<script>
import Caption from '$lib/Caption.svelte';
</script>

![Kindle showing TRMNL](/p/kindle-trmnl/kindle.webp)

<Caption>Dead pixels make a useless e-reader, but a good dashboard</Caption>

[TRMNL](https://usetrmnl.com) has [a guide](https://usetrmnl.com/guides/turn-your-amazon-kindle-into-a-trmnl) for using a Kindle as a TRMNL display. However, their provided scripts didn't work for me, especially when trying to run my own server.

This is what did work for me:

For the server:

1. Setup [byos_laravel](https://github.com/usetrmnl/byos_laravel). `git clone` -> `docker compose up`
2. Create a device for my kindle. The mac address and api key can be anything. I set them to `kindle` and `graicapikey`, respectively.
3. Adjust the resolution (This isn't well supported yet, but it should be soon) and set the rotation to 90 or 270. The resolution of my kindle is 1448x1072.
4. Set up your plugins. TODO link mine.

For the kindle:

1. [Jailbreak your kindle](https://kindlemodding.org/jailbreaking/). I did through "Disable OTA Updates". If you want to setup ssh, the easiest way is to [install KOReader](https://kindlemodding.org/jailbreaking/post-jailbreak/koreader.html) and set it up [through them](https://github.com/koreader/koreader/wiki/SSH).
2. With your kindle plugged into your computer, add this script to the documents folder (TODO move this somewhere better). This script is based on one by Marek in the [Kindle Modding Discord](https://dsc.gg/kindle-modding). Make sure you update `URL`, `DEVICE_ID`, and `ACCESS_TOKEN` to whatever you set them to earlier. `sh` won't work with CRLF, so make sure you edit this in a real text editor (such as VSCode), and set the line endings to LF. Notepad will not work.

<!-- need to escape a \1 to \\1 for it to show -->
```bash
#!/bin/sh
# Name: Trmnl
# Author: Graic, 
/usr/bin/ds.sh # Disables screen sleep
URL=http://mainsailos:4567
DEVICE_ID=kindle
ACCESS_TOKEN=graicapikey
REFRESH_RATE=0
/mnt/us/libkh/bin/fbink -c -f
while sleep $REFRESH_RATE; do
  /mnt/us/libkh/bin/fbdepth -r 0 &> /dev/null
  response=$(curl $URL/api/display -H "ID: $DEVICE_ID" -H "Access-Token: $ACCESS_TOKEN" -s)
  REFRESH_RATE=$(($(echo $response | sed -E 's/.*,"refresh_rate":(.*),"r.*/\\1/g;t')))
  image_url=$(echo $response | sed -E 's/.*"image_url":"(.*?)\",\"f.*/\\1/g;t' | sed -E 's/\\//g;t') -->
  curl $image_url -s -o /tmp/img.bmp
  /mnt/us/libkh/bin/fbink -c -g file=/tmp/img.bmp,w=0,h=-1,halign=CENTER 2>&1 /dev/null
done
```

3. The script will appear as a book in your library. You can tap it to run. This will run forever, so you'll have to restart your kindle to get out of it (I was unsuccessful with `pkill` over SSH, but you might have luck). If you need to troubleshoot, I strongly recommend running the script from an SSH prompt so that you can quickly restart it.
