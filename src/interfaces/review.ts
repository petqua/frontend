export interface GetReviewsAPIParams {
  productId: number;
  lastViewedId?: number;
  limit: number;
  sorter?: string;
  score?: number;
  photoOnly?: boolean;
}

export interface GetReviewsAPI {
  productReviews: ReviewItemData[];
  hasNextPage: boolean;
}

export interface GetReviewStatisticsAPI {
  scoreCounts: number[];
  productSatisfaction: number;
  totalReviewCount: number;
  averageScore: number;
}

export interface ReviewItemData {
  id: number;
  productId: number;
  score: number;
  content: string;
  recommendCount: number;
  hasPhotos: true;
  createdAt: string;
  reviewerId: number;
  reviewerName: string;
  reviewerProfileImageUrl: string;
  reviewerFishBowlCount: number;
  reviewerYears: number;
  recommended: boolean;
  images: string[];
}

export interface ReviewItem {
  data: ReviewItemData;
  isRecommend?: boolean;
  isLastItem?: boolean;
}
