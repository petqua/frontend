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
  name: string;
  category: string;
  price: number;
  storeName: string;
  discountRate: number;
  discountPrice: number;
  wishCount: number;
  reviewCount: number;
  reviewAverageScore: number;
  thumbnailUrl: string;
  isWish?: boolean;
}

export interface ProductDetailMainData {
  id: number;
  name: string;
  category: string;
  price: number;
  storeName: string;
  discountRate: number;
  discountPrice: number;
  reviewCount: number;
  reviewAverageScore: number;
  description: string;
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

export interface GetProductDetailAPI extends ProductDetailMainData {
  thumbnailUrl: string;
  wishCount: number;
}
