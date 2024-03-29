import { useQuery } from '@tanstack/react-query';
import { FlexBox } from '../atoms';
import {
  ProductListItem,
  PreviewListTitle,
  RowScrollContainer,
} from '../molecules';
import { getProductsAPI } from '../../apis';

const RecommendList = () => {
  const { data: productListData } = useQuery({
    queryKey: ['products', 'HOME_RECOMMENDED'],
    queryFn: () => getProductsAPI({ limit: 7, sourceType: 'HOME_RECOMMENDED' }),
    staleTime: 60 * 1000,
  });

  // 타입 예외처리
  const products = productListData?.products || [];

  return (
    <FlexBox col gap="2.4rem" style={{ padding: '2.4rem 0' }}>
      <PreviewListTitle
        title="펫쿠아 강력 추천!"
        path="/product?type=recommend"
      />
      <ProductListItem isMain data={products[0]} />
      {products.length > 1 ? (
        <RowScrollContainer gap="1.2rem" row={1} col={6}>
          {products
            ?.filter((_, idx) => idx > 0)
            ?.map((item, idx) => (
              <ProductListItem key={idx} isSmall data={item} />
            ))}
        </RowScrollContainer>
      ) : (
        <></>
      )}
    </FlexBox>
  );
};

export default RecommendList;
