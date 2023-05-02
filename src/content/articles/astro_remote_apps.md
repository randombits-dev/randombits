---
title: "Micro frontends in astro with remote loading"
summary: ""
updated: 2023-01-01
draft: true
---

Even though Astro is a very flexible framework, there are several reasons why

## Option #1: Loading Remote HTML

In this option, you would deploy a remote app to a staging environment, and then the astro build would load the html
from this environment.
Configure the remote app to output a fragment HTML file, which is an HTML file that doesn't contain the full html
layout.
For Example:

```html

<div>My remote App</div>
<script src="remote1/my-remote-bundle.js"></script>
```

```
---
const response = await fetch('https://nienow.github.io/example/remote.html');
const remoteHTML = await response.text();
---
<div set:html="remoteHTML"></div>
```

## Remote app configuration (vite)

## Remote app configuration (webpack)

