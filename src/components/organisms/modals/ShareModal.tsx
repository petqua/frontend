import { SetStateAction, useState } from 'react';
import Modal from '../../molecules/Modal';
import { FlexBox, MediumText, RegularText } from '../../atoms';
import { theme } from '../../../styles/theme';
import styled from 'styled-components';
import { usePopUpStore } from '../../../states';
import { ProductDetailMainData } from '../../../interfaces/product';

interface ShareModal {
  data: ProductDetailMainData | undefined;
  imgUrl: string;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

const ShareModal = ({ data, imgUrl, setIsOpenModal }: ShareModal) => {
  const baseUrl = window.location.toString();
  const { setAction, setIsOpenPopUp } = usePopUpStore();
  const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const [visible, setVisible] = useState(true);

  // 모달 닫을 시 애니메이션 적용하기 위한 딜레이
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 250);
  };

  // 클립보드 복사 함수
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setAction('share');
      setIsOpenPopUp(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKakaoShare = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_JAVASCRIPT_KEY);
      }

      window.Kakao.Share.sendDefault({
        objectType: 'commerce',
        content: {
          title: data?.descriptionContent,
          imageUrl: imgUrl,
          link: {
            mobileWebUrl: baseUrl,
            webUrl: baseUrl,
          },
        },
        commerce: {
          productName: data?.name,
          regularPrice: data?.price,
          discountRate: data?.discountRate,
          discountPrice: data?.discountPrice,
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: baseUrl,
              webUrl: baseUrl,
            },
          },
        ],
      });
    }
  };

  const items = [
    {
      icon: (
        <MediumText size={20} color={theme.color.gray[70]}>
          URL
        </MediumText>
      ),
      title: 'URL',
      onClick: () => {
        handleCopyClipBoard(baseUrl);
      },
    },
    {
      icon: <img src="/icons/kakao-share.svg" style={{ width: '100%' }} />,
      title: '카카오톡',
      onClick: handleKakaoShare,
    },
  ];

  return (
    <Modal visible={visible} handleCloseModal={handleCloseModal}>
      <FlexBox
        fullWidth
        justify="center"
        gap="8.8rem"
        align="center"
        padding="1rem 0 4rem 0"
      >
        {items.map((el) => (
          <FlexBox key={el.title} col align="center" gap="1rem">
            <Button
              onClick={() => {
                el.onClick();
                handleCloseModal();
              }}
            >
              {el.icon}
            </Button>
            <RegularText size={14} color={theme.color.gray.main}>
              {el.title}
            </RegularText>
          </FlexBox>
        ))}
      </FlexBox>
    </Modal>
  );
};

export default ShareModal;

const Button = styled.button`
  width: 5.6rem;
  height: 5.6rem;
  background-color: ${({ theme }) => theme.color.gray[30]};
  border-radius: 50%;
`;
