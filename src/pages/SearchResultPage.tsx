import { useLocation } from 'react-router-dom';
import {
  BottomNavBar,
  Filter,
  Modal,
  SearchBar,
} from '../components/molecules';
import { useState } from 'react';
import { FlexBox } from '../components/atoms';
import { ProductList } from '../components/organisms';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchProductsAPI } from '../apis';

const SearchResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search_query') as string;

  const sortOptions = [
    { name: 'SALE_PRICE_ASC', title: '낮은 가격순' },
    { name: 'SALE_PRICE_DESC', title: '높은 가격순' },
    { name: 'REVIEW_COUNT_DESC', title: '리뷰 많은 순' },
  ];

  const transitOptions = [
    { name: 'SECURE_TRANSPORT', title: '안전운송' },
    { name: 'STANDARD_TRANSPORT', title: '일반운송' },
    { name: 'DIRECT_VISIT', title: '직접방문' },
  ];

  const [sortValue, setSortValue] = useState('필터');
  const [transit, setTransit] = useState('운송 방법');
  const [isOpenSortModal, setIsOpenSortModal] = useState(false);

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
          value={transit}
          setIsOpenModal={setIsOpenSortModal}
          handleFilterClick={() => setCurrentFilter('transit')}
        />
        <Filter
          value={sortValue}
          setIsOpenModal={setIsOpenSortModal}
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

      {isOpenSortModal && (
        <Modal
          options={currentFilter === 'sort' ? sortOptions : transitOptions}
          title="필터"
          value={currentFilter === 'sort' ? sortValue : transit}
          setIsOpenModal={setIsOpenSortModal}
          setValue={currentFilter === 'sort' ? setSortValue : setTransit}
        />
      )}
      <BottomNavBar activeButton="search" />
    </>
  );
};

export default SearchResultPage;
