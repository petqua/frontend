import styled from 'styled-components';

interface ProductImg {
  size: string;
  src: string;
}

const ProductImg = ({ size, src }: ProductImg) => {
  return (
    <ImgContainer style={{ width: size, aspectRatio: 1 }}>
      <Image src={src} alt="product-img" />
    </ImgContainer>
  );
};

export default ProductImg;

const ImgContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray[30]};
  border-radius: 1.2rem;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
