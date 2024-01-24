import { HttpResponse, http } from 'msw';

const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      {
        id: 'abc-123',
        name: '김가나',
      },
      {
        id: 'def-456',
        name: '박다라',
      },
      {
        id: 'ghi-789',
        name: '이마바',
      },
    ]);
  }),
];

export default handlers;
