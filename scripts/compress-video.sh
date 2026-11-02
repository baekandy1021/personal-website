#!/usr/bin/env bash
# Turn a raw screen recording into small web-ready demo files.
#
#   ./scripts/compress-video.sh ~/Desktop/recording.mov my-project [start] [duration]
#
# Writes public/projects/my-project/{demo.mp4,demo.webm,poster.jpg}
# Optional start/duration trim the clip, e.g. "3" "20" = keep 20s starting at 0:03.
# Optional: CROP="w:h:x:y" crops before scaling, e.g. to cut off a window title bar:
#   CROP="718:1216:0:40" ./scripts/compress-video.sh recordings/game.mp4 my-game
# Requires ffmpeg (brew install ffmpeg).
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <input-video> <project-slug> [start-seconds] [duration-seconds]" >&2
  exit 1
fi

IN="$1"
SLUG="$2"
START="${3:-0}"
DUR="${4:-}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/projects/$SLUG"
mkdir -p "$OUT"

TRIM=(-ss "$START")
[[ -n "$DUR" ]] && TRIM+=(-t "$DUR")
# 1280px wide max, 30fps, even dimensions, no audio
VF="fps=30,scale='min(1280,iw)':-2:flags=lanczos"
[[ -n "${CROP:-}" ]] && VF="crop=$CROP,$VF"

echo "→ mp4"
ffmpeg -hide_banner -loglevel error -y "${TRIM[@]}" -i "$IN" -an -vf "$VF" \
  -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart "$OUT/demo.mp4"

echo "→ webm"
ffmpeg -hide_banner -loglevel error -y "${TRIM[@]}" -i "$IN" -an -vf "$VF" \
  -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 "$OUT/demo.webm"

echo "→ poster"
ffmpeg -hide_banner -loglevel error -y -i "$OUT/demo.mp4" -frames:v 1 -q:v 3 "$OUT/poster.jpg"

ls -lh "$OUT" | awk 'NR>1 {print "  " $5 "\t" $9}'
for f in "$OUT/demo.mp4" "$OUT/demo.webm"; do
  size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  if (( size > 4 * 1024 * 1024 )); then
    echo "⚠ $(basename "$f") is over 4MB. Try a shorter clip, or raise -crf (bigger number = smaller file)."
  fi
done
echo "Done. In src/content/projects/$SLUG.md set:  video: /projects/$SLUG/demo.mp4"
