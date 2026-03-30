---
title: "Merge Git repositories while maintaining history"
desc: "A step-by-step guide on how to merge multiple Git repositories into one, perfect for transitioning to a monorepo structure."
updated: 2026-03-30
---

There are many reasons why you might want to merge multiple Git repositories into one, but perhaps the most common is when you're transitioning to a **monorepo**.

It's simpler than it sounds, though the steps aren't necessarily obvious. In this guide, we'll walk through the process of merging **repo-A** (a single application) into **repo-B** (the target monorepo).

## Prerequisites

- Both repositories should be clean (no uncommitted changes).
- Back up your repositories or work on a separate branch before proceeding.

## Step 1: Prepare the Source Repository

In **repo-A**, you need to move all files into the subdirectory where you want them to live in the target monorepo.

```bash
# Move into the directory for repo-A
cd repo-A

# Create the target directory structure (e.g., apps/app-A)
mkdir -p apps/app-A

# Move all tracked files into the new directory
# (Excluding the new directory itself)
git ls-tree -z -r --name-only HEAD | xargs -0 -I {} mv {} apps/app-A/

# Commit and push these changes
git add .
git commit -m "Relocate files to apps/app-A for monorepo migration"
git push origin main
```

## Step 2: Merge into the Target Repository

Now, move to **repo-B** and add the source repository as a remote.

```bash
# Move into the target monorepo (repo-B)
cd repo-B

# Add repo-A as a new remote
git remote add repo-a-remote https://github.com/user/repo-A.git

# Fetch the remote data
git fetch repo-a-remote

# Merge repo-A's branch into repo-B's current branch
# Using --allow-unrelated-histories is essential here
git merge repo-a-remote/main --allow-unrelated-histories
```

## Step 3: Cleanup

Once the merge is successful and you've verified that the history is intact, you can remove the remote.

```bash
git remote remove repo-a-remote
```

That's it! You should now have all the Git history from **repo-A** preserved within **repo-B**, with all files correctly located in their new subdirectories.
