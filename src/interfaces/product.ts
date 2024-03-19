import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/query-core';

// 컴포넌트
export interface ProductListItem {
  isMain?: boolean;
  isSmall?: boolean;
  data: ProductListItemData;
}

export interface ProductDetailMain {
  data: ProductDetailMainData | undefined;
}

export interface ProductDetailInfo {
  data: ProductDetailInfoData | undefined;
}

export interface ProductList {
  length?: number;
  data: GetProductsAPI[];
  isInfinite: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<GetProductsAPI, unknown>, Error>
  >;
  hasNextPage: boolean;
  style?: any;
}

// 데이터
export interface ProductListItemData {
  id: number;
  wishProductId?: number;
  categoryId: number;
  name: string;
  price: number;
  storeName: string;
  discountRate: number;
  discountPrice: number;
  wishCount: number;
  reviewCount: number;
  reviewAverageScore: number;
  thumbnailUrl: string;
  isWished?: boolean;
  isDeletedProduct?: boolean;
}

export interface ProductDetailMainData {
  id: number;
  name: string;
  family: string;
  species: string;
  price: number;
  storeName: string;
  discountRate: number;
  discountPrice: number;
  reviewCount: number;
  reviewAverageScore: number;
}

export interface ProductDetailInfoData {
  family: string;
  species: string;
  optimalTemperatureMin: number;
  optimalTemperatureMax: number;
  difficultyLevel: string;
  optimalTankSize: string;
  temperament: string;
}

// API
export interface GetProductsAPI {
  products: ProductListItemData[];
  hasNextPage: boolean;
  totalProductsCount: number;
}

export interface GetProductsAPIParams {
  lastViewedId?: number;
  limit: number;
  sourceType: string;
  sorter?: string;
}

export interface GetWishesAPI {
  products: ProductListItemData[];
  hasNextPage: boolean;
  totalProductsCount: number;
}

export interface GetWishesAPIParams {
  lastViewedId?: number;
  limit: number;
}

export interface GetProductDetailAPI {
  mainData: ProductDetailMainData;
  infoData: ProductDetailInfoData;
  etcData: {
    descriptionImageUrls: string[];
    wishCount: number;
    isWished?: boolean;
    imageUrls?: string[];
  };
}

export interface GetCategoryProductsAPIParams {
  family: string;
  species?: string[] | null;
  deliveryMethod?: string | null;
  lastViewedId?: number;
  limit: number;
  sorter?: string | null;
}
