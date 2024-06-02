import { MediumText } from '../atoms';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

interface BlueButton {
  text: string;
  onClick: () => void;
  isBigText?: boolean;
  isMargin?: boolean;
  disabled?: boolean;
  style?: any;
}

const BlueButton = ({
  text,
  onClick,
  isBigText,
  isMargin = false,
  disabled,
  style,
}: BlueButton) => {
  return (
    <Button
      onClick={onClick}
      style={{ ...style }}
      $isMargin={isMargin}
      disabled={disabled}
    >
      <MediumText
        size={isBigText ? 20 : 16}
        color={disabled ? theme.color.gray[50] : theme.color.tint.white}
      >
        {text}
      </MediumText>
    </Button>
  );
};

export default BlueButton;

const Button = styled.button<{ $isMargin: boolean }>`
  width: ${({ $isMargin }) => ($isMargin ? 'calc(100% - 2.8rem)' : '100%')};
  margin: ${({ $isMargin }) => ($isMargin ? '0 1.4rem' : '0')};
  padding: 1.4rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.color.gray[30] : theme.color.blue[80]};
  border-radius: 0.8rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'cursor')};
`;
