---
title: "Enable latex-export-logging in org-mode"
date: 2018-05-11T07:50:12+08:00
tags:
  - emacs
  - code
  - latex
author: dyzdyz010
collection: productivity
---

Emacs version: GNU Emacs 26.1(Also works in Emacs 24 or maybe even in earlier versions)

By default, when exporting latex and PDF file from emacs org-mode, log files are removed when the process finishes, you may want to reserve it.

To make emacs stop removing log files, do as below:

`M-x` -> `customize-variable`, `RET` -> `org-latex-remove-logfiles`

By default this variable is set to `true`, means log files are removed automatically, then you just need to toggle it to `false`, save, restart Emacs, and you're good to go 😀