---
title: "Adding film grain to images"
summary: "A guide to calling Chainlink Functions and authenticating to a private API with secrets"
desc: "A guide to calling Chainlink Functions and authenticating to a private API with secrets"
updated: 2023-12-14
tags: ["web3"]
draft: true
---

# How to Add Beautiful Film Grain to Images Using HTML Canvas – A Beginner-Friendly Guide (2024)

If you’ve ever wanted your digital photos to have that warm, organic, vintage film look — the kind you see in movies or on Instagram aesthetic accounts — then **film grain** is exactly what you need.

In this beginner-friendly tutorial, we’ll walk you step by step through adding realistic grainy texture to any image using nothing but HTML and JavaScript. No Photoshop. No downloads. Just pure code that runs in the browser.

We’ll focus on the **best-quality method**: direct pixel manipulation using the HTML `<canvas>` element.

Let’s get started!

---

### What You’ll Learn
- How to load an image onto a canvas
- How to read and modify every single pixel
- How to add natural-looking monochrome or color film grain
- How to make it reusable with a simple function

Perfect for beginners who know basic HTML and JavaScript!

---

### Step 1: Set Up Your HTML and Load an Image

First, we need a place to draw: the `<canvas>` element.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Film Grain Effect</title>
  <style>
    body { margin: 0; background: #111; display: flex; justify-content: center; padding: 20px; }
    canvas { max-width: 100%; border: 8px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>

  <script>
    // Get the canvas and its drawing context
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Create a new image
    const img = new Image();
    img.src = 'https://picsum.photos/1000/700'; // A beautiful random photo

    // Wait until the image fully loads
    img.onload = function() {
      // Set canvas size to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image onto the canvas
      ctx.drawImage(img, 0, 0);
    };
  </script>
</body>
</html>
```

**What you see**: A clean digital photo displayed on the page.

This is our starting point.

---

### Step 2: Understanding Pixels – The Magic Behind the Effect

Every image on your screen is made of tiny colored dots called **pixels**.  
Each pixel has four values: **Red, Green, Blue, and Alpha** (transparency) — also known as **RGBA**.

When we use `getImageData()`, we get a giant array of numbers representing all pixels in order.

```js
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

// Example: First pixel values
console.log(data[0]);   // Red (0–255)
console.log(data[1]);   // Green
console.log(data[2]);   // Blue
console.log(data[3]);   // Alpha (opacity)
```

We’ll loop through this array and slightly change the colors to create grain.

---

### Step 3: Add Simple Monochrome Grain (Black & White Noise)

Now the fun part — let’s add random noise!

```js
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // Step 1: Get all pixel data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Step 2: Control how strong the grain is
  const intensity = 35; // Try 20 (subtle) to 60 (strong)

  // Step 3: Loop through every pixel (jump by 4 because RGBA)
  for (let i = 0; i < data.length; i += 4) {
    // Generate random noise between -intensity/2 and +intensity/2
    const noise = (Math.random() - 0.5) * intensity;

    // Add the same noise to red, green, and blue (monochrome grain)
    data[i]     += noise; // Red
    data[i + 1] += noise; // Green
    data[i + 2] += noise; // Blue
    // We don't touch data[i + 3] (alpha)
  }

  // Step 4: Put the modified pixels back on the canvas
  ctx.putImageData(imageData, 0, 0);
};
```

**Result**: Your image now has a beautiful, authentic film-like texture!

This is real per-pixel grain — exactly how professional photo editors do it.

---

### Step 4: Make It Reusable with a Function

Let’s clean this up so you can apply grain with one line of code.

```js
function addFilmGrain(intensity = 35) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity;
    data[i]     += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;
  }

  ctx.putImageData(imageData, 0, 0);
}

// Use it!
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  addFilmGrain(40); // Easy!
};
```

Now you can change the number anytime:  
`addFilmGrain(25)` → subtle  
`addFilmGrain(55)` → heavy vintage look

---

### Step 5: Color Film Grain (Even More Realistic!)

Real film has slight color variations in the grain. Let’s simulate that (like Kodak Portra or Fujifilm).

```js
function addColorFilmGrain(intensity = 38) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Different noise for each color channel
    data[i]     += (Math.random() - 0.5) * intensity * 1.1;  // Red bias
    data[i + 1] += (Math.random() - 0.5) * intensity * 0.9;  // Green
    data[i + 2] += (Math.random() - 0.5) * intensity * 1.3;  // Blue bias (common in film)
  }

  ctx.putImageData(imageData, 0, 0);
}
```

This creates warm, cinematic color grain — just like real 35mm film!

---

### Final Complete Code (Copy-Paste Ready)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Realistic Film Grain Effect with Canvas</title>
  <style>
    body { margin: 20px; background: #0d0d0d; display: grid; place-items: center; font-family: sans-serif; }
    canvas { max-width: 100%; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
    h1 { color: #fff; text-align: center; }
  </style>
</head>
<body>
  <h1>Vintage Film Grain Effect</h1>
  <canvas id="canvas"></canvas>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = 'https://picsum.photos/1200/800?' + Date.now(); // Random beautiful photo

    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add beautiful color film grain
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const intensity = 42;

      for (let i = 0; i < data.length; i += 4) {
        data[i]     += (Math.random() - 0.5) * intensity * 1.1;
        data[i + 1] += (Math.random() - 0.5) * intensity * 0.9;
        data[i + 2] += (Math.random() - 0.5) * intensity * 1.3;
      }

      ctx.putImageData(imageData, 0, 0);
    };
  </script>
</body>
</html>
```

---

### Best Intensity Values for Different Looks

| Intensity | Style                  |
|----------|-------------------------|
| 20–30     | Subtle, modern film    |
| 35–45     | Classic 35mm (perfect) |
| 50–70     | Heavy retro/vintage    |
| 80+       | Extreme old movie look |

---

You now know how to create **professional-quality film grain** using just a few lines of JavaScript!

Use this in photo editors, portfolio sites, games, or anywhere you want that nostalgic analog feel.

Happy coding — and enjoy the grain! 🎞️✨
