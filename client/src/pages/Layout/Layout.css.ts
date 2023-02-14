import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  height: '100%',
  background: vars.colors.background.primary,
  maxWidth: 1280,
  // '@media': {
  //   'screen and (min-width: 768px)': {
  //     marginTop: 50,
  //   },
  // },
});

export const container = style({
  background: vars.colors.background.primary,
  maxWidth: 1280,
  display: 'grid',
  justifyItems: 'center',
  gap: '24px 0',
  // margin: '48px auto 0',
  padding: '24px',

  // '@media': {
  //   'screen and (min-width: 768px)': {
  //     marginTop: 50,
  //   },
  // },
});
