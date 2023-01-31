import { ThemeProvider } from '@mui/material';
import { useTheme } from './hooks';
import { Layout, MainPage } from './pages';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Layout>
          <MainPage />
        </Layout>
        {/* <button onClick={switchTheme}>Смена темы</button> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
