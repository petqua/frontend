import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { BoldText, MediumText, FlexBox, RegularText, CheckBox } from '../atoms';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { CartList } from '../../interfaces/cart';
import { CartStoreSection } from '../molecules';
import { useCartStore } from '../../states';

const CartList = ({ checkedItemData }: CartList) => {
  const { items, setItems } = useCartStore();
  const {
    totalCount,
    totalOriginalPrice,
    totalDiscountedPrices,
    totalCommonDeliveryFees,
    totalSafetyDeliveryFees,
  } = checkedItemData;
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const totalItemCount = items?.reduce(
    (total, store) => total + store.items.length,
    0,
  );

  // 체크박스 선택 기능
  const [selectAll, setSelectAll] = useState(true);

  const handleSelectAll = () => {
    const newData = items?.map((store) => ({
      ...store,
      checked: !selectAll,
      items: store.items.map((item) => ({
        ...item,
        checked: !selectAll,
      })),
    }));

    setSelectAll(!selectAll);
    setItems(newData);
  };

  const handleSelectStore = (storeName: string, value: boolean) => {
    const newData = items?.map((store) =>
      store.storeName === storeName
        ? {
            ...store,
            items: store.items.map((item) => ({ ...item, checked: value })),
            checked: value,
          }
        : store,
    );

    setSelectAll(newData?.every((item) => item.checked));
    setItems(newData);
  };

  const handleSelectItem = (
    storeName: string,
    itemId: number,
    value: boolean,
  ) => {
    const newData = [...items];
    const storeIndex = newData.findIndex(
      (store) => store.storeName === storeName,
    );
    if (storeIndex !== -1) {
      const itemIndex = newData[storeIndex].items.findIndex(
        (item) => item.id === itemId,
      );
      if (itemIndex !== -1) {
        newData[storeIndex].items[itemIndex].checked = value;

        const allItemsChecked = newData[storeIndex].items.every(
          (item) => item.checked,
        );

        newData[storeIndex].checked = allItemsChecked;
        setItems(newData);
        setSelectAll(newData.every((store) => store.checked));
      }
    }
  };

  return (
    <FlexBox col gap="2rem">
      <FlexBox
        align="center"
        gap="1rem"
        padding="2rem 1.4rem"
        fullWidth
        style={{ borderBottom: `0.05rem solid ${theme.color.gray[50]}` }}
      >
        <FlexBox align="center" gap="0.8rem">
          <CheckBox checked={selectAll} onChange={handleSelectAll} />
          <MediumText size={14} color={theme.color.gray.main}>
            전체
          </MediumText>
        </FlexBox>
        <MediumText size={14} color={theme.color.gray.main}>
          {totalItemCount} 입양건
        </MediumText>
      </FlexBox>
      {items?.map((el: any, idx: number) => (
        <CartStoreSection
          key={idx}
          data={el}
          handleSelectStore={handleSelectStore}
          handleSelectItem={handleSelectItem}
          storeIdx={idx}
        />
      ))}
      <FlexBox
        col
        gap="1rem"
        padding="1.8rem 1.4rem"
        fullWidth
        style={{ borderTop: `0.05rem solid ${theme.color.gray[50]}` }}
      >
        <FlexBox align="center" gap="1.2rem" style={{ marginBottom: '1.4rem' }}>
          <BoldText size={16} color={theme.color.gray.main}>
            결제할 입양건
          </BoldText>
          <MediumText size={16} color={theme.color.blue[70]}>
            총 {totalCount}건
          </MediumText>
        </FlexBox>
        <FlexBox justify="space-between" align="center" fullWidth>
          <MediumText size={12} color={theme.color.gray.main}>
            총 입양 금액
          </MediumText>
          <MediumText size={12} color={theme.color.gray.main}>
            {totalOriginalPrice?.toLocaleString()} 원
          </MediumText>
        </FlexBox>
        <FlexBox justify="space-between" align="center" fullWidth>
          <MediumText size={12} color={theme.color.gray.main}>
            할인 금액
          </MediumText>
          <MediumText size={12} color={theme.color.tint.red}>
            {`-
            ${(totalOriginalPrice - totalDiscountedPrices)?.toLocaleString()}
            원`}
          </MediumText>
        </FlexBox>
        <FlexBox
          justify="space-between"
          align={isOpenToggle ? 'flex-end' : 'center'}
          fullWidth
        >
          <FlexBox col gap="1rem">
            <FlexBox gap="0.6rem" align="center">
              <MediumText size={12} color={theme.color.gray.main}>
                운송비
              </MediumText>
              {totalCommonDeliveryFees + totalSafetyDeliveryFees !== 0 && (
                <ToggleButton
                  onClick={() => setIsOpenToggle((prev) => !prev)}
                  $isOpenToggle={isOpenToggle}
                >
                  <IoIosArrowDown size={10} color={theme.color.gray[60]} />
                </ToggleButton>
              )}
            </FlexBox>
            {isOpenToggle && (
              <FlexBox col gap="0.6rem">
                <RegularText
                  size={12}
                  color={theme.color.gray[50]}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  • 일반운송비 &nbsp;&nbsp;-----------&nbsp;&nbsp; +{' '}
                  {totalCommonDeliveryFees?.toLocaleString()}
                </RegularText>
                <RegularText
                  size={12}
                  color={theme.color.gray[50]}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  • 안전운송비 &nbsp;&nbsp;-----------&nbsp;&nbsp; +{' '}
                  {totalSafetyDeliveryFees?.toLocaleString()}
                </RegularText>
              </FlexBox>
            )}
          </FlexBox>
          <MediumText size={12} color={theme.color.gray.main}>
            {(
              totalCommonDeliveryFees + totalSafetyDeliveryFees
            )?.toLocaleString()}{' '}
            원
          </MediumText>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default CartList;

const ToggleButton = styled.button<{ $isOpenToggle: boolean }>`
  padding: 0.2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray[30]};
  transform: ${({ $isOpenToggle }) => ($isOpenToggle ? 'rotate(180deg)' : '')};
`;
