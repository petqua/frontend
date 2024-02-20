export interface GetReviewStatisticsAPI {
  scoreCounts: number[];
  productSatisfaction: number;
  totalReviewCount: number;
  averageScore: number;
}

export interface ReviewItem {
  data: ReviewItemData;
  isRecommend?: boolean;
  isLastItem?: boolean;
}
