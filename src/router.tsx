import { createBrowserRouter } from 'react-router-dom';
import { FullScreen } from './components/molecules';
import {
  HomePage,
  ProductListPage,
  SearchPage,
  SearchResultPage,
} from './pages';

export const router = createBrowserRouter([
  {
    element: <FullScreen />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/product',
        element: <ProductListPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/search',
        element: <SearchPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/results',
        element: <SearchResultPage />,
        errorElement: <div>Unknown Error</div>,
      },
    ],
  },
]);
