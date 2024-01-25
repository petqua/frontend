import { createBrowserRouter } from 'react-router-dom';
import { Ex1Page, Ex2Page, MainPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <div>Unknown Error</div>,
    children: [
      {
        path: '1',
        element: <Ex1Page />,
      },
      {
        path: '2',
        element: <Ex2Page />,
      },
    ],
  },
]);