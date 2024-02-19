import { SetStateAction, useState } from 'react';
import { RegularText, BoldText, FlexBox } from '../../atoms';
import { theme } from '../../../styles/theme';
import { FaCheck } from 'react-icons/fa6';
import Modal from '../../molecules/Modal';

interface Option {
  name: string;
  title: string;
}

interface ListModal {
  value: string;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setValue: React.Dispatch<SetStateAction<string>>;
  options: Option[];
  title: string;
}

const ListModal = ({
  setIsOpenModal,
  setValue,
  value,
  options,
  title,
}: ListModal) => {
  const [visible, setVisible] = useState(true);

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  return (
    <Modal title={title} visible={visible} handleCloseModal={handleCloseModal}>
      <>
        {options.map((item, idx) => (
          <FlexBox
            key={idx}
            align="center"
            justify="space-between"
            style={{ width: '100%', padding: '2.4rem 3.2rem' }}
            onClick={() => {
              setValue(item.name);
              handleCloseModal();
            }}
          >
            {item.name === value ? (
              <BoldText size={16} color={theme.color.gray.main}>
                {item.title}
              </BoldText>
            ) : (
              <RegularText size={16} color={theme.color.gray.main}>
                {item.title}
              </RegularText>
            )}

            {item.name === value && (
              <FaCheck color={theme.color.gray.main} size={18} />
            )}
          </FlexBox>
        ))}
        <div style={{ height: '2rem' }} />
      </>
    </Modal>
  );
};

export default ListModal;
