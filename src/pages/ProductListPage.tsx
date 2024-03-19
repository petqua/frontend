import { useState } from 'react';
import { FlexBox } from '../components/atoms';
import { Filter, TopNav } from '../components/molecules';
import { ProductList, ListModal } from '../components/organisms';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  getCategoriesAPI,
  getCategoryProductsAPI,
  getProductsAPI,
} from '../apis';

interface ProductType {
  title: string;
  sourceType: string;
  isBlue: boolean;
  isFilter: boolean;
  isInfinite: boolean;
}

interface Types {
  [key: string]: ProductType;
}

const ProductListPage = () => {
  const sortOptions = [
    { name: 'SALE_PRICE_ASC', title: '낮은 가격순' },
    { name: 'SALE_PRICE_DESC', title: '높은 가격순' },
    { name: 'REVIEW_COUNT_DESC', title: '리뷰 많은 순' },
  ];
  const [sortValue, setSortValue] = useState('필터');
  const [isOpenSortModal, setIsOpenSortModal] = useState(false);

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'exception';

  const types: Types = {
    recommend: {
      title: '펫쿠아가 적극 추천해요',
      sourceType: 'HOME_RECOMMENDED',
      isBlue: true,
      isFilter: false,
      isInfinite: true,
    },
    new: {
      title: '새로운 반려어',
      sourceType: 'HOME_NEW_ENROLLMENT',
      isBlue: true,
      isFilter: false,
      isInfinite: false,
    },
    exception: {
      title: 'Error',
      sourceType: '',
      isBlue: false,
      isFilter: false,
      isInfinite: false,
    },
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products', type],
    queryFn: ({ pageParam: lastViewedId }) =>
      getProductsAPI({
        limit: 20,
        sourceType: types[type].sourceType,
        lastViewedId,
      }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      const length = lastPage.products.length - 1;
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.products[length].id;
    },
    staleTime: 60 * 1000,
  });

  const {
    data: categoryData,
    fetchNextPage: fetchCategoryNextPage,
    hasNextPage: hasCategoryNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['products', type],
    queryFn: ({ pageParam: lastViewedId }) =>
      getCategoryProductsAPI({
        family: types[type].title,
        species: species?.split(','),
        deliveryMethod,
        sorter,
        lastViewedId,
        limit: 20,
      }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      const length = lastPage.products.length - 1;
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.products[length].id;
    },
    enabled: type !== 'recommend' && type !== 'new',
    staleTime: 30 * 1000,
  });

  const { data: speciesData } = useQuery({
    queryKey: ['species', type],
    queryFn: () => getCategoriesAPI(types[type].title),
    enabled: type !== 'recommend' && type !== 'new',
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    refetch();
  }, [species, deliveryMethod, sorter]);

  return (
    <>
      <TopNav
        backBtn
        backToHome
        search
        basket
        isBlue={types[type].isBlue}
        title={types[type].title}
      />
      <FlexBox col>
        {types[type].isFilter && (
          <FlexBox gap="1.2rem" align="center" style={{ padding: '1.4rem' }}>
            <Filter value={sortValue} setIsOpenModal={setIsOpenSortModal} />
          </FlexBox>
        )}
        <ProductList
          data={(data || categoryData)?.pages || []}
          length={
            type === 'new'
              ? undefined
              : (data || categoryData)?.pages[0].totalProductsCount
          }
          fetchNextPage={fetchNextPage || fetchCategoryNextPage}
          isInfinite={types[type].isInfinite}
          hasNextPage={hasNextPage || hasCategoryNextPage}
        />

        {/* =================== 모달 =================== */}
        {isOpenSortModal && (
          <ListModal
            options={sortOptions}
            title="필터"
            value={sortValue}
            setIsOpenModal={setIsOpenSortModal}
            setValue={setSortValue}
          />
        )}
      </FlexBox>
    </>
  );
};

export default ProductListPage;
