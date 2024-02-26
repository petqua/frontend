import { SetStateAction } from 'react';

export interface CarouselItem {
  id: number;
  imageUrl: string;
  linkUrl: string;
}

export interface Carousel {
  carouselList: CarouselItem[];
  canShowDetail?: boolean;
  isDetail?: boolean;
  idx?: number;
  isBlackIndicator?: boolean;
}

export interface ImageDetail {
  setIsOpenDetail: React.Dispatch<SetStateAction<boolean>>;
  idx: number;
  carouselList: CarouselItem[];
}
