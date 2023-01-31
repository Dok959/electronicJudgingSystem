import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../theme';

export const useTheme = () => {
  const [nameTheme, setNameTheme] = useState(
    JSON.parse(localStorage.getItem('theme') as string) || 'dark',
  );

  const [theme, setTheme] = useState(
    nameTheme === 'light' ? lightTheme : darkTheme,
  );

  const switchTheme = () => {
    const inverseMode = nameTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', JSON.stringify(inverseMode));

    setNameTheme(inverseMode);
  };

  useEffect(() => {
    setTheme(nameTheme === 'light' ? lightTheme : darkTheme);
  }, [nameTheme]);

  return { theme, switchTheme };
};
