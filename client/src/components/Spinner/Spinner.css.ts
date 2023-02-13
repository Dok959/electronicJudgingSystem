import { keyframes, style } from '@vanilla-extract/css';

const rotation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(359deg)' },
});

export const spinner = style({
  boxSizing: 'border-box',
  display: 'block',
  width: '35px',
  height: '35px',
  margin: '8px',
  border: '4px solid #fff',
  borderRadius: '50%',
  animationName: rotation,
  animationDuration: '1.2s',
  animationIterationCount: 'infinite',
  animationDirection: 'cubic-bezier(0.5, 0, 0.5, 1)',
  borderColor: '#fff #c9c9c9 #c9c9c9 #c9c9c9',
  selectors: {
    [`* &:nthChild(1)`]: {
      animationDelay: '-0.45s',
    },
    [`* &:nthChild(2)`]: {
      animationDelay: '-0.3s',
    },
    [`* &:nthChild(3)`]: {
      animationDelay: '-0.15s',
    },
  },
});
