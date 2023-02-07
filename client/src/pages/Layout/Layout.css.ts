import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const container = style({
  background: vars.colors.backgroundSecondary,
  marginTop: 66,
});
