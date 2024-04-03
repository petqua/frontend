import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { postOrdersAPI } from '../../apis/paymentAPI';
import { usePaymentStore } from '../../states';

const clientKey = 'test_ck_LkKEypNArWYwWdJNN5NQ3lmeaxYG';
const customerKey = nanoid();

const Button = styled.button`
  background-color: #3282f6;
  color: #f9fcff;
  font-size: 1.7rem;
  height: 4rem;
  width: 90%;
  border-radius: 1rem;
  margin: 0 auto;
`;

const TossPaymentWidget = () => {
  // 여기서부터 진짜
  const { address, shippingRequest, customShippingRequest } = usePaymentStore();
  const [paymentWidget, setPaymentWidget] =
    useState<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);
  const [price, setPrice] = useState(1);

  // 결제 위젯 로드
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(clientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget === null) {
      return;
    }
    // 결제 UI 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' },
    );
    // 이용 약관 UI 렌더링
    paymentWidget.renderAgreement('#agreement', {
      variantKey: 'AGREEMENT',
    });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  // 가격 업데이트
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget === null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    if (address === null) return;
    try {
      // 여기서 주문 생성 API 호출
      const finalShippingRequest =
        shippingRequest === '직접 입력'
          ? customShippingRequest
          : shippingRequest;

      const orderResponse = await postOrdersAPI({
        shippingAddressId: address.id,
        shippingRequest: finalShippingRequest,
        orderProductRequests: [
          {
            productId: 1,
            storeId: 1,
            quantity: 1,
            originalPrice: 100,
            discountRate: 100,
            discountPrice: 1000,
            orderPrice: 10,
            sex: 'MALE',
            additionalPrice: 100,
            deliveryFee: 100,
            deliveryMethod: 'SAFETY',
          },
        ],
        totalAmount: 10000,
      });

      const orderId = orderResponse.orderId;
      console.log(orderId);
      await paymentWidget?.requestPayment({
        orderId: orderId,
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        customerMobilePhone: '01012341234',
        successUrl: `${window.location.origin}/toss/success`,
        failUrl: `${window.location.origin}/toss/fail`,
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  return (
    <>
      <div id="payment-widget" />
      <div id="agreement" />
      <Button onClick={handlePaymentRequest}>결제하기</Button>
    </>
  );
};

export default TossPaymentWidget;
