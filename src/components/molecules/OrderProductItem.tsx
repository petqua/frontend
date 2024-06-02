import { useState } from 'react';
import {
  BoldText,
  FlexBox,
  MediumText,
  MethodTag,
  ProductImg,
  RegularText,
} from '../atoms';
import { theme } from '../../styles/theme';
import Confirm from './Confirm';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface OrderProductItem {
  data: any;
  isReview?: boolean;
  writed?: boolean;
}

const OrderProductItem = ({
  data,
  isReview,
  writed = false,
}: OrderProductItem) => {
  const navigate = useNavigate();
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  return (
    <>
      <FlexBox col padding="1.8rem 0" gap="2rem" fullWidth>
        <FlexBox gap="1rem">
          <ProductImg size="9.6rem" src="" borderRadius={0.4} />
          <FlexBox
            col
            justify="space-between"
            padding="0.2rem 0"
            style={{ flex: 1, height: '9.6rem' }}
          >
            <FlexBox col gap="0.8rem">
              <RegularText size={12} color={theme.color.gray[50]}>
                {data.storeName}
              </RegularText>
              <FlexBox align="center" gap="0.4rem">
                <MediumText size={16} color={theme.color.gray.main}>
                  {data.name}
                </MediumText>
                <MethodTag deliveryMethod={data.deliveryMethod} />
              </FlexBox>
            </FlexBox>
            <FlexBox col gap="0.8rem">
              <RegularText size={12} color={theme.color.gray[50]}>
                {data.count}마리 | {data.sex} &nbsp;{' '}
                {isReview ? `${data.confirmDate} 구매확정` : ''}
              </RegularText>
              <BoldText size={16} color={theme.color.gray.main}>
                {data.price.toLocaleString()} 원
              </BoldText>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        {/* Button Container */}
        {isReview ? (
          <ReviewButton
            onClick={() => {
              navigate('/review/write');
            }}
            disabled={writed}
            $writed={writed}
          >
            <MediumText
              size={14}
              color={writed ? theme.color.blue[80] : theme.color.tint.white}
            >
              {writed ? '작성완료' : '리뷰 쓰기'}
            </MediumText>
          </ReviewButton>
        ) : (
          <FlexBox fullWidth gap="0.6rem">
            <Button onClick={() => alert('교환/환불 카카오채널 이동')}>
              <RegularText size={14} color={theme.color.gray.main}>
                교환/환불요청
              </RegularText>
            </Button>
            <Button onClick={() => setIsOpenConfirm(true)}>
              <RegularText size={14} color={theme.color.gray.main}>
                입양확정
              </RegularText>
            </Button>
          </FlexBox>
        )}
      </FlexBox>
      {isOpenConfirm && (
        <Confirm
          text="입양을 확정할까요?"
          setIsOpenConfirm={setIsOpenConfirm}
          handleYes={() => {}}
        />
      )}
    </>
  );
};

export default OrderProductItem;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray.main};
`;

const ReviewButton = styled.button<{ $writed: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.4rem;
  cursor: ${({ $writed }) => ($writed ? 'default' : 'pointer')};
  background-color: ${({ theme, $writed }) =>
    $writed ? theme.color.gray[30] : theme.color.blue[80]};
`;
