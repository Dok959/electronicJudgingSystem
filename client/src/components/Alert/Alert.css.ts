import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const alert = recipe({
  base: {
    position: 'absolute',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100px',
    height: '75px',
    bottom: 200,
    right: 200,
    border: '4px solid #fff',
    borderRadius: 10,
    transition: 'all 0.25s ease-out',
  },

  variants: {
    border: {
      default: {
        borderColor: 'transparent',
      },
      error: {
        borderColor: '#a90000',
      },
      warning: {
        borderColor: '#FF9900',
      },
      success: {
        borderColor: '#00a910',
      },
    },
  },

  defaultVariants: {
    border: 'default',
  },
});

// .toast {
//   display: flex;
//   align-items: center;
//   position: absolute;
//   top: 50px;
//   right: -500px;
//   background-color: black;
//   border-radius: 12px;
//   padding: 0.5rem 1rem;
//   border: 5px solid #029c91;
//   opacity: 0%;
//   transition: all 0.25s ease-out;
// }
