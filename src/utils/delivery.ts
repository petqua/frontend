import { CartItemDetails, TotalFee } from '../interfaces/payment';
import { theme } from '../styles/theme';

export const getKoreanDeliveryMethod = (method: string) => {
  switch (method) {
    case 'COMMON':
      return '일반운송';
    case 'SAFETY':
      return '안전운송';
    case 'PICKUP':
      return '직접방문';
    default:
      return method;
  }
};

export const getSex = (sex: string) => {
  switch (sex) {
    case 'MALE':
      return '수컷';
    case 'FEMALE':
      return '암컷';
    case 'HERMAPHRODITE':
      return '자웅동체';
    default:
      return sex;
  }
};

export const getBackgroundColor = (method: string) => {
  switch (method) {
    case 'SAFETY':
      return theme.color.blue[80];
    case 'COMMON':
      return theme.color.gray[40];
    case 'PICKUP':
      return theme.color.gray.main;
    default:
      return 'white';
  }
};

export const getTextColor = (method: string) => {
  switch (method) {
    case 'SAFETY':
    case 'PICKUP':
      return theme.color.tint.white;
    case 'COMMON':
      return theme.color.gray.main;
    default:
      return 'black';
  }
};

export const getTotalFee = (data: Array<CartItemDetails>) => {
  return data.reduce(
    (acc, { productDiscountPrice, deliveryFee, deliveryMethod }) => {
      acc.totalAdoptionFee += productDiscountPrice + deliveryFee;
      if (deliveryMethod === 'SAFETY') {
        acc.totalSafeDeliveryFee += deliveryFee;
      } else if (deliveryMethod === 'COMMON') {
        acc.totalCommonDeliveryFee += deliveryFee;
      } else {
        acc.totalPickUpDeliveryFee += deliveryFee;
      }
      return acc;
    },
    {
      totalAdoptionFee: 0,
      totalSafeDeliveryFee: 0,
      totalCommonDeliveryFee: 0,
      totalPickUpDeliveryFee: 0,
    },
  );
};

export const getTotalDeliveryFee = (totalFee: TotalFee) => {
  return (
    totalFee.totalCommonDeliveryFee +
    totalFee.totalSafeDeliveryFee +
    totalFee.totalPickUpDeliveryFee
  );
};
