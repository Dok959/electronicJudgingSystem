import { style } from '@vanilla-extract/css';
import { vars } from '@/theme';

export const button = style({
  outline: 'none',
  fontSize: 20,
  boxShadow: vars.shadow.buttonActive,
  borderRadius: vars.borderRadius.default,
  padding: '18px 32px',
  cursor: 'pointer',
  transition: vars.transition.all,
  position: 'relative',
  height: 60,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
  backgroundColor: vars.colors.accent.primary,
  color: vars.colors.background.primary,
  border: 'none',
});
