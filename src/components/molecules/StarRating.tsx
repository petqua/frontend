import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FaStar, FaStarHalf } from '../atoms/Icon';

interface StarRating {
  score: number;
  size: number;
  gap: number;
  onMouseEnter?: (e: React.MouseEvent<SVGElement>) => void;
  onMouseLeave?: () => void;
  onClick?: (e: React.MouseEvent<SVGElement>) => void;
}

const StarRating = ({
  score,
  size,
  gap,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onClick = () => {},
}: StarRating) => {
  const integerPart = Math.floor(score);
  const decimalPart = score - integerPart;

  const filledStarCount = integerPart;
  const emptyStarCount = 5 - filledStarCount - (decimalPart > 0 ? 1 : 0);

  // 채워진 별 렌더링
  const filledStars = Array.from({ length: filledStarCount }, (_, idx) => (
    <FaStar
      key={idx}
      id={idx + 1}
      size={size}
      color={theme.color.blue.main}
      onMouseEnter={(e: React.MouseEvent<SVGElement>) => onMouseEnter(e)}
      onClick={(e: React.MouseEvent<SVGElement>) => onClick(e)}
    />
  ));

  // 비워진 별 렌더링
  const emptyStars = Array.from({ length: emptyStarCount }, (_, idx) => (
    <FaStar
      key={idx}
      id={filledStarCount + idx + 1}
      size={size}
      color={theme.color.blue[10]}
      onMouseEnter={(e: React.MouseEvent<SVGElement>) => onMouseEnter(e)}
      onClick={(e: React.MouseEvent<SVGElement>) => onClick(e)}
    />
  ));

  // 부분적으로 채워진 별 렌더링
  let partialStar = null;
  if (decimalPart > 0) {
    if (decimalPart <= 0.24) {
      partialStar = <FaStar size={size} color={theme.color.blue[10]} />; // 비워진 별
    } else if (decimalPart <= 0.74) {
      partialStar = (
        <div style={{ position: 'relative' }}>
          <FaStar size={size} color={theme.color.blue[10]} />
          <FaStarHalf
            size={size}
            color={theme.color.blue.main}
            style={{ position: 'absolute', top: '0', left: '0' }}
          />
        </div>
      ); // 반채워진 별
    } else {
      partialStar = <FaStar size={size} color={theme.color.blue.main} />; // 채워진 별
    }
  }

  return (
    <StarContainer $gap={gap} onMouseLeave={onMouseLeave}>
      {filledStars}
      {partialStar}
      {emptyStars}
    </StarContainer>
  );
};

export default StarRating;

const StarContainer = styled.div<{ $gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => `${$gap}rem`};
`;
