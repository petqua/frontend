import { useQuery } from '@tanstack/react-query';
import { Carousel, FullScreen, Notification } from '../components/molecules';
import { CategoryList } from '../components/organisms';
import { getBannersAPI } from '../apis';

// 일단 서버에서 내려주는 값이 없어서 이렇게 해놓음.
const CAROUSEL_MOCK_DATA = [
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
];

const HomePage = () => {
  const { data: bannersList } = useQuery({
    queryKey: ['banners'],
    queryFn: getBannersAPI,
    staleTime: 60 * 1000,
  });

  return (
    <FullScreen>
      <Notification />
      {bannersList && bannersList.length !== 0 ? (
        <Carousel carouselList={bannersList} />
      ) : (
        <Carousel carouselList={CAROUSEL_MOCK_DATA} />
      )}
      <Notification />
      <CategoryList />
    </FullScreen>
  );
};

export default HomePage;
