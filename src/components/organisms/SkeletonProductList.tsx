import styled, { keyframes } from 'styled-components';
import { FlexBox } from '../atoms';

// 애니메이션 정의
const loading = keyframes`
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #ddd;
  }
  100% {
    background-color: #eee;
  }
`;

// 베이스 스켈레톤 스타일 컴포넌트
const BaseSkeleton = styled.div`
  background-color: #eee;
  border-radius: 0.4rem;
  animation: ${loading} 1.5s infinite ease-in-out;
`;

// 이미지 스켈레톤
export const SkeletonImage = styled(BaseSkeleton)`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 1.2rem;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 1.2rem;
  row-gap: 3.2rem;
  width: 100%;
`;

const SkeletonProductList = () => {
  return (
    <FlexBox col fullWidth gap="2rem" style={{ padding: '1.4rem' }}>
      <BaseSkeleton style={{ width: '20%', height: '1.4rem' }} />
      <ListContainer>
        {[...Array(6)].map((_, index) => (
          <FlexBox
            key={index}
            col
            gap="0.8rem"
            style={{ width: 'calc(50% - 0.6rem)' }}
          >
            <SkeletonImage />
            <BaseSkeleton style={{ width: '100%', height: '1.2rem' }} />
            <BaseSkeleton style={{ width: '90%', height: '2.4rem' }} />
            <BaseSkeleton style={{ width: '50%', height: '1.2rem' }} />
            <BaseSkeleton style={{ width: '40%', height: '1.6rem' }} />
            <BaseSkeleton style={{ width: '30%', height: '1.2rem' }} />
          </FlexBox>
        ))}
      </ListContainer>
    </FlexBox>
  );
};

export default SkeletonProductList;
