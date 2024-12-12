import { client } from './axiosInstance';

// 프로필 수정 API
export const patchMembersProfileAPI = async (nickname: string) => {
  try {
    const res = await client.delete('/members/profiles', {
      params: {
        nickname,
      },
    });
    return res;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

// 회원가입 API
export const postSignUpAPI = async (
  isChecked: boolean,
  signUpToken: string,
) => {
  try {
    const res = await client.post(
      '/members/sign-up',
      {
        hasAgreedToMarketingNotification: isChecked,
      },
      {
        headers: {
          'Sign-Up-Authorization': signUpToken,
        },
      },
    );
    return res;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};
