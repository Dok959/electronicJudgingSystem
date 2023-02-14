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
});

export const images = style({
  maxWidth: 'inherit',
  width: '100%',
});
