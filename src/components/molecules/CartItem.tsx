import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { FlexBox, MediumText, RegularText, ProductImg } from '../atoms';
import { OptionModal } from '../organisms';
import Confirm from './Confirm';
import { LiaWindowClose } from 'react-icons/lia';
import { FaCheck } from 'react-icons/fa6';
import { CartItem } from '../../interfaces/cart';

const CartItem = ({ data, handleSelectItem }: CartItem) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const getMethod = (method: string) => {
    if (method === 'COMMON') return '일반운송';
    if (method === 'SAFETY') return '안전운송';
    if (method === 'PICKUP') return '직접픽업';
    return 'error';
  };

  const getSex = (sex: string) => {
    if (sex === 'MALE') return '수컷';
    if (sex === 'FEMALE') return '암컷';
    if (sex === 'PICKUP') return '자웅동체';
    return 'error';
  };

  return (
    <>
      <Container>
        <CheckBox checked={data?.checked}>
          <input
            type="checkbox"
            checked={data?.checked}
            onChange={(e) =>
              handleSelectItem(
                data?.storeName,
                data?.id,
                e.currentTarget.checked,
              )
            }
          />
          <div>
            <FaCheck
              size={12}
              color={theme.color.tint.white}
              style={{
                visibility: data?.checked ? 'visible' : 'hidden',
              }}
            />
          </div>
        </CheckBox>
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
                    <MethodTag $method={data?.deliveryMethod}>
                      {getMethod(data?.deliveryMethod)}
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
                        {data?.productPrice.toLocaleString()} 원
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
                    {data?.productDiscountPrice.toLocaleString()} 원
                  </MediumText>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          {data?.deliveryMethod !== 'PICKUP' && (
            <PriceCalculatorBox>
              <MediumText
                size={12}
                color={theme.color.blue[70]}
                style={{ textAlign: 'center' }}
              >
                {`상품금액 ${data?.productDiscountPrice.toLocaleString()} + 
              ${getMethod(data?.deliveryMethod)}비 
              ${data?.deliveryFee.toLocaleString()} = 
              ${(
                data?.productDiscountPrice + data?.deliveryFee
              ).toLocaleString()}`}
              </MediumText>
            </PriceCalculatorBox>
          )}
        </FlexBox>
      </Container>
      {isOpenModal && <OptionModal setIsOpenModal={setIsOpenModal} />}
      {isOpenConfirm && (
        <Confirm
          text="해당 어종을 봉달목록에서 삭제하시겠습니까?"
          setIsOpenConfirm={setIsOpenConfirm}
          handleYes={() => {}}
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

const CheckBox = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: ${({ checked, theme }) =>
      checked ? 'none' : `solid 0.1rem ${theme.color.gray[50]}`};
    background: ${({ checked, theme }) =>
      checked ? theme.color.blue[80] : 'white'};
  }
`;

const MethodTag = styled.div<{ $method: string }>`
  padding: 0.3rem 0.6rem;
  border-radius: 0.6rem;
  background-color: ${({ $method, theme }) =>
    $method === 'COMMON'
      ? theme.color.gray[40]
      : $method === 'SAFETY'
        ? theme.color.blue[80]
        : theme.color.gray.main};
  color: ${({ $method, theme }) =>
    $method === 'COMMON' ? theme.color.gray.main : theme.color.tint.white};
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
