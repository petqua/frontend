import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// window 객체에 Kakao가 존재한다는 것을 인식
declare global {
  interface Window {
    Kakao: any;
  }
}

const { DEV } = import.meta.env;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      gcTime: 30 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {DEV && <ReactQueryDevtools initialIsOpen={true} />}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
