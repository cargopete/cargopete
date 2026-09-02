---
title: "The terminal panel that lied about its own output"
date: "2026-09-02"
description: "The hero panel on this site shows a real shell transcript. Astro's compressHTML quietly collapsed the leading whitespace inside it, and uniq -c right-aligns its counts, so the page rendered a column shape the command has never produced."
tags: ["astro", "html", "shell"]
---

The front page of this site carries a terminal transcript, and the caption under it makes a
specific promise: the commands are real, and you can paste them into a shell and get the same
output. That promise is the entire reason the panel is there. A screenshot of a plausible-looking
terminal is decoration; a transcript you can reproduce is evidence.

It had been quietly false for a couple of weeks.

## What went wrong

The panel was built the obvious way, one flex row per line:

```html
<div class="tline tline--out">
  <span class="tline-body">  <span class="n">40</span> Rust</span>
</div>
```

Two leading spaces before the `40`, because `uniq -c` right-aligns its counts in a six-column
field. Three spaces before a single-digit count, two before a double-digit one. The CSS put
`white-space: pre` on the row, so the browser would honour them.

The browser never saw them. `compressHTML: true` in `astro.config.mjs` collapses runs of whitespace
in the emitted HTML, and it has no idea that some div three levels down has `white-space: pre` in a
stylesheet it never reads. So the built page shipped this:

```
 40 Rust
 13 JavaScript
 7 Python
 7 Dart
```

Every count flush left, in a column `uniq -c` has never printed. Not a catastrophe, and nobody
would have written in about it. But the panel's whole job is to be checkable, and it was showing a
shape the command does not produce.

> A workaround that hides the fault is worse than the fault. The fix is not to sprinkle
> `&nbsp;` around until it looks right, because that also breaks the paste.

## The fix

Use a real `<pre>`. Astro's compressor leaves the contents of a `pre` alone, which is the whole
point of the element, and the semantics happen to be exactly correct: this **is** preformatted
text.

| approach | alignment survives | pastes into a shell |
|---|---|---|
| flex rows | no | yes |
| `&nbsp;` entities | yes | no |
| `<pre>` | yes | yes |

The nbsp option is the trap. It fixes the thing you can see and breaks the thing the caption
promises, which is worse than leaving it wrong, because now it looks right.

## The second bug, which was worse

Having fixed the rendering, I did the obvious thing and pasted the panel's own commands back into
a shell to check they ran. The first one did. The second one did not:

```
(eval):1: no matches found: .[].name
```

The command passed `--jq .[].name` unquoted. In zsh that is a glob pattern, it matches nothing,
and the shell refuses to run the command at all. The title bar of the panel says `zsh`. So the
transcript was displaying a command that could not have produced the output printed underneath it.

Quoting the filter fixes it, and both commands now reproduce:

- `--jq '.[].name'` survives both bash and zsh
- the counts line up as `uniq -c` prints them
- the panel is checkable again, which is the only reason it exists

## The general lesson

Both faults look like success. The page rendered, the build was green, the numbers were correct.
Nothing in CI could have caught either, because CI was never asked whether the page told the truth,
only whether it compiled.

The check that found them was embarrassingly simple: take the text out of the *built* HTML, not
the source, and run it.
