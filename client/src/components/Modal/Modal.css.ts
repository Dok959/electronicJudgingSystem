import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme';

export const wrapper = style({
  position: 'absolute',
  backgroundColor: 'rgba(154, 170, 207, 0.35)',
  width: '100%',
  height: '100%',
  zIndex: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const window = style({
  backgroundColor: vars.colors.background.primary,
  minWidth: 320,
  maxWidth: 500,
  maxHeight: 500,
  padding: 24,
  position: 'relative',
  borderRadius: vars.borderRadius.default,
});

export const alert = recipe({
  base: {
    position: 'absolute',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 70,
    right: 30,
    border: '2.5px solid #fff',
    borderRadius: vars.borderRadius.default,
    transition: vars.transition.all,
    boxShadow: vars.shadow.default,
    padding: 16,
    gap: 8,
    backgroundColor: vars.colors.background.primary,
    zIndex: 10,
  },

  variants: {
    border: {
      default: {
        borderColor: 'transparent',
      },
      error: {
        borderColor: '#a90000',
      },
      warning: {
        borderColor: '#FF9900',
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

export const text = style({
  margin: 0,
});

export const close = style({
  margin: 0,
  background: 'transparent',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  position: 'absolute',
  top: 24,
  right: 24,
});

export const form = style({
  display: 'grid',
  justifyItems: 'center',
  padding: '24px 0 0',
});

export const content = style({
  width: '100%',
  overflowY: 'scroll',
  height: 'inherit',
  maxHeight: 300,
  paddingLeft: 10,
  boxSizing: 'border-box',
  marginRight: 10,
});

export const input = style({
  selectors: {
    '&:not(:checked), &:checked': {
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
    },
  },
});

export const label = style({
  position: 'relative',
  paddingLeft: 30,
  cursor: 'pointer',
  selectors: {
    [`${input}+&::before`]: {
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
    [`${input}:checked+&::before`]: {
      background: vars.colors.accent.primary,
    },
    [`${input}:disabled+&::before`]: {
      boxShadow: 'none',
      borderColor: '#bbb',
      backgroundColor: '#e9e9e9',
    },
    [`${input}:disabled+&`]: {
      color: '#aaa',
    },
    [`${input}:focus+&::before`]: {
      boxShadow: '0 0 0 6px rgba(236, 0, 140, 0.2)',
    },
  },
});

export const button = style({
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
  backgroundColor: vars.colors.accent.primary,
  color: vars.colors.background.primary,
  border: 'none',
});
