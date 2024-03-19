import { useEffect, useState } from 'react';
import { FlexBox } from '../components/atoms';
import { Filter, TopNav } from '../components/molecules';
import { ProductList, ListModal, SpeciesModal } from '../components/organisms';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  getCategoriesAPI,
  getCategoryProductsAPI,
  getProductsAPI,
} from '../apis';

interface ProductType {
  title: string;
  sourceType?: string;
  isBlue: boolean;
  isFilter: boolean;
  isInfinite: boolean;
}

interface Types {
  [key: string]: ProductType;
}

const ProductListPage = () => {
  const deliveryMethodOptions = ['SAFETY', 'COMMON', 'PICK_UP'];
  const sorterOptions = [
    'SALE_PRICE_ASC',
    'SALE_PRICE_DESC',
    'REVIEW_COUNT_DESC',
  ];

  const [isOpenSpeciesModal, setIsOpenSpeciesModal] = useState(false);
  const [isOpenDeliveryMethodModal, setIsOpenDeliveryMethodModal] =
    useState(false);
  const [isOpenSorterModal, setIsOpenSorterModal] = useState(false);

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'exception';
  const species = searchParams.get('species') || null;
  const sorter = searchParams.get('sorter') || null;
  const deliveryMethod = searchParams.get('deliveryMethod') || null;

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
    killfish: {
      title: '송사리과',
      isBlue: false,
      isFilter: true,
      isInfinite: true,
    },
    characidae: {
      title: '카라신과',
      isBlue: false,
      isFilter: true,
      isInfinite: true,
    },
    carp: {
      title: '잉어과',
      isBlue: false,
      isFilter: true,
      isInfinite: true,
    },
    brackishWaterFish: {
      title: '기수어과',
      isBlue: false,
      isFilter: true,
      isInfinite: true,
    },
    largeFish: {
      title: '대형어',
      isBlue: false,
      isFilter: true,
      isInfinite: true,
    },
    anabantidae: {
      title: '아나바스과',
      isBlue: false,
      isFilter: true,
      isInfinite: true,
    },
    siluridae: {
      title: '메기과',
      isBlue: false,
      isFilter: true,
      isInfinite: true,
    },
    exception: {
      title: 'Error',
      sourceType: '',
      isBlue: false,
      isFilter: false,
      isInfinite: false,
    },
  };

  const formatSpeciesFilterTitle = (species: string | null) => {
    const speciesToArray = species?.split(',') || [];

    if (speciesToArray.length >= 2) {
      return `${speciesToArray[0]}외 ${speciesToArray.length - 1}`;
    } else {
      return species;
    }
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products', type],
    queryFn: ({ pageParam: lastViewedId }) =>
      getProductsAPI({
        limit: 20,
        sourceType: types[type].sourceType || '',
        lastViewedId,
      }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      const length = lastPage.products.length - 1;
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.products[length].id;
    },
    enabled: type === 'recommend' || type === 'new',
    staleTime: 30 * 1000,
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
          <FlexBox
            gap="1.2rem"
            align="center"
            style={{ padding: '1.4rem' }}
            onClick={() => console.log(speciesData)}
          >
            <Filter
              value={formatSpeciesFilterTitle(species)}
              setIsOpenModal={setIsOpenSpeciesModal}
              title="어종"
            />
            <Filter
              value={deliveryMethod}
              setIsOpenModal={setIsOpenDeliveryMethodModal}
              title="운송방법"
            />
            <Filter
              value={sorter}
              setIsOpenModal={setIsOpenSorterModal}
              title="정렬"
            />
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
        {isOpenSpeciesModal && (
          <SpeciesModal
            value={species?.split(',') || []}
            options={speciesData || []}
            setIsOpenModal={setIsOpenSpeciesModal}
          />
        )}
        {isOpenDeliveryMethodModal && (
          <ListModal
            options={deliveryMethodOptions}
            type="deliveryMethod"
            value={deliveryMethod}
            setIsOpenModal={setIsOpenDeliveryMethodModal}
          />
        )}
        {isOpenSorterModal && (
          <ListModal
            options={sorterOptions}
            type="sorter"
            value={sorter}
            setIsOpenModal={setIsOpenSorterModal}
          />
        )}
      </FlexBox>
    </>
  );
};

export default ProductListPage;
