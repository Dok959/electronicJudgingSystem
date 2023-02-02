import { Box } from '@mui/material';
import * as Style from './Menu.style';

export const Menu = () => {
  // const auth = true;
  // const currentPage = '/';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Style.NavLink
        href="#"
        variant="body2"
        classes={Style.ActiveLink}
        className={Style.NavLink2}
      >
        Главная
      </Style.NavLink>
      <>
        <Style.NavLink href="#" variant="body2">
          О нас
        </Style.NavLink>
      </>
      <Style.NavLink href="#" variant="body2">
        Рейтинг
      </Style.NavLink>
      <Style.NavLink href="#" variant="body2">
        Судейство
      </Style.NavLink>
    </Box>
  );
};
