import { theme } from '../../styles/theme';
import { FlexBox, MediumText } from '../atoms';
import { ProductListItem } from '../molecules';
import { ProductList } from '../../interfaces/product';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

const ProductList = ({
  length,
  data,
  isInfinite,
  fetchNextPage,
  hasNextPage,
}: ProductList) => {
  return (
    <FlexBox col gap="2rem" style={{ padding: '1.4rem' }}>
      <MediumText size={14} color={theme.color.gray.main}>
        {/* 수입입고 소식 리스트를 위한 조건부 */}
        {length ? `${length}마리 반려어` : '새로운 반려어가 왔어요!'}
      </MediumText>
      {isInfinite ? (
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
          <ListContainer>
            {data.map((items) => {
              return items?.products.map((item) => (
                <ProductListItem key={item.id} data={item} />
              ));
            })}
          </ListContainer>
        </InfiniteScroll>
      ) : (
        <ListContainer>
          {data[0]?.products.map((item) => (
            <ProductListItem key={item.id} data={item} />
          ))}
        </ListContainer>
      )}
    </FlexBox>
  );
};

export default ProductList;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 1.2rem;
  row-gap: 3.2rem;
`;
