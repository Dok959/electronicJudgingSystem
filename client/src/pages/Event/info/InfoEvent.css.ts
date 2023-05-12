import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme';

export const wrapper = style({
  width: '100%',
  // maxWidth: 400,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

export const heading = style({
  margin: 0,
  fontSize: 20,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
});

export const input = style({
  selectors: {
    '&:not(:checked), &:checked': {
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
    },
  },
});

export const label = style({
  position: 'relative',
  paddingLeft: 30,
  cursor: 'pointer',
  selectors: {
    [`${input}+&::before`]: {
      content: '',
      position: 'absolute',
      left: 0,
      width: 19,
      height: 19,
      border: '1px solid',
      borderColor: vars.colors.accent.primary,
      background: vars.colors.background.primary,
      borderRadius: 4,
      transition: vars.transition.all,
    },
    [`${input}:checked+&::before`]: {
      background: vars.colors.accent.primary,
    },
    [`${input}:disabled+&::before`]: {
      boxShadow: 'none',
      borderColor: '#bbb',
      backgroundColor: '#e9e9e9',
    },
    [`${input}:disabled+&`]: {
      color: '#aaa',
    },
    [`${input}:focus+&::before`]: {
      boxShadow: '0 0 0 6px rgba(236, 0, 140, 0.2)',
    },
  },
});

export const content = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  alignItems: 'center',
});

export const title = style({
  fontSize: 18,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
  margin: 0,
});

export const subTitle = style({
  fontSize: 16,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
  margin: 0,
});

export const flexContainer = recipe({
  base: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    '@media': {
      'screen and (min-width: 992px)': {
        flexDirection: 'column',
      },
    },
  },

  variants: {
    flex: {
      default: {
        flexDirection: 'row',
        '@media': {
          'screen and (min-width: 992px)': {
            flexDirection: 'row',
          },
        },
      },
      wrap: {
        flexDirection: 'column',
      },
    },
  },

  defaultVariants: {
    flex: 'default',
  },
});

export const info = style({
  fontSize: 16,
  margin: 0,
  width: 'fit-content',
  selectors: {
    '&+&': {
      marginTop: 0,
    },
  },
});

export const judges = style({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
  alignItems: 'center',
  width: '60%',
});

export const judgesHeader = style({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
  alignItems: 'center',
  '@media': {
    'screen and (min-width: 576px)': {
      gap: 12,
      flexDirection: 'row',
    },
  },
});

export const detail = style({
  background: vars.colors.background.secondary,
  border: '1px solid',
  borderColor: vars.colors.accent.primary,
  borderRadius: vars.borderRadius.default,
  color: vars.colors.accent.primary,
  textDecoration: 'none',
  padding: 8,
  boxSizing: 'border-box',
  cursor: 'pointer',
  selectors: {
    '&:active': {
      outline: '5px solid rgba(236, 0, 140, 0)',
      outlineColor: 'rgba(236, 0, 140, 0.2)',
    },
  },
});

export const judgesList = style({
  display: 'grid',
  gap: 8,
  flexDirection: 'column',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  justifyItems: 'center',
  width: '100%',
  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
});

export const list = style({
  textAlign: 'center',
});
