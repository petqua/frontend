import { SetStateAction } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { theme } from '../../styles/theme';
import styled from 'styled-components';
import { MediumText } from '../atoms';
import { formatFilter } from '../../utils/format';
import { IoOptionsOutline } from 'react-icons/io5';

interface Filter {
  value: string;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  handleFilterClick?: () => void;
  hasIcon?: boolean;
}

const Filter = ({
  value,
  setIsOpenModal,
  handleFilterClick,
  hasIcon,
}: Filter) => {
  return (
    <Container
      onClick={() => {
        handleFilterClick?.();
        setIsOpenModal((prev) => !prev);
      }}
    >
      {hasIcon && <IoOptionsOutline size={18} color={theme.color.gray[50]} />}
      <MediumText size={14} color={theme.color.gray[50]}>
        {formatFilter(value)}
      </MediumText>
      {!hasIcon && <FaAngleDown color={theme.color.gray[50]} size={12} />}
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
