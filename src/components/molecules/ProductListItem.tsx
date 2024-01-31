import { theme } from '../../styles/theme';
import {
  LightText,
  RegularText,
  MediumText,
  BoldText,
  ProductImg,
  FlexBox,
} from '../atoms';
import { ProductListItem } from '../../interfaces/product';
import { formatPrice } from '../../utils/format';

const ProductListItem = ({ isMain, isSmall, data }: ProductListItem) => {
  return (
    <FlexBox
      col={!isMain}
      align={isMain ? 'center' : ''}
      gap={isMain ? '2.4rem' : '0.8rem'}
      style={{
        width: isMain ? '100%' : isSmall ? '12rem' : '16rem',
        padding: isMain ? '0 1.2rem' : '0',
      }}
    >
      <ProductImg
        size={isMain ? '16.8rem' : isSmall ? '12rem' : '16rem'}
        src={data?.thumbnailUrl}
      />

      <FlexBox col gap="0.8rem" style={{ width: isMain ? '14rem' : '' }}>
        {!isSmall && (
          <MediumText size={isMain ? 16 : 12} color={theme.color.gray[50]}>
            {data?.storeName}
          </MediumText>
        )}

        <MediumText
          size={isMain ? 20 : isSmall ? 14 : 16}
          color={theme.color.gray.main}
          // 두 줄 이상 텍스트 넘어가면 말줄임표
          style={{
            lineHeight: '150%',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            marginBottom: isMain ? '1.2rem' : '',
          }}
        >
          {data?.name}
        </MediumText>

        <RegularText
          size={isMain ? 14 : 12}
          color={theme.color.gray[60]}
          style={{ textDecoration: 'line-through' }}
        >
          {formatPrice(data?.price)}원
        </RegularText>

        <FlexBox align="center" gap="0.8rem">
          <RegularText size={16} color={theme.color.tint.red}>
            {data?.discountRate}%
          </RegularText>
          <BoldText size={16} color={theme.color.gray.main}>
            {formatPrice(data?.discountPrice)}원
          </BoldText>
        </FlexBox>

        {!isMain && (
          <FlexBox align="center" gap="0.8rem">
            <FlexBox align="center" gap="0.4rem">
              <img
                src="/public/icons/bubble-like-filled.svg"
                style={{ width: '0.8rem', height: '0.8rem' }}
              />
              <LightText size={12} color={theme.color.blue[70]}>
                {data?.wishCount}
              </LightText>
            </FlexBox>
            <FlexBox align="center" gap="0.4rem">
              <img
                src="/public/icons/bubble-like-filled.svg"
                style={{ width: '0.8rem', height: '0.8rem' }}
              />
              <LightText size={12} color={theme.color.blue.main}>
                {data?.reviewCount}
              </LightText>
            </FlexBox>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default ProductListItem;
