---
layout: post
title: React Stylesheet
tags:
  - React
  - Design pattern
  - dark-mode
  - React-hook
  - theme
language: th
uuid: p72tqcd
unsplashImgCoverId: L8KQIPCODV8
---

ก่อนอื่นเราต้องมาทำความเข้าใจก่อนว่า ในโลกของแต่งแต้ม Web เราใช้ CSS ในการทำรูปร่าง สีและหน้าตา ถูกมั้ยครับ และในโลกของ React เองก็นำ CSS มาใช้ในหลากหลายวิธีด้วยกัน ซึ่งวิธีได้รับความนิยมคือ

1. CSS
2. CSS Module
3. CSS Preprocessor like sass, less
4. CSS-in-JS

เรามาดูกันเลย!

## 1. CSS

CSS จะถูก import ที่ global ของ HTML เลย หมายถึงทุกๆ Component สามารถเรียกใช้งาน CSS ได้เลย

```css
/* style.css */
body {
  color: red;
}
```

```jsx
// App.jsx
import 'react';
import './style.css';

export default function() {
  return (
      <div>This text is Red</div>
    );
}
```

**ข้อดี**

1. ใช้งานง่าย เริ่มต้นได้เลย

**ข้อเสีย**

1. ไม่มี Scope ของ CSS ให้ จึงทำให้ต้องสร้าง Class แยกตาม Component

## 2. CSS Module

## 3. CSS Preprocessor like sass, less

## 4. CSS-in-JS

### 4.1 Using Style JS Object

```jsx
<div style={{
    color: red
}}>
    This text is red
</div>
```

### 4.1 Using CSS String

@emotion, styled-component


```js
import styled from 'styled-component';

const FontRed = styled.span`
  color: red
`;
```
