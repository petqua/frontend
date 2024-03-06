import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { BoldText, MediumText, FlexBox, CheckBox } from '../atoms';
import { CartItem } from '../molecules';
import { CartStoreSection } from '../../interfaces/cart';

const CartStoreSection = ({
  data,
  handleSelectStore,
  handleSelectItem,
}: CartStoreSection) => {
  const checkedItemsPrice = data.items.reduce((total, item) => {
    return (
      total + (item.checked ? item.productDiscountPrice + item.deliveryFee : 0)
    );
  }, 0);

  return (
    <Container>
      <FlexBox align="center" gap="1rem" padding="0 0.8rem">
        <CheckBox
          checked={data?.checked}
          onChange={(e) =>
            handleSelectStore(data.storeName, e?.currentTarget.checked || false)
          }
        />

        <BoldText size={16} color={theme.color.gray.main}>
          {data.storeName}
        </BoldText>
      </FlexBox>
      {data.items?.map((item: any, idx: number) => (
        <CartItem key={idx} data={item} handleSelectItem={handleSelectItem} />
      ))}
      <FlexBox justify="flex-end" align="center" gap="1.8rem" fullWidth>
        <MediumText size={14} color={theme.color.gray[70]}>
          총 입양금액
        </MediumText>
        <BoldText size={18} color={theme.color.blue[80]}>
          {checkedItemsPrice.toLocaleString()}원
        </BoldText>
      </FlexBox>
    </Container>
  );
};

export default CartStoreSection;

const Container = styled.section`
  width: calc(100% - 1.6rem);
  margin: 0 0.8rem;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 0.6rem;
  gap: 1.8rem;
  border-radius: 1.4rem;
  background: ${({ theme }) => theme.color.blue[10]};
`;
