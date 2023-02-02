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
  backgroundPrimary: '#F3F6FF',
  backgroundSecondary: '#FFFFFF',
  accentPrimary: '#4355FA',
  accentSecondary: '#EC008C',
  text: {
    normal: '#24293D',
    dimmed: '#6B7280',
  },
});

// TODO
export const dark = createTheme(colors, {
  backgroundPrimary: '#F3F6FF',
  backgroundSecondary: '#FFFFFF',
  accentPrimary: '#4355FA',
  accentSecondary: '#FFC88C',
  text: {
    normal: '#F9FAFB',
    dimmed: '#D1D5DB',
  },
});

export const vars = { ...global, colors };

globalStyle('body', {
  margin: global.space.none,
  padding: global.space.none,
  backgroundColor: colors.backgroundPrimary,
  color: colors.text.normal,
  fontFamily: global.fonts.body,
});
