import { SetStateAction } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { theme } from '../../styles/theme';
import styled from 'styled-components';
import { MediumText } from '../atoms';
import { formatFilter } from '../../utils/format';
import { IoOptionsOutline } from 'react-icons/io5';

interface Filter {
  title: string;
  value?: string | null;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  handleFilterClick?: () => void;
  hasIcon?: boolean;
}

const Filter = ({
  title,
  value,
  setIsOpenModal,
  handleFilterClick,
  hasIcon,
}: Filter) => {
  const isSelected = value !== null;

  return (
    <Container
      onClick={() => {
        handleFilterClick?.();
        setIsOpenModal((prev) => !prev);
      }}
      $isSelected={isSelected}
    >
      {hasIcon && (
        <IoOptionsOutline
          size={18}
          color={isSelected ? theme.color.tint.white : theme.color.gray[50]}
        />
      )}
      <MediumText
        size={14}
        color={isSelected ? theme.color.tint.white : theme.color.gray[50]}
      >
        {formatFilter(value || title)}
      </MediumText>
      {!hasIcon && (
        <FaAngleDown
          color={isSelected ? theme.color.tint.white : theme.color.gray[50]}
          size={12}
        />
      )}
    </Container>
  );
};

export default Filter;

const Container = styled.div<{ $isSelected: boolean }>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  border: ${({ theme, $isSelected }) =>
    $isSelected ? 'none' : `0.5px solid ${theme.color.gray[50]}`};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.blue[70] : theme.color.tint.white};
  cursor: pointer;
`;
