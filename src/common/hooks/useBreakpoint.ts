type UseBreakpointConfig = Record<number, any>;

export const useBreakpoint = (config: UseBreakpointConfig) => {
  const screenWidth = document.documentElement.clientWidth;

  for (const [breakpoint, value] of Object.entries(config).sort((a, b) => +b[0] - +a[0])) {
    if (screenWidth > +breakpoint) return value;
  }
};
