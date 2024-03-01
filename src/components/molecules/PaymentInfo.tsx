import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BoldText } from '../atoms';

const Container = styled.section`
  padding: 2.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.3rem;
  row-gap: 1.4rem;
`;

const Button = styled.button<{ $isSelected: boolean }>`
  ${({ theme }) => theme.font.regular14}
  height: 4.8rem;
  border-radius: 0.6rem;
  border: ${({ theme, $isSelected }) =>
    $isSelected
      ? `0.1rem solid ${theme.color.blue[70]}`
      : `0.05rem solid ${theme.color.gray[50]}`};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.blue[70] : theme.color.gray.main};
`;

const PAYMENT_TYPE = [
  '신용/체크카드',
  '간편카드결제',
  '페이코',
  '토스페이',
  '카카오페이',
  '네이버페이',
  '휴대폰결제',
  '실시간 계좌이체',
];

interface PaymentInfo {
  paymentType: string;
  setPaymentType: (paymentType: string) => void;
}

const PaymentInfo = ({ paymentType, setPaymentType }: PaymentInfo) => {
  const handleClick = (paymentType: string) => {
    setPaymentType(paymentType);
  };

  return (
    <Container>
      <BoldText size={18} color={theme.color.gray.main}>
        결제 정보
      </BoldText>
      <GridBox>
        {PAYMENT_TYPE.map((payment_type, idx) => (
          <Button
            key={idx}
            $isSelected={paymentType === payment_type}
            onClick={() => handleClick(payment_type)}
          >
            {payment_type}
          </Button>
        ))}
      </GridBox>
    </Container>
  );
};

export default PaymentInfo;
