---
title: Tennis Player & Ball Tracking
blurb: Fine-tuned YOLOv8 to follow players and a tiny, fast ball through match footage, then mapped every position onto a 2D mini-court for shot and rally analysis.
year: 2025
stack: [Python, YOLOv8, OpenCV]
# Repo link: uncomment and paste your URL
links:
  github: https://github.com/baekandy1021/Tennis-analysis
video: /projects/tennis-tracking/demo.mp4
aspect: 16 / 9
doodle: tennis
note: the pretrained model found the ball almost never
order: 1
---

## The problem

A tennis ball is small, blurry, and moves fast. Out of the box, a pretrained YOLO model detected it in almost no frames, so any analysis built on top of it had nothing to work with.

## What I built

- **Detection.** Fine-tuned YOLOv8 on tennis footage for players and the ball. Ball detection went from near-zero to 80–90% of frames, and trajectory interpolation fills the remaining gaps.
- **Pipeline.** An OpenCV video pipeline that runs detection and trajectory extraction at 30 FPS on recorded matches.
- **Court mapping.** A separate court keypoint model. Its first-frame predictions project player and ball positions onto a top-down mini-court for shot and rally analysis.

## What's next

The court mapping relies on the first frame, so it assumes the broadcast camera never moves. Re-detecting the court keypoints whenever the shot changes would make it hold up across a full match. With positions on a real-scale court, the next steps would be estimating ball speed between frames and classifying shots (serve, forehand, backhand) from player and ball trajectories.
