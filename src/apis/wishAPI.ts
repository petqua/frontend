import { GetWishesAPI, GetWishesAPIParams } from '../interfaces/product';
import { client } from './axiosInstance';

export const getWishesAPI = async ({
  lastViewedId,
  limit,
}: GetWishesAPIParams): Promise<GetWishesAPI> => {
  try {
    const res = await client.get('/products/wishes', {
      // 테스트용 정적 헤더값
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjEiLCJhdXRob3JpdHkiOiJNRU1CRVIiLCJpYXQiOjEwNDE2NDM4MDAwLCJleHAiOjEwNDE2NDQxNjAwfQ.iXos9-UyfQxs7iVcNlKkZ_5EYvkhATaabdcypxrFW28',
      },
      params: {
        lastViewedId,
        limit,
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
