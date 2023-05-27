---
title: "Automatic1111 API quick start guide"
summary: "A guide to using the Automatic1111 API"
desc: "A guide to using the Automatic1111 API"
updated: 2023-05-25
img: '/images/covers/mtn-clouds.jpg'
hide: true
---

## Reasons to use the Automatic1111 API?

**Automated Processes**. You can create a script that generates images while you do other things.

**Building a client UI**. You can create your UI that talks to Automatic1111.

## Getting Started

When you start Automatic1111, make sure to include the `--api` option. For example:

```
stable-diffusion-webui/webui.sh --listen --xformers --api
```

All endpoints are located at: `/sdapi/v1/*`. For example, `http://localhost:7860/sdapi/v1/txt2img`.

## txt2img 

Generate an image using a text prompt.

Common Params:

```json
POST /sdapi/v1/txt2img
{
    "prompt": "Sunset in the mountains, lake in front",
    "negative_prompt": "clouds, people",
    "steps": 20,
    "cfg_scale": 7,
    "height": 512,
    "width": 512,
    "seed": -1
}
```

To enable Hires, add the following params:

```json
{
    ...
    "enable_hr": true, // enable Hires
    "hr_scale": 2, // 2x512 = 1024
    "denoising_strength": 0.7,
    "hr_second_pass_steps": 10
}
```


Full list of accepted params:

```json
{
  "alwayson_scripts": {},
  "batch_size": 1,
  "cfg_scale": 7,
  "denoising_strength": 0,
  "do_not_save_grid": false,
  "do_not_save_samples": false,
  "enable_hr": false,
  "eta": null,
  "firstphase_height": 0,
  "firstphase_width": 0,
  "height": 512,
  "hr_resize_x": 0,
  "hr_resize_y": 0,
  "hr_scale": 2,
  "hr_second_pass_steps": 0,
  "hr_upscaler": "R-ESRGAN",
  "n_iter": 1,
  "negative_prompt": null,
  "override_settings": null,
  "override_settings_restore_afterwards": true,
  "prompt": "Astronaut planting a flag on the moon",
  "restore_faces": false,
  "s_churn": 0,
  "s_min_uncond": 0,
  "s_noise": 1,
  "s_tmax": null,
  "s_tmin": 0,
  "sampler_index": "Euler",
  "sampler_name": null,
  "save_images": false,
  "script_args": [],
  "script_name": null,
  "seed": -1,
  "seed_resize_from_h": -1,
  "seed_resize_from_w": -1,
  "send_images": true,
  "steps": 50,
  "styles": null,
  "subseed": -1,
  "subseed_strength": 0,
  "tiling": false,
  "width": 512
}
```