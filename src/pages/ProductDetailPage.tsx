import { FlexBox, ProductImg, RegularText } from '../components/atoms';
import { theme } from '../styles/theme';
import { styled } from 'styled-components';
import { ProductListItem, RowScrollContainer } from '../components/molecules';
import { FaChevronRight } from 'react-icons/fa6';
import {
  ProductDetailMain,
  ProductDetailInfo,
  ProductDetailContents,
  BottomPayBar,
} from '../components/organisms';
import { getProductDetailAPI } from '../apis';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ProductDetailInfoData,
  ProductDetailMainData,
} from '../interfaces/product';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [mainData, setMainData] = useState<ProductDetailMainData>();
  const [infoData, setInfoData] = useState<ProductDetailInfoData>();
  const [contentsData, setContentsData] = useState<string[]>();

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

  const { data: detailData, isSuccess } = useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => getProductDetailAPI(parseInt(productId || '-1')),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess) {
      const {
        id,
        name,
        family,
        species,
        price,
        storeName,
        discountRate,
        discountPrice,
        reviewCount,
        reviewAverageScore,
        description,
        optimalTemperatureMin,
        optimalTemperatureMax,
        difficultyLevel,
        optimalTankSize,
        temperament,
        descriptionImageUrls,
      } = detailData;

      setMainData({
        id,
        name,
        family,
        species,
        price,
        storeName,
        discountRate,
        discountPrice,
        reviewCount,
        reviewAverageScore,
        description,
      });

      setInfoData({
        family,
        species,
        optimalTemperatureMin,
        optimalTemperatureMax,
        difficultyLevel,
        optimalTankSize,
        temperament,
      });

      setContentsData(descriptionImageUrls);
    }
  }, [detailData]);

  return (
    <>
      <ProductImg size="100%" src={detailData?.thumbnailUrl || ''} />
      <ProductDetailMain data={mainData} />
      <Notice src="/images/notice-ex.svg" alt="product-detail-notice" />
      <ProductDetailInfo data={infoData} />
      <ProductDetailContents data={contentsData} />

      {/* 리뷰 */}
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
      <BottomPayBar
        wishCount={detailData?.wishCount || 0}
        isWished={detailData?.isWished || false}
      />
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
