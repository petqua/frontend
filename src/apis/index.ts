import { getAnnouncementsAPI, getBannersAPI } from './homeAPI';
import {
  getProductsAPI,
  getProductDetailAPI,
  getCategoryProductsAPI,
} from './productAPI';
import { getSearchProductsAPI, getTrendingKeywordsAPI } from './searchAPI';
import { getReviewStatisticsAPI, getReviewsAPI } from './reviewAPI';
import { getWishesAPI, postWishAPI } from './wishAPI';
import {
  getAccessTokenAPI,
  getOAuthLoginAPI,
  getOAuthRedirectAPI,
} from './authAPI';
import { getDefaultAddressAPI, postNewAddressAPI } from './paymentAPI';
import { getCartsAPI } from './cartAPI';

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
  getDefaultAddressAPI,
  postNewAddressAPI,
  getCartsAPI,
  getCategoryProductsAPI,
  getWishesAPI,
  postWishAPI,
};
