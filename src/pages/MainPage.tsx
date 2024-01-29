import { Outlet } from 'react-router-dom';
import ProductListItem from '../components/molecules/ProductListItem';
import RecommendList from '../components/organisms/RecommendList';

const MainPage = () => {
  return (
    <>
      {/* <Outlet /> */}
      {/* <div>메인페이지</div> */}
      <RecommendList />
    </>
  );
};

export default MainPage;
