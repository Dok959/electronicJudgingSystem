import { style } from '@vanilla-extract/css';
import { vars } from '@/theme';

export const container = style({
  width: '100%',
  background: vars.colors.background.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 0',
});
