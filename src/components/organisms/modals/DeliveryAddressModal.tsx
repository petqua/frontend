import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { postNewAddressAPI } from '../../../apis';
import { Address } from '../../../interfaces/payment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePaymentStore } from '../../../states';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Modal from '../../molecules/Modal';
import { FlexBox, MediumText } from '../../atoms';

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
  value: string | number;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({ title, name, value, onChangeHandler }: InputFormProps) => {
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
      <Input name={name} value={value} onChange={onChangeHandler} />
    </FlexBox>
  );
};

interface InputAddressFormProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addressInfo: Address;
  setAddressInfo: React.Dispatch<SetStateAction<Address>>;
}

const InputAddressForm = ({
  onChangeHandler,
  addressInfo,
  setAddressInfo,
}: InputAddressFormProps) => {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: any) => {
    const zipCode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      setAddressInfo((prev) => ({ ...prev, zipCode, address: fullAddress }));
    }
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

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
          <FindAddressButton onClick={handleClick}>주소 찾기</FindAddressButton>
          <Input
            name="zipCode"
            value={addressInfo.zipCode}
            onChange={onChangeHandler}
            readOnly
          />
        </FlexBox>
        <Input
          name="address"
          value={addressInfo.address}
          onChange={onChangeHandler}
          readOnly
        />
        <Input
          name="detailAddress"
          value={addressInfo.detailAddress}
          onChange={onChangeHandler}
        />
        <CheckBoxContainer>
          <input
            type="checkbox"
            name="isDefaultAddress"
            checked={addressInfo.isDefaultAddress}
            onChange={onChangeHandler}
          />
          <label>기본 운송지로 저장</label>
        </CheckBoxContainer>
      </FlexBox>
    </FlexBox>
  );
};

interface DeliveryAddressModal {
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  title: string;
}

// 모달은 꼭 page 단위에서 사용해야함!!
const DeliveryAddressModal = ({
  setIsOpenModal,
  title,
}: DeliveryAddressModal) => {
  const queryClient = useQueryClient();
  const { setAddress } = usePaymentStore();
  const [addressInfo, setAddressInfo] = useState<Address>({
    name: '',
    receiver: '',
    phoneNumber: '',
    zipCode: undefined,
    address: '',
    detailAddress: '',
    isDefaultAddress: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const { mutate } = useMutation({
    mutationFn: () => postNewAddressAPI(addressInfo),
    onSuccess: (data) => {
      setAddress({ ...addressInfo, id: data.id });
      queryClient.invalidateQueries({ queryKey: ['defaultAddress'] });
    },
    onError: () => {
      console.error('배송지 추가 error');
    },
  });

  const handleAddAddressClick = async () => {
    mutate();
    handleCloseModal();
  };

  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');
    return () => document.body.setAttribute('style', 'overflow: auto');
  }, []);

  return (
    <Modal
      title={title}
      visible={visible}
      handleCloseModal={handleCloseModal}
      hasInput
    >
      <FlexBox col gap="1.6rem" style={{ width: '100%' }}>
        <InputForm
          title="배송지명"
          name="name"
          value={addressInfo.name}
          onChangeHandler={handleChange}
        />
        <InputForm
          title="받는사람"
          name="receiver"
          value={addressInfo.receiver}
          onChangeHandler={handleChange}
        />
        <InputForm
          title="전화번호"
          name="phoneNumber"
          value={addressInfo.phoneNumber}
          onChangeHandler={handleChange}
        />
        <InputAddressForm
          onChangeHandler={handleChange}
          setAddressInfo={setAddressInfo}
          addressInfo={addressInfo}
        />
        <ApplyButton onClick={handleAddAddressClick}>적용하기</ApplyButton>
      </FlexBox>
    </Modal>
  );
};

export default DeliveryAddressModal;
