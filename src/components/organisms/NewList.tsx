import { useQuery } from '@tanstack/react-query';
import { FlexBox } from '../atoms';
import {
  ProductListItem,
  PreviewListTitle,
  RowScrollContainer,
} from '../molecules';
import { getProductsAPI } from '../../apis';

const NewList = () => {
  const { data: productListData } = useQuery({
    queryKey: ['products', { limit: 12, sourceType: 'HOME_NEW_ENROLLMENT' }],
    queryFn: getProductsAPI,
    staleTime: 60 * 1000,
  });

  // 타입 예외처리
  const products = productListData?.products || [];

  return (
    <FlexBox col gap="2.4rem" style={{ padding: '2.4rem 0' }}>
      <PreviewListTitle
        title="수입입고 소식"
        subTitle="업체별 입고 현황"
        path="/product?type=new"
      />
      <RowScrollContainer
        row={2}
        col={6}
        style={{ gridRowGap: '2.4rem', gridColumnGap: '1.2rem' }}
      >
        {products.map((item, idx) => (
          <ProductListItem key={idx} isSmall data={item} />
        ))}
      </RowScrollContainer>
    </FlexBox>
  );
};

export default NewList;
