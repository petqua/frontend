import styled from 'styled-components';
import { BoldText, FlexBox, MediumText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';
//import { usePaymentStore } from '../../states';
import { DeliveryRequestDropdown } from '.';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2.4rem 1.4rem;
  border-top: 0.05rem solid #989898;
`;

const NoAddressBox = styled.div`
  display: flex;
  height: 15.6rem;
  gap: 0.6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.blue[40]};
  border-radius: 1.2rem;
`;

const YesAddressBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const withAddressComponent = (Component: any) => {
  return function WithAddressComponent(props: any) {
    // const { address } = usePaymentStore();
    const address = null;
    // 주소 있는 경우
    if (address) {
      return <YesAddressComponent data={address} />;
    }
    // 주소 없는 경우.
    return <Component {...props} />;
  };
};

const YesAddressComponent = ({ data }: any) => {
  const { receiver, phoneNumber, address, detailAddress } = data;
  return (
    <YesAddressBox>
      <MediumText size={16} color={theme.color.gray.main}>
        {receiver}
      </MediumText>
      <RegularText size={14} color={theme.color.gray[50]}>
        {phoneNumber}
      </RegularText>
      <RegularText size={14} color={theme.color.gray.main}>
        {address} {detailAddress}
      </RegularText>
      <DeliveryRequestDropdown />
    </YesAddressBox>
  );
};

const AddressComponent = withAddressComponent(({ setIsModalOpen }: any) => {
  return (
    <NoAddressBox onClick={() => setIsModalOpen(true)}>
      <MediumText size={18} color={theme.color.gray.main}>
        배송지가 없습니다.
      </MediumText>
      <MediumText size={14} color={theme.color.gray[50]}>
        배송지 입력하기
      </MediumText>
    </NoAddressBox>
  );
});

interface AddressFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressForm = ({ setIsModalOpen }: AddressFormProps) => {
  return (
    <Container>
      <FlexBox justify="space-between">
        <BoldText size={18} color={theme.color.gray.main}>
          배송지
        </BoldText>
        <MediumText
          size={16}
          color={theme.color.blue[70]}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsModalOpen(true)}
        >
          배송지 변경
        </MediumText>
      </FlexBox>
      <AddressComponent setIsModalOpen={setIsModalOpen} />
    </Container>
  );
};

export default AddressForm;
