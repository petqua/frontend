import styled from 'styled-components';
import { CartItemDetails } from '../../interfaces/payment';
import { CartFish } from '../molecules';
import { BoldText, FlexBox, MediumText } from '../atoms';
import { theme } from '../../styles/theme';

const Container = styled.section`
  background-color: ${({ theme }) => theme.color.blue[10]};
  padding: 1.8rem 1.2rem 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

interface CartFishListByStoreName {
  storeName: string;
  cartData: Array<CartItemDetails>;
}

const CartFishListByStoreName = ({
  storeName,
  cartData,
}: CartFishListByStoreName) => {
  const totalPaymentPrice = cartData.reduce(
    (acc, { productDiscountPrice, deliveryFee }) =>
      acc + productDiscountPrice + deliveryFee,
    0,
  );
  return (
    <Container>
      <BoldText size={16} color={theme.color.gray.main}>
        {storeName}
      </BoldText>
      {Array.isArray(cartData) &&
        cartData?.length > 0 &&
        cartData.map((item) => <CartFish key={item.id} {...item} />)}
      <FlexBox gap="1.8rem" align="end" style={{ marginLeft: 'auto' }}>
        <MediumText size={14} color={theme.color.gray[70]}>
          총 입양급액
        </MediumText>
        <BoldText size={18} color={theme.color.blue[80]}>
          {totalPaymentPrice.toLocaleString()}원
        </BoldText>
      </FlexBox>
    </Container>
  );
};

export default CartFishListByStoreName;
