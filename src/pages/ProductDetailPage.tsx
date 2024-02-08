import { FlexBox, ProductImg, RegularText } from '../components/atoms';
import { theme } from '../styles/theme';
import { styled } from 'styled-components';
import { ProductListItem, RowScrollContainer } from '../components/molecules';
import { FaChevronRight } from 'react-icons/fa6';
import {
  ProductDetailData,
  ProductDetailInfo,
  ProductDetailContents,
  BottomPayBar,
} from '../components/organisms';

const ProductDetailPage = () => {
  const exData = {
    id: 1,
    name: 'test',
    category: '구피',
    price: 10000,
    storeName: '펫쿠아',
    discountRate: 10,
    discountPrice: 9000,
    wishCount: 2,
    reviewCount: 1,
    reviewAverageScore: 4.0,
    thumbnailUrl: '',
  };

  return (
    <>
      <ProductImg size="100%" src="/public/images/product-item-ex.svg" />
      <ProductDetailData />
      <Notice src="/images/product-item-ex.svg" alt="product-detail-notice" />
      <ProductDetailInfo />
      <ProductDetailContents />
      <RowScrollContainer
        row={2}
        col={5}
        style={{
          gridRowGap: '2.4rem',
          gridColumnGap: '1.2rem',
          margin: '4rem 0',
        }}
      >
        <ProductListItem isSmall data={exData} />
        <ProductListItem isSmall data={exData} />
        <ProductListItem isSmall data={exData} />
        <ProductListItem isSmall data={exData} />
        <ProductListItem isSmall data={exData} />
        <ProductListItem isSmall data={exData} />
      </RowScrollContainer>

      {/* 교환/환불 */}
      <FlexBox
        justify="space-between"
        align="center"
        padding="1.2rem 1.6rem"
        style={{ backgroundColor: theme.color.gray[30], cursor: 'pointer' }}
      >
        <RegularText size={16} color={theme.color.gray[70]}>
          주문취소 / 교환 / 반품안내
        </RegularText>
        <FaChevronRight size={12} color={theme.color.gray[70]} />
      </FlexBox>
      <BottomPayBar />
    </>
  );
};

export default ProductDetailPage;

const Notice = styled.img`
  width: calc(100% - 2.8rem);
  aspect-ratio: 0.8;
  background-color: ${({ theme }) => theme.color.gray[30]};
  margin: 1.4rem;
`;
