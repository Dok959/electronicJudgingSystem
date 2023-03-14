import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';

export const wrapper = style({
  width: '100%',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  '@media': {
    'screen and (min-width: 768px)': {
      gap: 24,
    },
  },
});

export const heading = style({
  margin: 0,
  fontSize: 20,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'center',
  maxWidth: 327,
  width: '100%',
  position: 'relative',
});

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
});

export const input = recipe({
  base: {
    transition: vars.transition.all,
    color: vars.colors.text.primary,
    background: vars.colors.background.primary,
    border: '1.9px solid rgba(36, 41, 61, 0.3)',
    borderRadius: vars.borderRadius.default,
    height: '25px',
    padding: '0 8px',
    outline: 'none',
    fontSize: 14,
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

export const button = recipe({
  base: {
    outline: 'none',
    fontSize: 20,
    boxShadow: vars.shadow.buttonActive,
    borderRadius: vars.borderRadius.default,
    padding: '18px 32px',
    cursor: 'pointer',
    transition: vars.transition.all,
    position: 'relative',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    selectors: {
      '&:hover': {
        boxShadow: 'none',
      },
    },
  },

  variants: {
    type: {
      primary: {
        backgroundColor: vars.colors.accent.primary,
        color: vars.colors.background.primary,
        border: 'none',
      },
      secondary: {
        backgroundColor: vars.colors.background.primary,
        color: vars.colors.text.secondary,
        border: '1.9px solid',
        borderColor: vars.colors.accent.primary,
        height: 'auto',
        padding: '12px 20px',
        marginTop: 20,
      },
    },
  },

  defaultVariants: {
    type: 'primary',
  },
});

export const container = style({
  display: 'flex',
  gap: 16,
  alignItems: 'baseline',
  width: '100%',
  justifyItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  flexDirection: 'row',
});

export const item = style({
  margin: 0,
});

export const inputRadio = style({
  selectors: {
    '&:not(:checked), &:checked': {
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
    },
  },
});

export const labelRadio = style({
  position: 'relative',
  cursor: 'pointer',
  paddingRight: 30,
  selectors: {
    [`${inputRadio}+&::after`]: {
      content: '',
      position: 'absolute',
      right: 0,
      width: 19,
      height: 19,
      border: '1px solid',
      borderColor: vars.colors.accent.primary,
      background: vars.colors.background.primary,
      borderRadius: '50%',
      transition: vars.transition.all,
    },
    [`${inputRadio}:checked+&::after`]: {
      background: vars.colors.accent.primary,
    },
    [`${inputRadio}:disabled+&::after`]: {
      boxShadow: 'none',
      borderColor: '#bbb',
      backgroundColor: '#e9e9e9',
    },
    [`${inputRadio}:disabled+&`]: {
      color: '#aaa',
    },
    [`${inputRadio}:focus+&::after`]: {
      boxShadow: '0 0 0 6px rgba(236, 0, 140, 0.2)',
    },
  },
});
