import { styled } from 'styled-components';
import {
  BoldText,
  CustomHr,
  FlexBox,
  MediumText,
  MethodTag,
  ProductImg,
  RegularText,
} from '../components/atoms';
import { Confirm, TopNav } from '../components/molecules';
import { theme } from '../styles/theme';
import { useState } from 'react';
import { TotalPayInfo } from '../components/organisms';

interface PriceBox {
  isTotal?: boolean;
  isSub?: boolean;
  isMinus?: boolean;
  isPlus?: boolean;
  text: string;
  price: number;
}

const PriceBox = ({
  isTotal,
  isSub,
  isMinus,
  isPlus,
  text,
  price,
}: PriceBox) => {
  return (
    <FlexBox
      fullWidth
      justify="space-between"
      style={{ paddingLeft: isSub ? '0.6rem' : '0' }}
    >
      {isTotal ? (
        <BoldText size={14} color={theme.color.gray.main}>
          {text}
        </BoldText>
      ) : (
        <RegularText size={isSub ? 12 : 14} color={theme.color.gray[50]}>
          {isSub
            ? `• ${text} -----------
            ${isMinus ? '-' : isPlus ? '+' : ''} ${price.toLocaleString()}`
            : text}
        </RegularText>
      )}
      {price && isTotal ? (
        <BoldText size={14} color={theme.color.gray.main}>
          {price.toLocaleString()} 원
        </BoldText>
      ) : (
        <RegularText
          size={14}
          color={isMinus ? theme.color.tint.red : theme.color.gray[70]}
        >
          {isMinus ? '-' : isPlus ? '+' : ''} {price.toLocaleString()} 원
        </RegularText>
      )}
    </FlexBox>
  );
};

const OrderItem = ({
  data,
  isLastItem,
}: {
  data: any;
  isLastItem?: boolean;
}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  return (
    <>
      <FlexBox col padding="2.4rem 1.4rem" gap="1.4rem">
        <BoldText size={16} color={theme.color.gray[60]}>
          {data.isConfirm ? '구매확정' : '구매완료'}
        </BoldText>
        <ProductImg size="12.4rem" src="" />

        {/* product info */}
        <FlexBox col gap="0.6rem">
          <RegularText size={12} color={theme.color.gray[50]}>
            {data.storeName}
          </RegularText>
          <FlexBox align="center" gap="0.4rem" style={{ marginBottom: '1rem' }}>
            <MediumText size={16} color={theme.color.gray.main}>
              {data.name}
            </MediumText>
            <MethodTag deliveryMethod={data.deliveryMethod} />
          </FlexBox>
          <RegularText size={12} color={theme.color.gray[50]}>
            {data.count}마리 | {data.sex}
          </RegularText>
        </FlexBox>

        {/* price info */}
        <FlexBox col fullWidth gap="1.6rem" padding="1rem 0">
          <PriceBox text="총 입양 금액" price={data.totalPrice} isTotal />
          <PriceBox text="입양 금액" price={data.price} />
          <PriceBox
            text="할인 금액"
            price={data.couponSalePrice + data.memberSalePrice}
            isMinus={data.couponSalePrice + data.memberSalePrice > 0}
          />
          {data.couponSalePrice !== 0 && (
            <PriceBox
              text="쿠폰할인"
              price={data.couponSalePrice}
              isSub
              isMinus
            />
          )}
          {data.memberSalePrice !== 0 && (
            <PriceBox
              text="회원할인"
              price={data.memberSalePrice}
              isSub
              isMinus
            />
          )}

          <RegularText size={14} color={theme.color.gray[50]}>
            운송비
          </RegularText>
          <PriceBox
            text={
              data.deliveryMethod === 'COMMON' ? '일반운송비' : '안전운송비'
            }
            price={
              data.deliveryMethod === 'COMMON'
                ? data.commonPrice
                : data.safetyPrice
            }
            isSub
            isPlus
          />
        </FlexBox>

        {/* Button Container */}
        <FlexBox fullWidth gap="0.6rem">
          <Button onClick={() => alert('교환/환불 카카오채널 이동')}>
            <RegularText size={14} color={theme.color.gray.main}>
              교환/환불요청
            </RegularText>
          </Button>
          <Button onClick={() => setIsOpenConfirm(true)}>
            <RegularText size={14} color={theme.color.gray.main}>
              입양확정
            </RegularText>
          </Button>
        </FlexBox>
      </FlexBox>
      {!isLastItem && <CustomHr />}

      {/* Confirm */}
      {isOpenConfirm && (
        <Confirm
          text="입양을 확정할까요?"
          setIsOpenConfirm={setIsOpenConfirm}
          handleYes={() => {}}
        />
      )}
    </>
  );
};

const OrderDetailPage = () => {
  const data = {
    orderNum: 1231231222,
    date: '2024.01.01',
    orderItemList: [
      {
        productId: 1,
        isConfirm: true,
        imgUrl: '',
        storeName: 'S아쿠아',
        name: '베타',
        deliveryMethod: 'SAFETY',
        count: 20,
        sex: '수컷',
        totalPrice: 40900,
        price: 31000,
        couponSalePrice: 0,
        memberSalePrice: 0,
        safetyPrice: 9900,
        commonPrice: 0,
      },
      {
        productId: 2,
        isConfirm: false,
        imgUrl: '',
        storeName: 'S아쿠아',
        name: '베타1',
        deliveryMethod: 'COMMON',
        count: 20,
        sex: '수컷',
        totalPrice: 40900,
        price: 31000,
        couponSalePrice: 9900,
        memberSalePrice: 2000,
        safetyPrice: 0,
        commonPrice: 3000,
      },
    ],
  };

  return (
    <>
      <TopNav backBtn title="주문상세내역" />
      <FlexBox
        justify="space-between"
        padding="1.8rem 0"
        style={{
          margin: '0 1.4rem',
          borderBottom: `0.05rem solid ${theme.color.gray[40]}`,
        }}
      >
        <FlexBox gap="1.6rem">
          <MediumText size={14} color={theme.color.gray.main}>
            주문번호
          </MediumText>
          <MediumText size={14} color={theme.color.gray.main}>
            {data.orderNum}
          </MediumText>
        </FlexBox>
        <RegularText size={12} color={theme.color.gray[50]}>
          {data.date} 주문
        </RegularText>
      </FlexBox>
      {data.orderItemList.map((item, idx) => (
        <OrderItem
          key={item.productId}
          data={item}
          isLastItem={idx === data.orderItemList.length - 1}
        />
      ))}
      <TotalPayInfo
        title="총 결제금액"
        count={2}
        originalPrice={60800}
        discountPrices={0}
        commonDeliveryFees={9900}
        safetyDeliveryFees={9900}
      />
    </>
  );
};

export default OrderDetailPage;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray.main};
`;
