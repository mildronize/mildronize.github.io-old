---
title: gatsby-thai-font-sharing-social
tags:
  - gatsby
language: en
uuid: p96v4ze
unsplashImgCoverId: 2zhWNOQFlf4
---

![](hiero.png)

```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
1234567890
"!`?'.,;:()[]{}<>|/@\^$-%+=#_&~*
กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบป
ผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู฿เแโใไๅๆ็่้๊๋์ํ๎๏
๐๑๒๓๔๕๖๗๘๙๚๛
```

https://r12a.github.io/uniview/?block=thai#title

# Blog
- https://tkplaceholder.io/how-to-automate-social-cards-for-your-gatsby-blog/
- https://codeburst.io/how-to-automate-social-sharing-cards-on-your-gatsby-blog-77a356a58b38
- https://www.hoshki.me/blog/2020-10-10-how-to-add-twitter-cards-to-your-gatsby-site/
- https://github.com/plahteenlahti/gatsby-social-cards


.fnt format
https://www.angelcode.com/products/bmfont/doc/file_format.html


https://fontforge.org/en-US/

https://github.com/oliver-moran/jimp/tree/master/packages/plugin-print

https://linux.thai.net/pub/thailinux/software/fonts-tlwg/webfonts/


# unicode
- https://unicode-table.com/th/0E48/
- https://unicode.org/charts/PDF/U0E00.pdf

# Possible Solution

- Project
  - Automate Remapping `.fnt` file
- Method:
  - use `kerning`

```
The kerning information is used to adjust the **distance between certain characters**, e.g. some characters should be placed closer to each other than others.

first	The first character id.
second	The second character id.
amount	How much the x position should be adjusted when drawing the second character immediately following the first.
```
