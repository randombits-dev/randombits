---
title: "Cloudflare Workers Cache API"
summary: "A guide to caching D1, R2, or other data in a Cloudflare Worker"
desc: "A guide to caching D1, R2, or other data in a Cloudflare Worker"
updated: 2024-03-20
tags: ["cloud"]
---

## Overview

Cloudflare Workers support the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache), which is intended to cache HTTP requests. But it can also be used to cache any data you want, such as D1 or R2 data.

> Note that the Cache API only caches data within a data center, so it is possible that the cache data will be inconsistent between data centers.

## Caching Http Requests

Cloudflare caches HTTP requests by default, but you can control the cache settings with the `cf` object in the fetch options. See the [Cloudflare Docs](https://developers.cloudflare.com/workers/examples/cache-using-fetch/) for more information.

```javascript
let response = await fetch(request, {
  cf: {
    cacheTtl: 86400, // in seconds (1 day)
    cacheEverything: true
  },
});
```

## Caching D1 Data

Since the Cache API uses requests or URLs as keys, we need to create a unique URL key that represents the data we are trying to cache. The protocol must be `http` or `https`, and will throw an error if we try to use a custom protocol. But the host and path can be anything, since we are not actually making a request.

In this example, I'm caching a user record, and here is the key I'm using:

```javascript
`http://user/${userId}`
```

We first need to open a cache. The `caches` variable is a global variable. The key can be anything.

```javascript
const userCache = await caches.open('user');
````

To put the data in the cache, we can use the `put` method:

```javascript
const user = await db.prepare('Select * from Users where id = ?').bind(userId).first();
const userCache = await caches.open('user');
await userCache.put(`http://user/${userId}`, new Response(JSON.stringify(user)));
```

To read from the cache, we can use the `match` method:

```javascript
const userCache = await caches.open('user');
const cacheResponse = await userCache.match(`http://user/${userId}`);
if (cacheResponse) {
  const user = await cacheResponse.json();
}
```

### Full worker example 
In this example, the user is saving some data, but we need to check that the user is active before allowing the save, which requires the user record. This is a great example for using the Cache API, because the query happens very frequently, and it is ok if the user record is a little stale.


```javascript
const {userId} = await request.json();
const userCache = await caches.open('user');
const url = `http://user/${userId}`;
const cacheResponse = await userCache.match(url);
let user;
if (cacheResponse) {
  user = await cacheResponse.json();
} else {
  user = await db.prepare('Select * from Users where id = ?').bind(userId).first();
  const response = new Response(JSON.stringify(user));
  context.waitUntil(userCache.put(url, response));
}

if (user.active) {
  // do something
} else {
  return new Response('User is not active', {status: 400});
}
```

## Setting Max Age

By default, the max age the cache is determined by the status code returned with the response. See [Cloudflare Docs](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code#edge-ttl).

If you want to set a custom max age, you can use the `Cache-Control` header. The max age should be specified in seconds.

```javascript
const response = new Response(JSON.stringify(user), {
  headers: {
    'Cache-Control': 'max-age=86400'
  }
});
await userCache.put(url, response); 
```

## Caching R2 Data

Caching R2 data is similar to caching D1 data. Here is a full example of a worker that caches R2 data:

```javascript
const objectId = params.get('id');

const objectCache = await caches.open('objects');
const url = `http://objects/${objectId}`;
const cacheResponse = await objectCache.match(url);
if (cacheResponse) {
  return new Response(cacheResponse.body);
} else {
  const record = await R2.get(objectId);
  const response = new Response(record.body);
  context.waitUntil(objectCache.put(url, response.clone()));
  return response;
}
```

## Using Cache API with Astro

If you are using Cloudflare Workers in an Astro project, the Cache API will be available at `locals.runtime.caches`. Here is an example of using caching in an Astro project:

```javascript
export async function GET({locals}: APIContext) {
  const cache = await locals.runtime.caches.open('myCache');
  const url = `http://user/${userId}`;
  const cacheResponse = await userCache.match(url);
  let user;
  if (cacheResponse) {
    user = await cacheResponse.json();
  } else {
    user = await db.prepare('Select * from Users where id = ?').bind(userId).first();
    const response = new Response(JSON.stringify(user));
    locals.runtime.waitUntil(userCache.put(url, response));
  }
  
  // do something with user
}
```
