import { FlexBox } from '../atoms';
import {
  ProductListItem,
  PreviewListTitle,
  RowScrollContainer,
} from '../molecules';

const NewList = () => {
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
    <FlexBox col gap="2.4rem" style={{ padding: '2.4rem 0' }}>
      <PreviewListTitle
        title="수입입고 소식"
        subTitle="업체별 입고 현황"
        path="/new"
      />
      <RowScrollContainer
        row={2}
        col={6}
        style={{ gridRowGap: '2.4rem', gridColumnGap: '1.2rem' }}
      >
        {RCM_LIST.map((el, idx) => (
          <ProductListItem key={idx} isSmall data={el} />
        ))}
      </RowScrollContainer>
    </FlexBox>
  );
};

export default NewList;
