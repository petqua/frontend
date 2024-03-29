import { getAnnouncementsAPI, getBannersAPI } from './homeAPI';
import {
  getProductsAPI,
  getProductDetailAPI,
  getCategoryProductsAPI,
  getCategoriesAPI,
} from './productAPI';
import { getSearchProductsAPI, getTrendingKeywordsAPI } from './searchAPI';
import {
  getReviewStatisticsAPI,
  getReviewsAPI,
  postReviewRecommendAPI,
} from './reviewAPI';
import { getWishesAPI, postWishAPI } from './wishAPI';
import {
  getAccessTokenAPI,
  getOAuthLoginAPI,
  getOAuthRedirectAPI,
} from './authAPI';
import { getDefaultAddressAPI, postNewAddressAPI } from './paymentAPI';
import {
  getCartsAPI,
  postCartsAPI,
  patchCartsOptionsAPI,
  deleteCartsAPI,
} from './cartAPI';

export {
  getBannersAPI,
  getAnnouncementsAPI,
  getProductsAPI,
  getTrendingKeywordsAPI,
  getSearchProductsAPI,
  getOAuthRedirectAPI,
  getOAuthLoginAPI,
  getAccessTokenAPI,
  getProductDetailAPI,
  getReviewsAPI,
  getReviewStatisticsAPI,
  postReviewRecommendAPI,
  getDefaultAddressAPI,
  postNewAddressAPI,
  getCartsAPI,
  postCartsAPI,
  patchCartsOptionsAPI,
  deleteCartsAPI,
  getCategoryProductsAPI,
  getCategoriesAPI,
  getWishesAPI,
  postWishAPI,
};
