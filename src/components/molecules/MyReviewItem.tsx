import { RowScrollContainer, StarRating } from '.';
import { theme } from '../../styles/theme';
import {
  BoldText,
  FlexBox,
  MediumText,
  MethodTag,
  ProductImg,
  RecommendButton,
  RegularText,
} from '../atoms';
import { useState } from 'react';

interface MyReviewItem {
  data: any;
}

const MyReviewItem = ({ data }: MyReviewItem) => {
  const [recommended, setRecommended] = useState(data.recommended);
  const onClickRecommend = () => {
    setRecommended(!recommended);
  };

  return (
    <FlexBox col gap="1rem" fullWidth>
      {/* Top Info */}
      <BoldText
        size={16}
        color={theme.color.gray[60]}
        style={{ padding: '0 1.4rem' }}
      >
        {data.confirmDate} &nbsp; 구매확정
      </BoldText>
      <FlexBox padding="0.8rem 1.4rem 0 1.4rem" gap="1rem" fullWidth>
        <ProductImg size="7.2rem" src="" borderRadius={0.4} />
        <FlexBox
          col
          justify="space-between"
          padding="0.4rem 0"
          style={{ flex: 1, height: '7.2rem' }}
        >
          <FlexBox col gap="0.8rem">
            <RegularText size={12} color={theme.color.gray[50]}>
              {data.storeName}
            </RegularText>
            <FlexBox align="center" gap="0.4rem">
              <MediumText size={16} color={theme.color.gray.main}>
                {data.name}
              </MediumText>
              <MethodTag deliveryMethod={data.deliveryMethod} />
            </FlexBox>
          </FlexBox>
          <FlexBox col gap="0.8rem">
            <RegularText size={12} color={theme.color.gray[50]}>
              {data.count}마리 | {data.sex}
            </RegularText>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      {/* Review Images */}
      {data.reviewImg.length !== 0 && (
        <RowScrollContainer row={1} col={data.reviewImg.length} gap="0.8rem">
          {data.reviewImg.map((item: string) => (
            <ProductImg size="14rem" src={item} borderRadius={0.4} />
          ))}
        </RowScrollContainer>
      )}

      {/* Bottom Info */}
      <FlexBox col fullWidth padding="0rem 1.4rem" gap="1rem">
        <StarRating score={5} size={10} gap={0.1} />
        <RegularText
          size={14}
          color={theme.color.gray.main}
          style={{ lineHeight: '150%' }}
        >
          {data.text}
        </RegularText>
        <RecommendButton
          recommended={recommended}
          count={data.recommendCount}
          onClick={onClickRecommend}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default MyReviewItem;
