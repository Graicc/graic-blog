---
title: Local Latex Editing on Windows With VSCode
subtitle: I am a winget shill
date: 2025-01-02
---

## TL;DR

```bash
code --install-extension James-Yu.latex-workshop # VSCode LaTeX extension
winget install MiKTeX.MiKTeX # LaTeX distribution
winget install StrawberryPerl.StrawberryPerl # Required by MiKTeX
cargo install tex-fmt # LaTeX formatter
```

VSCode settings:

- latex workshop as default formatter for latex
- `latex-workshop.formatting.latex`: `tex-fmt`
