import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { FaCheck } from 'react-icons/fa6';

interface CheckBox {
  checked: boolean;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ checked, onChange }: CheckBox) => {
  return (
    <Container checked={checked}>
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
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
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
