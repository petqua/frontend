import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import {
  FlexBox,
  MediumText,
  RegularText,
  ProductImg,
  CheckBox,
} from '../atoms';
import { OptionModal } from '../organisms';
import Confirm from './Confirm';
import { LiaWindowClose } from 'react-icons/lia';
import { CartItem } from '../../interfaces/cart';
import {
  getKoreanDeliveryMethod,
  getSex,
  getBackgroundColor,
  getTextColor,
} from '../../utils/delivery';
import { deleteCartsAPI } from '../../apis';
import { useMutation } from '@tanstack/react-query';
import { useCartStore } from '../../states';

const CartItem = ({ data, handleSelectItem }: CartItem) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const calculatedPrice = {
    productPrice: data?.productPrice * data?.quantity,
    productDiscountPrice: data?.productDiscountPrice * data?.quantity,
  };
  const { items, setItems } = useCartStore();

  const { mutate } = useMutation({
    mutationKey: ['deleteCarts', data?.id],
    mutationFn: () => deleteCartsAPI(data?.id || 0),
    onSuccess: () => {
      const changedItems = items
        .map((store) => {
          if (store.storeName === data.storeName) {
            const deletedItems = store.items.filter(
              (item) => item.id !== data.id,
            );
            return {
              ...store,
              items: deletedItems,
            };
          } else {
            return store;
          }
        })
        .filter((store) => store.items.length !== 0);
      setItems(changedItems);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <>
      <Container>
        <CheckBox
          checked={data?.checked}
          onChange={(e) =>
            handleSelectItem(
              data?.storeName,
              data?.id || 0,
              e?.currentTarget.checked || false,
            )
          }
        />
        <FlexBox col gap="1.6rem" style={{ flex: 1 }}>
          <FlexBox gap="1rem" align="center" fullWidth>
            <ProductImg size="9.6rem" src={''} />
            <FlexBox
              col
              justify="space-between"
              style={{ flex: 1, minHeight: '9rem' }}
            >
              <FlexBox justify="space-between" fullWidth>
                <FlexBox col gap="0.4rem" style={{ flex: 1 }}>
                  <MediumText
                    size={16}
                    color={theme.color.gray.main}
                    style={{ lineHeight: '120%' }}
                  >
                    {data?.productName}
                    <MethodTag $method={data?.deliveryMethod || ''}>
                      {getKoreanDeliveryMethod(data?.deliveryMethod || '')}
                    </MethodTag>
                  </MediumText>
                </FlexBox>
                <LiaWindowClose
                  size={18}
                  color={theme.color.gray[50]}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsOpenConfirm(true)}
                />
              </FlexBox>

              <FlexBox col gap="0.8rem" fullWidth>
                <FlexBox justify="space-between" align="center" fullWidth>
                  <RegularText size={12} color={theme.color.gray[50]}>
                    {data?.quantity}마리 | {getSex(data?.sex)}
                  </RegularText>
                  {data?.productDiscountRate && (
                    <FlexBox align="center" gap="0.4rem">
                      <MediumText size={12} color={theme.color.tint.red}>
                        [{data?.productDiscountRate}%]
                      </MediumText>
                      <RegularText
                        size={12}
                        color={theme.color.gray[50]}
                        style={{ textDecoration: 'line-through' }}
                      >
                        {calculatedPrice.productPrice.toLocaleString()} 원
                      </RegularText>
                    </FlexBox>
                  )}
                </FlexBox>

                <FlexBox justify="space-between" align="center" fullWidth>
                  <OptionButton onClick={() => setIsOpenModal(true)}>
                    <RegularText size={12} color={theme.color.gray[50]}>
                      옵션변경
                    </RegularText>
                  </OptionButton>
                  <MediumText size={14} color={theme.color.gray.main}>
                    {calculatedPrice.productDiscountPrice.toLocaleString()} 원
                  </MediumText>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          {data?.deliveryMethod !== 'PICK_UP' && (
            <PriceCalculatorBox>
              <MediumText
                size={12}
                color={theme.color.blue[70]}
                style={{ textAlign: 'center' }}
              >
                {`상품금액 ${calculatedPrice.productDiscountPrice.toLocaleString()} + 
              ${getKoreanDeliveryMethod(data?.deliveryMethod || '')}비 
              ${data?.deliveryFee.toLocaleString()} = 
              ${(
                calculatedPrice.productDiscountPrice + data?.deliveryFee
              ).toLocaleString()}`}
              </MediumText>
            </PriceCalculatorBox>
          )}
        </FlexBox>
      </Container>
      {isOpenModal && (
        <OptionModal setIsOpenModal={setIsOpenModal} data={data} isEdit />
      )}
      {isOpenConfirm && (
        <Confirm
          text="해당 어종을 봉달목록에서 삭제하시겠습니까?"
          setIsOpenConfirm={setIsOpenConfirm}
          handleYes={mutate}
        />
      )}
    </>
  );
};

export default CartItem;

const Container = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 1rem 0.8rem;
  gap: 0.6rem;
  width: 100%;
  background-color: white;
  border-radius: 1.2rem;
`;

const OptionButton = styled.button`
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
`;

const MethodTag = styled.span<{ $method: string }>`
  padding: 0.3rem 0.6rem;
  border-radius: 0.6rem;
  background-color: ${({ $method }) => getBackgroundColor($method)};
  color: ${({ $method }) => getTextColor($method)};
  font-size: 1rem;
  font-weight: 700;
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.4rem;
  line-height: 1;
  margin-bottom: 0.2rem;
`;

const PriceCalculatorBox = styled.div`
  width: 100%;
  border-radius: 3rem;
  border: 0.05rem solid ${({ theme }) => theme.color.blue[70]};
  padding: 0.6rem;
`;
