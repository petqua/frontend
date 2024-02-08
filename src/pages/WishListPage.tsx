import { useInfiniteQuery } from '@tanstack/react-query';
import { FlexBox, RegularText } from '../components/atoms';
import { TopNav } from '../components/molecules';
import { ProductList } from '../components/organisms';
import { theme } from '../styles/theme';
import { getWishesAPI } from '../apis/wishAPI';

const WishListPage = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['wishes'],
    queryFn: ({ pageParam: lastViewedId }) =>
      getWishesAPI({
        limit: 20,
        lastViewedId,
      }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      const length = lastPage.products?.length - 1;
      if (length < 0) return undefined;
      return lastPage.products[length].id;
    },
    staleTime: 60 * 1000,
  });

  return (
    <>
      <TopNav backBtn search basket title="찜목록" />
      {data?.pages[0].totalProductsCount === 0 ? (
        <FlexBox justify="center" align="center" style={{ flex: 1 }}>
          <RegularText size={16} color={theme.color.gray[70]}>
            아직 찜한 반려어가 없어요!
          </RegularText>
        </FlexBox>
      ) : (
        <ProductList
          length={data?.pages[0].totalProductsCount}
          data={data?.pages || []}
          isInfinite
          style={{ padding: '1.4rem' }}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
};

export default WishListPage;
