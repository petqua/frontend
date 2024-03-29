import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { MediumText } from '../atoms';
import { FaChevronDown } from 'react-icons/fa6';

interface WhiteButton {
  text: string;
  onClick: () => void;
  style?: any;
  isDown?: boolean;
  isRound?: boolean;
}

const WhiteButton = ({
  text,
  onClick,
  style,
  isDown,
  isRound,
}: WhiteButton) => {
  return (
    <Button
      onClick={onClick}
      style={{ borderRadius: isRound ? '0.6rem' : '0', ...style }}
    >
      <MediumText
        size={16}
        color={theme.color.blue[70]}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {text}
      </MediumText>
      {/* 사용되는 다른 상황에 따라 유연하게 수정 */}
      {isDown && <FaChevronDown size={12} color={theme.color.blue[70]} />}
    </Button>
  );
};

export default WhiteButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.color.tint.white};
  padding: 1.4rem;
  border: 1px solid ${({ theme }) => theme.color.blue[70]};
`;
