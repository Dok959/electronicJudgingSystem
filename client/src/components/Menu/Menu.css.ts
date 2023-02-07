import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const container = style({
  top: '0',
  width: '100%',
  position: 'fixed',
  background: vars.colors.backgroundPrimary,
  '@media': {
    'screen and (min-width: 768px)': {
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
    color: vars.colors.text.normal,
    '@media': {
      'screen and (min-width: 768px)': {
        maxWidth: 1200,
        margin: '0 auto',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        transform: 'translateY(0%)',
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
    'screen and (min-width: 768px)': {},
  },
});

export const subList = style({
  listStyle: 'initial',
  paddingLeft: '32px',
  color: vars.colors.accentPrimary,
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
      position: 'absolute',
      background: vars.colors.backgroundPrimary,
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 10,
      gap: 10,
      boxShadow: '0px 10px 40px rgba(154, 170, 207, 0.35)',
      borderRadius: 10,
      listStyle: 'none',
      marginLeft: -29,
      marginTop: -2,
      selectors: {
        [`${subMenu}:hover &`]: {
          display: 'flex',
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
        color: vars.colors.accentPrimary,
        width: '0',
        height: 2,
        backgroundColor: vars.colors.accentPrimary,
        transition: vars.transition.width,
      },
      '&:hover:after': {
        width: '100%',
      },
    },
    '@media': {
      'screen and (min-width: 768px)': {
        padding: 0,
        marginRight: 40,

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
        color: vars.colors.text.normal,
      },
      active: {
        color: vars.colors.accentPrimary,
      },
    },
  },

  defaultVariants: {
    color: 'default',
  },
});
