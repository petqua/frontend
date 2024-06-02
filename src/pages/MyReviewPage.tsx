import { useSearchParams } from 'react-router-dom';
import {
  MyReviewItem,
  OrderProductItem,
  TopNav,
} from '../components/molecules';
import { styled } from 'styled-components';
import { FlexBox, MediumText } from '../components/atoms';
import { theme } from '../styles/theme';

const Category = ({ category }: { category: string }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const isCurrent = searchParam.get('category') === category;

  const getText = (category: string) => {
    switch (category) {
      case 'write':
        return '리뷰작성';
      case 'list':
        return '리뷰내역';
      default:
        return 'except';
    }
  };

  return (
    <CategoryBox
      onClick={() => setSearchParam({ category: category })}
      $selected={isCurrent}
    >
      <MediumText
        size={14}
        color={isCurrent ? theme.color.gray.main : theme.color.gray[50]}
      >
        {getText(category)}
      </MediumText>
    </CategoryBox>
  );
};

const MyReviewPage = () => {
  const [searchParam] = useSearchParams();
  const category = searchParam.get('category');
  const orderList = [
    {
      productId: 1,
      storeName: 'S아쿠아',
      name: '베타',
      count: 20,
      price: 31000,
      sex: '암컷',
      deliveryMethod: 'SAFETY',
      writed: false,
      confirmDate: '2024.02.22',
    },
    {
      productId: 2,
      storeName: 'S아쿠아',
      name: '베타1',
      count: 10,
      price: 20000,
      sex: '암컷',
      deliveryMethod: 'COMMON',
      writed: true,
      confirmDate: '2024.01.16',
    },
  ];

  const reviewList = [
    {
      productId: 1,
      reviewId: 1,
      storeName: 'S아쿠아',
      name: '베타',
      count: 20,
      sex: '암컷',
      deliveryMethod: 'SAFETY',
      reviewImg: [
        '/images/product-ex.jpeg',
        '/images/product-ex.jpeg',
        '/images/product-ex.jpeg',
      ],
      rating: 5,
      text: '물고기가 너무 안전하게 잘 왔습니다. 다음에도 또 이용할려구요!!!',
      recommendCount: 2,
      recommended: true,
      confirmDate: '2024.02.22',
    },
    {
      productId: 2,
      reviewId: 2,
      storeName: 'S아쿠아',
      name: '베타',
      count: 10,
      sex: '암컷',
      deliveryMethod: 'COMMON',
      reviewImg: [],
      rating: 3,
      text: '물고기가 너무 안전하게 잘 왔습니다. 다음에도 또 이용할려구요!!!',
      recommendCount: 1,
      recommended: false,
      confirmDate: '2024.01.16',
    },
  ];

  return (
    <>
      <TopNav backBtn title="입양후기" />

      {/* Category Section */}
      <FlexBox fullWidth>
        <Category category="write" />
        <Category category="list" />
      </FlexBox>

      {/* List Section */}
      {category === 'write' ? (
        <FlexBox col fullWidth padding="1.4rem" gap="0.8rem">
          {orderList.map((item) => (
            <OrderProductItem
              key={item.productId}
              data={item}
              isReview
              writed={item.writed}
            />
          ))}
        </FlexBox>
      ) : (
        <FlexBox col fullWidth gap="4.8rem" padding="2.8rem 0">
          {reviewList.map((item) => (
            <MyReviewItem key={item.reviewId} data={item} />
          ))}
        </FlexBox>
      )}
    </>
  );
};

export default MyReviewPage;

const CategoryBox = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1.2rem;
  border-bottom: ${({ $selected, theme }) =>
    $selected
      ? `0.1rem solid ${theme.color.gray.main}`
      : `0.05rem solid ${theme.color.gray[50]}`};
  cursor: pointer;
`;
