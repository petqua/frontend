import { SetStateAction, useState } from 'react';
import { BoldText, FlexBox, MediumText, RegularText } from '../../atoms';
import { theme } from '../../../styles/theme';
import { BlueButton, WhiteButton } from '../../molecules';
import Modal from '../../molecules/Modal';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';
import { patchCartsOptionsAPI, postCartsAPI } from '../../../apis';
import { usePopUpStore } from '../../../states';
import { OptionModalData } from '../../../interfaces/product';
// import { useNavigate } from 'react-router-dom';

interface OptionModal {
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  data: OptionModalData;
  isEdit?: boolean;
}

interface RequestData {
  quantity: number;
  sex: string;
  deliveryMethod: string | null;
  deliveryFee: number;
}

const OptionModal = ({ setIsOpenModal, data, isEdit }: OptionModal) => {
  // const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [requestData, setRequestData] = useState<RequestData>({
    quantity: data?.quantity || 1,
    sex: data?.sex || 'HERMAPHRODITE',
    deliveryMethod: data?.deliveryMethod || null,
    deliveryFee: data?.deliveryFee || 0,
  });
  const [calculatedPrice, setCalculatedPrice] = useState(
    data?.productDiscountPrice || 0,
  );
  // const { items, setItems } = useCartStore();
  const { setState, setAction, setIsOpenPopUp } = usePopUpStore();

  const sexData = [
    {
      key: 'FEMALE',
      name: '암',
      selected: requestData.sex === 'FEMALE',
      disabled: data?.femaleAdditionalPrice === null,
    },
    {
      key: 'MALE',
      name: '수',
      selected: requestData.sex === 'MALE',
      disabled: data?.maleAdditionalPrice === null,
    },
  ];

  const methodData = [
    {
      key: 'COMMON',
      name: '일반운송',
      selected: requestData.deliveryMethod === 'COMMON',
      deliveryFee: data?.commonDeliveryFee,
      disabled: data?.commonDeliveryFee === null,
    },
    {
      key: 'SAFETY',
      name: '안전운송',
      selected: requestData.deliveryMethod === 'SAFETY',
      deliveryFee: data?.safeDeliveryFee,
      disabled: data?.safeDeliveryFee === null,
    },
    {
      key: 'PICK_UP',
      name: '직접방문',
      selected: requestData.deliveryMethod === 'PICK_UP',
      deliveryFee: data?.pickUpDeliveryFee,
      disabled: data?.pickUpDeliveryFee === null,
    },
  ];

  // 모달 닫기 기능
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  const { mutate: postCartsMutate } = useMutation({
    mutationKey: ['postCarts', data?.productId],
    mutationFn: () =>
      postCartsAPI({ productId: data?.productId, ...requestData }),
    onSuccess: () => {
      handleCloseModal();
      setAction('cart');
      setState('add');
      setIsOpenPopUp(true);
    },
    onError: (err: any) => {
      if (err.response.data.code === 'CP30') {
        handleCloseModal();
        setAction('cart');
        setState('filled');
        setIsOpenPopUp(true);
      }
      console.error(err);
    },
  });

  const { mutate: patchOptionsMutate } = useMutation({
    mutationKey: ['patchOptions', data?.id],
    mutationFn: () => patchCartsOptionsAPI(data?.id, requestData),
    onSuccess: () => {
      const changedItems = items.map((store) => {
        if (store.storeName === data.storeName) {
          return {
            ...store,
            items: store.items.map((item) => {
              if (item.id === data.id) {
                return { ...item, ...requestData };
              } else return item;
            }),
          };
        } else return store;
      });
      setItems(changedItems);
      handleCloseModal();
    },
    onError: (err) => {
      console.error(err);
    },
  });


  // 옵션 변경 기능
  const handleQuantity = (value: number) => {
    if (value !== -1 || requestData.quantity > 1) {
      setRequestData({
        ...requestData,
        quantity: requestData.quantity + value,
      });
    }
  };

  const handleSex = (sex: string) => {
    setRequestData({ ...requestData, sex });
    setCalculatedPrice(
      data?.productDiscountPrice +
        (sex === 'MALE'
          ? data?.maleAdditionalPrice || 0
          : data?.femaleAdditionalPrice || 0),
    );
  };

  const handleMethod = (deliveryMethod: string, deliveryFee: number) => {
    setRequestData({ ...requestData, deliveryMethod, deliveryFee });
    setCalculatedPrice(data?.productDiscountPrice + deliveryFee);
  };

  return (
    <Modal visible={visible} handleCloseModal={handleCloseModal}>
      <>
        <FlexBox
          col
          gap="2.8rem"
          padding="0 1.4rem 2.4rem 1.4rem"
          fullWidth
          style={{ userSelect: 'none' }}
        >
          <BoldText size={18} color={theme.color.gray.main}>
            {(calculatedPrice * requestData.quantity).toLocaleString()}원
          </BoldText>
          <Line />
          <FlexBox justify="space-between" align="center" fullWidth>
            <MediumText size={16} color={theme.color.gray.main}>
              마릿수
            </MediumText>
            <FlexBox
              justify="space-between"
              align="center"
              padding="0.6rem"
              style={{
                width: '14rem',
                borderRadius: '0.6rem',
                border: `0.05rem solid ${theme.color.gray[50]}`,
              }}
            >
              <FaMinus
                size={16}
                color={theme.color.gray[50]}
                style={{ cursor: 'pointer' }}
                onClick={() => handleQuantity(-1)}
              />
              <RegularText size={16} color={theme.color.gray.main}>
                {requestData.quantity}
              </RegularText>
              <FaPlus
                size={16}
                color={theme.color.gray[50]}
                style={{ cursor: 'pointer' }}
                onClick={() => handleQuantity(1)}
              />
            </FlexBox>
          </FlexBox>
          <FlexBox justify="space-between" align="center" fullWidth>
            <MediumText size={16} color={theme.color.gray.main}>
              성별
            </MediumText>
            <FlexBox align="center" gap="0.8rem">
              {sexData.map((item) => (
                <SexButton
                  key={item.key}
                  onClick={() => handleSex(item.key)}
                  disabled={item.disabled}
                  $selected={item.selected}
                  $disabled={item.disabled}
                >
                  <RegularText
                    size={16}
                    color={
                      item.disabled
                        ? theme.color.gray[40]
                        : item.selected
                          ? 'white'
                          : theme.color.gray.main
                    }
                  >
                    {item.name}
                  </RegularText>
                </SexButton>
              ))}
            </FlexBox>
          </FlexBox>
          <FlexBox col gap="1.4rem" fullWidth>
            <MediumText size={16} color={theme.color.gray.main}>
              입양방법
            </MediumText>
            <FlexBox fullWidth justify="space-between" align="center">
              {methodData.map((item) => (
                <MethodButton
                  key={item.key}
                  onClick={() => handleMethod(item.key, item.deliveryFee || 0)}
                  disabled={item.disabled}
                  $selected={item.selected}
                  $disabled={item.disabled}
                >
                  <RegularText
                    size={16}
                    color={
                      item.disabled
                        ? theme.color.gray[40]
                        : item.selected
                          ? 'white'
                          : theme.color.gray.main
                    }
                  >
                    {item.name}
                  </RegularText>
                </MethodButton>
              ))}
            </FlexBox>
          </FlexBox>
        </FlexBox>

        {isEdit ? (
          <ButtonContainer>
            <BlueButton text="변경 완료" onClick={patchOptionsMutate} />
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <WhiteButton text="봉달하기" onClick={postCartsMutate} isRound />
            <BlueButton text="입양하기" onClick={() => {}} />
          </ButtonContainer>
        )}
      </>
    </Modal>
  );
};

export default OptionModal;

const Line = styled.div`
  width: 100%;
  height: 0.05rem;
  background-color: ${({ theme }) => theme.color.gray[50]};
`;

const SexButton = styled.button<{ $selected: boolean; $disabled: boolean }>`
  border-radius: 3rem;
  border: 0.05rem solid
    ${({ theme, $selected, $disabled }) =>
      $selected
        ? 'transparent'
        : $disabled
          ? theme.color.gray[40]
          : theme.color.gray[50]};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.color.blue[70] : 'white'};
  padding: 0.6rem 3.2rem;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
`;

const MethodButton = styled.button<{ $selected: boolean; $disabled: boolean }>`
  width: 31%;
  border-radius: 0.6rem;
  border: 0.05rem solid
    ${({ theme, $selected, $disabled }) =>
      $selected
        ? 'transparent'
        : $disabled
          ? theme.color.gray[40]
          : theme.color.gray[50]};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.color.blue[70] : 'white'};
  padding: 1rem 0;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1.6rem 1.4rem;
  gap: 1rem;
  border-top: 0.025rem solid ${({ theme }) => theme.color.gray[50]};
`;
