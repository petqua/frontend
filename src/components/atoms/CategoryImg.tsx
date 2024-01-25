import styled from 'styled-components';

interface CategoryImg {
  size: string;
  src: string;
}

const ImgContainer = styled.div`
  background-color: rgba(105, 161, 255, 0.1);
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
`;

const Image = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const CategoryImg = ({ size, src }: CategoryImg) => {
  return (
    <ImgContainer style={{ width: size, height: size }}>
      <Image src={src || '/public/images/product-item-ex.svg'} />
    </ImgContainer>
  );
};

export default CategoryImg;
