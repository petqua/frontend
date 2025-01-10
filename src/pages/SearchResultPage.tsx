import { BottomNavBar, Filter, SearchBar } from '../components/molecules';
import { useState } from 'react';
import { FlexBox } from '../components/atoms';

import { ProductList, ListModal } from '../components/organisms';

const SearchResultPage = () => {
  //const location = useLocation();
  //const searchParams = new URLSearchParams(location.search);
  //const query = searchParams.get('search_query') as string;

  const sortOptions = [
    'SALE_PRICE_ASC',
    'SALE_PRICE_DESC',
    'REVIEW_COUNT_DESC',
  ];

  const transitOptions = ['SAFETY', 'COMMON', 'PICK_UP'];

  const [sort] = useState(null);
  const [transit] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [currentFilter, setCurrentFilter] = useState('');
  /*
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['products', 'search', query],
    queryFn: ({ pageParam }) =>
      getSearchProductsAPI({
        limit: 20,
        word: query,
        lastViewedId: pageParam,
      }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      const length = lastPage.products.length - 1;
      if (length < 0) return undefined;
      return lastPage.products[length].id;
    },
    staleTime: 10 * 1000,
  });
  */
  const fakeData: any = [
    {
      products: [
        {
          id: 1,
          name: '알비노 풀레드 아시안 고정구피',
          categoryId: 1,
          price: 49000,
          storeName: 'S아쿠아',
          discountRate: 30,
          discountPrice: 49000,
          wishCount: 23,
          reviewCount: 50,
          reviewAverageScore: 5,
          thumbnailUrl:
            'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
          safeDeliveryFee: 49000,
          commonDeliveryFee: 49000,
          pickUpDeliveryFee: 49000,
          isWished: true,
        },
      ],
      hasNextPage: true,
      totalProductsCount: 50,
    },
  ];

  return (
    <>
      <SearchBar />
      <FlexBox gap="1rem" style={{ padding: '1.4rem' }}>
        <Filter
          title="운송방법"
          value={transit}
          setIsOpenModal={setIsOpenModal}
          handleFilterClick={() => setCurrentFilter('transit')}
        />
        <Filter
          title="필터"
          value={sort}
          setIsOpenModal={setIsOpenModal}
          handleFilterClick={() => setCurrentFilter('sort')}
        />
      </FlexBox>
      <ProductList
        data={fakeData || []}
        length={1}
        isInfinite={true}
        hasNextPage={false}
      />
      {/* {isLoading ? (
        <SkeletonProductList />
      ) : (
        <ProductList
          data={fakeData?.pages || []}
          length={fakeData?.pages[0].totalProductsCount || 0}
          fetchNextPage={fetchNextPage}
          isInfinite={true}
          hasNextPage={hasNextPage}
        />
      )} */}
      {isOpenModal && (
        <ListModal
          type={currentFilter === 'sort' ? 'sorter' : 'deliveryMethod'}
          options={currentFilter === 'sort' ? sortOptions : transitOptions}
          value={currentFilter === 'sort' ? sort : transit}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      <BottomNavBar activeButton="search" />
    </>
  );
};

export default SearchResultPage;
