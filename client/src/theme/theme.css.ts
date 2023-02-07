import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
  globalStyle,
  globalFontFace,
} from '@vanilla-extract/css';

const Nunito = 'Nunito';
const Inter = 'Inter';

globalFontFace(Nunito, {
  src: 'url("./fonts/Nunito.ttf") format("truetype-variations")',
});
globalFontFace(Inter, {
  src: 'url("./fonts/Inter.ttf") format("truetype-variations")',
});

const global = createGlobalTheme('html', {
  space: {
    none: '0px',
    small: '8px',
    medium: '16px',
    large: '24px',
    auto: 'auto',
  },
  fonts: {
    heading: 'Nunito, sans-serif',
    body: 'Inter, sans-serif',
  },
  transition: {
    width: 'width 0.4s ease-in-out',
    all: '0.4s ease-in-out',
  },
  breakpoints: {
    values: {
      mobile: '576px',
      tablet: '768px',
      laptop: '992px',
      desktop: '1200px',
    },
  },
});

const colors = createThemeContract({
  backgroundPrimary: null,
  backgroundSecondary: null,
  accentPrimary: null,
  accentSecondary: null,
  text: {
    normal: null,
    dimmed: null,
  },
});

export const light = createTheme(colors, {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F3F6FF',
  accentPrimary: '#EC008C',
  accentSecondary: '#ec008cbf',
  text: {
    normal: '#24293D',
    dimmed: '#6B7280',
  },
});

// TODO
export const dark = createTheme(colors, {
  backgroundPrimary: '#F3F6FF',
  backgroundSecondary: '#FFFFFF',
  accentPrimary: '#EC008C',
  accentSecondary: '#4355FA',
  text: {
    normal: '#F9FAFB',
    dimmed: '#D1D5DB',
  },
});

export const vars = { ...global, colors };

globalStyle('body', {
  margin: global.space.none,
  padding: global.space.none,
  backgroundColor: vars.colors.backgroundSecondary,
  color: colors.text.normal,
  fontFamily: global.fonts.body,
});

globalStyle('#root', {
  backgroundColor: vars.colors.backgroundSecondary,
  color: vars.colors.text.normal,
});
