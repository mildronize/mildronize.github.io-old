---
layout: post
title: Git Cookbook
tags:
  - Git
language: th
uuid: 4vwhqae
---


### First Commit to Remote Git

```bash
echo "# todo-asp.net" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mildronize/todo-asp.net.git
git push -u origin main
```

### Force Push on Same Pull Request

```bash
git add -A
git commit --amend
git push -f
```

### How to Sync Your Fork with the Original Git Repository

```bash
# Add a new remote upstream repository
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git

# Sync your fork
git fetch upstream
git checkout main
git merge upstream/main

```

### Push from Fork project to Original Project

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
git fetch upstream
git checkout frontend
git push -u upstream frontend
```

## Git Undo

[https://devconnected.com/how-to-undo-last-git-commit/](https://devconnected.com/how-to-undo-last-git-commit/)

```jsx
git reset --soft HEAD~1
```

### Clone Pull Request

1. Fetch the reference to the pull request based on its ID number, creating a new branch in the process.

    ```
    $ git fetch origin pull/ID/head:BRANCHNAME
    ```

2. Switch to the new branch that's based on this pull request:

    ```
    [main] $ git checkoutBRANCHNAME
    > Switched to a new branch 'BRANCHNAME'
    ```

Ref: [https://www.freecodecamp.org/news/how-to-sync-your-fork-with-the-original-git-repository/](https://www.freecodecamp.org/news/how-to-sync-your-fork-with-the-original-git-repository/)
