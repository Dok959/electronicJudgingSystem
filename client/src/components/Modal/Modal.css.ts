import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme';

export const window = style({
  position: 'absolute',
  background: '#056',
  width: 300,
  height: 300,
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
});
