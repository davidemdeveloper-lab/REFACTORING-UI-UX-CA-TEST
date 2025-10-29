export const tokens = {
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    glass: 24
  },
  shadows: {
    soft: '0 2px 10px rgba(0,0,0,0.15)',
    glass: '0 8px 30px rgba(16,24,40,0.35)'
  },
  blurs: {
    xs: '4px',
    sm: '8px',
    md: '12px'
  },
  surfaces: {
    glassPanel: {
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderColor: 'rgba(255,255,255,0.12)',
      backdropBlur: '12px'
    }
  },
  gradients: {
    metalSheen: 'linear-gradient(135deg, #1C2329 0%, #2B3640 100%)',
    cobaltTeal: 'linear-gradient(135deg, #3B82F6 0%, #14D5DB 100%)'
  }
} as const;
