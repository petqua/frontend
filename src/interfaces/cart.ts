import { SetStateAction } from 'react';

export interface CartItemData {
  id: number;
  storeName: string;
  productId: number;
  productName: string;
  productThumbnailUrl: string;
  productPrice: number;
  productDiscountRate: number;
  productDiscountPrice: number;
  quantity: number;
  sex: string;
  deliveryMethod: string;
  deliveryFee: number;
  isOnSale: boolean;
  safeDeliveryFee: number;
  commonDeliveryFee: number;
  pickUpDeliveryFee: number;
  maleAdditionalPrice: number;
  femaleAdditionalPrice: number;
  checked: boolean;
}

export interface CartStoreSectionData {
  storeName: string;
  items: CartItemData[];
  checked: boolean;
}

export interface CartStoreSection {
  data: CartStoreSectionData;
  handleSelectStore: (storeName: string, value: boolean) => void;
  handleSelectItem: (storeName: string, itemId: number, value: boolean) => void;
  storeIdx: number;
}

export interface CartList {
  data: CartStoreSectionData[];
  setData: React.Dispatch<SetStateAction<CartStoreSectionData[]>>;
  checkedItemData: {
    totalCount: number;
    totalOriginalPrice: number;
    totalDiscountedPrices: number;
    totalCommonDeliveryFees: number;
    totalSafetyDeliveryFees: number;
  };
}

export interface CartItem {
  data: CartItemData;
  handleSelectItem: (storeName: string, itemId: number, value: boolean) => void;
}
