import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { FlexBox, BoldText, MediumText, RegularText } from '../atoms';
import { StarRating } from '../molecules';
import { GetReviewStatisticsAPI } from '../../interfaces/review';
import { useRef, useEffect } from 'react';

const ReviewOverview = ({
  data,
}: {
  data: GetReviewStatisticsAPI | undefined;
}) => {
  // bar의 길이를 최소 길이에 맞추는 작업
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const barWidths = barsRef.current.map((bar) => bar.offsetWidth);
    const minBarWidth = Math.min(...barWidths);
    barsRef.current.forEach((bar) => {
      bar.style.setProperty('width', `${(minBarWidth - 1) / 10}rem`);
      bar.style.setProperty('flex', 'none');
    });
  }, []);

  return (
    <FlexBox col gap="0.8rem" padding="2.4rem 1.4rem">
      <BoldText size={20} color={theme.color.gray[70]}>
        후기 {data?.totalReviewCount}
      </BoldText>
      <FlexBox
        align="center"
        justify="space-between"
        padding="2rem"
        style={{ width: '100%', backgroundColor: theme.color.gray[10] }}
      >
        <FlexBox col gap="0.8rem" align="center" style={{ width: '35%' }}>
          <BoldText
            size={30}
            color={theme.color.gray.main}
            style={{ marginBottom: '0.8rem' }}
          >
            {data?.averageScore.toFixed(1)}
          </BoldText>
          <StarRating size={22} gap={0.1} score={5} />
          <RegularText size={14} color={theme.color.gray[50]}>
            만족도 {data?.productSatisfaction}%
          </RegularText>
        </FlexBox>
        <div
          style={{
            width: '0.05rem',
            height: '10rem',
            backgroundColor: theme.color.gray[50],
          }}
        />
        <FlexBox col gap="0.8rem" style={{ width: '50%' }}>
          {data?.scoreCounts.map((item, idx) => (
            <FlexBox
              key={idx}
              align="center"
              gap="1rem"
              style={{ width: '100%' }}
            >
              <MediumText
                size={12}
                color={theme.color.gray[70]}
                style={{ width: '1.8rem' }}
              >
                {5 - idx}점
              </MediumText>
              <Bar ref={(el) => el && (barsRef.current[idx] = el)}>
                <div
                  style={{ width: `${(item / data?.totalReviewCount) * 100}%` }}
                />
              </Bar>
              <MediumText size={10} color={theme.color.gray[50]}>
                {item.toLocaleString()}
              </MediumText>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default ReviewOverview;

const Bar = styled.div`
  position: relative;
  flex: 1;
  height: 0.6rem;
  background-color: ${({ theme }) => theme.color.gray[30]};
  border-radius: 0.3rem;

  div {
    position: absolute;
    height: 0.6rem;
    border-radius: 0.3rem;
    background-color: ${({ theme }) => theme.color.blue.main};
  }
`;
