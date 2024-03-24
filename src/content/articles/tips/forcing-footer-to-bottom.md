---
title: "Forcing a footer to the bottom of the page"
summary: "An easy way to force a footer to the bottom of the page"
desc: "An easy way to force a footer to the bottom of the page"
updated: 2024-03-20
tags: []
feature: false
---

## Overview

If your website has pages with little content, your footer may end up in the middle of the page on larger screens. This doesn't look good, and it can be fixed with a simple CSS trick.

## Solution

1. Force the body to take up at least the full height of the viewport.
2. Use flexbox and space-between to push the footer away from the rest of the content.

> You must only have two direct children of the body element to make this work.

```html
<body>
  <div>
    <header>Header</header>
    <main>Main content</main>
  </div>
  <footer>Footer</footer>
</body>

<style>
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
  }
</style>
```

## Tailwind example

```html
<body class="flex flex-col min-h-screen justify-between">
  <div>
    <header>Header</header>
    <main>Main content</main>
  </div>
  <footer>Footer</footer>
</body>
```
