import { client } from './axiosInstance';

interface getSearchProductsAPIParams {
  word: string;
  limit: number;
  lastViewedId?: number;
}

export const getTrendingKeywordsAPI = async (
  keyword: string,
  limit: number,
) => {
  // 공백이면 요청 안보냄.
  if (!keyword.trim()) {
    return;
  }
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

export const getSearchProductsAPI = async ({
  word,
  limit,
  lastViewedId,
}: getSearchProductsAPIParams) => {
  try {
    const res = await client.get('/products/search', {
      params: {
        word,
        lastViewedId,
        limit,
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
