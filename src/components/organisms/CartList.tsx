// import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { BoldText, MediumText, FlexBox } from '../atoms';
import { CartItem } from '../molecules';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

interface CartCategory {
  listData?: any[];
  method: string;
}

const CartCategory = ({ listData, method }: CartCategory) => {
  const getTitle = (method: string) => {
    if (method === 'COMMON') return '일반운송';
    if (method === 'SAFETY') return '안전운송';
    if (method === 'PICKUP') return '직접픽업';
    return 'error';
  };

  return (
    <FlexBox col padding="2rem 1.4rem" gap="2.4rem">
      <MediumText size={18} color={theme.color.gray.main}>
        {getTitle(method)}
      </MediumText>
      {listData?.map((item, idx) => <CartItem key={idx} data={item} />)}
    </FlexBox>
  );
};

const CartList = ({ data }: { data: any }) => {
  // ========= api 연동 시 체크박스 기능 추가 ==========
  //   const [selectAll, setSelectAll] = useState(false);
  //   const [checkboxes, setCheckboxes] = useState([
  //     { id: 1, label: '체크 박스 1', checked: false },
  //     { id: 2, label: '체크 박스 2', checked: false },
  //     { id: 3, label: '체크 박스 3', checked: false },
  //   ]);

  //   const handleSelectAll = () => {
  //     const updatedCheckboxes = checkboxes.map((checkbox) => ({
  //       ...checkbox,
  //       checked: !selectAll,
  //     }));
  //     setCheckboxes(updatedCheckboxes);
  //     setSelectAll(!selectAll);
  //   };

  //   const handleCheckboxChange = (id: number) => {
  //     const updatedCheckboxes = checkboxes.map((checkbox) =>
  //       checkbox.id === id
  //         ? { ...checkbox, checked: !checkbox.checked }
  //         : checkbox,
  //     );
  //     setCheckboxes(updatedCheckboxes);
  //     setSelectAll(updatedCheckboxes.every((checkbox) => checkbox.checked));
  //   };
  const [checked, setChecked] = useState(true);

  return (
    <>
      <FlexBox
        align="center"
        gap="1rem"
        padding="2rem 1.4rem"
        style={{ borderBottom: `0.05rem solid ${theme.color.gray[50]}` }}
      >
        <FlexBox align="center" gap="0.8rem">
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
          <MediumText size={14} color={theme.color.gray.main}>
            전체
          </MediumText>
        </FlexBox>
        <MediumText size={14} color={theme.color.gray.main}>
          1 입양권
        </MediumText>
      </FlexBox>
      <CartCategory listData={data} method="COMMON" />
      <CartCategory listData={data} method="SAFETY" />
      <CartCategory listData={data} method="PICKUP" />
      <FlexBox
        col
        gap="2.4rem"
        padding="1.8rem 1.4rem"
        style={{ borderTop: `0.05rem solid ${theme.color.gray[50]}` }}
      >
        <FlexBox align="center" gap="1.2rem">
          <BoldText size={16} color={theme.color.gray.main}>
            결제할 입양건
          </BoldText>
          <MediumText size={16} color={theme.color.blue[70]}>
            총 1건
          </MediumText>
        </FlexBox>
        <FlexBox
          justify="space-between"
          align="center"
          style={{ width: '100%' }}
        >
          <MediumText size={16} color={theme.color.gray.main}>
            입양 금액
          </MediumText>
          <MediumText size={16} color={theme.color.gray.main}>
            30,000 원
          </MediumText>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default CartList;

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
