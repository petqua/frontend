import { theme } from '../styles/theme';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { FlexBox, RegularText } from '../components/atoms';
import {
  Carousel,
  ProductListItem,
  ReviewItem,
  RowScrollContainer,
  WhiteButton,
} from '../components/molecules';
import {
  ProductDetailMain,
  ProductDetailInfo,
  ProductDetailContents,
  BottomPayBar,
  ReviewOverview,
  ShareModal,
  OptionModal,
} from '../components/organisms';
import {
  getProductDetailAPI,
  getReviewsAPI,
  getReviewStatisticsAPI,
  getCategoryProductsAPI,
} from '../apis';
import { useState } from 'react';
import { OptionModalData } from '../interfaces/product';
import { FaChevronRight } from '../components/atoms/Icon';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);

  const { data: { mainData, infoData, optionData, etcData } = {}, isSuccess } =
    useQuery({
      queryKey: ['product-detail', productId],
      queryFn: () => getProductDetailAPI(parseInt(productId || '-1')),
      staleTime: 60 * 1000,
    });

  const { data: reviewOverviewData } = useQuery({
    queryKey: ['review-statistics', productId],
    queryFn: () => getReviewStatisticsAPI(parseInt(productId || '-1')),
    staleTime: 30 * 1000,
  });

  const { data: reviewData } = useQuery({
    queryKey: ['review-preview', productId],
    queryFn: () =>
      getReviewsAPI({
        productId: parseInt(productId || '-1'),
        lastViewedId: -1,
        limit: 2,
      }),
    staleTime: 30 * 1000,
  });

  const { data: relatedData } = useQuery({
    queryKey: ['related-products', productId],
    queryFn: () =>
      getCategoryProductsAPI({
        family: infoData?.family || '',
        sorter: 'REVIEW_COUNT_DESC',
        limit: 12,
      }),
    staleTime: 60 * 1000,
    enabled: isSuccess,
  });

  const fakeEtcData: any = {
    imageUrls: [
      'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
    ],
    descriptionImageUrls: [
      'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
    ],
    wishCount: 23,
    isWished: true,
  };

  const fakeMainData = {
    id: 1,
    storeName: 'S아쿠아',
    name: '알비노 풀레드 아시안 고정구피',
    family: '난태생, 송사리과',
    species: '고정구피',
    reviewAverageScore: 4.5,
    reviewCount: 50,
    discountRate: 30,
    price: 50000,
    discountPrice: 35000,
    descriptionTitle: '물생활 핵 인싸어, 레드 브론즈 구피',
    descriptionContent:
      '레드 턱시도라고도 불리며 지느러미가 아름다운 구피입니다',
  };

  const fakeReviewOverviewData = {
    scoreFiveCount: 3,
    scoreFourCount: 0,
    scoreThreeCount: 0,
    scoreTwoCount: 2,
    scoreOneCount: 0,
    scoreCounts: [3, 0, 0, 2, 0],
    productSatisfaction: 60,
    totalReviewCount: 5,
    averageScore: 3.8,
  };

  const fakeInfoData = {
    species: '고정구피',
    family: '난태생, 송사리과',
    optimalTemperatureMin: 10,
    optimalTemperatureMax: 20,
    difficultyLevel: '하',
    optimalTankSize: '1자어항',
    temperament: '사나움',
  };

  return (
    <>
      <Carousel
        carouselList={
          fakeEtcData?.imageUrls?.map((url: any, idx: any) => ({
            id: idx,
            imageUrl: url,
            linkUrl: '',
          })) || []
        }
        canShowDetail
      />
      <ProductDetailMain
        data={fakeMainData}
        setIsOpenShareModal={setIsOpenShareModal}
      />
      <Notice src="/images/notice-ex.svg" alt="product-detail-notice" />
      <ProductDetailInfo data={fakeInfoData} />
      <ProductDetailContents data={etcData?.descriptionImageUrls} />

      {/* 리뷰 */}
      <ReviewOverview data={fakeReviewOverviewData} />
      <FlexBox col>
        {reviewData?.productReviews.map((item, idx) => (
          <ReviewItem
            key={item.id}
            data={item}
            isLastItem={reviewData?.productReviews.length === idx + 1}
          />
        ))}
      </FlexBox>
      {reviewData?.hasNextPage && (
        <WhiteButton
          text={`${reviewOverviewData?.totalReviewCount}  |  리뷰더보기`}
          onClick={() => navigate(`/product/${productId}/review`)}
          style={{ margin: '0 1.4rem', width: 'calc(100% - 2.8rem)' }}
        />
      )}

      {/* 추천 상품 */}
      <RowScrollContainer
        row={2}
        col={6}
        style={{
          gridRowGap: '2.4rem',
          gridColumnGap: '1.2rem',
          margin: '4rem 0',
        }}
      >
        {relatedData?.products.map((item) => (
          <ProductListItem key={item.id} isSmall data={item} />
        ))}
      </RowScrollContainer>

      {/* 교환/환불 */}
      <FlexBox
        justify="space-between"
        align="center"
        padding="1.2rem 1.6rem"
        style={{ backgroundColor: theme.color.gray[30], cursor: 'pointer' }}
      >
        <RegularText size={16} color={theme.color.gray[70]}>
          주문취소 / 교환 / 반품안내
        </RegularText>
        <FaChevronRight size={12} color={theme.color.gray[70]} />
      </FlexBox>
      <BottomPayBar
        wishCount={etcData?.wishCount || 0}
        isWished={etcData?.isWished || false}
        setIsOpenModal={setIsOpenOptionModal}
      />

      {/* ================== Modal ================== */}
      {isOpenOptionModal && (
        <OptionModal
          setIsOpenModal={setIsOpenOptionModal}
          data={optionData || ({} as OptionModalData)}
        />
      )}
      {isOpenShareModal && (
        <ShareModal
          data={mainData}
          imgUrl={etcData?.imageUrls[0] || ''}
          setIsOpenModal={setIsOpenShareModal}
        />
      )}
    </>
  );
};

export default ProductDetailPage;

const Notice = styled.img`
  width: calc(100% - 2.8rem);
  aspect-ratio: 0.8;
  background-color: ${({ theme }) => theme.color.gray[30]};
  margin: 1.4rem;
`;
