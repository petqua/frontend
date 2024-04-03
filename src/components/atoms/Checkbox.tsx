import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { FaCheck } from 'react-icons/fa6';

interface CheckBox {
  checked: boolean | undefined;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ checked, onChange }: CheckBox) => {
  return (
    <Container checked={checked || false}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div>
        <FaCheck
          size={12}
          color={theme.color.tint.white}
          style={{
            visibility: checked ? 'visible' : 'hidden',
          }}
        />
      </div>
    </Container>
  );
};

export default CheckBox;

const Container = styled.label<{ checked: boolean }>`
  cursor: pointer;

  input {
    display: none;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: ${({ checked, theme }) =>
      checked ? 'none' : `solid 0.1rem ${theme.color.gray[50]}`};
    background: ${({ checked, theme }) =>
      checked ? theme.color.blue[80] : 'white'};
  }
`;
