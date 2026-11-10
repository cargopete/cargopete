---
title: "Bulwark did not work"
date: "2026-11-10"
description: "Seven months building an AI bug bounty pipeline, $860 of Claude usage in three days, and nothing worth submitting. The repo is archived."
tags: ["ai", "security", "rust", "post-mortem"]
---

Bulwark was a multi-pass smart contract audit pipeline. A Rust CLI drove Claude Code sessions, Slither, Forge, Medusa, Echidna and Halmos inside a Docker container against one repository, and handed back bug bounty leads that had either been demonstrated on a fork or were plainly marked as not demonstrated. I started it on 30 March 2026. I stopped it on 6 November, after 177 commits and 54 pull requests, and **in that time it did not find a single bug I was willing to submit**. The repository is now archived.

This is the write-up, because a project that quietly disappears is harder to learn from than one that says what happened.

## What it was meant to do

The design was not naive, and I want that on the record before the numbers arrive. Immunefi bans AI-generated reports, so Bulwark was never meant to write submissions. It was a lead generator: six passes, each meant to throw away what the previous one could not prove.

1. **Reconnaissance.** Check the deployed source matches the repo, build, run Slither and a scanner session, derive protocol context.
2. **Agents.** Three generalists (red, blue, gold) and one hunter per component, each required to cite evidence. Then a scope gate against the programme's rules and a filter against published audits.
3. **PoC gate.** A fork-native Foundry proof of concept per finding, graded on measured impact rather than the model's opinion of it.
4. **Fuzzing.** One generated invariant suite through Forge, Medusa and Echidna.
5. **Formal.** Halmos against the real contracts.
6. **Adversarial review.** A fresh session whose only job was to disbelieve everything.

A pass that ran nothing failed the run, because an empty result from a broken pass reads as "the code is clean", and that is worse than no run at all. That rule turned out to be the most useful line in the codebase, mostly because of how often it fired.

## Where the money went

Every Claude session wrote its cost to `cost.json`. These figures are the measured totals from the ThinkPad that ran everything, read on 10 November 2026. The runs were on a Max subscription, so the dollar figure is what the same tokens would have cost at API list price rather than what left my account. What left was the subscription's usage allowance, repeatedly, usually before lunch.

| What | Runs | Sessions | Measured cost | When |
|---|---|---|---|---|
| Live bounty targets | 8 | 193 | $452.01 | 4-6 November |
| Benchmark cases | 7 | 341 | $409.50 | 5-6 November |
| **Total** | **15** | **534** | **$861.51** | **three days** |

A single run cost between $24.42 and $91.88. The most expensive was the 3Jane credit protocol benchmark, at $91.88 over 71 sessions and 10.7 hours, which produced **zero final findings** because the fuzzing pass failed and took the rest of the run down with it. Every model call was Opus 5.5, because the job was finding subtle bugs in other people's arithmetic, and that is not the place to economise. It is, as it turns out, a fine place to run out of allowance.

The April runs, before cost tracking existed, are not in the table. They were not cheaper.

## What it found on live programmes

The live targets were Enzyme Onyx, Origin's OUSD vault and ARM, SSV Network, Alchemix v3 and an RWA token programme run three times. What came out:

- **Origin OUSD.** One High: donating about 327,000 USDC to the vault pushes its value past a two-sided supply check, after which every withdrawal reverts. I reproduced it on a fork at block 26342500, frozen for 18 days under the live rebase cadence. It is real, and it is not worth submitting. The attacker gains nothing, the strategist's 2-of-8 Safe clears it in about fifty minutes, roughly $14 of claims was pending, and the check that blocks redemption is commented in the source as intended.
- **Alchemix v3.** Six findings. All six were discarded at the PoC gate, which is the gate doing its job, and also the whole of the result.
- **Enzyme Onyx.** Three findings, one rated High by the pipeline. None reached a submission.
- **The rest.** Nothing that survived to the final report.

That is eight runs, $452, and no submissions. The best lead it produced was a correct description of a griefing vector that the protocol has a button for.

## The benchmark was the honest part, and it was not flattering

To measure rather than assert, I built a benchmark from contests and private audits whose judged findings were published after the model's training cutoff, so a hit could not come from memory. The clone was collapsed to one commit and every network tool was denied. Each known High and Medium was traced through every pass, so a miss said which pass lost it.

On the last clean label, 49fafa4:

| Case | Known H/M | Reached final | Precision | Cost | Cost per true positive |
|---|---|---|---|---|---|
| Electisec Promis | 10 | 6 | 100% | $66.84 | $11.14 |
| Cantina StableSwap hooks | 12 | 5 | 67% | $66.54 | $9.51 |
| Guardian 3Jane | 18 | 0 | n/a | $91.88 | n/a |
| BattleChain, Sprinter | | stopped mid-run | | $66.23 | |

Read generously, **Promis is a good result**: six of ten known bugs, no false positives, about eleven dollars apiece. I will not pretend otherwise, because it is the row that goes against the title. But a benchmark tells you the pipeline can find bugs that a judge has already confirmed exist in code a contest has already picked over. A live bounty asks a different question: whether it can find the bug nobody has found yet, in code that several professional firms have already audited. On that question the answer was eight runs and nothing.

## Most of the work was the pipeline lying about itself

The commit history is not a record of hunting bugs. It is a record of discovering that the previous run had been hollow. A sample:

- Origin's `foundry.toml` sets `test = "test-foundry"`. Bulwark wrote its PoCs and invariants under `test/`, so Forge collected none of them. Pass 3 recorded "no test ran" as an inconclusive finding; Pass 4 generated 100 invariants and ran 0.
- On Alchemix, the generated fuzz `setUp` reverted on an underflow in the fork's state. The pass counted that as "2 failed" and reported itself done.
- Medusa and Echidna compiled the entire project regardless of what they were told, because crytic-compile read Forge's existing build output.
- The PoC rules banned `vm.mockCall`, sensibly, which meant that warping time past about 25 minutes froze every oracle-priced vault with "Stale oracle answer", and the fuzzer spent its budget on that.
- Halmos ignored SIGTERM, so the time cap did not cap anything.
- Back in April, the agent prompt said "wait for the user to tell you what to do". In headless mode the agents did precisely that, and exited after eight seconds.

Each of those was fixed. Each fix cost a full rerun to confirm, at fifty to ninety dollars a time, and the next run usually turned up the next one. **Four fixes were still outstanding when I stopped.** The orchestration around the model was the expensive part to get right, and I never got to the point where it was right and the model was the only remaining variable.

## Why I am stopping rather than fixing the next four

Because I can see the shape of the next month, and it is the same as the last one. Fix four faults, rebuild, rerun the benchmark queue at four hundred dollars of allowance, find the fifth fault. Even a pipeline with no faults left would be competing on live programmes against human auditors who have read the same code with more patience than any context window holds, and against every other person with the same model and the same idea.

The cost per true positive on the benchmark is low. The cost per *new* true positive on a live programme is, so far, undefined, which is the polite way of saying it divides by zero.

## What I would keep

Some of it was worth building, and none of it needed to be a bug bounty machine to be useful:

- **The rule that an empty pass is a failed pass.** It caught more faults than any agent caught bugs.
- **Measured impact over stated severity.** The PoC gate threw away all six Alchemix findings, and it was right each time. A model's confidence in a finding is not evidence of one.
- **A benchmark with a cutoff.** Without it I would have spent another month believing the Promis number described live performance.
- **Recording cost per session from the first run.** I did not, in April, and so the most interesting figure about the early months is one I cannot give you.

The repository is archived at [github.com/cargopete/bulwark](https://github.com/cargopete/bulwark), read-only, with the four unfinished fixes still described in its notes for anyone who wants to try the fifth.
