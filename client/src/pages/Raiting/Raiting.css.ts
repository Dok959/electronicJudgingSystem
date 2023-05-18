import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/index';

export const wrapper = style({
  width: '100%',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  '@media': {
    'screen and (min-width: 768px)': {
      gap: 24,
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
  display: 'flex',
  gap: 16,
  alignItems: 'baseline',
  width: '100%',
  justifyItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  flexDirection: 'row',
});

export const item = style({
  margin: 0,
});

export const inputRadio = style({
  selectors: {
    '&:not(:checked), &:checked': {
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
    },
  },
});

export const labelRadio = style({
  position: 'relative',
  cursor: 'pointer',
  paddingRight: 30,
  selectors: {
    [`${inputRadio}+&::after`]: {
      content: '',
      position: 'absolute',
      right: 0,
      width: 19,
      height: 19,
      border: '1px solid',
      borderColor: vars.colors.accent.primary,
      background: vars.colors.background.primary,
      borderRadius: '50%',
      transition: vars.transition.all,
    },
    [`${inputRadio}:checked+&::after`]: {
      background: vars.colors.accent.primary,
    },
    [`${inputRadio}:disabled+&::after`]: {
      boxShadow: 'none',
      borderColor: '#bbb',
      backgroundColor: '#e9e9e9',
    },
    [`${inputRadio}:disabled+&`]: {
      color: '#aaa',
    },
    [`${inputRadio}:focus+&::after`]: {
      boxShadow: '0 0 0 6px rgba(236, 0, 140, 0.2)',
    },
  },
});

export const tableWrapper = style({
  display: 'block',
  width: 0,
  minWidth: '100%',
  overflow: 'auto',
});

export const table = style({
  width: '100%',
  textAlign: 'center',
  borderSpacing: '0 16px',
});

export const tableHeader = style({
  fontWeight: '500',
});
