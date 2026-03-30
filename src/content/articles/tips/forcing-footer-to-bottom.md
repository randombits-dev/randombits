---
title: "Forcing a footer to the bottom of the page"
summary: "An easy way to force a footer to the bottom of the page"
desc: "An easy way to force a footer to the bottom of the page"
updated: 2024-03-20
tags: [ ]
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
<main>Main content</main>
<footer>Footer</footer>
</body>

<style>
  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
  }
</style>
```

## Tailwind example

```html

<body class="margin-0 flex flex-col min-h-screen justify-between">
<main>Main content</main>
<footer>Footer</footer>
</body>
```

## Demo

In this example, there is empty space, and the footer is pushed to the bottom.

<iframe id="example1" style="border: 1px solid black; border-radius: 10px; background-color: white;" height="200px">
</iframe>

<script>
document.getElementById('example1').srcdoc = `
<html>
  <body>
<main>Main content</main>
<footer>Footer</footer>
</body>

<style>
  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
  }
main,footer {
padding: 10px;
}
footer {
border-top: 1px solid black;
}
</style>
</html>
`;
</script>

## Demo with scroll

In this example, the page is filled with content, and a scrollbar is visible. The footer appears at the end of the content.

<iframe id="example2" style="border: 1px solid black; border-radius: 10px; background-color: white;" height="200px">
</iframe>

<script>
document.getElementById('example2').srcdoc = `
<html>
  <body>
<main>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis

</main>
<footer>Footer</footer>
</body>

<style>
  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
  }
main,footer {
padding: 10px;
}
footer {
border-top: 1px solid black;
}
</style>
</html>
`;
</script>
