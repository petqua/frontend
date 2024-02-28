import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BoldText, CustomHr, FlexBox, RegularText } from '../atoms';
import { TotalFee } from '../../interfaces/payment';
import { getTotalDeliveryFee } from '../../utils/delivery';
import {
  IoChevronDownCircleSharp,
  IoChevronUpCircleSharp,
} from 'react-icons/io5';
import { memo, useState } from 'react';

const Container = styled.section`
  padding: 2.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

interface PaymentSummary {
  totalFee: TotalFee;
}

const PaymentSummary = memo(({ totalFee }: PaymentSummary) => {
  const { totalAdoptionFee, totalCommonDeliveryFee, totalSafeDeliveryFee } =
    totalFee;

  // 운송비 버튼 토글 로직
  const [isToggled, setIsToggled] = useState(false);

  const toggleIcon = () => {
    setIsToggled(!isToggled);
  };

  return (
    <Container>
      <BoldText
        size={18}
        color={theme.color.gray.main}
        style={{ marginBottom: '0.4rem' }}
      >
        결제 금액
      </BoldText>
      <FlexBox justify="space-between">
        <RegularText size={14} color={theme.color.gray[50]}>
          총 입양 금액
        </RegularText>
        <RegularText size={14} color={theme.color.gray[70]}>
          {totalAdoptionFee.toLocaleString()} 원
        </RegularText>
      </FlexBox>
      <FlexBox justify="space-between">
        <RegularText size={14} color={theme.color.gray[50]}>
          할인 금액
        </RegularText>
        <RegularText size={14} color={theme.color.gray[70]}>
          0 원
        </RegularText>
      </FlexBox>
      <FlexBox gap="0.8rem" align="center">
        <RegularText size={14} color={theme.color.gray[50]}>
          운송비
        </RegularText>
        <button onClick={toggleIcon}>
          {isToggled ? (
            <IoChevronUpCircleSharp size={16} color={theme.color.gray[60]} />
          ) : (
            <IoChevronDownCircleSharp size={16} color={theme.color.gray[60]} />
          )}
        </button>
        <RegularText
          size={14}
          color={theme.color.gray[70]}
          style={{ marginLeft: 'auto' }}
        >
          {getTotalDeliveryFee(totalFee).toLocaleString()} 원
        </RegularText>
      </FlexBox>
      {isToggled && (
        <FlexBox col gap="0.6rem">
          <FlexBox>
            <RegularText size={12} color={theme.color.gray[50]}>
              • 일반 운송 &nbsp;&nbsp;-----------&nbsp;&nbsp; +
              {totalCommonDeliveryFee.toLocaleString()}
            </RegularText>
          </FlexBox>
          <FlexBox>
            <RegularText size={12} color={theme.color.gray[50]}>
              • 안전 운송 &nbsp;&nbsp;-----------&nbsp;&nbsp; +
              {totalSafeDeliveryFee.toLocaleString()}
            </RegularText>
          </FlexBox>
          <FlexBox>
            <RegularText size={12} color={theme.color.gray[50]}>
              • 매장 픽업 &nbsp;&nbsp;-----------&nbsp;&nbsp; + 무료
            </RegularText>
          </FlexBox>
        </FlexBox>
      )}
      <CustomHr
        height="0.1rem"
        color={theme.color.gray[50]}
        style={{ marginTop: '0.4rem', marginBottom: '1.6rem' }}
      />
      <FlexBox justify="space-between">
        <BoldText size={18} color={theme.color.gray.main}>
          최종 결제 금액
        </BoldText>
        <BoldText size={18} color={theme.color.blue[80]}>
          {totalAdoptionFee.toLocaleString()} 원
        </BoldText>
      </FlexBox>
    </Container>
  );
});

PaymentSummary.displayName = 'PaymentSummary';

export default PaymentSummary;
