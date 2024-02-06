import { SetStateAction, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { RegularText, BoldText, FlexBox } from '../atoms';
import { theme } from '../../styles/theme';
import { FaCheck } from 'react-icons/fa6';

interface Option {
  name: string;
  title: string;
}

interface Modal {
  value: string;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setValue: React.Dispatch<SetStateAction<string>>;
  options: Option[];
  title: string;
}

// 모달은 꼭 page 단위에서 사용해야함!!
const Modal = ({ setIsOpenModal, setValue, value, options, title }: Modal) => {
  const [visible, setVisible] = useState(true);

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  return (
    <ModalOverlay onClick={handleCloseModal} $visible={visible}>
      <Container onClick={(e) => e.stopPropagation()} $visible={visible}>
        <Bar />
        <BoldText
          size={22}
          color={theme.color.gray.main}
          style={{ padding: '2rem 0' }}
        >
          {title}
        </BoldText>
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
      </Container>
    </ModalOverlay>
  );
};

export default Modal;

// 애니메이션 재사용 될 때 style>animation 파일로 따로 분리할게요
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideUp = keyframes`
from {
    transform: translateY(100%);
    opacity: 0;
}
to {
    transform: translateY(0);
    opacity: 1;
}
`;

const slideDown = keyframes`
from {
    transform: translateY(0);
    opacity: 1;
}
to {
    transform: translateY(100%);
    opacity: 0;
}
`;

const ModalOverlay = styled.div<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.6);

  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;

const Container = styled.div<{ $visible: boolean }>`
  width: 100%;
  min-width: 20rem;
  max-width: 50rem;
  height: fit-content;
  padding-top: 1.6rem;
  padding-bottom: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 101;
  background-color: white;
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;

  animation: ${({ $visible }) => ($visible ? slideUp : slideDown)} 0.3s
    ease-in-out;
`;

const Bar = styled.div`
  width: 3.2rem;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
  border-radius: 0.2rem;
`;
