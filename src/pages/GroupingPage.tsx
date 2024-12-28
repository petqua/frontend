import { BottomNavBar } from '../components/molecules';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import DoubleFish from '../components/atoms/DoubleFish';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupingPage = () => {
  const [fish1, setFish1] = useState('');
  const [fish2, setFish2] = useState('');

  const isButtonActive = fish1.trim() !== '' && fish2.trim() !== '';

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Title>
          합사할 어종을 입력하시면 <br /> 합사 가능 여부를 알려드릴게요!
        </Title>
        <Card>
          <FishIconWrapper>
            <DoubleFish
              stroke={theme.color.blue[80]}
              width="110"
              height="110"
            />
          </FishIconWrapper>
          <Label>합사 어종 1</Label>
          <Input
            placeholder="합사할 어종을 입력해 주세요"
            value={fish1}
            onChange={(e) => setFish1(e.target.value)}
          />
          <Label>합사 어종 2</Label>
          <Input
            placeholder="합사할 어종을 입력해 주세요"
            value={fish2}
            onChange={(e) => setFish2(e.target.value)}
          />
        </Card>
      </Container>
      <FixedButton
        $active={isButtonActive}
        disabled={!isButtonActive}
        onClick={() => {
          if (isButtonActive) {
            navigate('/result', { state: { fish1, fish2 } });
          }
        }}
      >
        합사 결과 보기
      </FixedButton>
      <BottomNavBar activeButton="grouping" />
    </>
  );
};

export default GroupingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.color.blue[70]};
  min-height: calc(100vh - 120px);
  padding: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.color.tint.white};
  border-radius: 2rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  padding: 1rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.tint.white};
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }
`;

const FishIconWrapper = styled.div`
  background: ${({ theme }) => theme.color.blue[10]};
  border-radius: 50%;
  padding: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.div`
  align-self: flex-start;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray[70]};
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 5.2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.gray[30]};
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.color.gray[10]};
  border-radius: 0.8rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.blue[40]};
    box-shadow: 0 0 0.3rem ${({ theme }) => theme.color.blue[40]};
  }

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const FixedButton = styled.button<{ $active: boolean }>`
  position: fixed;
  bottom: 7.2rem;
  width: 100%;
  max-width: 500px;
  height: 48px;
  background: ${({ theme }) => theme.color.gray[50]};
  color: ${({ theme }) => theme.color.tint.white};
  font-size: 1.6rem;
  padding: 1rem;
  border: none;
  border-radius: 0;
  cursor: pointer;
  z-index: 2; /* Bottom Navigation Bar 위로 배치 */
  background: ${({ $active, theme }) =>
    $active ? theme.color.blue[80] : theme.color.gray[50]};
`;
