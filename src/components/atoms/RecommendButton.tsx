import { styled } from 'styled-components';
import { RegularText } from '.';
import { theme } from '../../styles/theme';
import { FaRegThumbsUp, FaThumbsUp } from './Icon';

interface RecommendButton {
  recommended: boolean;
  count: number;
  onClick: () => void;
  isMargin?: boolean;
}

const RecommendButton = ({ recommended, count, onClick }: RecommendButton) => {
  return (
    <Button onClick={onClick}>
      {recommended ? (
        <FaThumbsUp size={16} color={theme.color.blue.main} />
      ) : (
        <FaRegThumbsUp size={16} color={theme.color.gray[50]} />
      )}
      <RegularText
        size={14}
        color={recommended ? theme.color.gray.main : theme.color.gray[50]}
      >
        추천 {count}
      </RegularText>
    </Button>
  );
};

export default RecommendButton;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;
