import styled from 'styled-components';

interface ProductImg {
  size: string;
  src: string;
  showWish?: boolean;
  isWish?: boolean;
}

const ProductImg = ({ size, src, showWish, isWish }: ProductImg) => {
  return (
    <ImgContainer style={{ width: size, height: size }}>
      <Image src={src} alt="product-img" />
      {showWish && (
        <WishBtn
          src={
            isWish ? '/icons/bubble-like-filled.svg' : '/icons/bubble-like.svg'
          }
        />
      )}
    </ImgContainer>
  );
};

export default ProductImg;

const ImgContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray[30]};
  border-radius: 1.2rem;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const WishBtn = styled.img`
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  width: 2.4rem;
  height: 2.4rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
`;
