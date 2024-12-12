import { useEffect } from 'react';
import { getOAuthLoginAPI, postSignUpAPI } from '../apis';
import { useAuthStore } from '../states';
import { useNavigate } from 'react-router-dom';

const KakaoLoginPage = () => {
  const { setAccessToken } = useAuthStore();
  const code = new URL(window.location.href).searchParams.get('code') as string;
  const navigate = useNavigate();

  const kakaoLoginHandler = async () => {
    const res = await getOAuthLoginAPI('kakao', code);
    console.log(res);
    if (res.data.signUpToken) {
      const response = await postSignUpAPI(true, res.data.signUpToken);
      console.log('signup', response);
    } else {
      const accessToken = res.headers['authorization'];
      setAccessToken(accessToken);
    }
    navigate('/');
  };

  useEffect(() => {
    kakaoLoginHandler();
  }, []);

  return null;
};

export default KakaoLoginPage;
