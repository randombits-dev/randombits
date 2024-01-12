---
title: "An Introduction"
desc: "An introduction to running an automatic1111 stable diffusion server in the cloud"
updated: 2024-01-07
img: './mtn-clouds.jpg'
tags: [ai, cloud]
order: 1
---

## Why run stable diffusion in the cloud?

**No need to buy expensive GPUs**. The cost of cloud servers are low enough where it is often cheaper than buying your own hardware. 

This is assuming the server is used occasionally, and it is shut down when not in use. If stable diffusion is run continuously for personal use, then it would be more cost-efficient to buy hardware.

**Upgrade whenever necessary**. Need more GPU power temporarily? It is simple to upgrade the server, and then downgrade it again when done.

**Automation**. Automate the process of starting your server, loading models, generating your images, and shutting down.

**Using the API**. This is probably the best reason to run stable diffusion in the cloud. Apps can be built to integrate with your stable diffusion server.

## What is Automatic1111?

Automatic1111 is a full-featured **user interface** to run stable diffusion. It is easy to use, has a ton of features, and supports community extensions. It also has an API, so you can build batch processes, or applications that integrate with it.

## The costs

On Google Cloud, the cheapest option is **$0.14/hour** to rent a **24GB GPU**, using Spot Provisioning (allows you to rent cheap servers during off-peak times when there isn't a high demand for servers).

And it can cost over **$5/hour** to rent a super powerful **80GB GPU** using Standard Provisioning (guaranteed availability).

I recommend starting with the cheapest option, because it is fast enough for personal use.

## Which cloud platform is better?

After running stable diffusion on both **Google Cloud** and **AWS** for a significant amount of time, I would easily recommend **Google Cloud** over AWS.

**Google Cloud** is cheaper, it's easier to estimate costs, and overall easier to understand the server provisioning process.

**AWS** is still a great option, especially if you are already familiar with it. But for new users, or users who are already familiar with Google, I would stick with **Google Cloud**.

To continue your adventure, pick a platform and keep reading:

[Running Automatic1111 on Google Cloud](google-cloud)

[Running Automatic1111 on AWS](aws)
