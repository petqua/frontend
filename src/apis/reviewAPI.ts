import { client } from './axiosInstance';
import {
  GetReviewsAPIParams,
  GetReviewsAPI,
  GetReviewStatisticsAPI,
} from '../interfaces/review';

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
