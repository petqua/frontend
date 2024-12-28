import styled from 'styled-components';

const AnalysisResult = ({ data }: any) => {
  // 데이터 정의
  const graphData = [
    { label: '활동층', value: data[0] },
    { label: '크기', value: data[1] },
    { label: '수질', value: data[2] },
    { label: '수온', value: data[3] },
  ];

  return (
    <Container>
      <Title>합사 분석 결과</Title>
      <List>
        {graphData.map((item, index) => (
          <ListItem key={index}>
            <Label>{item.label}</Label>
            <ProgressBar>
              <Progress width={item.value} />
              <Value>{item.value}</Value>
            </ProgressBar>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AnalysisResult;

// 스타일 정의
const Container = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
  width: 320px;
  margin: 0 auto;
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.blue[70]};
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  width: 6rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray[70]};
`;

const ProgressBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
`;

const Progress = styled.div<{ width: number }>`
  background: ${({ theme }) => theme.color.blue[80]};
  height: 1.6rem;
  border-radius: 0.8rem;
  width: 0%;
  transition: width 1s ease-in-out;
  animation: progress-animation 1s ease-in-out forwards;
  @keyframes progress-animation {
    to {
      width: ${({ width }) => width}%;
    }
  }
`;

const Value = styled.span`
  position: absolute;
  right: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.blue[80]};
  margin-right: 0.5rem;
`;
