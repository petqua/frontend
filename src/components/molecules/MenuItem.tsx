import { styled } from 'styled-components';
import { MediumText } from '../atoms';
import { theme } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from '../atoms/Icon';

interface MenuItem {
  text: string;
  path?: string;
  onClick?: () => void;
  isBlueArrow?: boolean;
}

const MenuItem = ({ text, path, onClick, isBlueArrow }: MenuItem) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => (path ? navigate(path) : onClick?.())}>
      <MediumText size={14} color={theme.color.gray[70]}>
        {text}
      </MediumText>
      <FaChevronRight
        size={12}
        color={isBlueArrow ? theme.color.blue[70] : theme.color.gray[50]}
      />
    </Container>
  );
};

export default MenuItem;

const Container = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 1.4rem;
  border-bottom: 0.05rem solid ${({ theme }) => theme.color.gray[30]};
`;
