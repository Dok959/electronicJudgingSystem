import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const slider = style({
  maxWidth: '1232px',
  maxHeight: '677px',
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