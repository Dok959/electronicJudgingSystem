import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const container = style({
  background: vars.colors.backgroundPrimary,
  maxWidth: 1280,
  display: 'grid',
  justifyItems: 'center',
  gap: '22px 0',
  margin: '48px auto 0',
  padding: '24px',

  '@media': {
    'screen and (min-width: 768px)': {
      marginTop: 66,
    },
  },
});
