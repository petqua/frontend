import styled from 'styled-components';
import { CartItemDetails } from '../../interfaces/payment';
import React from 'react';
import { FlexBox, MediumText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';

const Container = styled.div`
  padding: 1.2rem 0.7rem;
  display: flex;
  gap: 1.4rem;
`;

const ImageBox = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.color.gray[30]};
  border-radius: 0.5rem;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: contain;
  }
`;

const CartFish = React.memo((props: CartItemDetails) => {
  const {
    productThumbnailUrl,
    storeName,
    productName,
    quantity,
    isMale,
    isOnSale,
    productDiscountRate,
    productDiscountPrice,
    productPrice,
  } = props;
  return (
    <Container>
      <ImageBox>
        <img src={productThumbnailUrl} alt={productName} />
      </ImageBox>
      <FlexBox col gap="0.8rem" style={{ flex: 1 }}>
        <RegularText size={14} color={theme.color.gray[50]}>
          {storeName}
        </RegularText>
        <MediumText size={18} color={theme.color.gray.main}>
          {productName}
        </MediumText>
        <RegularText size={14} color={theme.color.gray[50]}>
          마릿수 {quantity} | {isMale ? '수컷' : '암컷'}
        </RegularText>
        <FlexBox gap="0.8rem" style={{ width: '100%' }}>
          {isOnSale && (
            <>
              <MediumText size={12} color={theme.color.tint.red}>
                [{productDiscountRate}%]
              </MediumText>
              <RegularText
                size={14}
                color={isOnSale ? theme.color.gray[50] : theme.color.gray.main}
                style={{ textDecoration: 'line-through' }}
              >
                {productPrice.toLocaleString()} 원
              </RegularText>
            </>
          )}
          <MediumText
            size={18}
            color={theme.color.gray.main}
            style={{ marginLeft: 'auto' }}
          >
            {productDiscountPrice.toLocaleString()} 원
          </MediumText>
        </FlexBox>
      </FlexBox>
    </Container>
  );
});

CartFish.displayName = 'CartFish';

export default CartFish;
