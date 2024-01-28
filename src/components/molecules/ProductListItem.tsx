import { theme } from '../../styles/theme';
import {
  LightText,
  RegularText,
  MediumText,
  BoldText,
  ProductImg,
  FlexBox,
} from '../atoms';

interface ProductListItemData {
  imgUrl: string;
  store?: string;
  title: string;
  price: string;
  discountRate: string;
  discountedPrice: string;
  like?: number;
  review?: number;
}
interface ProductListItem {
  isMain?: boolean;
  isSmall?: boolean;
  data: ProductListItemData;
}

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
        src={data.imgUrl}
      />

      <FlexBox col gap="0.8rem" style={{ width: isMain ? '14rem' : '' }}>
        {!isSmall && (
          <MediumText size={isMain ? 16 : 12} color={theme.color.gray[50]}>
            {data.store || 'S아쿠아'}
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
          {data.title || '[대용량] 100% 국내산 호랑이 독 닭가슴살 소장'}
        </MediumText>

        <RegularText
          size={isMain ? 14 : 12}
          color={theme.color.gray[60]}
          style={{ textDecoration: 'line-through' }}
        >
          {data.price || '30,000'}원
        </RegularText>

        <FlexBox align="center" gap="0.8rem">
          <RegularText size={16} color={theme.color.tint.red}>
            {data.discountRate || 30}%
          </RegularText>
          <BoldText size={16} color={theme.color.gray.main}>
            {data.discountedPrice || '21,000'}원
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
                {data.like || 23}
              </LightText>
            </FlexBox>
            <FlexBox align="center" gap="0.4rem">
              <img
                src="/public/icons/bubble-like-filled.svg"
                style={{ width: '0.8rem', height: '0.8rem' }}
              />
              <LightText size={12} color={theme.color.blue.main}>
                {data.review || 23}
              </LightText>
            </FlexBox>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default ProductListItem;
