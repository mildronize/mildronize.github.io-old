---
layout: post
title: React Dark Mode
tags:
  - React
  - Design pattern
  - dark-mode
  - React-hook
  - theme
categories:
  - th
language: th
toc: true
uuid: yvtxh9c
unsplashImgCoverId: c8h0n7fSTqs
---

# Use css

https://github.com/donavon/use-dark-mode

```
body.light-mode {
  background-color: #fff;
  color: #333;
  transition: background-color 0.3s ease;
}
body.dark-mode {
  background-color: #1a1919;
  color: #999;
}
```

Gasby: https://github.com/wKovacs64/gatsby-plugin-use-dark-mode
Nextjs: https://github.com/donavon/use-dark-mode#nextjs

---

https://usehooks.com/useDarkMode/

```js
// Compose our useMedia hook to detect dark mode preference.
// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia

function usePrefersDarkMode() {
  return useMedia<boolean>(["(prefers-color-scheme: dark)"], [true], false);
}
```
