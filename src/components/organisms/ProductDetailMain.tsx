import { theme } from '../../styles/theme';
import { FlexBox, BoldText, RegularText } from '../atoms';
import { IoShareSocialOutline } from 'react-icons/io5';
import { styled } from 'styled-components';
import { ProductDetailMain } from '../../interfaces/product';
import { StarRating } from '../molecules';

const ProductDetailMain = ({ data }: ProductDetailMain) => {
  return (
    <FlexBox col gap="1.2rem" padding="1.4rem">
      <FlexBox justify="space-between" align="center" style={{ width: '100%' }}>
        <RegularText size={16} color={theme.color.gray[50]}>
          {data?.storeName}
        </RegularText>
        <IoShareSocialOutline size={22} color={theme.color.gray[50]} />
      </FlexBox>
      <BoldText size={22} color={theme.color.gray.main}>
        {data?.name}
      </BoldText>
      <RegularText size={12} color={theme.color.gray[70]}>
        {data?.category}
      </RegularText>
      <FlexBox align="center" gap="1rem" padding="0.4rem 0 2.8rem 0">
        <StarRating score={data?.reviewAverageScore || 0} size={14} gap={0.2} />
        <RegularText size={12} color={theme.color.gray[50]}>
          {data?.reviewAverageScore.toFixed(1)}
        </RegularText>
        <RegularText size={12} color={theme.color.gray[50]}>
          {data?.reviewCount}개 후기
        </RegularText>
      </FlexBox>
      <FlexBox col gap="0.6rem" style={{ width: '100%' }}>
        <RegularText
          size={16}
          color={theme.color.gray[50]}
          style={{ textDecoration: 'line-through' }}
        >
          {data?.price.toLocaleString()}원
        </RegularText>
        <FlexBox
          justify="space-between"
          align="center"
          style={{ width: '100%' }}
        >
          <BoldText size={24} color={theme.color.gray.main}>
            {data?.discountPrice.toLocaleString()}원
          </BoldText>
          <BoldText size={20} color={theme.color.tint.red}>
            {data?.discountRate}%
          </BoldText>
        </FlexBox>
      </FlexBox>
      <Line style={{ margin: '1.2rem 0' }} />
      <RegularText
        size={16}
        color={theme.color.gray[70]}
        style={{ lineHeight: '160%' }}
      >
        {data?.description}
      </RegularText>
    </FlexBox>
  );
};

export default ProductDetailMain;

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
`;
