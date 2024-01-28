import { styled } from 'styled-components';

interface RowScrollContainer {
  children: React.ReactNode;
  gap?: string;
  style?: any;
}

const RowScrollContainer = ({ children, gap, style }: RowScrollContainer) => {
  return (
    <Container
      style={{
        gap,
        ...style,
      }}
    >
      {children}
    </Container>
  );
};

export default RowScrollContainer;

const Container = styled.div`
  padding: 0 1.2rem;
  display: flex;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;
