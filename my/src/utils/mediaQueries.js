const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px'
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  mobileUp: `@media (min-width: ${breakpoints.mobile})`,
  tabletUp: `@media (min-width: ${breakpoints.tablet})`,
  laptopUp: `@media (min-width: ${breakpoints.laptop})`,
  desktopUp: `@media (min-width: ${breakpoints.desktop})`
}; 