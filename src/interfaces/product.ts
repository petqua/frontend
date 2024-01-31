// 컴포넌트
export interface ProductListItem {
  isMain?: boolean;
  isSmall?: boolean;
  data: ProductListItemData;
}

export interface ProductList {
  length?: number;
  listData: ProductListItemData[];
}

// 데이터
export interface ProductListItemData {
  id: number;
  name: string;
  category: string;
  price: 1;
  storeName: string;
  discountRate: number;
  discountPrice: number;
  wishCount: number;
  reviewCount: number;
  reviewAverageScore: number;
  thumbnailUrl: string;
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
