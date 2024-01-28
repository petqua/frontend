import { Carousel, FullScreen, Notification } from '../components/molecules';
import { CategoryList, RcmList, NewList } from '../components/organisms';

const CAROUSEL_IMAGES = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
];

const HomePage = () => {
  return (
    <FullScreen>
      <Notification />
      <Carousel carouselList={CAROUSEL_IMAGES} />
      <Notification />
      {/* <CategoryList /> */}
      <RcmList />
      <NewList />
    </FullScreen>
  );
};

export default HomePage;
