import styled from 'styled-components';
import { CategoryItem } from '../molecules';

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 4.8rem 2.4rem;
  row-gap: 2.4rem;
  column-gap: 1.6rem;
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(4, minmax(5rem, 11rem));
    grid-template-rows: repeat(2, 1fr);
    padding: 2.4rem 1.2rem;
    row-gap: 1.8rem;
    column-gap: 1.2rem;
  }
`;

// 어디로 nav할지도 정해서 추가해야함.
const CATEGORY_ARRAY = [
  {
    name: '송사리과',
    src: '/icons/category/1.svg',
    path: '/product?type=killfish',
  },
  {
    name: '카라신과',
    src: '/icons/category/2.svg',
    path: '/product?type=characidae',
  },
  {
    name: '잉어과',
    src: '/icons/category/3.svg',
    path: '/product?type=carp',
  },
  {
    name: '기수어과',
    src: '/icons/category/4.svg',
    path: '/product?type=brackishWaterFish',
  },
  {
    name: '대형어',
    src: '/icons/category/5.svg',
    path: '/product?type=largeFish',
  },
  {
    name: '아나바스과',
    src: '/icons/category/6.svg',
    path: '/product?type=anabantidae',
  },
  {
    name: '메기과',
    src: '/icons/category/7.svg',
    path: '/product?type=siluridae',
  },
  {
    name: '더보기',
    src: '/icons/category/8.svg',
    path: '',
  },
];

const CategoryList = () => {
  return (
    <GridContainer>
      {CATEGORY_ARRAY.map(({ name, src, path }, idx) => (
        <CategoryItem key={idx} name={name} src={src} path={path} />
      ))}
    </GridContainer>
  );
};

export default CategoryList;
