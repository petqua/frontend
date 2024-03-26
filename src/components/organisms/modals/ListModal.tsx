import { SetStateAction, useState } from 'react';
import { RegularText, BoldText, FlexBox } from '../../atoms';
import { theme } from '../../../styles/theme';
import { FaCheck } from 'react-icons/fa6';
import Modal from '../../molecules/Modal';
import { formatFilter } from '../../../utils/format';
import { useSearchParams } from 'react-router-dom';

interface ListModal {
  value: string | null;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  options: string[];
  type: string;
}

const ListModal = ({ setIsOpenModal, value, options, type }: ListModal) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setVisible] = useState(true);

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'deliveryMethod':
        return '운송방법';
      case 'sorter':
        return '정렬';
      default:
        return type;
    }
  };

  return (
    <Modal
      title={formatFilter(value || getTitle(type))}
      visible={visible}
      handleCloseModal={handleCloseModal}
    >
      <>
        {options.map((item, idx) => (
          <FlexBox
            key={idx}
            align="center"
            justify="space-between"
            style={{ width: '100%', padding: '2.4rem 3.2rem' }}
            onClick={() => {
              if (value === item) {
                searchParams.delete(type);
                setSearchParams(searchParams);
              } else {
                searchParams.set(type, item);
                setSearchParams(searchParams);
              }
              handleCloseModal();
            }}
          >
            {item === value ? (
              <BoldText size={16} color={theme.color.gray.main}>
                {formatFilter(item)}
              </BoldText>
            ) : (
              <RegularText size={16} color={theme.color.gray.main}>
                {formatFilter(item)}
              </RegularText>
            )}

            {item === value && (
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
