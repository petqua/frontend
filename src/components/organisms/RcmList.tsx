import { FlexBox } from '../atoms';
import {
  ProductListItem,
  PreviewListTitle,
  RowScrollContainer,
} from '../molecules';

const RcmList = () => {
  const RCM_LIST = [
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
    {
      imgUrl: '',
      title: '구피 50마리',
      price: '30,000',
      discountRate: '30',
      discountedPrice: '21,000',
      like: 23,
      review: 1,
    },
  ];

  return (
    <FlexBox col gap="2rem" style={{ padding: '2.4rem 0' }}>
      <PreviewListTitle title="펫쿠아 강력 추천!" path="/recommend" />
      <ProductListItem isMain data={RCM_LIST[0]} />
      <RowScrollContainer gap="1.2rem">
        {RCM_LIST.filter((el, idx) => idx > 0).map((el, idx) => (
          <ProductListItem key={idx} isSmall data={el} />
        ))}
      </RowScrollContainer>
    </FlexBox>
  );
};

export default RcmList;
