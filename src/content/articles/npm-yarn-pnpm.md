---
title: "NPM vs Yarn vs PNPM"
summary: "A very brief comparison of NPM, Yarn, and Pnpm package managers, from a performance perspective"
desc: "A very brief comparison of NPM, Yarn, and Pnpm package managers, from a performance perspective"
updated: 2023-07-11
img: './covers/vs.png'
---

## NPM

NPM is the original package manager. It downloads your projects dependencies, and the dependencies` dependencies,
and so on until everything is downloaded. This can result in an extreme amount of libraries, with hundreds of
thousands of files.

The biggest issue I've had with NPM is how long it takes to delete the node_modules folder. Windows does not handle
100K files very well. Now that I have a blazing fast WD Black SSD, it isn't that bad, but it still takes
about a minute to delete large projects.

## PNPM

PNPM adds performance enhancements to NPM, the most notable being that libraries are downloaded to a central location on
your hard drive, and are shared between projects. It maintains complete compatibility with NPM by using symbolic links
to create the same node_modules structure you are used to.

I've noticed a big performance difference with PNPM, so I use it on all my projects.

## YARN

There are two versions of Yarn:

1. Yarn v1 or Yarn Classic (maintenance mode since 2020)
2. Yarn v2 or Yarn Berry

Here I will be referring to Yarn v2 or Yarn Berry, since the classic version should not be used anymore.

Yarn Berry takes a different approach by zipping all dependencies in order to save space and to reduce
the number of files. For example, when using Yarn, I only have about 200 files instead of 100K files.

The concept and performance is great, except there are two big issues:

1. It is not completely compatible with the normal node_modules structure. Most libraries have no issues, but it can be
   tough to debug issues when they arise.
2. The documentation and community support is very lacking.

For these reasons, I do not recommend Yarn.

## Performance Test Summary

Here is a summary of the performance results for all three package managers. I ran the tests on the same repo with about 100K total files in the dependency tree.

| Library | # of Files | Disk Space Used | Install | Install in another location | Delete Project |
|---------|------------|-----------------|---------|-----------------------------|----------------|
| NPM     | 100K       | 750MB           | 65s     | 65s                         | 55s            |
| PNPM    | 100K       | 550MB           | 31s     | 10s                         | 25s            |
| Yarn    | 200        | 138MB           | 85s     | 85s                         | Instant        |

## My recommendations

I highly recommend PNPM, and I don't see a reason why it shouldn't be used for all projects.
