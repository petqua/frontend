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
