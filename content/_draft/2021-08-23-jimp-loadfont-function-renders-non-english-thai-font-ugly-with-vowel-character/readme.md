---
title: >-
  jimp.loadFont function renders non-English (Thai) font ugly with vowel
  character
tags:
  - jimp
  - nodejs
  - fonts
  - non-english
language: en
uuid: k9xf79y
unsplashImgCoverId: eygpU6KfOBk
---


# Background

I've used Gatsby plugin to generate image using the font typing [source](https://github.com/plahteenlahti/gatsby-social-cards/blob/master/plugins/gatsby-plugin-social-sharing-cards/index.js), which is a simple node.js code.

```js
// ...
const titleFont = await jimp.loadFont(`${__dirname}/fonts/Title.fnt`)
// ...
```

This code use **montserrat** font from Google font, which is converted from `.ttf` to Bitmap (`.fnt`)

The tools is used to convert can be:
- <https://ttf2fnt.com/>
- [Hiero](https://github.com/libgdx/libgdx/wiki/Hiero)

So, the original code support image render properly, as you can see in my text `เราควรเพิ่มประสิทธิภาพของ Single Page Application โดยใช้ Server-side Rendering (SSR) หรือไม่`. This text is consist of Thai and English, and the rendered image show the expected result.

![Rendered Image from montserrat font][1]

Thai font will be `?` symbol.

# Thai font problem

I'ved used **IBMPlexSansThai-Medium** font from Google font. and use [Hiero](https://github.com/libgdx/libgdx/wiki/Hiero) to convert the `.ttf` to `.fnt` file.

The result is ugly when display vowel following the screenshot below:

![Rendered Image from IBMPlexSansThai font][2]

Could anyone help me to solve this problem?

Thank you very much.


  [1]: ./montserrat.png
  [2]: ./IBMPlexSansThai.png
