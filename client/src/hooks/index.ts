import { useEffect, useState } from 'react';
import { light, dark } from '../theme/theme.css';

export const useTheme = () => {
  const [nameTheme, setNameTheme] = useState(
    JSON.parse(localStorage.getItem('theme') as string) || 'dark',
  );

  const [theme, setTheme] = useState(nameTheme === 'light' ? light : dark);

  const switchTheme = () => {
    const inverseMode = nameTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', JSON.stringify(inverseMode));

    setNameTheme(inverseMode);
  };

  useEffect(() => {
    setTheme(nameTheme === 'light' ? light : dark);
  }, [nameTheme]);

  return { theme, switchTheme };
};
