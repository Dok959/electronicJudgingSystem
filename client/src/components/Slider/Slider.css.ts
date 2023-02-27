import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/index';

export const slider = style({
  maxWidth: '1232px',
  maxHeight: '677px',
  borderRadius: vars.borderRadius.image,
});

export const dotSize = style({
  width: '16px',
  height: '16px',
  fill: vars.colors.accent.secondary,
  selectors: {
    [`.active &`]: {
      fill: vars.colors.accent.primary,
    },
  },
  '@media': {
    'screen and (min-width: 768px)': {
      width: 20,
      height: 20,
    },
  },
});

export const images = style({
  maxWidth: 'inherit',
  width: '100%',
});

export const button = style({
  padding: 0,
  transition: vars.transition.all,
  boxShadow: 'none',
  borderColor: 'rgba(236, 0, 140, 0)',
  borderWidth: 0,
  borderStyle: 'solid',
  borderRadius: '50%',
  outline: '5px solid rgba(236, 0, 140, 0)',
  display: 'flex',
  selectors: {
    [`&:focus`]: {
      outlineColor: 'rgba(236, 0, 140, 0.2)',
    },
  },
});
