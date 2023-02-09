import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
  globalStyle,
  fontFace,
} from '@vanilla-extract/css';

const Nunito = fontFace({
  src: `url("/fonts/Nunito.ttf") format("truetype-variations")`,
});
const Inter = fontFace({
  src: `url("/fonts/Inter.ttf") format("truetype-variations")`,
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
    heading: `${Nunito}, sans-serif`,
    body: `${Inter}, sans-serif`,
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
  background: {
    primary: null,
    secondary: null,
  },
  accent: {
    primary: null,
    secondary: null,
  },
  headings: {
    primary: null,
    secondary: null,
  },
  text: {
    primary: null,
    secondary: null,
  },
});

export const light = createTheme(colors, {
  background: {
    primary: '#FFFFFF',
    secondary: '#F3F6FF',
  },
  accent: {
    primary: '#EC008C',
    secondary: '#ec008cbf',
  },
  headings: {
    primary: '#1F2333',
    secondary: '#6B7280',
  },
  text: {
    primary: '#24293D',
    secondary: '#6B7280',
  },
});

// TODO
export const dark = createTheme(colors, {
  background: {
    primary: '#FFFFFF',
    secondary: '#F3F6FF',
  },
  accent: {
    primary: '#EC008C',
    secondary: '#ec008cbf',
  },
  headings: {
    primary: '#1F2333',
    secondary: '#6B7280',
  },
  text: {
    primary: '#24293D',
    secondary: '#6B7280',
  },
});

export const vars = { ...global, colors };

globalStyle('body', {
  margin: global.space.none,
  padding: global.space.none,
  fontFamily: Inter,
});

globalStyle('#root', {
  backgroundColor: vars.colors.background.secondary,
  color: vars.colors.text.primary,
});
