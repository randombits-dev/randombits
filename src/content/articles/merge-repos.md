---
title: "Merge GIT repos while maintaining history"
summary: ""
published: 2023-01-01
draft: true
---

There are many reasons why you might want to merge multiple git repos into one, but perhaps the most common would be if
you are changing to a **monorepo**.

It is much easier than it sounds, although the steps are not necessarily obvious.

Our example will be repo-A, containing a single app, that we want to merge into repo-B, a monorepo.

1. Move all the contents of repo-A into a directory, and commit the files
2. Checkout 