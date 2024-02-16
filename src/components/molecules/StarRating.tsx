import { theme } from '../../styles/theme';
import { FlexBox } from '../atoms';
import { FaStar, FaStarHalf } from 'react-icons/fa';

interface StarRating {
  score: number;
  size: number;
  gap: number;
}

const StarRating = ({ score, size, gap }: StarRating) => {
  const integerPart = Math.floor(score);
  const decimalPart = score - integerPart;

  const filledStarCount = integerPart;
  const emptyStarCount = 5 - filledStarCount - (decimalPart > 0 ? 1 : 0);

  // 채워진 별 렌더링
  const filledStars = Array.from({ length: filledStarCount }, (_, idx) => (
    <FaStar key={idx} size={size} color={theme.color.blue.main} />
  ));

  // 비워진 별 렌더링
  const emptyStars = Array.from({ length: emptyStarCount }, (_, idx) => (
    <FaStar key={idx} size={size} color={theme.color.blue[10]} />
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
    <FlexBox align="center" gap={`${gap}rem`}>
      {filledStars}
      {partialStar}
      {emptyStars}
    </FlexBox>
  );
};

export default StarRating;
