import { styled } from 'styled-components';
import { BoldText, MediumText, RegularText, FlexBox } from '../atoms';
import { IoIosArrowDown } from '../atoms/Icon';
import { theme } from '../../styles/theme';
import { useState } from 'react';

interface TotalPayInfo {
  title: string;
  count: number;
  originalPrice: number;
  discountPrices: number;
  commonDeliveryFees: number;
  safetyDeliveryFees: number;
}

const TotalPayInfo = ({
  title,
  count,
  originalPrice,
  discountPrices,
  commonDeliveryFees,
  safetyDeliveryFees,
}: TotalPayInfo) => {
  const [isOpenToggle, setIsOpenToggle] = useState(false);

  return (
    <FlexBox
      col
      gap="1rem"
      padding="1.8rem 1.4rem"
      fullWidth
      style={{ borderTop: `0.05rem solid ${theme.color.gray[50]}` }}
    >
      <FlexBox align="center" gap="1.2rem" style={{ marginBottom: '1.4rem' }}>
        <BoldText size={16} color={theme.color.gray.main}>
          {title}
        </BoldText>
        <MediumText size={16} color={theme.color.blue[70]}>
          총 {count}건
        </MediumText>
      </FlexBox>
      <FlexBox justify="space-between" align="center" fullWidth>
        <MediumText size={12} color={theme.color.gray.main}>
          총 입양 금액
        </MediumText>
        <MediumText size={12} color={theme.color.gray.main}>
          {originalPrice?.toLocaleString()} 원
        </MediumText>
      </FlexBox>
      <FlexBox justify="space-between" align="center" fullWidth>
        <MediumText size={12} color={theme.color.gray.main}>
          할인 금액
        </MediumText>
        <MediumText size={12} color={theme.color.tint.red}>
          {`-
      ${discountPrices?.toLocaleString()}
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
            {commonDeliveryFees + safetyDeliveryFees !== 0 && (
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
                {commonDeliveryFees?.toLocaleString()}
              </RegularText>
              <RegularText
                size={12}
                color={theme.color.gray[50]}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                • 안전운송비 &nbsp;&nbsp;-----------&nbsp;&nbsp; +{' '}
                {safetyDeliveryFees?.toLocaleString()}
              </RegularText>
            </FlexBox>
          )}
        </FlexBox>
        <MediumText size={12} color={theme.color.gray.main}>
          {(commonDeliveryFees + safetyDeliveryFees)?.toLocaleString()} 원
        </MediumText>
      </FlexBox>
      <div
        style={{
          width: '100%',
          height: '0.1rem',
          backgroundColor: theme.color.gray[50],
        }}
      />
      <FlexBox justify="space-between" align="center" fullWidth>
        <BoldText size={12} color={theme.color.gray.main}>
          총 결제 금액
        </BoldText>
        <BoldText size={12} color={theme.color.gray.main}>
          {(
            originalPrice +
            commonDeliveryFees +
            safetyDeliveryFees -
            discountPrices
          )?.toLocaleString()}{' '}
          원
        </BoldText>
      </FlexBox>
    </FlexBox>
  );
};

export default TotalPayInfo;

const ToggleButton = styled.button<{ $isOpenToggle: boolean }>`
  padding: 0.2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray[30]};
  transform: ${({ $isOpenToggle }) => ($isOpenToggle ? 'rotate(180deg)' : '')};
`;
