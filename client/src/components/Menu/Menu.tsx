import { Box, Menu as MuiMenu, MenuItem, Link } from '@mui/material';
import { useState } from 'react';
import * as Style from './Menu.style';

export const Menu = () => {
  // const auth = true;
  // const currentPage = '/';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Link href="#" underline="hover">
        Главная
      </Link>
      <>
        <Style.BootstrapButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Style.BootstrapButton>
        <MuiMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Контакты</MenuItem>
          <MenuItem onClick={handleClose}>Документы</MenuItem>
        </MuiMenu>
      </>
      <Link href="#" underline="hover">
        Рейтинг
      </Link>
      <Link href="#" underline="hover">
        Судейство
      </Link>
    </Box>
  );
};
