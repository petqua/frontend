import styled, { css } from 'styled-components';
import { BoldText, MediumText, RegularText } from '../atoms/Text';
import { theme } from '../../styles/theme';
import ProductImg from '../atoms/ProductImg';

interface ProductListItem {
  isSmall: boolean;
  imgUrl: string;
  store?: string;
  title: string;
  price: string;
  discountRate: string;
  discountedPrice: string;
  like: number;
  review: number;
}

const ProductListItem = ({
  isSmall,
  imgUrl,
  store,
  title,
  price,
  discountRate,
  discountedPrice,
  like,
  review,
}: ProductListItem) => {
  const titleStyle = {
    lineHeight: '150%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  };

  return (
    <Container style={{ width: isSmall ? '120px' : '160px' }}>
      <ProductImg
        size={isSmall ? '120px' : '160px'}
        src={imgUrl || '/public/images/product-item-ex.svg'}
      />

      {!isSmall && (
        <MediumText size={12} color={theme.color.gray[50]}>
          {store || 'S아쿠아'}
        </MediumText>
      )}

      <RegularText
        size={isSmall ? 14 : 16}
        color={theme.color.gray.main}
        style={titleStyle}
      >
        {title || '[대용량] 100% 국내산 호랑이 독 닭가슴살 소장'}
      </RegularText>

      <RegularText
        size={12}
        color={theme.color.gray[60]}
        style={{ textDecoration: 'line-through' }}
      >
        {price || '30,000'}원
      </RegularText>

      <FlexBox>
        <RegularText size={16} color={theme.color.tint.red}>
          {discountRate || 30}%
        </RegularText>
        <BoldText size={16} color={theme.color.gray.main}>
          {discountedPrice || '21,000'}원
        </BoldText>
      </FlexBox>

      <FlexBox>
        <FlexBox>
          <img
            src="/public/icons/bubble-like-filled.svg"
            style={{ width: '8px', height: '8px', backgroundColor: 'beige' }}
          />
          <RegularText
            size={12}
            color={theme.color.blue[70]}
            style={{ fontWeight: '300' }}
          >
            {like || 23}
          </RegularText>
        </FlexBox>
        <FlexBox style={{ gap: '4px' }}>
          <img
            src="/public/icons/bubble-like-filled.svg"
            style={{ width: '8px', height: '8px' }}
          />
          <RegularText
            size={12}
            color={theme.color.blue.main}
            style={{ fontWeight: '300' }}
          >
            {review || 23}
          </RegularText>
        </FlexBox>
      </FlexBox>
    </Container>
  );
};

export default ProductListItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
