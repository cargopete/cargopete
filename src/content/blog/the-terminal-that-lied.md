---
title: "The terminal panel that lied about its own output"
date: "2026-09-02"
description: "This site's hero panel shows a real shell transcript, and for twelve days it rendered a column shape the command has never produced. Astro's compressHTML had eaten the leading whitespace, and the second fault I found while checking the first was worse."
tags: ["astro", "html", "shell", "post-mortem"]
---

The front page of this site carries a terminal transcript, and the caption underneath makes a
specific promise: the commands are real, and you can paste them into a shell and get the same
output. That promise is the entire reason the panel exists. A screenshot of a plausible-looking
terminal is decoration. A transcript you can reproduce is evidence, and evidence is the only thing
on a personal site worth the bytes.

**It had been quietly false since 21 August.** The markup shipped in `20c0454`, the fault survived
twelve days and one full redesign, and I found it only because I went looking for something else.

## What the panel is supposed to show

Two commands. The first counts my public repositories by language, the second sums my commits
across every repository in the Night's Watch organisation. The relevant part is the first one's
output:

```
  40 Rust
  13 JavaScript
   7 Python
   7 Dart
```

`uniq -c` right-aligns its counts in a fixed-width field. Two leading spaces before a two-digit
number, three before a single-digit one. That alignment is not decoration either: it is the
fingerprint that says a real `uniq` produced this and a person did not type it out.

## What Astro did to it

The panel was built the obvious way, one flex row per line, with `white-space: pre` on the row so
the browser would honour the spacing:

```html
<div class="tline tline--out">
  <span class="tline-body">  <span class="n">40</span> Rust</span>
</div>
```

The browser never saw the spaces. `compressHTML: true` in `astro.config.mjs` collapses runs of
whitespace in the emitted HTML, and it has no idea that some div three levels down is governed by
a `white-space` declaration in a stylesheet it never reads. Astro 5.18.2 shipped this to
production:

```
 40 Rust
 13 JavaScript
 7 Python
 7 Dart
```

Every count flush left, in a column `uniq -c` has never printed in its life. Nobody was going to
write in about it. But the panel's only job is to be checkable, and it was displaying a shape the
command does not produce, which is a small lie told very confidently.

## Three fixes, and the one that is a trap

| approach | alignment survives | still pastes into a shell | source stays robust |
|---|---|---|---|
| flex rows | no | yes | yes |
| `&nbsp;` entities | yes | **no** | yes |
| a real `<pre>` | yes | yes | **no** |

Non-breaking spaces are the trap. They fix the thing you can see and break the thing the caption
promises, because a reader who copies the line gets U+00A0 where their shell expects U+0020 and a
command that fails for reasons nobody will enjoy diagnosing. It looks right and is worse.

So: a real `<pre>`. Astro's compressor leaves the contents of a `pre` element alone, which is the
entire point of the element, and the semantics happen to be exactly correct. This is preformatted
text, and it had spent twelve days pretending to be a flexbox.

The honest cost is in the last column. Inside a `<pre>` the whitespace lives in the source file,
where any editor with opinions about trailing spaces or auto-indentation can silently destroy it,
and nothing in the build will complain. The flex-row version was immune to that and vulnerable to
the compressor instead. Neither is free; the `<pre>` at least fails in a direction I can test for.

## The second fault, which was worse

Having fixed the rendering, I did the obvious thing and pasted the panel's own commands back into
a shell. The first ran. The second did not:

```
(eval):1: no matches found: .[].name
```

The command passed `--jq .[].name` unquoted. In zsh that is a glob pattern, it matches nothing, and
the shell declines to run the command at all. The title bar of the panel says `zsh`. So for twelve
days the site displayed a command that could not have produced the output printed directly beneath
it, in a panel whose whole argument is that it is reproducible.

Quoting the filter fixes it, and both commands now run verbatim:

- `--jq '.[].name'` survives bash and zsh alike
- the counts line up the way `uniq -c` prints them
- the panel is checkable again, which is the only reason it is on the page

## Why nothing caught either of them

Both faults look exactly like success. The page rendered. `astro check` reported zero errors,
zero warnings, zero hints. The build was green in 279 milliseconds. Every number on the panel was
correct, and the two most interesting figures on the site, 3,199 commits and 217 stars, were
accurate the whole time.

CI was never asked whether the page told the truth. It was asked whether the page compiled, which
is a different question, and it answered that one perfectly.

The check that found both took under a minute: pull the text out of the **built** HTML rather than
the source, strip the tags, and run it.

## What this does not prove

It is one panel on one personal site, and the fix is not a general result. `compressHTML` is doing
what it says on the tin; the fault was mine for putting whitespace-sensitive content somewhere the
compressor was entitled to touch it. Nor is this an argument for turning compression off, which
would cost every page on the site a few hundred bytes to protect fourteen lines.

I also have no test for it yet. The panel is verified by hand, today, by me, and if I edit it in
six months nothing will stop me reintroducing either fault. A build-time assertion that extracts
the transcript and shells out to run it is the obvious next step, and it is not written.

## Try it on your own site

If you publish anything whitespace-sensitive, a transcript, ASCII output, a diagram, an aligned
table, this is a two-line check and worth running once:

```bash
npm run build
grep -o '<pre[^>]*>.*</pre>' dist/index.html | head
```

Read the whitespace, not the markup. Then take whatever commands you are showing people and paste
them into a shell in the state your page displays them, quoting and all. Mine survived the first
test and failed the second, which is roughly the ratio I would expect.
