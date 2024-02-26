import { styled } from 'styled-components';
import { RowScrollContainer, StarRating } from '.';
import { theme } from '../../styles/theme';
import {
  BoldText,
  FlexBox,
  ProductImg,
  ProfileImg,
  RegularText,
} from '../atoms';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6';
import { ReviewItem } from '../../interfaces/review';
import { formatDate } from '../../utils/format';

const ReviewItem = ({ data, isRecommend, isLastItem }: ReviewItem) => {
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

        <RegularText
          size={14}
          color={theme.color.gray[70]}
          style={{ lineHeight: '150%', padding: '0 1.4rem' }}
        >
          {data?.content}
        </RegularText>

        {isRecommend && (
          <RecommendBtn>
            {data?.recommended ? (
              <FaThumbsUp size={16} color={theme.color.blue.main} />
            ) : (
              <FaRegThumbsUp size={16} color={theme.color.gray[50]} />
            )}
            <RegularText
              size={14}
              color={
                data?.recommended ? theme.color.gray.main : theme.color.gray[50]
              }
            >
              추천 {data?.recommendCount}
            </RegularText>
          </RecommendBtn>
        )}
      </FlexBox>
      {!isLastItem && <Line />}
    </>
  );
};

export default ReviewItem;

const RecommendBtn = styled.button`
  width: 48%;
  padding: 1rem;
  margin: 0 1.4rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const Line = styled.div`
  width: calc(100% - 2.8rem);
  height: 0.05rem;
  margin: 0 1.4rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
`;
