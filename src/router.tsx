import { createBrowserRouter } from 'react-router-dom';
import { HomePage, ProductListPage, SearchPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Unknown Error</div>,
  },
  {
    path: '/productList',
    element: <ProductListPage />,
    errorElement: <div>Unknown Error</div>,
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <div>Unknown Error</div>,
  },
]);
