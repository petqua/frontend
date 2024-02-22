import { getAnnouncementsAPI, getBannersAPI } from './homeAPI';
import { getProductsAPI, getProductDetailAPI } from './productAPI';
import { getSearchProductsAPI, getTrendingKeywordsAPI } from './searchAPI';
import { getReviewStatisticsAPI } from './reviewAPI';
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
  getReviewStatisticsAPI,
  getDefaultAddressAPI,
  postNewAddressAPI,
  getCartsAPI,
};
