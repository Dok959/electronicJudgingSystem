import { vars } from '@/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  background: vars.colors.background.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 0',
});
