export interface Address {
  name: string;
  receiver: string;
  phoneNumber: string;
  zipCode: number | undefined;
  address: string;
  detailAddress: string;
  isDefaultAddress: boolean;
}

export interface CartItemDetails {
  id: number;
  storeName: string;
  productId: number;
  productName: string;
  productThumbnailUrl: string;
  productPrice: number;
  productDiscountRate: number;
  productDiscountPrice: number;
  quantity: number;
  sex: 'MALE' | 'FEMALE' | 'HERMAPHRODITE';
  deliveryMethod: 'SAFETY' | 'COMMON' | 'PICKUP';
  deliveryFee: number;
  isOnSale: boolean;
  safeDeliveryFee: number;
  commonDeliveryFee: number;
  pickUpDeliveryFee: number;
  maleAdditionalPrice: number;
  femaleAdditionalPrice: number;
}

export interface TotalFee {
  totalAdoptionFee: number;
  totalSafeDeliveryFee: number;
  totalCommonDeliveryFee: number;
  totalPickUpDeliveryFee: number;
}
