import { config as baseConfig } from '@gluestack-ui/config';

const extendedColors = {
  ...baseConfig.tokens?.colors,
  brandPrimary: '#4F8CFF',
  brandPrimarySoft: '#8CB6FF',
  brandSecondary: '#70D6FF',
  brandAccent: '#FFB347',
  brandSurface: '#0F172A',
  brandSurfaceMuted: '#16213F',
  brandGlassLight: 'rgba(255, 255, 255, 0.55)',
  brandGlassDark: 'rgba(15, 23, 42, 0.72)',
  successGlass: 'rgba(34, 197, 94, 0.18)',
  warningGlass: 'rgba(249, 115, 22, 0.18)',
  infoGlass: 'rgba(59, 130, 246, 0.18)',
};

const extendedRadii = {
  ...baseConfig.tokens?.radii,
  xl: 20,
  '2xl': 28,
  full: 999,
};

const extendedOpacity = {
  ...baseConfig.tokens?.opacity,
  15: 0.15,
};

export const metalGlassyConfig = {
  ...baseConfig,
  tokens: {
    ...baseConfig.tokens,
    colors: extendedColors,
    radii: extendedRadii,
    opacity: extendedOpacity,
    fonts: {
      ...baseConfig.tokens?.fonts,
      heading: 'var(--font-serif)',
      body: 'var(--font-sans)',
      mono: 'var(--font-mono)',
    },
  },
};
