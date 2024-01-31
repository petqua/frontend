export const formatFilter = (name: string) => {
  switch (name) {
    case 'SALE_PRICE_ASC':
      return '낮은 가격순';
    case 'SALE_PRICE_DESC':
      return '높은 가격순';
    case 'REVIEW_COUNT_DESC':
      return '리뷰 많은 순';
    default:
      return name;
  }
};

// 가격에 콤마 넣어주는 함수
export const formatPrice = (price: number) => {
  const reversedNumberString = String(price).split('').reverse();

  const numberWithCommas = reversedNumberString.reduce((acc, digit, index) => {
    return digit + (index > 0 && index % 3 === 0 ? ',' : '') + acc;
  }, '');

  return numberWithCommas.split('').join('');
};
