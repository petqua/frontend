export const formatFilter = (name: string) => {
  switch (name) {
    case 'SALE_PRICE_ASC':
      return '낮은 가격순';
    case 'SALE_PRICE_DESC':
      return '높은 가격순';
    case 'REVIEW_COUNT_DESC':
      return '리뷰 많은 순';
    case 'SECURE_TRANSPORT':
      return '안전운송';
    case 'STANDARD_TRANSPORT':
      return '일반운송';
    case 'DIRECT_VISIT':
      return '직접방문';
    default:
      return name;
  }
};
