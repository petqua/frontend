export interface CartItemData {
  id?: number;
  storeName: string;
  productId: number;
  productName: string;
  productThumbnailUrl: string;
  productPrice: number;
  productDiscountRate: number;
  productDiscountPrice: number;
  quantity: number;
  sex: string;
  deliveryMethod: string | null;
  deliveryFee: number;
  isOnSale?: boolean;
  safeDeliveryFee: number | null;
  commonDeliveryFee: number | null;
  pickUpDeliveryFee: number | null;
  maleAdditionalPrice: number | null;
  femaleAdditionalPrice: number | null;
  checked?: boolean;
}

export interface CheckedItemData {
  totalCount: number;
  totalOriginalPrice: number;
  totalDiscountedPrices: number;
  totalCommonDeliveryFees: number;
  totalSafetyDeliveryFees: number;
}

export interface CartStoreSectionData {
  storeName: string;
  items: CartItemData[];
  checked?: boolean;
}

export interface CartStoreSection {
  data: CartStoreSectionData;
  handleSelectStore: (storeName: string, value: boolean) => void;
  handleSelectItem: (storeName: string, itemId: number, value: boolean) => void;
  storeIdx: number;
}

export interface CartList {
  checkedItemData: CheckedItemData;
}

export interface CartItem {
  data: CartItemData;
  handleSelectItem: (storeName: string, itemId: number, value: boolean) => void;
}
