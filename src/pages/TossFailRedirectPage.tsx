import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { postOrdersPaymentFailAPI } from '../apis';

const TossFailRedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get('orderId') as string,
      code: searchParams.get('code') as string,
      message: searchParams.get('message') as string,
    };

    const confirmPayment = async () => {
      try {
        // 결제 실패 API 호출
        await postOrdersPaymentFailAPI(requestData);
        // 결제 실패 비즈니스 로직
        // 예를 들어, 실패 페이지로 이동
        navigate('/fail');
      } catch (error) {
        console.error(error);
      }
      // 결제 실패 비즈니스 로직을 구현하세요.
    };
    confirmPayment();
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${searchParams.get('code')}`}</p>
        <p>{`실패 사유: ${searchParams.get('message')}`}</p>
      </div>
    </div>
  );
};

export default TossFailRedirectPage;
