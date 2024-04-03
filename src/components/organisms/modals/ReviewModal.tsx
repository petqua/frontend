import { SetStateAction, useState } from 'react';
import { FlexBox, MediumText } from '../../atoms';
import { theme } from '../../../styles/theme';
import { BlueButton, StarRating } from '../../molecules';
import Modal from '../../molecules/Modal';

interface ReviewModal {
  value: number | null;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setValue: React.Dispatch<SetStateAction<number | null>>;
  options: number[];
}

const ReviewModal = ({
  setIsOpenModal,
  options,
  value,
  setValue,
}: ReviewModal) => {
  const [visible, setVisible] = useState(true);
  const [selectedValue, setSelectedValue] = useState(value);

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  return (
    <Modal title="평점" visible={visible} handleCloseModal={handleCloseModal}>
      <>
        {options.map((item, idx) => {
          const score = 5 - idx;
          return (
            <FlexBox
              key={idx}
              align="center"
              justify="space-between"
              padding="1.6rem"
              style={{
                width: '100%',
                borderBottom: `0.05rem solid ${theme.color.gray[50]}`,
                backgroundColor:
                  selectedValue === score
                    ? theme.color.blue[40]
                    : 'transparent',
              }}
              onClick={() => {
                selectedValue !== score
                  ? setSelectedValue(score)
                  : setSelectedValue(null);
              }}
            >
              <StarRating size={22} gap={0.01} score={score} />
              <MediumText size={14} color={theme.color.gray[70]}>
                {item.toLocaleString()}
              </MediumText>
            </FlexBox>
          );
        })}
        <BlueButton
          text="적용하기"
          onClick={() => {
            setValue(selectedValue);
            handleCloseModal();
          }}
          isMargin
          style={{ margin: '2.8rem 0 1.4rem 0' }}
        />
      </>
    </Modal>
  );
};

export default ReviewModal;
