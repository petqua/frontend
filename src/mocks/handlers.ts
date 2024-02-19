import { mockGetAnnouncementsAPI, mockGetBannersAPI } from './homeController';
import {
  mockGetDefaultAddressAPI,
  mockPostNewAddressAPI,
} from './paymentController';
import {
  mockGetSearchProductsAPI,
  mockGetTrendingKeywordsAPI,
} from './searchController';

const handlers = [
  mockGetAnnouncementsAPI,
  mockGetBannersAPI,
  mockGetTrendingKeywordsAPI,
  mockGetSearchProductsAPI,
  mockGetDefaultAddressAPI,
  mockPostNewAddressAPI,
];

export default handlers;
