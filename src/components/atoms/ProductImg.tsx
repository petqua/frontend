import styled from 'styled-components';

interface ProductImg {
  size: string;
  src: string;
}

const ProductImg = ({ size, src }: ProductImg) => {
  return (
    <ImgContainer style={{ width: size, height: size }}>
      <Image src={src || ''} />
    </ImgContainer>
  );
};

export default ProductImg;

const ImgContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray[30]};
  border-radius: 12px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
