import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { fadeIn, fadeOut } from '../../styles/keyframes';
import { theme } from '../../styles/theme';
import { Carousel } from '../molecules';
import { IoCloseOutline } from 'react-icons/io5';
import { ImageDetail } from '../../interfaces/carousel';

const ImageDetail = ({ setIsOpenDetail, idx, carouselList }: ImageDetail) => {
  const [visible, setVisible] = useState(true);

  const handleCloseViewer = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenDetail(false);
    }, 150);
  };

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
    <ViewerOverlay $visible={visible}>
      <CloseBtn>
        <IoCloseOutline
          size={32}
          color={theme.color.tint.white}
          onClick={handleCloseViewer}
        />
      </CloseBtn>
      <Carousel carouselList={carouselList} isDetail idx={idx} />
    </ViewerOverlay>
  );
};

export default ImageDetail;

const ViewerOverlay = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 50rem;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: ${({ $visible }) => ($visible ? 'hidden' : 'auto')};
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.2s ease-in-out;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 4rem;
  right: 2rem;
  z-index: 1;
`;
