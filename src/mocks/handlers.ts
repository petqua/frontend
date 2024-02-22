import { mockGetAnnouncementsAPI, mockGetBannersAPI } from './homeController';
import {
  mockGetCartsAPI,
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
  mockGetCartsAPI,
];

export default handlers;
