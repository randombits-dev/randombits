---
title: "Creating an inset effect with HTML canvas"
summary: "Learn how to draw an inner shadow and bevel effect with HTML canvas using masks, blur, and compositing."
desc: "A practical guide to creating a reusable inset effect with HTML canvas, including inner shadows, highlights, and a complete working example."
updated: 2026-09-04
tags: ["javascript", "canvas"]
draft: true
---

## Overview

An inset effect makes a shape look pressed into the surface behind it. It is commonly created with an inner shadow along the shape's edges, sometimes combined with a subtle highlight to make the edge look beveled.

CSS can create an inset shadow with `box-shadow: inset`, but canvas does not have a built-in inner-shadow operation. The solution is to:

1. Draw a mask describing the shape.
2. Create a blurred shadow around that shape.
3. Keep only the blurred pixels inside the mask.
4. Draw the result over the original shape.

This technique works with rectangles, rounded rectangles, circles, and custom paths.

## See the effect

These live examples are rendered with HTML canvas. The first uses a dark inner shadow, while the second adds a light highlight to create a beveled edge.

<div class="inset-demos">
  <figure>
    <canvas class="inset-demo" data-inset-demo="shadow" width="520" height="300"></canvas>
    <figcaption>Inner shadow</figcaption>
  </figure>
  <figure>
    <canvas class="inset-demo" data-inset-demo="bevel" width="520" height="300"></canvas>
    <figcaption>Inner shadow and highlight</figcaption>
  </figure>
</div>

<script>
  const drawInsetDemo = (canvas, bevel) => {
    const context = canvas.getContext("2d");
    const drawShape = (target) => {
      target.beginPath();
      target.roundRect(80, 55, 360, 190, 30);
    };

    context.fillStyle = "#d7dce2";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#cbd1d8";
    drawShape(context);
    context.fill();

    const drawEffect = ({color, blur, offsetX = 0, offsetY = 0}) => {
      const mask = document.createElement("canvas");
      const effect = document.createElement("canvas");
      mask.width = effect.width = canvas.width;
      mask.height = effect.height = canvas.height;

      const maskContext = mask.getContext("2d");
      const effectContext = effect.getContext("2d");

      maskContext.fillStyle = "#fff";
      drawShape(maskContext);
      maskContext.fill();

      effectContext.shadowColor = color;
      effectContext.shadowBlur = blur;
      effectContext.shadowOffsetX = offsetX;
      effectContext.shadowOffsetY = offsetY;
      effectContext.fillStyle = "#000";
      drawShape(effectContext);
      effectContext.fill();

      // Clear the shadow before erasing the solid shape.
      effectContext.shadowColor = "transparent";
      effectContext.shadowBlur = 0;
      effectContext.shadowOffsetX = 0;
      effectContext.shadowOffsetY = 0;
      effectContext.globalCompositeOperation = "destination-out";
      drawShape(effectContext);
      effectContext.fill();

      effectContext.globalCompositeOperation = "destination-in";
      effectContext.drawImage(mask, 0, 0);
      context.drawImage(effect, 0, 0);
    };

    drawEffect({
      color: "rgba(52, 61, 73, 0.78)",
      blur: 32,
    });

    if (bevel) {
      drawEffect({
        color: "rgba(255, 255, 255, 0.72)",
        blur: 24,
        offsetX: -8,
        offsetY: -8,
      });
    }
  };

  document.querySelectorAll("[data-inset-demo]").forEach((canvas) => {
    drawInsetDemo(canvas, canvas.dataset.insetDemo === "bevel");
  });
</script>

## Set up the canvas

Start with a canvas and a background. The example uses a rounded rectangle as the shape that will appear pressed into the page.

```html
<canvas id="canvas" width="800" height="500"></canvas>

<script>
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#d7dce2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function drawCard(context) {
    context.beginPath();
    context.roundRect(200, 130, 400, 240, 28);
  }

  ctx.fillStyle = "#cbd1d8";
  drawCard(ctx);
  ctx.fill();
</script>
```

`drawCard` only creates the path. Keeping the path construction in a function lets us reuse the exact same shape for the mask and the effect.

## Create an inner shadow

The following helper creates a shadow layer in an offscreen canvas. The shadow is blurred around the outside of the shape, then the shape itself is removed from that layer. What remains is the blurred edge. Finally, the mask clips that edge so only the part inside the shape is retained.

```js
function drawInsetShadow(context, drawShape, options = {}) {
  const {
    color = "rgba(70, 78, 88, 0.45)",
    blur = 24,
    offsetX = 0,
    offsetY = 0,
  } = options;

  const {width, height} = context.canvas;
  const mask = document.createElement("canvas");
  const effect = document.createElement("canvas");

  mask.width = width;
  mask.height = height;
  effect.width = width;
  effect.height = height;

  const maskContext = mask.getContext("2d");
  const effectContext = effect.getContext("2d");

  // The mask is opaque wherever the shape exists.
  maskContext.fillStyle = "#fff";
  drawShape(maskContext);
  maskContext.fill();

  // Draw a blurred version of the shape.
  effectContext.shadowColor = color;
  effectContext.shadowBlur = blur;
  effectContext.shadowOffsetX = offsetX;
  effectContext.shadowOffsetY = offsetY;
  effectContext.fillStyle = "#000";
  drawShape(effectContext);
  effectContext.fill();

  // Remove the solid shape, leaving only its blurred shadow.
  effectContext.shadowColor = "transparent";
  effectContext.shadowBlur = 0;
  effectContext.shadowOffsetX = 0;
  effectContext.shadowOffsetY = 0;
  effectContext.globalCompositeOperation = "destination-out";
  drawShape(effectContext);
  effectContext.fill();

  // Keep only the shadow pixels inside the original shape.
  effectContext.globalCompositeOperation = "destination-in";
  effectContext.drawImage(mask, 0, 0);

  context.drawImage(effect, 0, 0);
}
```

The important part is `destination-in`. It keeps the existing pixels only where the mask is opaque. Since the mask contains the card shape, the outside half of the blurred shadow is discarded and the inside half becomes an inset shadow.

Now call the helper after drawing the card:

```js
drawInsetShadow(ctx, drawCard, {
  color: "rgba(70, 78, 88, 0.5)",
  blur: 26,
});
```

## Add a highlight for a bevel

An inset shadow alone creates a pressed appearance. A second, lighter shadow on the opposite side adds a subtle bevel and makes the effect easier to see.

```js
drawInsetShadow(ctx, drawCard, {
  color: "rgba(255, 255, 255, 0.55)",
  blur: 18,
  offsetX: -6,
  offsetY: -6,
});
```

The negative offset places the highlight toward the upper-left edge, while the dark shadow remains strongest toward the lower-right edge. Reduce both opacities for a softer result.

## Complete example

This is the complete example assembled into one page:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Canvas inset effect</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #d7dce2;
      }

      canvas {
        width: min(800px, 90vw);
        height: auto;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="800" height="500"></canvas>

    <script>
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");

      function drawCard(context) {
        context.beginPath();
        context.roundRect(200, 130, 400, 240, 28);
      }

      function drawInsetShadow(context, drawShape, options = {}) {
        const {
          color = "rgba(70, 78, 88, 0.45)",
          blur = 24,
          offsetX = 0,
          offsetY = 0,
        } = options;

        const mask = document.createElement("canvas");
        const effect = document.createElement("canvas");
        mask.width = effect.width = context.canvas.width;
        mask.height = effect.height = context.canvas.height;

        const maskContext = mask.getContext("2d");
        const effectContext = effect.getContext("2d");

        maskContext.fillStyle = "#fff";
        drawShape(maskContext);
        maskContext.fill();

        effectContext.shadowColor = color;
        effectContext.shadowBlur = blur;
        effectContext.shadowOffsetX = offsetX;
        effectContext.shadowOffsetY = offsetY;
        effectContext.fillStyle = "#000";
        drawShape(effectContext);
        effectContext.fill();

        effectContext.shadowColor = "transparent";
        effectContext.shadowBlur = 0;
        effectContext.shadowOffsetX = 0;
        effectContext.shadowOffsetY = 0;
        effectContext.globalCompositeOperation = "destination-out";
        drawShape(effectContext);
        effectContext.fill();

        effectContext.globalCompositeOperation = "destination-in";
        effectContext.drawImage(mask, 0, 0);
        context.drawImage(effect, 0, 0);
      }

      ctx.fillStyle = "#d7dce2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#cbd1d8";
      drawCard(ctx);
      ctx.fill();

      drawInsetShadow(ctx, drawCard, {
        color: "rgba(70, 78, 88, 0.5)",
        blur: 26,
      });

      drawInsetShadow(ctx, drawCard, {
        color: "rgba(255, 255, 255, 0.55)",
        blur: 18,
        offsetX: -6,
        offsetY: -6,
      });
    </script>
  </body>
</html>
```

## Performance considerations

The helper creates two offscreen canvases every time it runs. That is convenient for a small illustration, but it is unnecessary work if the effect is rendered repeatedly in an animation.

For an animated canvas:

- Create the mask and effect canvases once and reuse them.
- Redraw only when the shape or its settings change.
- Keep the offscreen canvases at the canvas's internal pixel size, not its CSS display size.
- Avoid very large `shadowBlur` values when many shapes are being rendered.

For high-DPI canvases, scale the canvas context before drawing and multiply the shape coordinates, blur, and offsets by the device-pixel ratio. Otherwise, the effect may look softer than the rest of the illustration.

The same helper can be used with any path. Replace `drawCard` with a function that draws a circle, polygon, or custom `Path2D`, and the inset effect will follow that shape automatically.

<style>
  .inset-demos {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }

  .inset-demos figure {
    margin: 0;
  }

  .inset-demo {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-2);
  }

  .inset-demos figcaption {
    margin-top: 0.6rem;
    color: var(--color-muted);
    font-size: var(--font-size-caption);
    text-align: center;
  }

  @media (max-width: 640px) {
    .inset-demos {
      grid-template-columns: 1fr;
    }
  }
</style>
