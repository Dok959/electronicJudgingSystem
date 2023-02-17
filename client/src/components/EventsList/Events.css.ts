import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme';

export const wrapper = style({
  width: '100%',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  '@media': {
    'screen and (min-width: 768px)': {
      gap: 16,
    },
  },
});

export const heading = style({
  margin: 0,
  fontSize: 18,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
});

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gap: 16,
  alignItems: 'baseline',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '1fr auto',
    },
  },
});

export const filter = style({
  margin: 0,
  display: 'grid',
  justifyItems: 'start',
  gridTemplateColumns: '1fr 1fr 1fr',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'auto',
    },
  },
});

export const item = style({
  margin: 0,
  padding: 8,
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
});

export const event = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
});

export const eventTitle = style({
  fontSize: 16,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
  margin: 0,
});

export const infoContainer = style({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gap: 12,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '1fr 3fr',
    },
  },
});

export const flexContainer = recipe({
  base: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    '@media': {
      'screen and (min-width: 768px)': {
        flexDirection: 'column',
      },
    },
  },

  variants: {
    flex: {
      default: {
        flexDirection: 'row',
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
  fontSize: 14,
  margin: 0,
  width: 'fit-content',
});

export const tags = style({
  display: 'flex',
  fontSize: 14,
  gap: 8,
  flexWrap: 'wrap',
});

export const tag = style({
  background: vars.colors.background.secondary,
  margin: 0,
  fontWeight: 300,
  padding: 8,
  borderRadius: vars.borderRadius.default,
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
});
