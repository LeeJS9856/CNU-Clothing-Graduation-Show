
export const BREAKPOINTS = {
  mobile: 768,
  desktop: 1024,
} as const;

export const DEVICE_QUERY = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
} as const;
