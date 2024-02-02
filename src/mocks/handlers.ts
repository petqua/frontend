import { mockGetAnnouncementsAPI, mockGetBannersAPI } from './homeController';
import { mockGetTrendingKeywordsAPI } from './searchController';

const handlers = [
  mockGetAnnouncementsAPI,
  mockGetBannersAPI,
  mockGetTrendingKeywordsAPI,
];

export default handlers;
