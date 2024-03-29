import {
  GetProductsAPI,
  GetProductsAPIParams,
  GetProductDetailAPI,
  GetCategoryProductsAPIParams,
} from '../interfaces/product';
import { client } from './axiosInstance';
import qs from 'qs';

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
      wishCount,
      reviewCount,
      reviewAverageScore,
      imageUrls,
      descriptionTitle,
      descriptionContent,
      descriptionImageUrls,
      safeDeliveryFee,
      commonDeliveryFee,
      pickUpDeliveryFee,
      optimalTemperatureMin,
      optimalTemperatureMax,
      difficultyLevel,
      optimalTankSize,
      temperament,
      maleAdditionalPrice,
      femaleAdditionalPrice,
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
      descriptionTitle,
      descriptionContent,
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

    const optionData = {
      productId: id,
      safeDeliveryFee,
      commonDeliveryFee,
      pickUpDeliveryFee,
      maleAdditionalPrice,
      femaleAdditionalPrice,
      // 입양하기 프로세스에 필요한 데이터
      storeName,
      productName: name,
      productThumbnailUrl: imageUrls[0],
      productPrice: price,
      productDiscountRate: discountRate,
      productDiscountPrice: discountPrice,
    };

    const etcData = {
      imageUrls,
      descriptionImageUrls,
      wishCount,
      isWished,
    };

    return { mainData, infoData, optionData, etcData };
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
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
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

export const getCategoriesAPI = async (family: string): Promise<string[]> => {
  try {
    const res = await client.get('/categories', {
      params: {
        family,
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
