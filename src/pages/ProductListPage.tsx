import { useState } from 'react';
import { FlexBox } from '../components/atoms';
import { Modal, Filter } from '../components/molecules';
import { ProductList } from '../components/organisms';

const ProductListPage = () => {
  const sortOptions = [
    { name: 'SALE_PRICE_ASC', title: '낮은 가격순' },
    { name: 'SALE_PRICE_DESC', title: '높은 가격순' },
    { name: 'REVIEW_COUNT_DESC', title: '리뷰 많은 순' },
  ];
  const [sortValue, setSortValue] = useState('필터');
  const [isOpenSortModal, setIsOpenSortModal] = useState(false);

  const list = [
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
  ];

  return (
    <FlexBox col gap="2.4rem" style={{ padding: '1.4rem' }}>
      <FlexBox gap="1.2rem" align="center">
        <Filter value={sortValue} setIsOpenModal={setIsOpenSortModal} />
      </FlexBox>
      <ProductList listData={list} length={list.length} />

      {/* =================== 모달 =================== */}
      {isOpenSortModal && (
        <Modal
          options={sortOptions}
          title="필터"
          value={sortValue}
          setIsOpenModal={setIsOpenSortModal}
          setValue={setSortValue}
        />
      )}
    </FlexBox>
  );
};

export default ProductListPage;
