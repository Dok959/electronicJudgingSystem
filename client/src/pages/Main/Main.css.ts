import { style } from '@vanilla-extract/css';
import { vars } from '@/theme/index';

export const mainTitle = style({
  fontFamily: vars.fonts.heading,
  fontWeight: 600,
  fontSize: 28,
  lineHeight: 1.2,
  color: vars.colors.headings.primary,
  textAlign: 'center',
  margin: vars.space.none,
  maxWidth: 530,

  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: 40,
      maxWidth: 730,
    },
  },
});
