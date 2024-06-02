import { UseMutateFunction } from '@tanstack/react-query';
import styled from 'styled-components';
import { IoClose } from './Icon';
import { theme } from '../../styles/theme';

interface ProductImg {
  size: string;
  src: string;
  borderRadius?: number;
  showWish?: boolean;
  isWish?: boolean;
  index?: number;
  onClickWish?: UseMutateFunction<any, Error, void, unknown>;
  onClickDelete?: (index: number) => void;
}

const ProductImg = ({
  size,
  src,
  borderRadius = 1.2,
  showWish,
  isWish,
  index = 0,
  onClickWish,
  onClickDelete,
}: ProductImg) => {
  return (
    <ImgContainer style={{ width: size, borderRadius: `${borderRadius}rem` }}>
      <Image
        src={src || '/public/images/product-item-ex.svg'}
        alt="product-img"
      />
      {showWish && (
        <WishBtn
          src={
            isWish ? '/icons/bubble-like-filled.svg' : '/icons/bubble-like.svg'
          }
          onClick={(e) => {
            onClickWish?.();
            e.stopPropagation();
          }}
        />
      )}
      {onClickDelete && (
        <DeleteBtn onClick={() => onClickDelete(index)}>
          <IoClose size={20} color={theme.color.tint.white} />
        </DeleteBtn>
      )}
    </ImgContainer>
  );
};

export default ProductImg;

const ImgContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray[30]};
  aspect-ratio: 1;
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

const DeleteBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  padding: 0.1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray[40]};
  cursor: pointer;
`;
