import React, { ChangeEvent, useState } from 'react';
import { BoldText, FlexBox, LightText, ProductImg } from '../components/atoms';
import {
  BlueButton,
  RowScrollContainer,
  StarRating,
  TopNav,
} from '../components/molecules';
import { theme } from '../styles/theme';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { postReviewAPI } from '../apis/reviewAPI';
import { useNavigate } from 'react-router-dom';

interface Section {
  text: string;
  isPhoto?: boolean;
  children: React.ReactNode;
}

const Section = ({ text, isPhoto, children }: Section) => {
  return (
    <FlexBox col gap="1rem" padding={isPhoto ? '' : '0 1.4rem'} fullWidth>
      <BoldText
        size={16}
        color={theme.color.gray.main}
        style={{ margin: isPhoto ? '0 1.4rem' : '' }}
      >
        {text}
      </BoldText>
      {children}
    </FlexBox>
  );
};

const ReviewWritePage = () => {
  const navigate = useNavigate();

  const [text, setText] = useState<string>('');
  const [imgList, setImgList] = useState<string[]>([]);
  const [starRate, setStarRate] = useState<number>(0);
  const [showStarRate, setShowStarRate] = useState<number>(starRate);

  // 리뷰 작성하기 API
  const { mutate } = useMutation({
    mutationFn: () =>
      postReviewAPI({
        productId: 1,
        content: text,
        score: starRate,
        images: imgList,
      }),
    onSuccess: () => {
      alert('리뷰를 등록하였습니다.');
      navigate(-1);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // 별점 이벤트
  const handleMouseEnter = (e: React.MouseEvent<SVGElement>) => {
    setShowStarRate(parseInt(e.currentTarget.id));
  };

  const handleMouseLeave = () => {
    setShowStarRate(starRate);
  };

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    setStarRate(parseInt(e.currentTarget.id));
  };

  // 사진 업로드
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImgList([...imgList, e.target.result as string]);
      }
    };

    reader.readAsDataURL(file);
  };

  const onClickDelete = (index: number) => {
    const deletedList = imgList.filter((_, idx) => idx !== index);
    setImgList(deletedList);
  };

  return (
    <>
      <TopNav cancelBtn title="리뷰쓰기" />
      <FlexBox col justify="space-between" style={{ flex: 1 }}>
        <FlexBox col padding="2rem 0" gap="5.2rem" fullWidth>
          {/* StarRating Section */}
          <Section text="별점을 눌러 만족도를 알려주세요">
            <StarRating
              score={showStarRate}
              size={40}
              gap={0.1}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />
          </Section>

          {/* Photo Upload Section */}
          <Section text="사진 업로드" isPhoto>
            <AddPhotoBtn>
              <label htmlFor="fileInput">
                <img alt="add-photo" src="/icons/add-photo.svg" />
                <LightText size={10} color={theme.color.blue[70]}>
                  {imgList.length}/10
                </LightText>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </AddPhotoBtn>
            <RowScrollContainer row={1} col={imgList.length} gap="1rem">
              {imgList.map((item, idx) => (
                <ProductImg
                  src={item}
                  size="14rem"
                  index={idx}
                  borderRadius={0.4}
                  onClickDelete={onClickDelete}
                />
              ))}
            </RowScrollContainer>
          </Section>

          {/* Review Input Section */}
          <Section text="리뷰쓰기">
            <TextArea
              placeholder="최소 10자 이상 작성해주세요."
              onChange={(e) => setText(e.target.value)}
            />
          </Section>
        </FlexBox>

        {/* Review Submit Button */}
        <BlueButton
          text="등록하기"
          isMargin
          onClick={mutate}
          disabled={text.length < 10}
        />
      </FlexBox>
    </>
  );
};

export default ReviewWritePage;

const TextArea = styled.textarea`
  width: 100%;
  height: 18rem;
  padding: 1.2rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray.main};
  outline: none;
  resize: none;

  color: ${({ theme }) => theme.color.gray.main};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 150%;
`;

const AddPhotoBtn = styled.div`
  label {
    width: 5.4rem;
    height: 5.4rem;
    margin: 0 1.4rem;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    border: 0.1rem solid ${({ theme }) => theme.color.blue[70]};
  }

  input {
    display: none;
  }
`;
