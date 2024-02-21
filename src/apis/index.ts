import {
  getAccessTokenAPI,
  getOAuthLoginAPI,
  getOAuthRedirectAPI,
} from './AuthAPI';
import { getDefaultAddressAPI, postNewAddressAPI } from './PaymentAPI';
import { getAnnouncementsAPI, getBannersAPI } from './homeAPI';
import {
  getProductsAPI,
  getProductDetailAPI,
  getCategoryProductsAPI,
} from './productAPI';
import { getSearchProductsAPI, getTrendingKeywordsAPI } from './searchAPI';
import { getReviewStatisticsAPI, getReviewsAPI } from './reviewAPI';
import { getWishesAPI, postWishAPI } from './wishAPI';

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
  getCategoryProductsAPI,
  getWishesAPI,
  postWishAPI,
};
