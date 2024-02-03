import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-color: aliceblue;
`;

const WebViewBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  min-width: 20rem;
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 9rem;
`;

const FullScreen = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    MoveToTop();
  }, [currentPath]);

  return (
    <Container>
      <WebViewBox>
        <Outlet />
      </WebViewBox>
    </Container>
  );
};

export default FullScreen;
