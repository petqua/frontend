import { styled } from 'styled-components';

interface RowScrollContainer {
  children: React.ReactNode;
  gap?: string;
  style?: any;
  row: number;
  col: number;
}

const RowScrollContainer = ({
  children,
  gap,
  style,
  row,
  col,
}: RowScrollContainer) => {
  return (
    <Container
      style={{
        gap,
        gridTemplateRows: `repeat(${row}, 1fr)`,
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        ...style,
      }}
    >
      {children}
    </Container>
  );
};

export default RowScrollContainer;

const Container = styled.div`
  width: 100%;
  padding: 0 1.2rem;
  display: grid;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;
