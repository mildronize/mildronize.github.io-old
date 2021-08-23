// Ref: BooGi

const breakpointsInt = {
  mobile: 768,
  desktop: 1170,
} as Record<string, number>;

const breakpoints: Record<string, string> = {};

Object.keys(breakpointsInt).map(function (key, index) {
  breakpoints[key] = breakpointsInt[key] + 'px';
});

const checkViewport = (maxValue: number) => {
  if (typeof document !== `undefined`) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return vw <= maxValue;
  }
  return false;
};

// For JS

export const isMobile = () => checkViewport(breakpointsInt.mobile);
export const isDesktop = () => checkViewport(breakpointsInt.desktop);

// For CSS media query

const mq = Object.values(breakpoints).map((bp) => `@media (max-width: ${bp})`);
export const onMobile = mq[0];
export const onDesktop = mq[1];
