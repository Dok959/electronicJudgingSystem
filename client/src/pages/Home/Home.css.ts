import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/index';

export const heading = style({
  margin: 0,
  fontSize: 20,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
});

export const link = style({
  fontWeight: 400,
  color: vars.colors.text.primary,
  fontSize: 16,
  lineHeight: '24px',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '12px',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
      width: 'inherit',
    },
    '&:after': {
      content: ' ',
      display: 'block',
      color: vars.colors.accent.primary,
      width: '0',
      height: 2,
      backgroundColor: vars.colors.accent.primary,
      transition: vars.transition.width,
    },
    '&:hover:after': {
      width: '100%',
    },
  },
  '@media': {
    'screen and (min-width: 768px)': {
      padding: 0,
    },
    '(prefers-reduced-motion)': {
      transitionProperty: 'color',
    },
  },
});
