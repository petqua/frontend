import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { FlexBox, RegularText } from '../atoms';
import { BlueButton } from '../molecules';

const BottomPayBar = ({ wishCount }: { wishCount: number }) => {
  return (
    <Container>
      <FlexBox col gap="0.4rem" align="center">
        <img
          src="/icons/bubble-like-gray.svg"
          style={{ width: '2.8rem', height: '2.8rem' }}
        />
        <RegularText size={10} color={theme.color.gray[70]}>
          {wishCount}
        </RegularText>
      </FlexBox>
      <BlueButton text="입양하기" onClick={() => {}} style={{ width: '85%' }} />
    </Container>
  );
};

export default BottomPayBar;

const Container = styled.div`
  position: fixed;
  width: 100%;
  max-width: 50rem;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.tint.white};
  border-top: 0.25px solid ${({ theme }) => theme.color.gray[50]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem;
`;
