import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  outline: 'none',
  fontSize: 16,
  background: 'none',
  transition: 'none',
  '&:hover': {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
  '&:active': {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
  '&:focus': {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
});
