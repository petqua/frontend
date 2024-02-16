import styled from 'styled-components';
import LogoIcon from '../assets/logo-typo.svg?react';
import {
  BoldText,
  FlexBox,
  MediumText,
  RegularText,
} from '../components/atoms';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { getOAuthRedirectAPI } from '../apis';

const Background = styled.div`
  width: 37rem;
  height: 37rem;
  position: absolute;
  background: url('images/login.png');
  background-repeat: no-repeat;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`;

const KakaoLoginButton = styled.button`
  width: 30rem;
  align-self: center;
  margin-top: 8.7rem;
  z-index: 1;
`;

const kakaoLoginHandler = async () => {
  const { uri: kakaoRedirectURI } = await getOAuthRedirectAPI('kakao');
  window.location.href = kakaoRedirectURI;
};

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <LogoIcon style={{ alignSelf: 'center', marginTop: '18rem' }} />
      <FlexBox
        col
        align="center"
        gap="1.4rem"
        style={{ marginTop: '4.6rem', width: '100%' }}
      >
        <RegularText size={28} color={theme.color.blue.main}>
          새로운 물생활의 세계로
        </RegularText>
        <RegularText size={28} color={theme.color.blue.main}>
          초대합니다!
        </RegularText>
      </FlexBox>
      <KakaoLoginButton onClick={kakaoLoginHandler}>
        <img src="/images/kakao_login_medium_wide.png" />
      </KakaoLoginButton>
      <BoldText
        size={14}
        color={theme.color.blue[70]}
        style={{
          alignSelf: 'center',
          marginTop: '1.8rem',
          cursor: 'pointer',
          zIndex: 1,
        }}
        onClick={() => console.log('CS 상담채널로 이동')}
      >
        로그인에 어려움을 겪고 계신가요?
      </BoldText>
      <MediumText
        size={14}
        color={theme.color.tint.white}
        style={{
          cursor: 'pointer',
          zIndex: 1,
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        onClick={() => navigate('/')}
      >
        로그인 없이 둘러보기
      </MediumText>
      <Background />
    </>
  );
};

export default LoginPage;
