import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';

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

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gap: 16,
  alignItems: 'baseline',
  width: '100%',
  justifyItems: 'center',
});

export const item = style({
  margin: 0,
});

export const ranks = style({
  margin: 0,
  padding: 8,
});

export const inputCheckbox = style({
  selectors: {
    '&:not(:checked), &:checked': {
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
    },
  },
});

export const labelCheckbox = recipe({
  base: {
    position: 'relative',
    cursor: 'pointer',
  },
  variants: {
    type: {
      default: {
        paddingLeft: 30,
        selectors: {
          [`${inputCheckbox}+&::before`]: {
            content: '',
            position: 'absolute',
            left: 0,
            width: 19,
            height: 19,
            border: '1px solid',
            borderColor: vars.colors.accent.primary,
            background: vars.colors.background.primary,
            borderRadius: 4,
            transition: vars.transition.all,
          },
          [`${inputCheckbox}:checked+&::before`]: {
            background: vars.colors.accent.primary,
          },
          [`${inputCheckbox}:disabled+&::before`]: {
            boxShadow: 'none',
            borderColor: '#bbb',
            backgroundColor: '#e9e9e9',
          },
          [`${inputCheckbox}:disabled+&`]: {
            color: '#aaa',
          },
          [`${inputCheckbox}:focus+&::before`]: {
            boxShadow: '0 0 0 6px rgba(236, 0, 140, 0.2)',
          },
        },
      },
      right: {
        paddingRight: 30,
        selectors: {
          [`${inputCheckbox}+&::after`]: {
            content: '',
            position: 'absolute',
            right: 0,
            width: 19,
            height: 19,
            border: '1px solid',
            borderColor: vars.colors.accent.primary,
            background: vars.colors.background.primary,
            borderRadius: 4,
            transition: vars.transition.all,
          },
          [`${inputCheckbox}:checked+&::after`]: {
            background: vars.colors.accent.primary,
          },
          [`${inputCheckbox}:disabled+&::after`]: {
            boxShadow: 'none',
            borderColor: '#bbb',
            backgroundColor: '#e9e9e9',
          },
          [`${inputCheckbox}:disabled+&`]: {
            color: '#aaa',
          },
          [`${inputCheckbox}:focus+&::after`]: {
            boxShadow: '0 0 0 6px rgba(236, 0, 140, 0.2)',
          },
        },
      },
    },
  },

  defaultVariants: {
    type: 'default',
  },
});

export const wrapperItems = style({
  display: 'grid',
  width: '60%',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
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

export const subTitle = style({
  textDecoration: 'none',
  cursor: 'pointer',
  fontSize: 18,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
  margin: 0,
});
