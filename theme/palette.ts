export const palette = {
  background: {
    base: '#0e1116',
    elevated: 'rgba(17, 24, 39, 0.62)',
    subtle: 'rgba(148, 163, 184, 0.08)',
  },
  gradients: {
    primary: ['#7bc8ff', '#9ea7ff', '#7af7f2'],
    accent: ['#93f5ff', '#79b8ff'],
    warm: ['#fcd29f', '#ff9f7a'],
  },
  border: {
    strong: 'rgba(255, 255, 255, 0.18)',
    soft: 'rgba(255, 255, 255, 0.08)',
  },
  text: {
    primary: '#f8fafc',
    secondary: '#bfc6d5',
    muted: '#7f8da5',
    positive: '#7df8c6',
    warning: '#ffd580',
    critical: '#ff8f8f',
  },
  intent: {
    primary: '#9ea7ff',
    accent: '#7af7f2',
    success: '#4ade80',
    info: '#60a5fa',
    warning: '#fbbf24',
    danger: '#f97373',
  },
};

export type Palette = typeof palette;
