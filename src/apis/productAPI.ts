import { GetProductsAPI, GetProductsAPIParams } from '../interfaces/product';
import { client } from './axiosInstance';

export const getProductsAPI = async ({
  queryKey,
}: {
  queryKey: [string, GetProductsAPIParams];
}): Promise<GetProductsAPI> => {
  try {
    const res = await client.get('/products', { params: queryKey[1] });
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
