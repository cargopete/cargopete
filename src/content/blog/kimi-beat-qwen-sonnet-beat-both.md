---
title: "Kimi beat Qwen, and Sonnet beat both"
date: "2026-10-31"
description: "I ran five models through my own coding agent, 130 runs each, to choose its default. The open-weights model won the question I asked; Claude won one I had not."
tags: ["ai", "rust", "benchmarks", "agents"]
---

> **Updated, 31 October.** The scorer fault mentioned below is fixed and every run has been rescored. Sonnet 5.5 moves from 96 to 99 and is now clearly ahead of Kimi rather than level with it; Opus reaches 100. Kimi and Qwen are unchanged. The post is kept as first written, with the rescore at the end.

> **Updated again, 31 October, evening.** Kimi rerun after the fixes its failures prompted, the vendors' own coding tools compared on the same cases, Claude Haiku 5.5, and Alibaba's other plan models. Added at the end, under the first update.

Dino is the coding agent I write for myself, in Rust, and use instead of the commercial ones for my own work. Until this week its default model was Qwen3.7-Max on Alibaba's flat-rate Token Plan, chosen on 25 October from a single run of a single task. That is not a decision so much as a first impression, and the obvious question kept coming back: **is Kimi better than Qwen?** Kimi K3.1 Pro is the open-weights Chinese model people tend to rate highest.

So I measured it properly, alongside Claude Sonnet 5.5, GPT-6.1 Terra and Grok 4.7, with Claude Opus 5.5 as the ceiling. Every model ran inside Dino itself, with the same binary, the same tools and the same prompts, through each vendor's API.

## The rule came before the answer

I wrote down how I would decide before any run started, because a rule written afterwards tends to describe whoever won:

1. The corpus score, with a gap counted as real only if the 90% intervals do not overlap.
2. The six hardest cases, read separately, since the easy ones cannot separate strong models.
3. Cost per passed run, from each run's own token counts at list price.
4. Speed.

One more clause: Dino's prompts and tools were tuned on Qwen sessions, so **a narrow Qwen win counts as a draw**. The home side does not get to win on the toss.

## What each model had to build

The corpus is 26 Rust tasks, each scored from 1 to 100 by Dino's own scorer on correctness against hidden tests, whether the model left alone the files it was told to leave alone, whether its claim of "done" was true, and how efficiently it got there. Some are small: add a field, rename across files, fix a failing test. The ones that separate models are longer: a ledger service with acceptance tests, a TOML parser built in three stages, a Pratt expression parser, a zero-copy tokenizer, making a cache thread-safe, finding the cause of a failure in a large workspace.

Each model ran the corpus five times, which is 130 runs apiece. That sounds excessive until you see the spread on a single case across five trials. The fast models took a couple of hours. Kimi averaged 7.3 minutes a run, which made its pass a ten-hour affair. I stopped Grok at about 119 of 130 runs, and since the eval only writes its record at the end, Grok has no result here. That is an operational lesson rather than a finding about Grok, and the eval now has a `--jobs` flag so the next run does not take a night.

## The bench found my bugs first

Before it said anything about the models, the bench found two faults in Dino.

The Anthropic adapter read the prompt-cache counters but never asked for caching. Every Claude turn, including the Opus fallback I rely on when Alibaba's quota runs out, had been paying full price for its whole conversation history. With caching switched on, a probe read 12.9K of its 20.5K input tokens from cache. The OpenAI adapter, meanwhile, declared its tools strict, which OpenAI only accepts when every property is required, and one of mine has an optional property. Terra could not run a single case until I noticed.

Neither of these would have surfaced in normal use for some time, which is the most useful thing a benchmark did for me all week.

## The table

Prices are each vendor's list price on 30 October 2026, applied to the tokens each run actually used.

| Model | Score (90% interval) | Passed | Minutes per run | Cost per pass | Total for 130 runs |
|---|---|---|---|---|---|
| Claude Opus 5.5 (ceiling) | 99 (97-100) | 128 | 1.4 | $0.29 | $37.32 |
| Claude Sonnet 5.5 | 96 (94-97) | 128 | 0.8 | $0.12 | $15.39 |
| Kimi K3.1 Pro | 95 (94-96) | 114 | 7.3 | $0.24 | $27.40 |
| Qwen3.7-Max | 90 (87-92) | 109 | 2.9 | $0.34 | $36.68 |
| GPT-6.1 Terra | 74 (68-80) | 96 | 1.3 | $0.06 | $5.40 |

Qwen on the Token Plan does not actually cost me per token; the list price is there so the rows compare like with like.

## Kimi beats Qwen, and not narrowly

The intervals do not overlap, on prompts written for Qwen, so by my own rule this is a real result. **Kimi is the better model for Dino.**

The gap is in the long builds. Qwen scored 76 on the ledger, 76 on semver ranges, 71 on the text buffer with undo, 71 on the full TOML parser and 78 on the zero-copy tokenizer. Kimi scored 99, 94, 98, 88 and 94 on the same five. On the six hard cases they split: Kimi took the tokenizer by 94 to 78, and Qwen took the thread-safety case by 99 to 89.

Kimi is not the tidier of the two. It took 14.6 turns per run against Qwen's 11.4, made 87 tool errors against 50, and took two and a half times as long. It gets there, eventually, by a scenic route.

## Sonnet answered a question I had not asked

I set out to choose between two open-weights models and the table has a row above both. Sonnet scored 96 to Kimi's 95, which by my rule is a tie, and then passed 14 more runs, nine times faster, at half the cost per pass. By the cost-effectiveness rule I had also written down in advance, it wins outright.

I have made Kimi the default anyway, with Qwen behind it and Opus behind that, because the decision in front of me was whether Kimi should replace Qwen, and it should. But I would be misreporting my own benchmark if I left out that **the best coding model for Dino on this evidence is Claude Sonnet 5.5**, and it is cheaper per working result than either of the models I was comparing.

## What the losses were made of

Kimi's 16 failed runs looked like weakness on the TOML cases until I read the session logs. Its parsers passed every hidden test. What failed them was that Kimi likes to format its work with `cargo fmt --all`, which reformats every file in the workspace, including the test files the task said not to touch. Sonnet called the formatter twice in the whole run; Kimi called it 32 times on those cases alone. Dino's formatter tool now takes a list of files.

Another 37 of Kimi's tool errors were one habit: asking to list the directory `""` when it meant the workspace root. Dino now reads an empty optional argument as absent.

And one of Sonnet's numbers is wrong in its disfavour. It scored 33 on the second TOML stage with every hidden test passing, because the hidden tests replace a test file whose old tests my scorer then counted as broken. That is a scorer bug, it is being fixed, and Sonnet's true score is a little higher than 96.

## What this proves, and what it doesn't

It proves that for my agent, on Rust work of this kind, Kimi K3.1 Pro is better than Qwen3.7-Max, and that Claude Sonnet 5.5 is better and cheaper than both per result.

It does not prove much beyond that. It is one corpus, in one language, scored by a scorer I wrote, which this week turned out to have a bug. The prices are list prices on one day, and Qwen's real cost is a flat fee until the quota runs out. Grok has no result because I stopped it. Kimi's score was taken before the fixes its own failures prompted, so its rerun is the next thing I owe this table, and I will add it here when it exists rather than quietly editing the numbers above.

## Update: the rescore

The fault was more interesting than I had guessed. When the scorer laid the hidden tests over a model's workspace, the copied files kept their original modification times, which were older than the model's own build. Cargo therefore considered the test binary up to date and ran the model's own tests instead of mine. Sonnet had written its own `tests/tables.rs` in four of five trials, so it was marked down for breaking tests that had never actually run. The copy now stamps each file with the current time, and the eval gained a `--rescore` that reruns the hidden tests on the workspaces each run left behind, without calling any model.

| Model | Score (90% interval) | Passed | Cost per pass |
|---|---|---|---|
| Claude Opus 5.5 (ceiling) | 100 (99-100) | 130 | $0.29 |
| Claude Sonnet 5.5 | 99 (99-99) | 128 | $0.12 |
| Kimi K3.1 Pro | 95 (94-96) | 113 | $0.24 |
| Qwen3.7-Max | 90 (87-92) | 109 | $0.34 |
| GPT-6.1 Terra | 74 (68-80) | 96 | $0.06 |

Kimi's one fewer pass is not a change in its work: the ledger case's acceptance tests pick network ports in a way that races, and one of its trials lost the race on the rerun. That test is next on the list.

So the second half of the title is now stronger than when I wrote it. Kimi still clearly beats Qwen, which was the question. Sonnet is clearly the better coding model for Dino, by score, by speed and by cost per result.

## Second update: everything else I measured

**Kimi after its fixes.** I reran Kimi on the five cases it did worst on, the four TOML stages and the thread-safety case, five trials each, on Dino with the `cargo fmt` and empty-path fixes. Seven of the 25 runs died on Moonshot errors (six "engine overloaded" from running five at once, one when my balance ran out mid-run, which I can recommend as a way to discover your spending rate), so these figures count only the 18 that reached the model. It passed 15 of 18, 83%, against 11 of 25, 44%, before the fixes; its mean on those cases rose from 87 to 94; and failures for touching protected test files fell from 32 to 2. Most of Kimi's gap to Sonnet was one habit. I lost the first rerun's results entirely, to a `git stash` of my own while it was still writing them; the script now writes outside the repository.

**The vendors' own tools.** Dino is my harness, so it seemed fair to ask how the models do in the tools their makers built. Eight of the harder cases, two trials each, every tool on my own subscription, scored by the same hidden tests:

| Tool and model | Score | Passed | Minutes per run |
|---|---|---|---|
| Codex, GPT-6.1 Sol | 100 | 16 of 16 | 1.0 |
| Claude Code, Sonnet 5.5 | 99 | 15 of 16 | 0.7 |
| Kimi Code, K3.1 Pro | 93 | 10 of 16 | 6.0 |

Grok's own CLI was too slow to finish in the hour I allowed and has no result. Claude Code first scored 82, which was my doing: to run these tools unattended I put them inside Dino's sandbox, and the sandbox refused Claude Code's shell its working directory, so it wrote correct code without ever being able to compile it and then honestly reported the build as failed. With that fixed it scored 99. Kimi Code scored 93 against 94 for Kimi inside Dino on the same cases: the model sets the level, not the harness, and Kimi's own tool has the same formatting habit.

**Claude Haiku 5.5.** Haiku scored **95 (94-95)** on the full corpus, level with Kimi, passed 125 of 130 runs against Kimi's 113, took 1.7 minutes a run against 7.3, and cost **\$0.018 per passed run against Kimi's \$0.24**. Kimi is better on small precise edits; Haiku is better on the parser stages. For Dino the two are the same quality at a thirteenth of the price, which is not a sentence I expected to write about the smallest model in the room.

**Alibaba's other models.** My Token Plan also serves Qwen3.8-Max, DeepSeek V4 Pro and GLM 5.3, which I had never measured in Dino. I started all three on the full corpus and stopped them, because the plan's monthly quota had already run out and the question no longer turned on them. I also tried them in the family chat I run on the same machine, on its real questions judged blind against Kimi: only Qwen3.8-Max matched Kimi, and only when allowed to think at length, at 76 seconds a reply against Kimi's 13; every faster setting fell behind, and the plan's endpoint refused some news and political questions outright.

## Where it ended up

Dino runs on **Kimi K3.1 Pro through Moonshot's API, with Sonnet 5.5 behind it**. The Qwen plan will not be renewed. I have also stopped paying for Kimi's coding subscription, because its terms allow it only in Kimi's own tool and a short list of approved ones, which Dino is not; the API is the honest route and, as it turns out, the measurable one.

Sonnet remains the best coding model I measured and Haiku the best value. If the Moonshot bill grows, Haiku is a like-for-like swap at a fraction of the cost, and that is now a number rather than a hunch.

