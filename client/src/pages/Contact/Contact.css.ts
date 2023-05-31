import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
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
      fontSize: 36,
      maxWidth: 730,
    },
  },
});

export const wrapper = style({
  display: 'grid',
  justifyItems: 'center',
  width: '100%',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '2fr 1fr',
      gap: '40px',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      padding: 24,
      width: 'auto',
    },
    'screen and (min-width: 992px)': {
      padding: 0,
    },
  },
});

export const image = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
      maxWidth: '100%',
      borderRadius: vars.borderRadius.image,
    },
  },
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 16,
  textAlign: 'center',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
});

export const subTitle = style({
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  fontFamily: vars.fonts.heading,
});

export const content = style({
  margin: 0,
});
