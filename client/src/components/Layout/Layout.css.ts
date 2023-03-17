import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';

export const wrapper = style({
  height: '100%',
  background: vars.colors.background.primary,
  maxWidth: 1280,
  width: '100%',
  position: 'relative',
});

export const container = style({
  background: vars.colors.background.primary,
  maxWidth: 1280,
  display: 'grid',
  justifyItems: 'center',
  gap: '24px 0',
  padding: '24px',
  position: 'relative',
  minHeight: ['100vh', '-webkit-fill-available'],
});

export const button = style({
  right: 20,
  bottom: 20,
  width: 40,
  height: 40,
  backgroundColor: vars.colors.accent.primary,
  position: 'absolute',
  display: 'none', //'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 10,
  borderRadius: vars.borderRadius.default,
  transition: vars.transition.all,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.accent.secondary,
    },
  },
});

export const bar = recipe({
  base: {
    display: 'block',
    width: 20,
    height: 3,
    backgroundColor: vars.colors.background.primary,
    borderRadius: '8px',
    transition: vars.transition.all,
  },

  variants: {
    line: {
      top: {
        transform: 'rotate(90deg)',
      },
      bottom: {
        marginTop: '-3px',
      },
    },
  },
});
