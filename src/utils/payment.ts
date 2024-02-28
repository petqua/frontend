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
