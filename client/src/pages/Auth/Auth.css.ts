import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';

export const mainTitle = style({
  fontFamily: vars.fonts.heading,
  fontWeight: 600,
  fontSize: 28,
  lineHeight: 1.2,
  color: vars.colors.headings.primary,
  textAlign: 'center',
  margin: vars.space.none,
  maxWidth: 530,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: 36,
      maxWidth: 730,
    },
  },
});

export const wrapper = style({
  display: 'grid',
  justifyItems: 'center',
  width: '100%',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '2fr 1fr',
      gap: '40px',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      padding: 24,
      width: 'auto',
    },
    'screen and (min-width: 992px)': {
      padding: 0,
    },
  },
});

export const image = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
      maxWidth: '100%',
      borderRadius: 24,
    },
  },
});

export const formLogin = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'center',
  maxWidth: 230,
  width: '100%',
  position: 'relative',
});

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
});

export const eye = style({
  position: 'absolute',
  top: 129,
  right: -24,
  width: 16,
  cursor: 'pointer',
});

export const input = recipe({
  base: {
    transition: vars.transition.all,
    color: vars.colors.text.primary,
    background: vars.colors.background.primary,
    border: '1.9px solid rgba(36, 41, 61, 0.3)',
    borderRadius: '10px',
    height: '25px',
    padding: '0 8px',
    outline: 'none',
  },

  variants: {
    border: {
      default: {
        borderColor: 'rgba(36, 41, 61, 0.3)',
      },
      error: {
        borderColor: '#a90000',
      },
      success: {
        borderColor: '#00a910',
      },
    },
  },

  defaultVariants: {
    border: 'default',
  },
});

export const infoError = style({
  height: 12,
  fontSize: 10,
  color: '#a90000',
  marginTop: -8,
});

export const button = style({
  outline: 'none',
  fontSize: 20,
  backgroundColor: vars.colors.accent.primary,
  color: '#fff',
  border: 'none',
  boxShadow: '0px 20px 40px -12px rgba(236, 0, 140, 0.35)',
  borderRadius: '10px',
  padding: '18px 32px',
  cursor: 'pointer',
  transition: vars.transition.all,
  position: 'relative',
  height: 60,
  // width: 120,
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
});
