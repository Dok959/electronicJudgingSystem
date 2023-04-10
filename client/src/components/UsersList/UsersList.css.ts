import { style } from '@vanilla-extract/css';
import { vars } from '@/theme';

export const wrapper = style({
  width: '100%',
  maxWidth: 400,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  minWidth: 300,
  '@media': {
    'screen and (min-width: 768px)': {
      gap: 16,
    },
  },
});

export const heading = style({
  margin: 0,
  fontSize: 20,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
});

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gap: 16,
  alignItems: 'baseline',
  width: '100%',
  justifyItems: 'center',
  flexDirection: 'column',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'grid',
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

export const user = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
});

export const userTitle = style({
  fontSize: 18,
  fontFamily: vars.fonts.heading,
  color: vars.colors.headings.primary,
  margin: 0,
});

export const infoContainer = style({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

export const info = style({
  fontSize: 16,
  margin: 0,
  width: 'fit-content',
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
