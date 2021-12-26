---
title: shortcut CSS-in-JS responsive
uuid: ne5q3pt
tags:
  - Responsive
  - React
  - css-in-js
unsplashImgCoverId: iFSvn82XfGo
---

# Intro

use `react-responsive` hook for detecting change of window size

Read more: https://github.com/contra/react-responsive#easy-mode

```ts
// responsive.ts
import { useMediaQuery } from 'react-responsive';

const breakpoints: Record<string, number> = {
  small: 768,
  large: 1170,
};

// For JS
export function useResponsive() {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.small })
  const isTablet = useMediaQuery({
    minWidth: breakpoints.small + 1,
    maxWidth: breakpoints.large - 1 })
  const isDesktop = useMediaQuery({ minWidth: breakpoints.large })
  return { isMobile, isTablet, isDesktop};
}

// For CSS media query
const mediaQuery = (bp: number) => `@media (max-width: ${bp}px)`;
export const onMobile = mediaQuery(breakpoints.small);
export const onTablet = mediaQuery(breakpoints.large);

```


# Usage

```tsx
import styled from "styled-components";
import { onMobile, useResponsive } from "./responsive";

function Component() {
  const { isMobile } = useResponsive();
  return (
    <div>
      {isMobile && 'Here is on mobile'}
      <RedText></RedText>
    </div>
  )
}

const RedText = styled.div`
  ${onMobile} {
    color: red;
  }
`;

export default Component;
```
