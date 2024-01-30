import styled from 'styled-components';

interface FullScreenProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
`;

const WebViewBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  min-width: 200px;
  height: 100%;
  min-height: 300px;
  background-color: #ffffff;
`;

const FullScreen: React.FunctionComponent<FullScreenProps> = ({ children }) => {
  return (
    <Container>
      <WebViewBox>{children}</WebViewBox>
    </Container>
  );
};

export default FullScreen;
