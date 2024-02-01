import { client } from './axiosInstance';

export const getTrendingKeywordsAPI = async (
  keyword: string,
  limit: number,
) => {
  try {
    const res = await client.get('/products/keywords', {
      params: {
        keyword: keyword,
        limit: limit,
      },
    });
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
