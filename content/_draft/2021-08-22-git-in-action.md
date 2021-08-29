---
layout: post
title: Git in Action
tags:
  - Git
language: th
uuid: obu52c9
unsplashImgCoverId: wX2L8L-fGeA
---

```bash
echo "# todo-asp.net" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mildronize/todo-asp.net.git
git push -u origin main
```

[git-tips/tips: Most commonly used git tips and tricks.](https://www.notion.so/git-tips-tips-Most-commonly-used-git-tips-and-tricks-e7a23c4df72c485c981bd89e6fd22691)

[25 Git commands I use daily and you should know - DEV Community 👩‍💻👨‍💻](https://www.notion.so/25-Git-commands-I-use-daily-and-you-should-know-DEV-Community-ab8821f34d7f47e59fe5de9e6b9f68b7)

- `git add .`: adds all the files
- `git commit`: records the file permanently
- `git config`: it controls set for the local save project/file
- `git help`: displays all the necessary information about git commands
- `git status`: gives all the information about the current branch
- `git log`: get to know about the previous commits
- `git diff`: runs a diff work on Git information sources. These information sources can be submits, branches, records and then some
- `git reset --hard`: deletes all your uncommited changes | dangerous command lol
- `git remote add <url or address>`: to add a new remote address
- `git remove rm`: to remove file form Git repository
- `git push -u origin master`: for pushing local files to github
- `git branch`: the tip of a progression of submits—it is anything but a holder for submits.
- `git checkout`: allows you to explore between the branches made by git branch
- `git tag`: tags are utilized to check a submit stage as important
- `git fetch`: this command advises your local git to recover the most recent meta-information data from the first
- `git rebase`: you can take every one of the progressions that were submitted on one branch and replay them on an alternate branch.
- `git config -global color.ui true`: see different color on different outputs
- `git init`:creates a new git repository
- `git commit -m "New file Readme.md"`: saves your changes in the local repository
- `git show`: that is utilized to see extended subtleties on Git items like masses, trees, labels, and submits.
- `git merge`: allows you to take the autonomous lines of improvement made by git branch and coordinate them into a solitary branch
- `git pull <repo link>`: to download the folder from the remote repository
- `git stash save`: stores modified tracked files
- `git stash drop`: discards most recent stashed files

## git reflog


```log
649bee7 (HEAD -> main, origin/main) HEAD@{0}: pull: Fast-forward
c7964f8 HEAD@{1}: commit: docs: add security
f354fe6 HEAD@{2}: reset: moving to HEAD@{1}
8d92e0d HEAD@{3}: commit: docs: add security
f354fe6 HEAD@{4}: commit: If this come from 404 page, it will be duplicated history. using history.back to pop the duplicate one
fdfc1a8 HEAD@{5}: commit: docs: update git cookbook
33890fb HEAD@{6}: commit: Replace 'gatsby-plugin-pathdata' to reduce duplicate filename and dir name
a80050e HEAD@{7}: reset: moving to HEAD@{4}
e8a3339 HEAD@{8}: reset: moving to HEAD@{2}
e8a3339 HEAD@{9}: reset: moving to HEAD@{1}
d5c8822 HEAD@{10}: reset: moving to HEAD~1~
e8a3339 HEAD@{11}: commit: Replace to reduce duplicate filename and dir name
a80050e HEAD@{12}: pull: Fast-forward
d5c8822 HEAD@{13}: commit: add draft content git
01adbaf HEAD@{14}: pull: Fast-forward
dd2fae2 HEAD@{15}: checkout: moving from update-uuid-store to main
```
