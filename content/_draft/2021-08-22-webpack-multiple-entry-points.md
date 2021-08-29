---
title: Webpack Multiple Entry Points
tags:
  - Webpack
language: en
uuid: j5trzrh
unsplashImgCoverId: oCm8nPkE40k
---

- Setup Webpack สำหรับ Multiple Endpoint สำหรับ React ([https://github.com/mildronize/react-typescript-guidebook](https://github.com/mildronize/react-typescript-guidebook))

# Static Multiple Entry Point
https://github.com/mildronize/blog-jekyll/blob/jekyll/webpack.config.js

```js
module.exports = {
  // ...
  entry: {
    polyfill: 'babel-polyfill',
    index: __dirname + "/src/_assets/index.js",
    toc: __dirname + "/src/_assets/toc.js",
    search: __dirname + "/src/_assets/search.jsx"
  },
  output: {
    path: __dirname + "/src/public/js",
    // ...
  },
  // ...
```

# Dynamic Multiple Entry Point

https://github.com/mildronize/react-typescript-guidebook/blob/main/webpack.config.js

```js
//..

const entries = {};

function* getEntryPoint(step) {
  if (isValidLessonFolder(step)) {
    for (let prefix of ['', 'final/']) {
      for (let suffix of ['.js', '.jsx', '.ts', '.tsx']) {
        const entryRequest = `./${step}/${prefix}src/index${suffix}`;
        if (fs.existsSync(entryRequest)) {
          yield entryRequest;
        }
      }
    }
  }

  return false;
}

fs.readdirSync('./').filter(step => {
  let isEntryPoint = false;

  for (let entryPoint of getEntryPoint(step)) {
    if (entryPoint) {
      entries[entryPoint.replace(/\/src\/index.*/, '').replace(/^\.\//, '')] = entryPoint;
      isEntryPoint = true;
    }
  }

  if (!isEntryPoint && isValidLessonFolder(step)) {
    nonWebpackedEntries.push(step);
  }
});

module.exports = function (env, argv) {
  return {
    entry: { ...entries },
    //..
  }
}

```

Original Author: https://github.com/microsoft/frontend-bootcamp
