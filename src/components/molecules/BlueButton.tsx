import { MediumText } from '../atoms';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

interface BlueButton {
  text: string;
  onClick: () => void;
  style?: any;
}

const BlueButton = ({ text, onClick, style }: BlueButton) => {
  return (
    <Button onClick={onClick} style={{ ...style }}>
      <MediumText size={20} color={theme.color.tint.white}>
        {text}
      </MediumText>
    </Button>
  );
};

export default BlueButton;

const Button = styled.button`
  padding: 1.4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.color.blue[80]};
  border-radius: 0.8rem;
`;
