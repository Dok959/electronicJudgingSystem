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
  borderRadius: {
    default: '10px',
    image: '24px',
  },
  shadow: {
    default: '0px 10px 40px rgba(154, 170, 207, 0.35)',
    buttonActive: '0px 20px 40px -12px rgba(236, 0, 140, 0.35)',
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
    primary: 'rgba(236, 0, 140, 1)',
    secondary: 'rgba(236, 0, 140, 0.75)',
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
    primary: 'rgba(236, 0, 140, 1)',
    secondary: 'rgba(236, 0, 140, 0.75)',
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

globalStyle('html', {
  height: '100%',
});

globalStyle('body', {
  margin: global.space.none,
  padding: global.space.none,
  fontFamily: Inter,
  height: '100%',
});

globalStyle('#root', {
  backgroundColor: vars.colors.background.secondary,
  color: vars.colors.text.primary,
  height: '100%',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  justifyItems: 'center',
  minHeight: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
});
