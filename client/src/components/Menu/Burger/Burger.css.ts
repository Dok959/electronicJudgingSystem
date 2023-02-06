import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/theme/index';
import { style } from '@vanilla-extract/css';

export const position = style({
  position: 'absolute',
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  cursor: 'pointer',
  zIndex: 10,
  right: '0',
  height: '24px',
});

export const bar = recipe({
  base: {
    display: 'block',
    width: '24px',
    height: '1px',
    backgroundColor: vars.colors.text.normal,
    border: '1px solid',
    borderColor: vars.colors.text.normal,
    borderRadius: '8px',
    transition: vars.transition.all,
  },

  variants: {
    isOpen: {
      openTop: {
        transform: 'rotate(45deg)',
      },
      openBottom: {
        transform: 'rotate(-45deg)',
        marginTop: '-24px',
      },
      closeTop: {
        transform: 'rotate(0deg)',
      },
      closeBottom: {
        transform: 'rotate(0deg)',
        marginTop: '0',
      },
    },
  },
});
