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
import { getCategoryProductsAPI } from '../apis/productAPI';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: { mainData, infoData, etcData } = {}, isSuccess } = useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => getProductDetailAPI(parseInt(productId || '-1')),
    staleTime: 60 * 1000,
  });
  const { data: relatedData } = useQuery({
    queryKey: ['related-products', productId],
    queryFn: () =>
      getCategoryProductsAPI({
        family: infoData?.family || '',
        sorter: 'REVIEW_COUNT_DESC',
        limit: 12,
      }),
    staleTime: 60 * 1000,
    enabled: isSuccess,
  });

  return (
    <>
      <ProductImg size="100%" src={etcData?.thumbnailUrl || ''} />
      <ProductDetailMain data={mainData} />
      <Notice src="/images/notice-ex.svg" alt="product-detail-notice" />
      <ProductDetailInfo data={infoData} />
      <ProductDetailContents data={etcData?.descriptionImageUrls} />

      {/* 리뷰 */}
      {/* 추천 상품 */}
      <RowScrollContainer
        row={2}
        col={6}
        style={{
          gridRowGap: '2.4rem',
          gridColumnGap: '1.2rem',
          margin: '4rem 0',
        }}
      >
        {relatedData?.products.map((item) => (
          <ProductListItem key={item.id} isSmall data={item} />
        ))}
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
        wishCount={etcData?.wishCount || 0}
        isWished={etcData?.isWished || false}
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
