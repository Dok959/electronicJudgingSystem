import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const container = style({
  paddingTop: '500px',
  background: vars.colors.backgroundSecondary,
});
