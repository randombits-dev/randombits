---
title: "How to configure browser caching in Cloudflare Pages"
summary: "A guide to configuring the browser cache settings for for assets in Cloudflare Pages"
desc: "A guide to configuring the browser cache settings for for assets in Cloudflare Pages"
updated: 2024-04-02
tags: ["cloud"]
feature: false
---

## Overview

If you are using Cloudflare Pages to host your website, you might have noticed that static assets are not cached by the browser by default.

The `Cache-Control` header in the response is set to:

```
public, max-age=0, must-revalidate
```

Which means that the browser will cache the asset, but it will check with the server on every request to see if it changed. This is not ideal for static assets that don't change often. In fact, assets that have a hash in the filename (like `main.Dsf6jfcR.js`) will never change, and can be cached indefinitely.

## Solution

To configure caching, you can create a `_headers` file (no extension) in the root of your pages deployment. This file will contain URL patterns and the cache settings for those patterns. For example:

```
# _headers file

/js/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=86400
```

The `immutable` directive tells the browser that the asset will never change, so it can be cached indefinitely. However, it's always recommended to set a large `max-age` value as well, because the `immutable` directive is not supported in all browsers.

The `max-age` value is in seconds, so `31536000` is one year, and `86400` is one day.

The browser will cache the asset for the specified time, and will not check with the server until the cache expires, or the cache is cleared.

See the [offical documentation](https://developers.cloudflare.com/pages/configuration/headers/) for more information.

## Astro Framework

If you are using the Astro framework, you will notice that everything in the `dist/_astro` directory has a hash in the filename. Therefore, it is safe to cache these files, because the filename will change if the content changes. Set the cache settings to `immutable` for everything in the `_astro` directory:

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```
