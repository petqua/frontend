import styled from 'styled-components';
import { CategoryItem } from '../molecules';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 4.8rem 2.4rem;
  row-gap: 2.4rem;
  column-gap: 1.6rem;
`;

// 어디로 nav할 지도 정해서 추가해야함.
const CATEGORY_ARRAY = [
  {
    name: '난태생,송사리과',
    src: '/icons/category/1.svg',
    path: '/1',
  },
  {
    name: '카라신과',
    src: '/icons/category/2.svg',
    path: '/2',
  },
  {
    name: '잉어과',
    src: '/icons/category/3.svg',
    path: '/3',
  },
  {
    name: '기수어과',
    src: '/icons/category/4.svg',
    path: '/4',
  },
  {
    name: '대형어',
    src: '/icons/category/5.svg',
    path: '/5',
  },
  {
    name: '아나바스과',
    src: '/icons/category/6.svg',
    path: '/6',
  },
  {
    name: '메기과',
    src: '/icons/category/7.svg',
    path: '/7',
  },
  {
    name: '더보기',
    src: '/icons/category/8.svg',
    path: '/8',
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
