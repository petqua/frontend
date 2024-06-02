import { styled } from 'styled-components';
import { BlueButton, OrderProductItem, TopNav } from '../components/molecules';
import { BoldText, FlexBox, MediumText } from '../components/atoms';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from '../components/atoms/Icon';

const OrderItem = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  return (
    <OrderItemContainer>
      <FlexBox
        justify="space-between"
        align="center"
        padding="1.2rem 0"
        style={{ borderBottom: `0.05rem solid ${theme.color.gray[40]}` }}
        onClick={() => navigate(`/order/${data.orderId}`)}
      >
        <FlexBox align="center" gap="1.2rem">
          <BoldText size={20} color={theme.color.gray[60]}>
            2024.01.01
          </BoldText>
          <div
            style={{
              width: '0.2rem',
              height: '1.5rem',
              backgroundColor: theme.color.gray[50],
            }}
          />
          <BoldText size={14} color={theme.color.gray[50]}>
            주문 {data.orderItems.length}건
          </BoldText>
        </FlexBox>
        <FaChevronRight size={14} color={theme.color.gray.main} />
      </FlexBox>
      {data.orderItems.map((item: any) => (
        <OrderProductItem key={item.productId} data={item} />
      ))}
    </OrderItemContainer>
  );
};

const OrderItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1.4rem;
`;

const OrderListPage = () => {
  const navigate = useNavigate();
  const orderList = [
    {
      orderId: 1,
      date: '2024.01.01',
      orderItems: [
        {
          productId: 1,
          storeName: 'S아쿠아',
          name: '베타',
          count: 20,
          price: 31000,
          sex: '암컷',
          deliveryMethod: 'SAFETY',
        },
        {
          productId: 2,
          storeName: 'S아쿠아',
          name: '베타1',
          count: 10,
          price: 20000,
          sex: '암컷',
          deliveryMethod: 'COMMON',
        },
      ],
    },
    {
      orderId: 2,
      date: '2023.12.01',
      orderItems: [
        {
          productId: 1,
          storeName: 'S아쿠아',
          name: '베타',
          count: 20,
          price: 31000,
          sex: '암컷',
          deliveryMethod: 'SAFETY',
        },
        {
          productId: 2,
          storeName: 'S아쿠아',
          name: '베타1',
          count: 10,
          price: 20000,
          sex: '암컷',
          deliveryMethod: 'COMMON',
        },
      ],
    },
  ];

  return (
    <>
      <TopNav title="입양내역 조회" backBtn />

      {/* ItemList */}
      {orderList.length === 0 ? (
        <NoListContainer>
          <MediumText size={16} color={theme.color.gray.main}>
            입양내역이 없습니다.
          </MediumText>
          <BlueButton
            text="봉달목록으로 가기"
            onClick={() => navigate('/cart')}
            style={{ width: '22rem' }}
          ></BlueButton>
        </NoListContainer>
      ) : (
        <>
          {orderList.map((item) => (
            <OrderItem key={item.orderId} data={item} />
          ))}
        </>
      )}
    </>
  );
};

export default OrderListPage;

const NoListContainer = styled.section`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
