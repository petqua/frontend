import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BottomNavBar } from '../components/molecules';
import { AnalysisResult } from '../components/atoms';
import { useEffect, useState } from 'react';

const determineResult = (fish1: string, fish2: string) => {
  const combinations: Record<
    string,
    { result: string; color: string; data: Array<number> }
  > = {
    '구피+네온테트라': {
      result: '안전',
      color: '#00E009',
      data: [86, 72, 78, 78],
    },
    '구피+플래티': { result: '안전', color: '#00E009', data: [86, 72, 78, 78] },
    '네온테트라+플래티': {
      result: '안전',
      color: '#00E009',
      data: [86, 72, 78, 78],
    },
    '구피+베타': { result: '주의', color: '#FF8B04', data: [60, 65, 70, 68] },
    '베타+플래티': { result: '주의', color: '#FF8B04', data: [60, 65, 70, 68] },
    '베타+베타': { result: '위험', color: '#FF3131', data: [42, 47, 48, 50] },
    '네온테트라+베타': {
      result: '위험',
      color: '#FF3131',
      data: [42, 47, 48, 50],
    },
  };

  const sortedKey = [fish1, fish2].sort().join('+');
  return (
    combinations[sortedKey] || {
      result: '알 수 없음',
      color: '#CCCCCC',
      data: [0, 0, 0, 0],
    }
  );
};

const ResultPage = () => {
  const location = useLocation();
  const { fish1, fish2 } = location.state || { fish1: '', fish2: '' }; // 기본값 설정
  const { result, color, data } = determineResult(fish1, fish2);
  const percentage = result === '안전' ? 60 : result === '주의' ? 40 : 15; // 상태에 따른 진행률
  const backgroundPercentage = 65; // 배경 원형의 크기 (반원보다 약간 큰 정도)

  // 원의 전체 둘레 계산 (r = 120, 원주 = 2 * Math.PI * r)
  const radius = 120; // 반지름 키우기
  const circumference = 2 * Math.PI * radius;

  // 배경 원형의 offset (반원보다 약간 큼)
  const backgroundStrokeOffset =
    circumference * (1 - backgroundPercentage / 100);

  // 진행 원형의 offset
  //const strokeOffset = circumference * (1 - percentage / 100);

  const [animatedStrokeOffset, setAnimatedStrokeOffset] =
    useState(circumference);

  useEffect(() => {
    const targetOffset = circumference * (1 - percentage / 100);
    let currentOffset = circumference;
    const duration = 700; // 애니메이션 지속 시간 (ms)
    const startTime = performance.now();

    const animate = (time: any) => {
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      currentOffset = circumference - progress * (circumference - targetOffset);
      setAnimatedStrokeOffset(currentOffset);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage, circumference]);

  return (
    <>
      <Container>
        <Title>
          {fish1}, {fish2}의<br /> 합사 가능 여부를 알려드릴게요!
        </Title>
        <Wrapper>
          <SVGWrapper>
            <svg width="300" height="300" viewBox="0 0 300 300">
              {/* 배경 원형 (회색, 반원보다 약간 큰 원) */}
              <circle
                cx="150"
                cy="150"
                r={radius}
                stroke="#E0E0E0"
                strokeWidth="20" // 선 두께 키우기
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={backgroundStrokeOffset}
                strokeLinecap="round" // 끝을 둥글게
                transform="rotate(150 150 150)" // 시작점 조정
              />
              {/* 진행 원형 (녹색) */}
              <circle
                cx="150"
                cy="150"
                r={radius}
                stroke={color}
                strokeWidth="20" // 선 두께 키우기
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={animatedStrokeOffset}
                strokeLinecap="round" // 끝을 둥글게
                transform="rotate(150 150 150)" // 시작점 조정
              />
            </svg>
            <CenterCircle color={color}>
              <Text>{result}</Text>
            </CenterCircle>
          </SVGWrapper>
        </Wrapper>
        <AnalysisResult data={data} />
      </Container>
      <BottomNavBar activeButton="grouping" />
    </>
  );
};

export default ResultPage;

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.color.blue[70]};
  min-height: calc(100vh - 72px);
  padding: 2rem;
  gap: 2rem;
`;

const Title = styled.h1`
  padding: 1rem;
  font-size: 2.6rem; // 텍스트 크기 약간 키움
  font-weight: 700;
  color: ${({ theme }) => theme.color.tint.white};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Wrapper = styled.div`
  padding-top: 60px;
  position: relative;
  width: 320px;
  height: 250px;
  background-color: white;
  border-radius: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SVGWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

const CenterCircle = styled.div<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  font-size: 1.8rem; // 텍스트 크기 키움
  font-weight: bold;
  color: white;
`;
