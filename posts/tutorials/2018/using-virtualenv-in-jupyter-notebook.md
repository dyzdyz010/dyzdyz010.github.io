---
title: "Using virtualenv in Jupyter Notebook"
date: 2018-05-09T08:09:33+08:00
tags:
  - python
  - code
  - tutorial
author: dyzdyz010
collection: tutorials
---

+ OS: macOS High Sierra 10.13.4
+ Default Python version: 3.6.5

## Prerequisites

1. Have your `Jupyter Notebook` and `virtualenv` installed with your default python version
2. Have one virtual env created which you want to use

## Walkthrough

### Activate your virtualenv

```bash
source <envpath>/bin/activate
```

### Install ipykernel inside your env

```bash
$(yourenv)> pip install ipykernel
```

### Create kernel using your env

```bash
$(yourenv)> python -m ipykernel install --user --name myenv --display-name "Python (myenv)"
```

### Go ahead and enjoy

Now open your jupyter notebook and you'll notice your kernel just created appears along with your default kernel. Enjoy it😀