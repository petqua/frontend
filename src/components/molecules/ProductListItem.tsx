import { theme } from '../../styles/theme';
import {
  LightText,
  RegularText,
  MediumText,
  BoldText,
  ProductImg,
  FlexBox,
} from '../atoms';
import { ProductListItem } from '../../interfaces/product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postWishAPI } from '../../apis';

const ProductListItem = ({ isMain, isSmall, data }: ProductListItem) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'exception';

  const [showIsWished, setShowIsWished] = useState(data?.isWished);

  const { mutate } = useMutation({
    mutationFn: () => postWishAPI(data?.id),
    onSuccess: () => {
      setShowIsWished((prev) => !prev);
      type && queryClient.refetchQueries({ queryKey: ['products', type] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    setShowIsWished(data?.isWished);
  }, [data?.isWished]);

  return (
    <FlexBox
      col={!isMain}
      align={isMain ? 'center' : ''}
      gap={isMain ? '1.6rem' : '0.8rem'}
      style={{
        width: isMain ? '100%' : isSmall ? '12rem' : 'calc(50% - 1rem)',
        padding: isMain ? '0 1.2rem' : '0',
      }}
      onClick={() => navigate(`/product/${data.id}`)}
    >
      <ProductImg
        size={isMain ? '16.8rem' : isSmall ? '12rem' : '100%'}
        src={data?.thumbnailUrl}
        showWish={!isSmall && !isMain}
        isWish={showIsWished}
        onClickWish={mutate}
        isRound
      />

      <FlexBox col gap="0.8rem" style={{ flex: isMain ? 1 : 0 }}>
        {!isSmall && (
          <MediumText size={isMain ? 16 : 12} color={theme.color.gray[50]}>
            {data?.storeName}
          </MediumText>
        )}

        <MediumText
          size={isMain ? 20 : isSmall ? 14 : 16}
          color={theme.color.gray.main}
          // 두 줄 이상 텍스트 넘어가면 말줄임표
          style={{
            lineHeight: '150%',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            marginBottom: isMain ? '1.2rem' : '',
          }}
        >
          {data?.name}
        </MediumText>

        {data?.discountRate !== 0 && (
          <RegularText
            size={isMain ? 14 : 12}
            color={theme.color.gray[60]}
            style={{ textDecoration: 'line-through' }}
          >
            {data?.price.toLocaleString()}원
          </RegularText>
        )}

        <FlexBox align="center" gap="0.8rem">
          {data?.discountRate !== 0 && (
            <RegularText size={16} color={theme.color.tint.red}>
              {data?.discountRate}%
            </RegularText>
          )}
          <BoldText size={16} color={theme.color.gray.main}>
            {data?.discountPrice.toLocaleString()}원
          </BoldText>
        </FlexBox>

        {!isMain && (
          <FlexBox align="center" gap="0.8rem">
            <FlexBox align="center" gap="0.4rem">
              <img
                src="/icons/bubble-like-filled.svg"
                alt="bubble-like-filled"
                style={{ width: '0.8rem', height: '0.8rem' }}
              />
              <LightText size={12} color={theme.color.blue[70]}>
                {data?.wishCount}
              </LightText>
            </FlexBox>
            <FlexBox align="center" gap="0.4rem">
              <img
                src="/icons/bubble-like-filled.svg"
                alt="bubble-like-filled"
                style={{ width: '0.8rem', height: '0.8rem' }}
              />
              <LightText size={12} color={theme.color.blue.main}>
                {data?.reviewCount}
              </LightText>
            </FlexBox>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default ProductListItem;
