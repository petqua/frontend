import { Outlet } from 'react-router-dom';
import ProductListItem from '../components/molecules/ProductListItem';
import RcmList from '../components/organisms/RcmList';

const MainPage = () => {
  return (
    <>
      {/* <Outlet /> */}
      {/* <div>메인페이지</div> */}
      <RcmList />
    </>
  );
};

export default MainPage;
