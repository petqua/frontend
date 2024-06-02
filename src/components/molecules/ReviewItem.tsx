import { styled } from 'styled-components';
import { RowScrollContainer, StarRating } from '.';
import { theme } from '../../styles/theme';
import {
  BoldText,
  FlexBox,
  ProductImg,
  ProfileImg,
  RecommendButton,
  RegularText,
} from '../atoms';
import { ReviewItem } from '../../interfaces/review';
import { formatDate } from '../../utils/format';
import { useMutation } from '@tanstack/react-query';
import { postReviewRecommendAPI } from '../../apis';
import { useState } from 'react';

const ReviewItem = ({ data, isRecommend, isLastItem }: ReviewItem) => {
  const [showRecommended, setShowRecommended] = useState(data?.recommended);
  const [showRecommendCount, setShowRecommendCount] = useState(
    data?.recommendCount,
  );

  const { mutate } = useMutation({
    mutationFn: () => postReviewRecommendAPI(data?.id),
    onSuccess: () => {
      setShowRecommended((prev) => !prev);
      showRecommended
        ? setShowRecommendCount((prev) => prev - 1)
        : setShowRecommendCount((prev) => prev + 1);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <>
      <FlexBox col padding="2.4rem 0" gap="1.6rem" style={{ width: '100%' }}>
        <FlexBox
          align="center"
          gap="1.6rem"
          padding="0 1.4rem"
          style={{ width: '100%' }}
        >
          <ProfileImg size={4.4} url={data?.reviewerProfileImageUrl} />
          <FlexBox justify="space-between" style={{ flex: '1' }}>
            <FlexBox col gap="0.4rem">
              <FlexBox gap="0.8rem" align="center">
                <BoldText size={16} color={theme.color.gray[70]}>
                  {data?.reviewerName}
                </BoldText>
                <StarRating size={10} gap={0.1} score={data?.score} />
              </FlexBox>
              <RegularText size={12} color={theme.color.gray[50]}>
                수조 {data?.reviewerFishBowlCount}개 | 구피 양육{' '}
                {data?.reviewerYears}년차
              </RegularText>
            </FlexBox>
            <RegularText size={14} color={theme.color.gray[50]}>
              {formatDate(data?.createdAt)}
            </RegularText>
          </FlexBox>
        </FlexBox>

        {data?.images.length !== 0 && (
          <RowScrollContainer gap="0.8rem" row={1} col={5}>
            {data?.images.map((item, idx) => (
              <ProductImg key={idx} size="12rem" src={item} />
            ))}
          </RowScrollContainer>
        )}

        <FlexBox col padding="0 1.4rem" gap="1.6rem" fullWidth>
          <RegularText
            size={14}
            color={theme.color.gray[70]}
            style={{ lineHeight: '150%' }}
          >
            {data?.content}
          </RegularText>

          {isRecommend && (
            <RecommendButton
              recommended={showRecommended}
              count={showRecommendCount}
              onClick={mutate}
              isMargin
            />
          )}
        </FlexBox>
      </FlexBox>
      {!isLastItem && <Line />}
    </>
  );
};

export default ReviewItem;

const Line = styled.div`
  width: calc(100% - 2.8rem);
  height: 0.05rem;
  margin: 0 1.4rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
`;
