#!/bin/bash
# Kullanım: reel.sh cikti.mp4 kare1.jpg kare2.jpg kare3.jpg  (1080x1920 kareler)
out=$1; shift; args=""; filt=""; i=0
for f in "$@"; do args="$args -loop 1 -t 3.2 -i $f"; filt="$filt[$i:v]scale=1188:2112,zoompan=z='min(zoom+0.0012,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=96:s=1080x1920:fps=30,setsar=1,trim=duration=3.2[v$i];"; i=$((i+1)); done
ffmpeg -y -loglevel error $args -filter_complex "$filt[v0][v1]xfade=transition=slideleft:duration=0.4:offset=2.8[a1];[a1][v2]xfade=transition=slideleft:duration=0.4:offset=5.6,format=yuv420p[o]" -map "[o]" -c:v libx264 -crf 20 -movflags +faststart -r 30 "$out"
