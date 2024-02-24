import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { FlexBox, MediumText, RegularText, ProductImg } from '../atoms';
import { OptionModal } from '../organisms';
import Confirm from './Confirm';
import { LiaWindowClose } from 'react-icons/lia';
import { FaCheck } from 'react-icons/fa6';

const CartItem = ({ data }: { data: any }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [checked, setChecked] = useState(true);

  return (
    <>
      <FlexBox padding="1.2rem 0" gap="0.6rem" fullWidth>
        <CheckBox checked={checked}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
          <div>
            <FaCheck
              size={12}
              color={theme.color.tint.white}
              style={{
                visibility: checked ? 'visible' : 'hidden',
              }}
            />
          </div>
        </CheckBox>
        <FlexBox gap="1.2rem" align="center" style={{ flex: 1 }}>
          <ProductImg size="9rem" src={data?.productThumbnailUrl} />
          <FlexBox
            col
            justify="space-between"
            style={{ flex: 1, minHeight: '9rem' }}
          >
            <FlexBox justify="space-between" fullWidth>
              <FlexBox col gap="0.4rem" style={{ flex: 1 }}>
                <RegularText size={12} color={theme.color.gray[50]}>
                  {data?.storeName}
                </RegularText>
                <MediumText
                  size={16}
                  color={theme.color.gray.main}
                  style={{ lineHeight: '120%' }}
                >
                  {data?.productName}
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
                  마릿수 {data?.quantity} | {data?.isMale ? '수컷' : '암컷'}
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
                <MediumText size={18} color={theme.color.gray.main}>
                  {data?.productDiscountPrice.toLocaleString()} 원
                </MediumText>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
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
