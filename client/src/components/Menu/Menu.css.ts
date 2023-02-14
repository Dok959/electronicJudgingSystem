import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';

export const container = style({
  top: '0',
  width: '100%',
  position: 'sticky',
  maxHeight: 48,
  zIndex: 10,
  background: vars.colors.background.primary,
  '@media': {
    'screen and (min-width: 768px)': {
      zIndex: 10,
      maxHeight: 'initial',
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
      display: 'none',
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
    color: vars.colors.text.primary,
    background: vars.colors.background.primary,
    '@media': {
      'screen and (min-width: 768px)': {
        maxWidth: 1232,
        margin: '0 auto',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        transform: 'translateY(0%)',
        gap: '0 40px',
      },
    },
  },

  variants: {
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
    isOpen: 'close',
  },
});

export const subMenu = style({
  '@media': {
    'screen and (min-width: 768px)': {
      position: 'relative',
    },
  },
});

export const subList = style({
  listStyle: 'initial',
  paddingLeft: '32px',
  color: vars.colors.accent.primary,
  '@media': {
    'screen and (min-width: 768px)': {
      position: 'absolute',
      background: vars.colors.background.primary,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 10,
      boxShadow: '0px 10px 40px rgba(154, 170, 207, 0.35)',
      borderRadius: vars.borderRadius.default,
      listStyle: 'none',
      margin: 0,
      overflowY: 'hidden',
      opacity: 0,
      zIndex: 9999,
      transitionProperty: 'opacity, height',
      transitionDuration: '0.4s',
      transitionTimingFunction: 'ease-in-out',
      display: 'flex',
      left: '-26px',
      top: '24px',
      height: '0',
      padding: 0,
      selectors: {
        [`${subMenu}:hover &`]: {
          height: '82px',
          width: 'auto',
          gap: 0,
          opacity: 1,
        },
      },
    },
  },
});

export const elementList = style({
  '@media': {
    'screen and (min-width: 768px)': {
      selectors: {
        [`${subMenu} &`]: {
          padding: '10px 10px 0 10px',
        },
      },
    },
  },
});

export const link = recipe({
  base: {
    fontWeight: 400,
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
        selectors: {
          [`${subList} &`]: {
            marginRight: 0,
          },
        },
      },
      '(prefers-reduced-motion)': {
        transitionProperty: 'color',
      },
    },
  },

  variants: {
    color: {
      default: {
        color: vars.colors.text.primary,
      },
      active: {
        color: vars.colors.accent.primary,
      },
    },
  },

  defaultVariants: {
    color: 'default',
  },
});
