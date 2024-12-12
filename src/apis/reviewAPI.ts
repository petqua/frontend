import { client } from './axiosInstance';
import {
  GetReviewsAPIParams,
  GetReviewsAPI,
  GetReviewStatisticsAPI,
  PostReviewAPIParams,
} from '../interfaces/review';

// 상품후기 조건조회 API
export const getReviewsAPI = async ({
  productId,
  lastViewedId,
  limit,
  sorter,
  score,
  photoOnly,
}: GetReviewsAPIParams): Promise<GetReviewsAPI> => {
  try {
    const res = await client.get(`/products/${productId}/reviews`, {
      params: {
        lastViewedId,
        limit,
        sorter,
        score,
        photoOnly,
      },
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

// 상품후기 통계조회 API
export const getReviewStatisticsAPI = async (
  productId: number,
): Promise<GetReviewStatisticsAPI> => {
  try {
    const { data } = await client.get(
      `/products/${productId}/review-statistics`,
    );
    const {
      averageScore,
      productSatisfaction,
      scoreFiveCount,
      scoreFourCount,
      scoreOneCount,
      scoreThreeCount,
      scoreTwoCount,
      totalReviewCount,
    } = data;

    const scoreCounts = [
      scoreFiveCount,
      scoreFourCount,
      scoreThreeCount,
      scoreTwoCount,
      scoreOneCount,
    ];

    return { scoreCounts, averageScore, productSatisfaction, totalReviewCount };
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

// 상품후기 추천 토글 API
export const postReviewRecommendAPI = async (productReviewId: number) => {
  try {
    const res = await client.post('/product-reviews/recommendation', {
      productReviewId,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

// 상품후기 작성 API
export const postReviewAPI = async ({
  productId,
  score,
  content,
  images,
}: PostReviewAPIParams) => {
  try {
    const res = await client.post(`/products/${productId}/reviews`, {
      score,
      content,
      images,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};
