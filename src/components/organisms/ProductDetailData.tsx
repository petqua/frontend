import { theme } from '../../styles/theme';
import { FlexBox, BoldText, RegularText } from '../atoms';
import { IoShareSocialOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { styled } from 'styled-components';

const ProductDetailData = () => {
  return (
    <FlexBox col gap="1.2rem" padding="1.4rem">
      <FlexBox justify="space-between" align="center" style={{ width: '100%' }}>
        <RegularText size={16} color={theme.color.gray[50]}>
          아쿠아리움 부산
        </RegularText>
        <IoShareSocialOutline size={22} color={theme.color.gray[50]} />
      </FlexBox>
      <BoldText size={22} color={theme.color.gray.main}>
        부산 니모 및 산호 판매
      </BoldText>
      <RegularText size={12} color={theme.color.gray[70]}>
        열대어/소형어
      </RegularText>
      <FlexBox align="center" gap="1rem" padding="0.4rem 0 2.8rem 0">
        <FlexBox align="center" gap="0.2rem">
          <FaStar size={14} color={theme.color.blue.main} />
          <FaStar size={14} color={theme.color.blue.main} />
          <FaStar size={14} color={theme.color.blue.main} />
        </FlexBox>
        <RegularText size={12} color={theme.color.gray[50]}>
          5.0
        </RegularText>
        <RegularText size={12} color={theme.color.gray[50]}>
          22개 후기
        </RegularText>
      </FlexBox>
      <FlexBox col gap="0.6rem" style={{ width: '100%' }}>
        <RegularText size={16} color={theme.color.gray[50]}>
          20,000원
        </RegularText>
        <FlexBox
          justify="space-between"
          align="center"
          style={{ width: '100%' }}
        >
          <BoldText size={24} color={theme.color.gray.main}>
            18,000원
          </BoldText>
          <BoldText size={20} color={theme.color.tint.red}>
            30%
          </BoldText>
        </FlexBox>
      </FlexBox>
      <Line style={{ margin: '1.2rem 0' }} />
      <RegularText
        size={16}
        color={theme.color.gray[70]}
        style={{ lineHeight: '160%' }}
      >
        니모 및 산호 판매합니다 ~~! <br />
        니모는 한마리 당 2만원에 거래하고
        <br />
        산호는 3만에 거래합니다
        <br />
        직거래는 부산에서만 진행하겠습니다.
      </RegularText>
    </FlexBox>
  );
};

export default ProductDetailData;

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
`;
