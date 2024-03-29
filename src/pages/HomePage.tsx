import { useQuery } from '@tanstack/react-query';
import {
  Carousel,
  Notification,
  TopNav,
  BottomNavBar,
} from '../components/molecules';
import { CategoryList, RecommendList, NewList } from '../components/organisms';
import { getAnnouncementsAPI, getBannersAPI } from '../apis';

// 일단 서버에서 내려주는 값이 없어서 이렇게 해놓음.
const CAROUSEL_MOCK_DATA = [
  {
    id: 1,
    imageUrl: 'https://docs.petqua.co.kr/banners/b08f14d5ac00721b.jpg',
    linkUrl: 'https://www.naver.com/',
  },
  {
    id: 2,
    imageUrl: 'https://docs.petqua.co.kr/banners/b08f14d5ac00721b.jpg',
    linkUrl: 'https://www.naver.com/',
  },
  {
    id: 3,
    imageUrl: 'https://docs.petqua.co.kr/banners/b08f14d5ac00721b.jpg',
    linkUrl: 'https://www.naver.com/',
  },
  {
    id: 4,
    imageUrl: 'https://docs.petqua.co.kr/banners/b08f14d5ac00721b.jpg',
    linkUrl: 'https://www.naver.com/',
  },
];

const HomePage = () => {
  const { data: bannersList } = useQuery({
    queryKey: ['banners'],
    queryFn: getBannersAPI,
    staleTime: 60 * 1000,
  });

  const { data: announcementList } = useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncementsAPI,
    staleTime: 60 * 1000,
  });

  return (
    <>
      <TopNav alarm wish basket searchBar />
      {bannersList && bannersList.length !== 0 ? (
        <Carousel carouselList={bannersList} isBlackIndicator />
      ) : (
        <Carousel carouselList={CAROUSEL_MOCK_DATA} isBlackIndicator />
      )}
      <Notification announcementList={announcementList} />
      <CategoryList />
      <RecommendList />
      <NewList />
      <BottomNavBar activeButton="home" />
    </>
  );
};

export default HomePage;
