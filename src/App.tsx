import { ThemeProvider } from '@emotion/react';
import { theme } from './theme.js';
import { AuthProvider } from './context/auth.tsx';
import AppRouter from './router.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
