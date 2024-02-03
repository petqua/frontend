import { theme } from '../../styles/theme';
import { FlexBox, MediumText } from '../atoms';
import { ProductListItem } from '../molecules';
import { ProductList } from '../../interfaces/product';
import InfiniteScroll from 'react-infinite-scroller';

const ProductList = ({ length, listData }: ProductList) => {
  return (
    <FlexBox col gap="2rem">
      <MediumText size={14} color={theme.color.gray.main}>
        {/* 수입입고 소식 리스트를 위한 조건부 */}
        {length ? `${length}마리 반려어` : '새로운 반려어가 왔어요!'}
      </MediumText>
      {isInfinite ? (
        <InfiniteScroll
          hasMore={data[0]?.hasNextPage}
          loadMore={() => fetchNextPage()}
        >
          {data.map((items) => {
            return items?.products.map((item) => (
              <ProductListItem key={item.id} data={item} />
            ));
          })}
        </InfiniteScroll>
      ) : (
        <FlexBox
          justify="space-between"
          style={{ flexWrap: 'wrap', rowGap: '3.2rem' }}
        >
          {data[0]?.products.map((item) => (
            <ProductListItem key={item.id} data={item} />
          ))}
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default ProductList;
