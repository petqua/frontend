import { GetWishesAPI, GetWishesAPIParams } from '../interfaces/product';
import { client } from './axiosInstance';

export const getWishesAPI = async ({
  lastViewedId,
  limit,
}: GetWishesAPIParams): Promise<GetWishesAPI> => {
  try {
    const res = await client.get('/products/wishes', {
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

export const postWishAPI = async (productId: number) => {
  try {
    const res = await client.post('/products/wishes', {
      productId,
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
