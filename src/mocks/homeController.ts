import { HttpResponse, http } from 'msw';

export const mockGetAnnouncementsAPI = http.get('/api/announcements', () => {
  const data = [
    {
      id: '1L',
      title: '[공지] 펫쿠아 프론트엔드 개발자 구인 중!',
      linkUrl: 'linktoA.com',
    },
    {
      id: '2L',
      title: '안내 사항',
      linkUrl: 'linktoB.com',
    },
  ];
  return HttpResponse.json(data);
});

export const mockGetBannersAPI = http.get('/api/banners', () => {
  const data = [
    {
      id: '1L',
      imageUrl: 'https://docs.petqua.co.kr/banners/b08f14d5ac00721b.jpg',
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
  ];
  return HttpResponse.json(data);
});
