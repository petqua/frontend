import { createBrowserRouter, redirect } from 'react-router-dom';
import { FullScreen } from './components/molecules';
import {
  HomePage,
  WishListPage,
  ProductListPage,
  SearchPage,
  SearchResultPage,
  ProductDetailPage,
  LoginPage,
  ReviewPage,
  KakaoLoginPage,
  PaymentPage,
} from './pages';

// 인증이 필요한 페이지에 대한 로더 함수
const authorizedLoader = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  return !isLogin ? redirect('/login') : null;
};

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
        path: '/product/:productId',
        element: <ProductDetailPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/product/:productId/review',
        element: <ReviewPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/search',
        element: <SearchPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/wish',
        element: <WishListPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/results',
        element: <SearchResultPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/auth/login/kakao',
        element: <KakaoLoginPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/payment',
        element: <PaymentPage />,
        errorElement: <div>Unknown Error</div>,
        loader: authorizedLoader,
      },
    ],
  },
]);
