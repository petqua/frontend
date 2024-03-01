import styled from 'styled-components';
import { BoldText } from '../atoms';
import { theme } from '../../styles/theme';
import { memo } from 'react';
import { CartItemDetails } from '../../interfaces/payment';
import { CartFishListByStoreName } from '.';

const Container = styled.div`
  padding: 2.4rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

interface CartFishListProps {
  cartData: Array<CartItemDetails>;
}

const CartFishList = memo(({ cartData }: CartFishListProps) => {
  const classifiedByStoreName = cartData.reduce(
    (acc, item) => {
      // 현재 아이템의 storeName이 acc 객체에 키로 존재하지 않으면 새 배열을 생성
      if (!acc[item.storeName]) {
        acc[item.storeName] = [];
      }

      // 현재 아이템을 해당 storeName의 배열에 추가
      acc[item.storeName].push(item);

      return acc;
    },
    {} as Record<string, Array<CartItemDetails>>,
  );
  const classifiedArray = Object.keys(classifiedByStoreName).map(
    (storeName) => ({
      storeName,
      items: classifiedByStoreName[storeName],
    }),
  );

  return (
    <Container>
      <BoldText
        size={18}
        color={theme.color.gray.main}
        style={{ marginLeft: '1.4rem', marginBottom: '1.2rem' }}
      >
        어종 정보
      </BoldText>
      {classifiedArray.map(({ storeName, items }, idx) => (
        <CartFishListByStoreName
          key={idx}
          storeName={storeName}
          cartData={items}
        />
      ))}
    </Container>
  );
});

CartFishList.displayName = 'CartFishList';

export default CartFishList;
