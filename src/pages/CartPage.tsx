import styled from 'styled-components';
import { FlexBox, RegularText } from '../components/atoms';
import { BlueButton, TopNav } from '../components/molecules';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { CartList } from '../components/organisms';
import { CartItemData, CheckedItemData } from '../interfaces/cart';
import { useQuery } from '@tanstack/react-query';
import { getCartsAPI } from '../apis';
import { useCartStore } from '../states';
import { useEffect } from 'react';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, setItems } = useCartStore();

  const { data: cartData, status } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartsAPI,
    staleTime: 0,
    select: (data) => {
      const classifiedByStoreName = data
        ?.map((item) => ({ ...item, checked: true }))
        .reduce(
          (acc, item) => {
            // 현재 아이템의 storeName이 acc 객체에 키로 존재하지 않으면 새 배열을 생성
            if (!acc[item.storeName]) {
              acc[item.storeName] = [];
            }

            // 현재 아이템을 해당 storeName의 배열에 추가
            acc[item.storeName].push(item);

            return acc;
          },
          {} as Record<string, CartItemData[]>,
        );
      const classifiedArray = Object.keys(classifiedByStoreName).map(
        (storeName) => ({
          storeName,
          items: classifiedByStoreName[storeName],
          checked: true,
        }),
      );
      return classifiedArray;
    },
  });

  useEffect(() => {
    setItems(cartData || []);
  }, [status]);

  const checkedItemData = items
    ? items.reduce(
        (total, store) => {
          const checkedItems = store.items.filter((item) => item.checked);
          // 선택된 상품의 원가
          const originalPrices = checkedItems.reduce((totalPrice, item) => {
            return totalPrice + (item?.productPrice * item?.quantity || 0);
          }, 0);

          // 선택된 상품의 할인된 가격
          const discountedPrices = checkedItems.reduce((totalPrice, item) => {
            return (
              totalPrice + (item?.productDiscountPrice * item?.quantity || 0)
            );
          }, 0);

          // 선택된 상품의 일반운송비
          const commonDeliveryFees = checkedItems.reduce((totalFee, item) => {
            if (item.deliveryMethod === 'COMMON') {
              return totalFee + item.deliveryFee;
            }
            return totalFee;
          }, 0);
          // 선택된 상품의 안전운송비
          const safetyDeliveryFees = checkedItems.reduce((totalFee, item) => {
            if (item.deliveryMethod === 'SAFETY') {
              return totalFee + item.deliveryFee;
            }
            return totalFee;
          }, 0);
          return {
            totalCount: total.totalCount + checkedItems.length,
            totalOriginalPrice: total.totalOriginalPrice + originalPrices,
            totalDiscountedPrices:
              total.totalDiscountedPrices + discountedPrices,
            totalCommonDeliveryFees:
              total.totalCommonDeliveryFees + commonDeliveryFees,
            totalSafetyDeliveryFees:
              total.totalSafetyDeliveryFees + safetyDeliveryFees,
          };
        },
        {
          totalCount: 0,
          totalOriginalPrice: 0,
          totalDiscountedPrices: 0,
          totalCommonDeliveryFees: 0,
          totalSafetyDeliveryFees: 0,
        },
      )
    : ({} as CheckedItemData);

  const handlePay = () => {
    console.log(items);
    navigate('/payment');
  };

  return (
    <>
      <TopNav title="봉달목록" backBtn wish />
      {items?.length === 0 ? (
        <FlexBox
          col
          justify="center"
          align="center"
          gap="2rem"
          style={{ flex: 1 }}
        >
          <RegularText size={14} color={theme.color.gray[60]}>
            아직 봉달할 준비가 되지 않으셨나요?
          </RegularText>
          <WishButton onClick={() => navigate('/wish')}>
            <RegularText size={14} color={theme.color.blue[80]}>
              찜목록으로 가기
            </RegularText>
          </WishButton>
        </FlexBox>
      ) : (
        <>
          <CartList checkedItemData={checkedItemData} />
          <PayButton>
            <BlueButton
              text={`총 ${checkedItemData?.totalCount}개 | ${(checkedItemData?.totalDiscountedPrices + checkedItemData?.totalCommonDeliveryFees + checkedItemData?.totalSafetyDeliveryFees)?.toLocaleString()}원 결제하기`}
              onClick={handlePay}
            />
          </PayButton>
        </>
      )}
    </>
  );
};

export default CartPage;

const WishButton = styled.button`
  border-radius: 2rem;
  border: 0.5px solid ${({ theme }) => theme.color.gray[50]};
  padding: 1.6rem 3.6rem;
`;

const PayButton = styled.div`
  width: 100%;
  max-width: 50rem;
  padding: 1.4rem;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.tint.white};
`;
