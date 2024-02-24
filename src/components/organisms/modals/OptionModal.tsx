import { SetStateAction, useState } from 'react';
import { BoldText, FlexBox, MediumText, RegularText } from '../../atoms';
import { theme } from '../../../styles/theme';
import { BlueButton } from '../../molecules';
import Modal from '../../molecules/Modal';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface OptionModal {
  //   value: number | undefined;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  //   setValue: React.Dispatch<SetStateAction<number | undefined>>;
}

const OptionModal = ({
  setIsOpenModal,
  //   value,
  //   setValue,
}: OptionModal) => {
  const [visible, setVisible] = useState(true);
  //   const [selectedValue, setSelectedValue] = useState(value);

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  return (
    <Modal visible={visible} handleCloseModal={handleCloseModal}>
      <>
        <FlexBox col gap="2.8rem" padding="0 1.4rem 2.4rem 1.4rem" fullWidth>
          <BoldText size={18} color={theme.color.gray.main}>
            21,000원
          </BoldText>
          <Line />
          <FlexBox justify="space-between" align="center" fullWidth>
            <MediumText size={16} color={theme.color.gray.main}>
              마릿수
            </MediumText>
            <FlexBox
              gap="4.4rem"
              align="center"
              padding="0.6rem"
              style={{
                borderRadius: '0.6rem',
                border: `0.05rem solid ${theme.color.gray[50]}`,
              }}
            >
              <FaMinus
                size={16}
                color={theme.color.gray[50]}
                style={{ cursor: 'pointer' }}
              />
              <RegularText size={16} color={theme.color.gray.main}>
                1
              </RegularText>
              <FaPlus
                size={16}
                color={theme.color.gray[50]}
                style={{ cursor: 'pointer' }}
              />
            </FlexBox>
          </FlexBox>
          <FlexBox justify="space-between" align="center" fullWidth>
            <MediumText size={16} color={theme.color.gray.main}>
              성별
            </MediumText>
            <FlexBox align="center" gap="0.8rem">
              <SexButton>
                <RegularText size={16} color={theme.color.gray.main}>
                  암
                </RegularText>
              </SexButton>
              <SexButton>
                <RegularText size={16} color={theme.color.gray.main}>
                  수
                </RegularText>
              </SexButton>
            </FlexBox>
          </FlexBox>
          <FlexBox col gap="1.4rem" fullWidth>
            <MediumText size={16} color={theme.color.gray.main}>
              입양방법
            </MediumText>
            <FlexBox fullWidth justify="space-between" align="center">
              <MethodButton>
                <RegularText size={16} color={theme.color.gray.main}>
                  일반운송
                </RegularText>
              </MethodButton>
              <MethodButton>
                <RegularText size={16} color={theme.color.gray.main}>
                  안전운송
                </RegularText>
              </MethodButton>
              <MethodButton>
                <RegularText size={16} color={theme.color.gray.main}>
                  직접방문
                </RegularText>
              </MethodButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <BlueButtonContainer>
          <BlueButton
            text="변경 완료"
            onClick={() => {
              //   setValue(selectedValue);
              handleCloseModal();
            }}
          />
        </BlueButtonContainer>
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

const SexButton = styled.button`
  border-radius: 3rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
  padding: 0.6rem 3.2rem;
`;

const MethodButton = styled.button`
  width: 31%;
  border-radius: 0.6rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray[50]};
  padding: 1rem 0;
`;

const BlueButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1.6rem 1.4rem;
  border-top: 0.025rem solid ${({ theme }) => theme.color.gray[50]};
`;
