import React, { useEffect } from 'react';
import { BoldText, FlexBox } from '../atoms';
import { theme } from '../../styles/theme';
import styled, { keyframes } from 'styled-components';
import { IoChevronBackOutline, IoClose } from 'react-icons/io5';

interface Modal {
  children: React.ReactNode;
  title?: string;
  visible: boolean;
  handleCloseModal: () => void;
  hasInput?: boolean;
  hasBackBtn?: boolean;
}

const Modal = ({
  children,
  title,
  visible,
  handleCloseModal,
  hasInput,
  hasBackBtn,
}: Modal) => {
  // 모달 사용 시 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalOverlay onClick={handleCloseModal} $visible={visible}>
      <Container onClick={(e) => e.stopPropagation()} $visible={visible}>
        {!hasInput && <Bar />}
        <FlexBox
          align="center"
          justify={hasInput ? 'space-between' : 'center'}
          padding="1.6rem 1.4rem 2.8rem 1.4rem"
          style={{ width: '100%' }}
        >
          {hasInput && (
            <IoChevronBackOutline
              size={22}
              color={theme.color.gray.main}
              style={{
                visibility: hasBackBtn ? 'visible' : 'hidden',
                cursor: 'pointer',
              }}
            />
          )}
          {title && (
            <BoldText
              size={hasInput ? 18 : 16}
              color={theme.color.gray.main}
              style={{ padding: '' }}
            >
              {title}
            </BoldText>
          )}
          {hasInput && (
            <IoClose
              size={22}
              color={theme.color.gray.main}
              style={{
                cursor: 'pointer',
              }}
            />
          )}
        </FlexBox>
        {children}
      </Container>
    </ModalOverlay>
  );
};

export default Modal;

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
  background-color: rgba(0, 0, 0, 0.6);
  overflow: ${({ $visible }) => ($visible ? 'hidden' : 'auto')};

  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;

const Container = styled.div<{ $visible: boolean }>`
  width: 100%;
  min-width: 20rem;
  max-width: 50rem;
  height: fit-content;
  padding-top: 1.6rem;
  /* padding-bottom: 1.4rem; */
  position: fixed;
  bottom: 0;
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
