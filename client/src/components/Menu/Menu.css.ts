import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const container = style({
  top: '0',
  width: '100%',
  position: 'fixed',
  background: vars.colors.backgroundSecondary,
  '@media': {
    'screen and (min-width: 768px)': {
      width: '50%',
      margin: 'auto',
    },
  },
});

export const navbar = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'center',
  flexWrap: 'wrap',
  padding: '24px',
  margin: '0 24px',
  '@media': {
    'screen and (min-width: 768px)': {
      width: '50%',
      margin: 'auto',
    },
  },
});

export const listLinks = recipe({
  base: {
    listStyle: 'none',
    margin: '0',
    padding: '24px 0 24px 24px',
    transform: 'translateY(-120%)',
    transition: vars.transition.all,
    selectors: {
      '&:hover': {
        width: 'inherit',
      },
    },
    '@media': {
      'screen and (min-width: 768px)': {
        padding: 100,
      },
    },
  },

  variants: {
    color: {
      primary: {
        color: vars.colors.text.normal,
      },
      secondary: {
        color: vars.colors.accentSecondary,
      },
    },
    isOpen: {
      open: {
        transform: 'translateY(0%)',
      },
      close: {
        transform: 'translateY(-120%)',
      },
    },
  },

  defaultVariants: {
    color: 'primary',
    isOpen: 'close',
  },
});

export const subList = style({
  listStyle: 'initial',
  paddingLeft: '32px',
  color: vars.colors.accentSecondary,
  '@media': {
    'screen and (min-width: 768px)': {
      width: '50%',
      margin: 'auto',
    },
  },
});

export const link = recipe({
  base: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '24px',
    textDecoration: 'none',
    display: 'inline-block',
    padding: '12px',
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
  },

  defaultVariants: {
    color: 'primary',
  },
});
