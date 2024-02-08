import { styled } from 'styled-components';
import { BoldText, FlexBox } from '../atoms';
import { theme } from '../../styles/theme';

const ProductDetailInfo = () => {
  return (
    <FlexBox col style={{ padding: '1.4rem' }}>
      <BoldText size={18} color={theme.color.gray[70]}>
        상품정보
      </BoldText>
      <table style={{ width: '100%' }}>
        <Tbody>
          <Tr>
            <TableCategory>어종명</TableCategory>
            <TableValue>베타</TableValue>
          </Tr>
          <Tr>
            <TableCategory>과 분류</TableCategory>
            <TableValue>난태생</TableValue>
          </Tr>
          <Tr>
            <TableCategory>사육온도</TableCategory>
            <TableValue>26 ~ 28</TableValue>
          </Tr>
          <Tr>
            <TableCategory>사육난이도</TableCategory>
            <TableValue>하</TableValue>
          </Tr>
          <Tr>
            <TableCategory>적정수조크기</TableCategory>
            <TableValue>소형 ~ 1자</TableValue>
          </Tr>
          <Tr>
            <TableCategory>성격</TableCategory>
            <TableValue>사나움</TableValue>
          </Tr>
        </Tbody>
      </table>
      <Line />
      <BoldText
        size={14}
        color={theme.color.blue.main}
        style={{
          width: '100%',
          cursor: 'pointer',
          textAlign: 'center',
          padding: '1.2rem 0',
        }}
      >
        필수표기정보 보기
      </BoldText>
    </FlexBox>
  );
};

export default ProductDetailInfo;

const Tbody = styled.tbody`
  margin: 1.6rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  gap: 1rem;
`;

const Tr = styled.tr`
  display: flex;
  width: 100%;
`;

const TableCategory = styled.td`
  flex: 3.5;
  ${({ theme }) => theme.font.medium14}
  color: ${({ theme }) => theme.color.gray[50]};
`;

const TableValue = styled.td`
  flex: 6.5;
  ${({ theme }) => theme.font.medium14}
  color: ${({ theme }) => theme.color.gray[70]};
`;

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
`;
