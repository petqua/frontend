import { HttpResponse, http } from 'msw';

const handlers = [
  http.get('/api/announcements', () => {
    return HttpResponse.json({
      notification:
        '[공지] 펫쿠아 앱 출시 기념 이벤트 진행중 ! 안전운송 사전 신청하러 가기',
    });
  }),
  http.get('/api/banners', () => {
    return HttpResponse.json({
      data: [
        {
          id: '1L',
          imageUrl: '/images/1.jpg',
          linkUrl: 'https://www.naver.com/',
        },
        {
          id: '2L',
          imageUrl: '/images/2.jpg',
          linkUrl: 'https://www.naver.com/',
        },
        {
          id: '3L',
          imageUrl: '/images/3.jpg',
          linkUrl: 'https://www.naver.com/',
        },
        {
          id: '4L',
          imageUrl: '/images/4.jpg',
          linkUrl: 'https://www.naver.com/',
        },
      ],
    });
  }),
];

export default handlers;
