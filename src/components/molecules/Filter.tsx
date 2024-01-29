import { SetStateAction } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { theme } from '../../styles/theme';
import styled from 'styled-components';
import { MediumText } from '../atoms';
import { formatFilter } from '../../utils/format';

interface Filter {
  value: string;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

const Filter = ({ value, setIsOpenModal }: Filter) => {
  return (
    <Container onClick={() => setIsOpenModal((prev) => !prev)}>
      <MediumText size={16} color={theme.color.gray[70]}>
        {formatFilter(value)}
      </MediumText>
      <FaAngleDown color={theme.color.gray[50]} size={16} />
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  border: 0.5px solid ${({ theme }) => theme.color.gray[50]};
`;
