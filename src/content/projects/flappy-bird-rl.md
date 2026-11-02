---
title: Flappy Bird RL
blurb: Tabular Q-learning vs. a deep Q-network on a custom Flappy Bird environment, both bootstrapped from expert demonstrations. The final agent clears 1,000+ pipes without failing.
year: 2026
stack: [Python, PyTorch, Gymnasium, Pygame]
# Repo link: uncomment and paste your URL
links:
  github: https://github.com/enochngan/flappy_bird_rl
video: /projects/flappy-bird-rl/demo.mp4
aspect: 718 / 1212
doodle: bird
note: it used to die at the very first pipe
order: 2
---

## The setup

I built a Flappy Bird environment with Pygame and wrapped it in Gymnasium, then trained a tabular Q-learning agent and a DQN in PyTorch on the same task to compare classical and deep RL directly.

## Getting off the ground

Learning from scratch was painfully slow because rewards were so sparse. Both agents start from **behavioral cloning** on expert demonstrations before RL fine-tuning takes over.

## The bug that wasn't a bug

Even then, the agents rarely cleared the first pipe. The problem was the reward, not the network: the bird got almost no signal about *where* it should be. A gap-alignment reward-shaping term fixed it. The final agent went from failing at the first obstacle to surviving indefinitely, past 1,000 pipes without a single failure.

## What I took away

Before blaming the model, check what the reward is actually teaching. A deeper network wouldn't have fixed this: the agent just needed to be told what "good" looked like. Building the environment myself made that much easier to spot, because I could see exactly what the agent observed and when it got rewarded.
