import styled from 'styled-components';
import { BoldText } from '../atoms';
import { theme } from '../../styles/theme';
import { CartFish } from '../molecules';
import { memo } from 'react';
import { CartItemDetails } from '../../interfaces/payment';

const Container = styled.div`
  padding: 2.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface CartFishListProps {
  cartData: Array<CartItemDetails>;
}

const CartFishList = memo(({ cartData }: CartFishListProps) => {
  return (
    <Container>
      <BoldText size={18} color={theme.color.gray.main}>
        어종정보
      </BoldText>
      {Array.isArray(cartData) &&
        cartData?.length > 0 &&
        cartData.map((item) => <CartFish key={item.id} {...item} />)}
    </Container>
  );
});

CartFishList.displayName = 'CartFishList';

export default CartFishList;
