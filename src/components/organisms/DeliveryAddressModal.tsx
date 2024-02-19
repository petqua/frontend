import { SetStateAction, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BoldText, FlexBox, MediumText } from '../atoms';
import { theme } from '../../styles/theme';
import { IoIosArrowBack } from 'react-icons/io';

interface Modal {
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  title: string;
}

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
  height: 100vh;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 101;
  background-color: white;
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
  gap: 1.6rem;
  animation: ${({ $visible }) => ($visible ? slideUp : slideDown)} 0.3s
    ease-in-out;
`;

const Bar = styled.div`
  width: 3.2rem;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
  border-radius: 0.2rem;
`;

const Input = styled.input`
  border: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
  border-radius: 0.8rem;
  height: 3.8rem;
  flex: 1;
  padding: 1rem;
  ${({ theme }) => theme.font.regular14}
  color: ${({ theme }) => theme.color.gray.main};
  width: 100%;
`;

const FindAddressButton = styled.button`
  width: 8rem;
  height: 3.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  border: 0.05rem solid ${({ theme }) => theme.color.blue[70]};
  ${({ theme }) => theme.font.regular14}
  color: ${({ theme }) => theme.color.blue[70]};
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  & > input {
    width: 1.8rem;
    height: 1.8rem;
  }
  & > label {
    ${({ theme }) => theme.font.medium16}
    color: ${({ theme }) => theme.color.gray.main};
  }
`;

const ApplyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.blue[80]};
  ${({ theme }) => theme.font.medium16}
  color: ${({ theme }) => theme.color.tint.white};
  width: 100%;
  height: 6.7rem;
`;

interface InputFormProps {
  title: string;
  name: string;
  onChangeHandler: (e: any) => void;
}

const InputForm = ({ title, name, onChangeHandler }: InputFormProps) => {
  return (
    <FlexBox
      padding="0 1.4rem"
      gap="1.9rem"
      align="center"
      style={{ width: '100%' }}
    >
      <MediumText
        size={14}
        color={theme.color.gray.main}
        style={{ minWidth: '5rem' }}
      >
        {title}
      </MediumText>
      <Input name={name} onChange={onChangeHandler} />
    </FlexBox>
  );
};

const InputAddressForm = ({ onChangeHandler }: any) => {
  return (
    <FlexBox padding="0 1.4rem" gap="1.9rem" style={{ width: '100%' }}>
      <MediumText
        size={14}
        color={theme.color.gray.main}
        style={{ minWidth: '5rem', paddingTop: '1.0rem' }}
      >
        주소
      </MediumText>
      <FlexBox col gap="1.6rem" style={{ width: '100%' }}>
        <FlexBox gap="1.8rem" style={{ width: '100%' }}>
          <FindAddressButton>주소 찾기</FindAddressButton>
          <Input name="zipCode" onChange={onChangeHandler} />
        </FlexBox>
        <Input name="address" onChange={onChangeHandler} />
        <Input name="detailAddress" onChange={onChangeHandler} />
        <CheckBoxContainer>
          <input
            type="checkbox"
            name="isDefaultAddress"
            onChange={onChangeHandler}
          />
          <label>기본 운송지로 저장</label>
        </CheckBoxContainer>
      </FlexBox>
    </FlexBox>
  );
};

// 모달은 꼭 page 단위에서 사용해야함!!
const DeliveryAddressModal = ({ setIsOpenModal, title }: Modal) => {
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    receiver: '',
    phoneNumber: '',
    zipCode: '',
    address: '',
    detailAddress: '',
    isDefaultAddress: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setAddressInfo({
      ...addressInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const [visible, setVisible] = useState(true);

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');
    return () => document.body.setAttribute('style', 'overflow: auto');
  }, []);

  return (
    <ModalOverlay onClick={handleCloseModal} $visible={visible}>
      <Container onClick={(e) => e.stopPropagation()} $visible={visible}>
        <Bar />
        <FlexBox justify="center" align="center" style={{ width: '100%' }}>
          <IoIosArrowBack
            size={24}
            color={theme.color.gray.main}
            onClick={handleCloseModal}
            style={{ position: 'absolute', left: '1rem' }}
          />
          <BoldText
            size={18}
            color={theme.color.gray.main}
            style={{ padding: '2rem 0' }}
          >
            {title}
          </BoldText>
        </FlexBox>
        <InputForm
          title="배송지명"
          name="name"
          onChangeHandler={handleChange}
        />
        <InputForm
          title="받는사람"
          name="receiver"
          onChangeHandler={handleChange}
        />
        <InputForm
          title="전화번호"
          name="phoneNumber"
          onChangeHandler={handleChange}
        />
        <InputAddressForm onChangeHandler={handleChange} />
        <ApplyButton>적용하기</ApplyButton>
      </Container>
    </ModalOverlay>
  );
};

export default DeliveryAddressModal;
