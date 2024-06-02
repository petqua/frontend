import { createBrowserRouter, redirect } from 'react-router-dom';
import { FullScreen } from './components/molecules';
import React from 'react';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const WishListPage = React.lazy(() => import('./pages/WishListPage'));
const ProductListPage = React.lazy(() => import('./pages/ProductListPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const SearchResultPage = React.lazy(() => import('./pages/SearchResultPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const ReviewPage = React.lazy(() => import('./pages/ReviewPage'));
const KakaoLoginPage = React.lazy(() => import('./pages/KakaoLoginPage'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const MyPage = React.lazy(() => import('./pages/MyPage'));
const OptionPage = React.lazy(() => import('./pages/OptionPage'));
const WithdrawalPage = React.lazy(() => import('./pages/WithdrawalPage'));
const ProfileEditPage = React.lazy(() => import('./pages/ProfileEditPage'));
const MyReviewPage = React.lazy(() => import('./pages/MyReviewPage'));
const ReviewWritePage = React.lazy(() => import('./pages/ReviewWritePage'));
const TossSuccessRedirectPage = React.lazy(
  () => import('./pages/TossSuccessRedirectPage'),
);
const TossFailRedirectPage = React.lazy(
  () => import('./pages/TossFailRedirectPage'),
);
const OrderListPage = React.lazy(() => import('./pages/OrderListPage'));
const OrderDetailPage = React.lazy(() => import('./pages/OrderDetailPage'));

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
        path: '/payment/:source',
        element: <PaymentPage />,
        errorElement: <div>Unknown Error</div>,
        loader: authorizedLoader,
      },
      {
        path: '/cart',
        element: <CartPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/toss/success',
        element: <TossSuccessRedirectPage />,
        errorElement: <div>Unknown Error</div>,
        loader: authorizedLoader,
      },
      {
        path: '/toss/fail',
        element: <TossFailRedirectPage />,
        errorElement: <div>Unknown Error</div>,
        loader: authorizedLoader,
      },
      {
        path: '/myPage',
        element: <MyPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/option',
        element: <OptionPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/withdrawal',
        element: <WithdrawalPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/order',
        element: <OrderListPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/order/:orderId',
        element: <OrderDetailPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/myPage/edit',
        element: <ProfileEditPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/review',
        element: <MyReviewPage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
      {
        path: '/review/write',
        element: <ReviewWritePage />,
        errorElement: <div>Unknown Error</div>,
        // loader: authorizedLoader,
      },
    ],
  },
]);
