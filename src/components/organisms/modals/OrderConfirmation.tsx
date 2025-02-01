import styled from 'styled-components';
import { MediumText } from '../../atoms';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 4rem;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  margin-top: 3rem;
  background-color: #007bff;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const OrderConfirmationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <MediumText size={20} color="black">
          주문이 접수되었습니다!
        </MediumText>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default OrderConfirmationModal;
