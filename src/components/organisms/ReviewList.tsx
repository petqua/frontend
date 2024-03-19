import styled from 'styled-components';
import { Filter, ReviewItem } from '../molecules';
import { FlexBox, BoldText } from '../atoms';
import { theme } from '../../styles/theme';
import { SetStateAction, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviewsAPI } from '../../apis';
import { useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';

interface ReviewList {
  score: number | null;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

const ReviewList = ({ score, setIsOpenModal }: ReviewList) => {
  const { productId } = useParams();
  const [photoOnly, setPhotoOnly] = useState(false);
  const [sorter, setSorter] = useState<undefined | string>(undefined);

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['reviews-detail', productId],
    queryFn: ({ pageParam: lastViewedId }) =>
      getReviewsAPI({
        productId: parseInt(productId || '-1'),
        limit: 20,
        lastViewedId,
        sorter,
        score,
        photoOnly,
      }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      const length = lastPage.productReviews.length - 1;
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.productReviews[length].id;
    },
    staleTime: 0,
  });

  const handleSorter = (type: string) => {
    if (sorter === type) {
      setSorter(undefined);
    } else {
      setSorter(type);
    }
  };

  useEffect(() => {
    refetch();
  }, [photoOnly, sorter, score]);

  return (
    <>
      <FilterContainer>
        <FlexBox align="center" gap="1.2rem">
          <CheckBox checked={photoOnly}>
            <input
              type="checkbox"
              checked={photoOnly}
              onChange={(e) => setPhotoOnly(e.currentTarget.checked)}
            />
            <div>
              <FaCheck
                size={12}
                color={theme.color.tint.white}
                style={{
                  visibility: photoOnly ? 'visible' : 'hidden',
                }}
              />
            </div>
            <BoldText
              size={12}
              color={photoOnly ? theme.color.gray.main : theme.color.gray[50]}
            >
              사진/영상
            </BoldText>
          </CheckBox>
          <Line />
          <BoldText
            size={12}
            color={
              sorter === 'RECOMMEND_DESC'
                ? theme.color.gray.main
                : theme.color.gray[50]
            }
            style={{ cursor: 'pointer' }}
            onClick={() => handleSorter('RECOMMEND_DESC')}
          >
            추천순
          </BoldText>
          <Line />
          <BoldText
            size={12}
            color={
              sorter === 'REVIEW_DATE_DESC'
                ? theme.color.gray.main
                : theme.color.gray[50]
            }
            style={{ cursor: 'pointer' }}
            onClick={() => handleSorter('REVIEW_DATE_DESC')}
          >
            최신순
          </BoldText>
        </FlexBox>
        <Filter
          title="필터"
          value={score ? '필터' : null}
          setIsOpenModal={setIsOpenModal}
          hasIcon
        />
      </FilterContainer>
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        {data?.pages?.map((items, firstIdx) => {
          return items?.productReviews.map((item, secondIdx) => (
            <ReviewItem
              key={item.id}
              data={item}
              isLastItem={
                data?.pages.length === firstIdx + 1 &&
                items?.productReviews.length === secondIdx + 1
              }
              isRecommend
            />
          ));
        }) || <></>}
      </InfiniteScroll>
    </>
  );
};

export default ReviewList;

const FilterContainer = styled.div`
  padding: 1.2rem 0;
  margin: 0 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
  border-bottom: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
`;

const Line = styled.div`
  width: 0.1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
`;

const CheckBox = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.8rem;
    height: 1.8rem;
    border: ${({ checked, theme }) =>
      checked ? 'none' : `solid 0.1rem ${theme.color.gray[50]}`};
    background: ${({ checked, theme }) =>
      checked ? theme.color.blue[80] : 'white'};
  }
`;
