import styled from 'styled-components';
import CategoryImg from '../atoms/CategoryImg';
import { RegularText } from '../atoms';
import { theme } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
`;

interface CategoryItem {
  name: string;
  src: string;
  path: string;
}

const CategoryItem = ({ name, src, path }: CategoryItem) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Container onClick={handleClick}>
      <CategoryImg src={src} size="90%" />
      <RegularText size={12} color={theme.color.gray.main}>
        {name}
      </RegularText>
    </Container>
  );
};

export default CategoryItem;
