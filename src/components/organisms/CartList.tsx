import { theme } from '../../styles/theme';
import { MediumText, FlexBox, CheckBox } from '../atoms';
import { useState } from 'react';
import { CartList } from '../../interfaces/cart';
import { CartStoreSection } from '../molecules';
import { useCartStore } from '../../states';

import { TotalPayInfo } from '.';

const CartList = ({ checkedItemData }: CartList) => {
  const { items, setItems } = useCartStore();
  const {
    totalCount,
    totalOriginalPrice,
    totalDiscountedPrices,
    totalCommonDeliveryFees,
    totalSafetyDeliveryFees,
  } = checkedItemData;

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
      <TotalPayInfo
        title="결제할 입양건"
        count={totalCount}
        originalPrice={totalOriginalPrice}
        discountPrices={totalOriginalPrice - totalDiscountedPrices}
        commonDeliveryFees={totalCommonDeliveryFees}
        safetyDeliveryFees={totalSafetyDeliveryFees}
      />
    </FlexBox>
  );
};

export default CartList;
