import styled from 'styled-components';
import { CartItemDetails } from '../../interfaces/payment';
import { memo } from 'react';
import { FlexBox, MediumText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';
import {
  getBackgroundColor,
  getKoreanDeliveryMethod,
  getSex,
  getTextColor,
} from '../../utils/delivery';

const Container = styled.div`
  padding: 1rem 1.7rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.color.tint.white};
  border-radius: 1.2rem;
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

const DeliveryMethodBox = styled.div<{ $method: string }>`
  background-color: ${({ $method }) => getBackgroundColor($method)};
  color: ${({ $method }) => getTextColor($method)};
  ${({ theme }) => theme.font.bold10}
  border-radius: 0.6rem;
  padding: 0.2rem 0.45rem;
  min-width: 4.5rem;
`;

const PriceInfoContainer = styled.div`
  border-radius: 3rem;
  border: 0.05rem solid ${({ theme }) => theme.color.blue[70]};
  padding: 0.7rem 2.3rem;
  ${({ theme }) => theme.font.medium12}
  color: ${({ theme }) => theme.color.blue[70]};
  text-align: center;
`;

const CartFish = memo((props: CartItemDetails) => {
  const {
    productThumbnailUrl,
    productName,
    quantity,
    sex,
    isOnSale,
    productDiscountRate,
    productDiscountPrice,
    productPrice,
    deliveryMethod,
    deliveryFee,
  } = props;

  const totalPrice = productDiscountPrice + deliveryFee;
  return (
    <Container>
      <FlexBox gap="1rem">
        <ImageBox>
          <img src={productThumbnailUrl} alt={productName} />
        </ImageBox>
        <FlexBox col gap="1.1rem" padding="1.3rem 0" style={{ flex: 1 }}>
          <FlexBox gap="0.6rem" align="center">
            <MediumText size={16} color={theme.color.gray.main}>
              {productName}
            </MediumText>
            <DeliveryMethodBox $method={deliveryMethod}>
              {getKoreanDeliveryMethod(deliveryMethod)}
            </DeliveryMethodBox>
          </FlexBox>
          <RegularText
            size={12}
            color={theme.color.gray[50]}
            style={{ marginTop: '1.3rem' }}
          >
            {quantity}마리 | {getSex(sex)}
          </RegularText>
          <FlexBox gap="0.8rem" fullWidth>
            {isOnSale && (
              <>
                <MediumText size={12} color={theme.color.tint.red}>
                  [{productDiscountRate}%]
                </MediumText>
                <RegularText
                  size={12}
                  color={
                    isOnSale ? theme.color.gray[50] : theme.color.gray.main
                  }
                  style={{ textDecoration: 'line-through' }}
                >
                  {productPrice.toLocaleString()} 원
                </RegularText>
              </>
            )}
            <MediumText
              size={14}
              color={theme.color.gray.main}
              style={{ marginLeft: 'auto' }}
            >
              {productDiscountPrice.toLocaleString()} 원
            </MediumText>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      {deliveryMethod !== 'PICKUP' && (
        <PriceInfoContainer>
          상품금액 {productDiscountPrice.toLocaleString()} 원 +{' '}
          {getKoreanDeliveryMethod(deliveryMethod)}비{' '}
          {deliveryFee.toLocaleString()} 원 = {totalPrice.toLocaleString()} 원
        </PriceInfoContainer>
      )}
    </Container>
  );
});

CartFish.displayName = 'CartFish';

export default CartFish;
