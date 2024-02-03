import { FlexBox, RegularText } from '../components/atoms';
import { TopNav } from '../components/molecules';
import { ProductList } from '../components/organisms';
import { theme } from '../styles/theme';

const WishListPage = () => {
  const data = [
    {
      products: [
        {
          id: 1,
          name: '테스트',
          category: '카테고리',
          price: 10000,
          storeName: '펫쿠아',
          discountRate: 10,
          discountPrice: 9000,
          wishCount: 10,
          reviewCount: 5,
          reviewAverageScore: 2,
          thumbnailUrl: '/images/product-item-ex.svg',
          isWish: true,
        },
        {
          id: 2,
          name: '테스트',
          category: '카테고리',
          price: 10000,
          storeName: '펫쿠아',
          discountRate: 10,
          discountPrice: 9000,
          wishCount: 10,
          reviewCount: 5,
          reviewAverageScore: 2,
          thumbnailUrl: '/images/product-item-ex.svg',
          isWish: false,
        },
        {
          id: 3,
          name: '테스트',
          category: '카테고리',
          price: 10000,
          storeName: '펫쿠아',
          discountRate: 10,
          discountPrice: 9000,
          wishCount: 10,
          reviewCount: 5,
          reviewAverageScore: 2,
          thumbnailUrl: '/images/product-item-ex.svg',
          isWish: true,
        },
        {
          id: 4,
          name: '테스트',
          category: '카테고리',
          price: 10000,
          storeName: '펫쿠아',
          discountRate: 10,
          discountPrice: 9000,
          wishCount: 10,
          reviewCount: 5,
          reviewAverageScore: 2,
          thumbnailUrl: '/images/product-item-ex.svg',
          isWish: true,
        },
        {
          id: 5,
          name: '테스트',
          category: '카테고리',
          price: 10000,
          storeName: '펫쿠아',
          discountRate: 10,
          discountPrice: 9000,
          wishCount: 10,
          reviewCount: 5,
          reviewAverageScore: 2,
          thumbnailUrl: '/images/product-item-ex.svg',
          isWish: false,
        },
        {
          id: 6,
          name: '테스트',
          category: '카테고리',
          price: 10000,
          storeName: '펫쿠아',
          discountRate: 10,
          discountPrice: 9000,
          wishCount: 10,
          reviewCount: 5,
          reviewAverageScore: 2,
          thumbnailUrl: '/images/product-item-ex.svg',
          isWish: false,
        },
      ],
      hasNextPage: false,
      totalProductsCount: 6,
    },
  ];

  return (
    <>
      <TopNav backBtn search basket title="찜목록" />
      {data[0].products.length === 0 ? (
        <FlexBox justify="center" align="center" style={{ flex: 1 }}>
          <RegularText size={16} color={theme.color.gray[70]}>
            아직 찜한 반려어가 없어요!
          </RegularText>
        </FlexBox>
      ) : (
        <ProductList
          length={data[0].totalProductsCount}
          data={data}
          isInfinite={false}
          style={{ padding: '1.4rem' }}
        />
      )}
    </>
  );
};

export default WishListPage;
