import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { postOrdersPaymentSuccessAPI } from '../apis';
import axios from 'axios';

const TossSuccessRedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get('orderId') as string,
      amount: parseInt(searchParams.get('amount') as string),
      paymentKey: searchParams.get('paymentKey') as string,
      paymentType: searchParams.get('paymentType') as string,
    };

    const confirmPayment = async () => {
      try {
        // 결제 성공 API 호출
        await postOrdersPaymentSuccessAPI(requestData);
        // 결제 성공 비즈니스 로직
        // 예를 들어, 성공 페이지로 이동
        navigate('/success');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { code, message } = error.response.data;
          navigate(
            `/toss/fail?code=${code}&message=${message}&orderId=${requestData.orderId}`,
          );
        }
      }
      // 결제 성공 비즈니스 로직을 구현하세요.
    };
    confirmPayment();
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get('amount'),
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
      </div>
    </div>
  );
};

export default TossSuccessRedirectPage;
