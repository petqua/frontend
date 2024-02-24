import styled from 'styled-components';
import { FlexBox, RegularText } from '../components/atoms';
import { BlueButton, TopNav } from '../components/molecules';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { CartList } from '../components/organisms';

const CartPage = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      storeName: 'S아쿠아',
      productId: 1,
      productName: '알비노 풀레드 아시안 고정구피',
      productThumbnailUrl:
        'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
      productPrice: 30000,
      productDiscountRate: 30,
      productDiscountPrice: 21000,
      quantity: 1,
      isMale: true,
      deliveryMethod: 'SAFETY',
      isOnSale: true,
    },
    {
      id: 1,
      storeName: 'S아쿠아',
      productId: 1,
      productName: '알비노 풀레드 아시안 고정구피',
      productThumbnailUrl:
        'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
      productPrice: 30000,
      productDiscountRate: null,
      productDiscountPrice: 21000,
      quantity: 1,
      isMale: true,
      deliveryMethod: 'SAFETY',
      isOnSale: true,
    },
  ];

  return (
    <>
      <TopNav title="봉달목록" backBtn wish />
      {data.length === 0 ? (
        <FlexBox
          col
          justify="center"
          align="center"
          gap="2rem"
          style={{ flex: 1 }}
        >
          <RegularText size={14} color={theme.color.gray[60]}>
            아직 봉달할 준비가 되지 않으셨나요?
          </RegularText>
          <WishButton onClick={() => navigate('/wish')}>
            <RegularText size={14} color={theme.color.blue[80]}>
              찜목록으로 가기
            </RegularText>
          </WishButton>
        </FlexBox>
      ) : (
        <>
          <CartList data={data} />
          <PayButton>
            <BlueButton text="총 1개 | 30,000원 결제하기" onClick={() => {}} />
          </PayButton>
        </>
      )}
    </>
  );
};

export default CartPage;

const WishButton = styled.button`
  border-radius: 2rem;
  border: 0.5px solid ${({ theme }) => theme.color.gray[50]};
  padding: 1.6rem 3.6rem;
`;

const PayButton = styled.div`
  width: 100%;
  max-width: 50rem;
  padding: 1.4rem;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.tint.white};
`;
