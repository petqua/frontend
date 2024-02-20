import {
  getAccessTokenAPI,
  getOAuthLoginAPI,
  getOAuthRedirectAPI,
} from './AuthAPI';
import {
  getCartsAPI,
  getDefaultAddressAPI,
  postNewAddressAPI,
} from './PaymentAPI';
import { getAnnouncementsAPI, getBannersAPI } from './homeAPI';
import { getProductsAPI, getProductDetailAPI } from './productAPI';
import { getSearchProductsAPI, getTrendingKeywordsAPI } from './searchAPI';
import { getReviewStatisticsAPI } from './reviewAPI';

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
  getReviewStatisticsAPI,
  getDefaultAddressAPI,
  postNewAddressAPI,
  getCartsAPI,
};
