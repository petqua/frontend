import { MediumText } from '../atoms';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

interface BlueButton {
  text: string;
  onClick: () => void;
  isBigText?: boolean;
  isMargin?: boolean;
  style?: any;
}

const BlueButton = ({
  text,
  onClick,
  isBigText,
  isMargin,
  style,
}: BlueButton) => {
  return (
    <Button
      onClick={onClick}
      style={{
        width: isMargin ? 'calc(100% - 2.8rem)' : '100%',
        margin: isMargin ? '0 1.4rem' : '0',
        ...style,
      }}
    >
      <MediumText size={isBigText ? 20 : 16} color={theme.color.tint.white}>
        {text}
      </MediumText>
    </Button>
  );
};

export default BlueButton;

const Button = styled.button`
  padding: 1.4rem;
  background-color: ${({ theme }) => theme.color.blue[80]};
  border-radius: 0.8rem;
`;
