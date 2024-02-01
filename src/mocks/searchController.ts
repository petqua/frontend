import { HttpResponse, http } from 'msw';

export const mockGetTrendingKeywordsAPI = http.get(
  '/api/products/keywords',
  () => {
    const data = [
      { id: 1, keyword: '상어' },
      { id: 2, keyword: '상어 어항' },
      {
        id: 3,
        keyword: '아기 상어 뚜루루 뚜루',
      },
    ];
    return HttpResponse.json(data);
  },
);
