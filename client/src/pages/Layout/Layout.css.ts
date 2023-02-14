import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/index';

export const wrapper = style({
  height: '100%',
  background: vars.colors.background.primary,
  maxWidth: 1280,
  width: '100%',
});

export const container = style({
  background: vars.colors.background.primary,
  maxWidth: 1280,
  display: 'grid',
  justifyItems: 'center',
  gap: '24px 0',
  padding: '24px',
});
