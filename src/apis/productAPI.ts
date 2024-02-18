import {
  GetProductsAPI,
  GetProductsAPIParams,
  GetProductDetailAPI,
  GetCategoryProductsAPIParams,
} from '../interfaces/product';
import { client } from './axiosInstance';

export const getProductsAPI = async ({
  lastViewedId,
  limit,
  sourceType,
  sorter,
}: GetProductsAPIParams): Promise<GetProductsAPI> => {
  try {
    const res = await client.get('/products', {
      params: {
        lastViewedId,
        limit,
        sourceType,
        sorter,
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

export const getProductDetailAPI = async (
  productId: number,
): Promise<GetProductDetailAPI> => {
  try {
    const { data } = await client.get(`/products/${productId}`);

    const {
      id,
      name,
      family,
      species,
      price,
      storeName,
      discountRate,
      discountPrice,
      reviewCount,
      reviewAverageScore,
      description,
      optimalTemperatureMin,
      optimalTemperatureMax,
      difficultyLevel,
      optimalTankSize,
      temperament,
      descriptionImageUrls,
      thumbnailUrl,
      wishCount,
      canDeliverSafely,
      canDeliverCommonly,
      canPickUp,
      hasDistinctSex,
      isWished,
    } = data;

    const mainData = {
      id,
      name,
      family,
      species,
      price,
      storeName,
      discountRate,
      discountPrice,
      reviewCount,
      reviewAverageScore,
      description,
    };

    const infoData = {
      family,
      species,
      optimalTemperatureMin,
      optimalTemperatureMax,
      difficultyLevel,
      optimalTankSize,
      temperament,
    };

    const etcData = {
      descriptionImageUrls,
      thumbnailUrl,
      wishCount,
      canDeliverSafely,
      canDeliverCommonly,
      canPickUp,
      hasDistinctSex,
      isWished,
    };

    return { mainData, infoData, etcData };
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

export const getCategoryProductsAPI = async ({
  family,
  species,
  deliveryMethod,
  lastViewedId,
  limit,
  sorter,
}: GetCategoryProductsAPIParams): Promise<GetProductsAPI> => {
  try {
    const res = await client.get('/categories/products', {
      params: {
        family,
        species,
        deliveryMethod,
        lastViewedId,
        limit,
        sorter,
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
