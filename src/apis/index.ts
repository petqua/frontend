import {
  getAccessTokenAPI,
  getOAuthLoginAPI,
  getOAuthRedirectAPI,
} from './AuthAPI';
import { getDefaultAddressAPI, postNewAddressAPI } from './PaymentAPI';
import { getAnnouncementsAPI, getBannersAPI } from './homeAPI';
import { getProductsAPI, getProductDetailAPI } from './productAPI';
import { getSearchProductsAPI, getTrendingKeywordsAPI } from './searchAPI';

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
  getDefaultAddressAPI,
  postNewAddressAPI,
};
