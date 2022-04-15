// Ref More: https://thadaw.com/s/ne5q3pt/
import { useMediaQuery } from 'react-responsive';

const breakpoints: Record<string, number> = {
  extraSmall: 460,
  small: 768,
  large: 1170,
};

// For JS
export function useResponsive() {
  const isExtraSmallMobile = useMediaQuery({ maxWidth: breakpoints.extraSmall })
  const isMobile = useMediaQuery({ maxWidth: breakpoints.small })
  const isTablet = useMediaQuery({
    minWidth: breakpoints.small + 1,
    maxWidth: breakpoints.large - 1 })
  const isDesktop = useMediaQuery({ minWidth: breakpoints.large })
  return { isExtraSmallMobile, isMobile, isTablet, isDesktop};
}

// For CSS media query
const mediaQuery = (bp: number) => `@media (max-width: ${bp}px)`;
export const onSmallMobile = mediaQuery(breakpoints.extraSmall);
export const onMobile = mediaQuery(breakpoints.small);
export const onTablet = mediaQuery(breakpoints.large);

console.log(onSmallMobile)
