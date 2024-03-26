import { SetStateAction, useState } from 'react';
import { RegularText, FlexBox } from '../../atoms';
import { theme } from '../../../styles/theme';
import { FaCheck } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import Modal from '../../molecules/Modal';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { BlueButton } from '../../molecules';

interface SpeciesModal {
  value: string[];
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  options: string[];
}

const SpeciesModal = ({ setIsOpenModal, value, options }: SpeciesModal) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValues, setSelectedValues] = useState(value);
  const [visible, setVisible] = useState(true);

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  const handleItem = (species: string) => {
    if (selectedValues.includes(species)) {
      const filteredValues = selectedValues.filter((item) => item !== species);
      setSelectedValues(filteredValues);
    } else {
      setSelectedValues([...selectedValues, species]);
    }
  };

  return (
    <Modal title="어종" visible={visible} handleCloseModal={handleCloseModal}>
      <>
        <GridLayout>
          {options.map((item, idx) => {
            const isSelected = selectedValues.includes(item);
            return (
              <FlexBox
                key={idx}
                padding="1.2rem"
                justify="space-between"
                align="center"
                style={{
                  height: '4.5rem',
                  border: `0.5px solid ${isSelected ? theme.color.gray.main : theme.color.gray[60]}`,
                  cursor: 'pointer',
                }}
                onClick={() => handleItem(item)}
              >
                <RegularText
                  size={18}
                  color={
                    isSelected ? theme.color.gray.main : theme.color.gray[60]
                  }
                >
                  {item}
                </RegularText>
                {isSelected ? (
                  <FaCheck size={16} color={theme.color.gray.main} />
                ) : (
                  <GoPlus size={20} color={theme.color.gray[60]} />
                )}
              </FlexBox>
            );
          })}
        </GridLayout>
        <BlueButton
          text="적용하기"
          onClick={() => {
            searchParams.set('species', selectedValues.join(','));
            setSearchParams(searchParams);
            handleCloseModal();
          }}
          isMargin
          style={{ margin: '2rem' }}
        />
      </>
    </Modal>
  );
};

export default SpeciesModal;

const GridLayout = styled.div`
  padding: 1.4rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 0.8rem;
  grid-row-gap: 1.2rem;
`;
