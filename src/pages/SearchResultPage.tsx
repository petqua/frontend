import { useLocation } from 'react-router-dom';
import { BottomNavBar, Filter, SearchBar } from '../components/molecules';
import { useState } from 'react';
import { FlexBox } from '../components/atoms';

import { ProductList, ListModal } from '../components/organisms';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchProductsAPI } from '../apis';

const SearchResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search_query') as string;

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

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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
        data={data?.pages || []}
        length={data?.pages[0].totalProductsCount || 0}
        fetchNextPage={fetchNextPage}
        isInfinite={true}
        hasNextPage={hasNextPage}
      />

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
