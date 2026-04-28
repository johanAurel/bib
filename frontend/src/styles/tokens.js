export const colors = {
  black: '#0a0e27',
  white: '#F5F2EC',
  gold: '#C9A84C',
  goldLight: '#E2C97A',
  blue: '#0066FF',
  blueDark: '#004FCC',
  blueLight: '#3385FF',
  slate: '#1A1A1E',
  slateLight: '#2A2A30',
  muted: '#6B6B6B',
  error: '#E74C3C',
  success: '#27AE60',
}

export const fonts = {
  display: "'Playfair Display', serif",
  body: "'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
}

export const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  inOut: [0.43, 0.13, 0.23, 0.96],
  out: [0.22, 1, 0.36, 1],
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const Typography = {
  h1: {
    fontFamily: fonts.display,
    fontSize: 72,
    fontWeight: 900,
    lineHeight: 1.1,
    letterSpacing: -2,
  },
  h2: {
    fontFamily: fonts.display,
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: fonts.display,
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.3,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.6,
  },
  bodySmall: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.6,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
}

export const Button = {
  primary: {
    padding: '12px 32px',
    backgroundColor: colors.gold,
    color: colors.black,
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  secondary: {
    padding: '12px 32px',
    backgroundColor: 'transparent',
    color: colors.white,
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: 600,
    border: `2px solid ${colors.white}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}
