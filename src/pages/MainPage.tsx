import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Text = styled.p`
  ${({ theme }) => theme.font.bold28}
  color : ${({ theme }) => theme.color.tint.red};
`;

const MainPage = () => {
  return (
    <div>
      <Text>메인 페이지입니다</Text>
      <Outlet />
    </div>
  );
};

export default MainPage;
