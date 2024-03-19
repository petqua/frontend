export const formatFilter = (name: string) => {
  switch (name) {
    case 'SALE_PRICE_ASC':
      return '낮은 가격순';
    case 'SALE_PRICE_DESC':
      return '높은 가격순';
    case 'REVIEW_COUNT_DESC':
      return '리뷰 많은 순';
    case 'SAFETY':
      return '안전운송';
    case 'COMMON':
      return '일반운송';
    case 'PICK_UP':
      return '직접방문';
    default:
      return name;
  }
};

export const getCategory = (category: string) => {
  switch (category) {
    case 'killfish':
      return '송사리과';
    case 'characidae':
      return '카라신과';
    case 'carp':
      return '잉어과';
    case 'brackishWaterFish':
      return '기수어과';
    case 'largeFish':
      return '대형어';
    case 'anabantidae':
      return '아나바스과';
    case 'siluridae':
      return '메기과';
    default:
      return category;
  }
};

export const formatDate = (date: string) => {
  const formatDate = new Date(date);
  const year = formatDate.getFullYear();
  const month = String(formatDate.getMonth() + 1).padStart(2, '0');
  const day = String(formatDate.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
