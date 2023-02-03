import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';
// https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
export const position = style({
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  cursor: 'pointer',
  zIndex: 10,
  paddingRight: '24px',
  position: 'fixed',
});

export const active = style({
  width: '100%',
  height: '500px',
  display: 'block',
  backgroundColor: vars.colors.backgroundSecondary,
});

export const listLinks = recipe({
  base: {
    listStyle: 'none',
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
  },

  defaultVariants: {
    color: 'primary',
  },
});

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
  width: '300px',
  height: '300px',
  background: `url(/images/CloseIcon.svg) no-repeat`,
});
