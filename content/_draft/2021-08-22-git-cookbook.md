---
layout: post
title: Git Cookbook
tags:
  - Git
language: th
uuid: 4vwhqae
unsplashImgCoverId: 842ofHC6MaI
---

[read this before](git-in-action-obu52c9)

## Preparing to work with Git

You need to set your name and email before you create a first commit in your repository.

```bash
git config user.name "Thada Wangthammang"
git config user.email "thada.wth@gmail.com"
```



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

https://root.cern/for_developers/creating_pr/
![PR_workflow](https://root.cern/for_developers/creating_pr/PR_workflow.png)

Ref: [https://www.freecodecamp.org/news/how-to-sync-your-fork-with-the-original-git-repository/](https://www.freecodecamp.org/news/how-to-sync-your-fork-with-the-original-git-repository/)

### Push from Fork project to Original Project

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
git fetch upstream
git checkout frontend
git push -u upstream frontend
```

## Git Undo


- [How to undo (almost) anything with Git](https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/)
- [https://devconnected.com/how-to-undo-last-git-commit/](https://devconnected.com/how-to-undo-last-git-commit/)

```jsx
git reset --soft HEAD~1
```

### How to undo git reset
https://stackoverflow.com/a/2531803

```bash
# short answer
git reset 'HEAD@{1}'
```

Git keeps a log of all ref updates (e.g., checkout, reset, commit, merge). You can view it by typing:

```
git reflog
```

Somewhere in this list is the commit that you lost. Let's say you just typed `git reset HEAD~` and want to undo it. My reflog looks like this:
```
$ git reflog
3f6db14 HEAD@{0}: HEAD~: updating HEAD
d27924e HEAD@{1}: checkout: moving from d27924e0fe16776f0d0f1ee2933a0334a4787b4c
[...]
```

The first line says that `HEAD` 0 positions ago (in other words, the current position) is 3f6db14; it was obtained by resetting to `HEAD~`. The second line says that `HEAD` 1 position ago (in other words, the state before the reset) is d27924e. It was obtained by checking out a particular commit (though that's not important right now). So, to undo the reset, run `git reset HEAD@{1}` (or `git reset d27924e`).

If, on the other hand, you've run some other commands since then that update HEAD, the commit you want won't be at the top of the list, and you'll need to search through the `reflog`.

One final note: It may be easier to look at the `reflog` for the specific branch you want to un-reset, say master, rather than `HEAD`:

```
$ git reflog show master
c24138b master@{0}: merge origin/master: Fast-forward
90a2bf9 master@{1}: merge origin/master: Fast-forward
[...]
```

This should have less noise it in than the general `HEAD reflog`.

### Clone Pull Request

1. Fetch the reference to the pull request based on its ID number, creating a new branch in the process.

    ```
    $ git fetch origin pull/ID/head:BRANCHNAME
    ```

2. Switch to the new branch that's based on this pull request:

    ```
    [main] $ git checkout BRANCHNAME
    > Switched to a new branch 'BRANCHNAME'
    ```

# To checkout a PR branch for coding review, credit @Wittawat Karpkrikaew, aaron

- Add a contributor's remote:
  ```bash
  $ git remote add [REFERENCE_NAME] git@github.com:aaronamm/dotnetthailand.github.io.git
  ```

- I usually use REFERENCE_NAME as a contributor's name, e.g. aaron, mild.

- Then, fetch all branches of a contributor.
  ```bash
  $ git fetch aaron
  ```
- Git tries to automatically create a local branch that tracks a remote brnach for you, e.g.
  ```bash
  * [new branch] improve-webpack-sass-only-content -> aaron/improve-webpack-sass-only-content
  ```

- You can can checkout a new branch with:

  ```bash
  $ git checkout improve-webpack-sass-only-content
  ```

- This will leave a local branch on your computer.
- Or you can checkout a temporary branch with:

  ```
  $ git checkout aaron/improve-webpack-sass-only-content
  ```
