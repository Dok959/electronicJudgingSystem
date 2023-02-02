import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../theme.css';
import { style } from '@vanilla-extract/css';

export const link = recipe({
  base: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '24px',
    textDecoration: 'none',
    display: 'inline-block',
    selectors: {
      '&:hover': {
        cursor: 'pointer',
      },
      '&:after': {
        content: ' ',
        display: 'block',
        color: vars.colors.accentSecondary,
        width: '0',
        height: 2,
        backgroundColor: vars.colors.accentSecondary,
        transition: vars.transition.width,
      },
      '&:hover:after': {
        width: '100%',
      },
    },
    '@media': {
      'screen and (min-width: 768px)': {
        padding: 100,
      },
      '(prefers-reduced-motion)': {
        transitionProperty: 'color',
      },
    },
  },

  variants: {
    color: {
      primary: {
        color: vars.colors.text.normal,
        selectors: {
          '&:hover': {
            width: 'inherit',
          },
        },
      },
      secondary: {
        color: vars.colors.accentSecondary,
        selectors: {
          '&:hover': {
            width: 'inherit',
          },
        },
      },
    },
    size: {
      small: { padding: vars.space.small },
      medium: { padding: vars.space.medium },
      large: { padding: vars.space.large },
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'large',
  },
});

export const Burger = style({
  width: '30px',
  height: '30px',
  backgroundImage: 'url("./img/CloseIcon.svg")',
});
