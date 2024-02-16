import { client } from './axiosInstance';
// 리다이렉트 요청 API
export const getOAuthRedirectAPI = async (oauthServerType: string) => {
  try {
    const res = await client.get(`/auth/${oauthServerType}`);
    return res.data;
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
// 소셜 로그인 API
export const getOAuthLoginAPI = async (
  oauthServerType: string,
  code: string,
) => {
  try {
    const res = await client.get(`/auth/login/${oauthServerType}`, {
      params: {
        code,
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
// 로그인 유지 API
export const getAccessTokenAPI = async () => {
  try {
    const res = await client.get('/auth/token');
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
