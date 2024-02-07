import { mockGetAnnouncementsAPI, mockGetBannersAPI } from './homeController';
import {
  mockGetSearchProductsAPI,
  mockGetTrendingKeywordsAPI,
} from './searchController';

const handlers = [
  mockGetAnnouncementsAPI,
  mockGetBannersAPI,
  mockGetTrendingKeywordsAPI,
  mockGetSearchProductsAPI,
];

export default handlers;
