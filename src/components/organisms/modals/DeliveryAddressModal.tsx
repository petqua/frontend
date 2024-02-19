import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexBox, MediumText } from '../../atoms';
import { theme } from '../../../styles/theme';
import Modal from '../../molecules/Modal';

interface DeliveryAddressModal {
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

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

const DeliveryAddressModal = ({ setIsOpenModal }: DeliveryAddressModal) => {
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
    <Modal
      title="운송지 추가"
      visible={visible}
      handleCloseModal={handleCloseModal}
      hasInput
    >
      <FlexBox col gap="1.6rem" style={{ width: '100%' }}>
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
        <ApplyButton onClick={handleCloseModal}>적용하기</ApplyButton>
      </FlexBox>
    </Modal>
  );
};

export default DeliveryAddressModal;
