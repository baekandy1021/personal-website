---
title: Fair Best-Arm Identification
blurb: Reproduced the Fair Track-and-Stop bandit algorithm from a 2024 paper, then ran a new experiment measuring how slowly its fairness guarantee actually kicks in.
year: 2026
role: With Karl Boma
stack: [Python, NumPy, SciPy]
links:
  report: /projects/fair-best-arm/report.pdf
  paper: https://arxiv.org/abs/2408.17313
  # github: https://github.com/baekandy1021/REPO-NAME   ← uncomment if you publish your implementation
image: /projects/fair-best-arm/fig3.png
imageAlt: Density plots of fairness violations for F-TaS, TaS and Uniform Fair. In the antagonistic setting TaS clusters around 18–20% while the fair algorithms stay near zero.
aspect: 1624 / 738
doodle: slots
note: the guarantee holds, it just takes its time (δ⁰·⁰³)
order: 3
---

## The problem

Best-arm identification asks which of K options is best, using as few samples as possible. A standard algorithm piles its samples onto the promising arms and nearly ignores the rest. That's efficient, but it's a problem when every option needs a minimum share: a hospital comparing treatments, or a base station that has to keep serving every user.

[Russo & Vannella (2024)](https://arxiv.org/abs/2408.17313) add exactly that constraint and propose **F-TaS (Fair Track-and-Stop)**, which they prove is asymptotically optimal while staying fair.

## Reproducing the paper

With Karl Boma, I implemented F-TaS from scratch and reproduced the paper's synthetic experiments. We compared it against standard Track-and-Stop (no fairness) and a Uniform Fair baseline, using K = 10 arms, δ = 0.1, and 100 runs per condition.

![Optimal allocations under four fairness settings](/projects/fair-best-arm/fig2.png)
*The optimal sampling allocation with and without fairness. When fairness is antagonistic (2nd and 4th panels), it pulls the allocation far from the unconstrained optimum.*

![Sample complexity box plots for F-TaS, TaS and Uniform Fair](/projects/fair-best-arm/fig1.png)
*Samples needed before stopping. TaS is cheapest because it ignores fairness. F-TaS stays competitive. Uniform Fair is the most expensive and the most variable.*

![Fairness violation distributions](/projects/fair-best-arm/fig3.png)
*Fairness violations. In the antagonistic setting, TaS violates the constraint by 18–20% while F-TaS stays near zero.*

F-TaS was the only algorithm that kept fairness violations low *and* sample complexity competitive across all four conditions.

## Going past the paper

For constraints that depend on the unknown means, the paper only guarantees fairness *asymptotically*, as δ → 0. It never says how fast that happens. I swept δ from 10⁻¹ to 10⁻⁴ (K = 15, antagonistic setting) and fit a power law to the mean violation.

![Log-log plot of fairness violation vs delta with fitted slope 0.030](/projects/fair-best-arm/fig4.png)
*Violations shrink monotonically, as the theory promises, but only as roughly δ⁰·⁰³.*

The absolute violations were already small (under 0.2%), but the slope is very shallow. Cutting δ by a factor of 1,000 barely moves them. The asymptotic guarantee is real, but it says little about how much violation to expect at any δ you would actually use.

The [full report](/projects/fair-best-arm/report.pdf) has the setup, the math, and the open questions.
