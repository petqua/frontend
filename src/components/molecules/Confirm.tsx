import { SetStateAction, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { fadeIn, fadeOut } from '../../styles/keyframes';
import { RegularText } from '../atoms';
import { theme } from '../../styles/theme';

interface Confirm {
  setIsOpenConfirm: React.Dispatch<SetStateAction<boolean>>;
  handleYes: () => void;
  text: string;
}

const Confirm = ({ setIsOpenConfirm, text, handleYes }: Confirm) => {
  const [visible, setVisible] = useState(true);

  const handleCloseConfirm = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenConfirm(false);
    }, 150);
  };

  useEffect(() => {
    document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ConfirmOverlay onClick={handleCloseConfirm} $visible={visible}>
      <Container onClick={(e) => e.stopPropagation()}>
        <RegularText
          size={18}
          color={theme.color.gray.main}
          style={{
            padding: '2.6rem 4.2rem',
            lineHeight: '150%',
            wordBreak: 'keep-all',
            textAlign: 'center',
          }}
        >
          {text}
        </RegularText>
        <ButtonContainer>
          <Button
            style={{
              borderRight: `0.05rem solid ${theme.color.gray[50]}`,
            }}
          >
            <RegularText
              size={16}
              color={theme.color.gray.main}
              onClick={() => {
                handleYes();
                handleCloseConfirm();
              }}
            >
              예
            </RegularText>
          </Button>
          <Button onClick={handleCloseConfirm}>
            <RegularText size={16} color={theme.color.tint.red}>
              아니오
            </RegularText>
          </Button>
        </ButtonContainer>
      </Container>
    </ConfirmOverlay>
  );
};

export default Confirm;

const ConfirmOverlay = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 50rem;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: ${({ $visible }) => ($visible ? 'hidden' : 'auto')};

  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.2s ease-in-out;
`;

const Container = styled.div`
  width: 75%;
  height: fit-content;
  z-index: 101;
  background-color: white;
  border-radius: 1.2rem;
`;

const ButtonContainer = styled.div`
  border-top: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
  border-bottom: 1.2rem;
`;

const Button = styled.button`
  width: 50%;
  padding: 1rem 0;
`;
