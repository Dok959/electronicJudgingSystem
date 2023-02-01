import { Box, Link } from '@mui/material';
import * as Style from './Menu.style';

export const Menu = () => {
  // const auth = true;
  // const currentPage = '/';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Style.NavLink href="#" underline="hover">
        Главная
      </Style.NavLink>
      <>
        <Link href="#" underline="hover">
          О нас
        </Link>
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
