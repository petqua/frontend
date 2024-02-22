import styled from 'styled-components';
import { LightText, MediumText } from '../atoms';
import { theme } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fadeIn, fadeOut } from '../../styles/keyframes';
import { usePopUpStore } from '../../states';

const PopUp = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const { state, action, setIsOpenPopUp } = usePopUpStore();

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenPopUp(false);
    }, 450);
  };

  useEffect(() => {
    setTimeout(() => {
      handleCloseModal();
    }, 2 * 1000);
  }, []);

  const getText = (action: string, state: string): string => {
    switch (action) {
      case 'wish':
        if (state === 'add') return '찜목록에 추가되었습니다.';
        if (state === 'filled') return '찜목록에서 삭제되었습니다.';
        if (state === 'needLogin') return '찜하려면 로그인이 필요해요!';
        return 'wish state error';
      case 'cart':
        if (state === 'add') return '봉달목록에 추가되었습니다.';
        if (state === 'filled') return '이미 봉달목록에 추가되어있습니다.';
        if (state === 'needLogin') return '봉달하려면 로그인이 필요해요!';
        return 'cart state error';
      default:
        return 'props error';
    }
  };

  const getAction = (action: string): string => {
    switch (action) {
      case 'wish':
        return '찜목록';
      case 'cart':
        return '봉달목록';
      default:
        return 'props error';
    }
  };

  return (
    <Container $visible={visible}>
      <MediumText size={16} color={theme.color.tint.white}>
        {getText(action, state)}
      </MediumText>
      {(state === 'needLogin' ? false : true) ? (
        <LightText
          size={14}
          color={theme.color.tint.white}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => navigate('/wish')}
        >
          {getAction(action)} 가기 {'>'}
        </LightText>
      ) : (
        <LoginButton>
          <MediumText
            size={12}
            color={theme.color.tint.white}
            onClick={() => navigate('/login')}
          >
            로그인하러가기
          </MediumText>
        </LoginButton>
      )}
    </Container>
  );
};

export default PopUp;

const Container = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 1.2rem;
  width: calc(100% - 2.8rem);
  padding: 2rem 1.2rem;
  position: absolute;
  bottom: 8.2rem;
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.5s ease-in-out;
`;

const LoginButton = styled.button`
  padding: 0.8rem 1rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.blue[80]};
`;
