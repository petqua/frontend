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
  isMale: boolean;
  deliveryMethod: string;
  isOnSale: boolean;
}
