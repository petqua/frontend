import styled from 'styled-components';
import { FlexBox, RegularText } from '../components/atoms';
import { BlueButton, TopNav } from '../components/molecules';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { CartList } from '../components/organisms';
import { CartStoreSectionData } from '../interfaces/cart';
import { useState } from 'react';

const CartPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CartStoreSectionData[]>([
    {
      storeName: 'S아쿠아',
      items: [
        {
          id: 1,
          storeName: 'S아쿠아',
          productId: 1,
          productName: '알비노 풀레드 아시안 고정구피',
          productThumbnailUrl:
            'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
          productPrice: 30000,
          productDiscountRate: 30,
          productDiscountPrice: 21000,
          quantity: 1,
          sex: 'MALE',
          deliveryMethod: 'COMMON',
          deliveryFee: 3000,
          isOnSale: true,
          safeDeliveryFee: 5000,
          commonDeliveryFee: 3000,
          pickUpDeliveryFee: 0,
          maleAdditionalPrice: 1000,
          femaleAdditionalPrice: 1000,
          checked: true,
        },
        {
          id: 2,
          storeName: 'S아쿠아',
          productId: 2,
          productName: '알비노 풀레드 아시안 고정구피',
          productThumbnailUrl:
            'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
          productPrice: 30000,
          productDiscountRate: 30,
          productDiscountPrice: 21000,
          quantity: 1,
          sex: 'MALE',
          deliveryMethod: 'SAFETY',
          deliveryFee: 5000,
          isOnSale: true,
          safeDeliveryFee: 5000,
          commonDeliveryFee: 3000,
          pickUpDeliveryFee: 0,
          maleAdditionalPrice: 1000,
          femaleAdditionalPrice: 1000,
          checked: true,
        },
      ],
      checked: true,
    },
    {
      storeName: '현대올림피아드 아쿠아',
      items: [
        {
          id: 3,
          storeName: '현대올림피아드 아쿠아',
          productId: 3,
          productName: '알비노 풀레드 아시안 고정구피',
          productThumbnailUrl:
            'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
          productPrice: 30000,
          productDiscountRate: 30,
          productDiscountPrice: 21000,
          quantity: 1,
          sex: 'MALE',
          deliveryMethod: 'COMMON',
          deliveryFee: 3000,
          isOnSale: true,
          safeDeliveryFee: 5000,
          commonDeliveryFee: 3000,
          pickUpDeliveryFee: 0,
          maleAdditionalPrice: 1000,
          femaleAdditionalPrice: 1000,
          checked: true,
        },
        {
          id: 4,
          storeName: '현대올림피아드 아쿠아',
          productId: 4,
          productName: '알비노 풀레드 아시안 고정구피',
          productThumbnailUrl:
            'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
          productPrice: 30000,
          productDiscountRate: 30,
          productDiscountPrice: 21000,
          quantity: 1,
          sex: 'MALE',
          deliveryMethod: 'PICKUP',
          deliveryFee: 0,
          isOnSale: true,
          safeDeliveryFee: 5000,
          commonDeliveryFee: 3000,
          pickUpDeliveryFee: 0,
          maleAdditionalPrice: 1000,
          femaleAdditionalPrice: 1000,
          checked: true,
        },
      ],
      checked: true,
    },
  ]);

  const checkedItemData = data.reduce(
    (total, store) => {
      const checkedItems = store.items.filter((item) => item.checked);
      // 선택된 상품의 원가
      const originalPrices = checkedItems.reduce((totalPrice, item) => {
        return totalPrice + item.productPrice;
      }, 0);

      // 선택된 상품의 할인된 가격
      const discountedPrices = checkedItems.reduce((totalPrice, item) => {
        return totalPrice + item.productDiscountPrice;
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
        totalDiscountedPrices: total.totalDiscountedPrices + discountedPrices,
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
  );

  return (
    <>
      <TopNav title="봉달목록" backBtn wish />
      {data.length === 0 ? (
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
          <CartList
            data={data}
            setData={setData}
            checkedItemData={checkedItemData}
          />
          <PayButton>
            <BlueButton
              text={`총 ${checkedItemData.totalCount}개 | ${(checkedItemData.totalDiscountedPrices + checkedItemData.totalCommonDeliveryFees + checkedItemData.totalSafetyDeliveryFees).toLocaleString()}원 결제하기`}
              onClick={() => {}}
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
