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
  imgUrl: string;
  store?: string;
  title: string;
  price: string;
  discountRate: string;
  discountedPrice: string;
  like?: number;
  review?: number;
}
