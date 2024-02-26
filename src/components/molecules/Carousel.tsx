import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { ImageDetail } from '../organisms';
import { RegularText } from '../atoms';
import { theme } from '../../styles/theme';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Carousel } from '../../interfaces/carousel';

const Carousel = ({
  carouselList,
  canShowDetail,
  isDetail,
  idx,
  isBlackIndicator,
}: Carousel) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imgsRef = useRef<HTMLImageElement[] | null[]>([]);

  const [curIdx, setCurIdx] = useState(idx || 0);

  const carouselArray = [
    carouselList[carouselList.length - 1],
    ...carouselList,
    carouselList[0],
  ];

  const fakeMove = (index: number) => {
    setTimeout(() => {
      setCurIdx(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = '';
      }
    }, 500);
  };

  const handleClick = (shift: number) => {
    const nextIdx = curIdx + shift;
    if (nextIdx === carouselList.length) {
      fakeMove(0);
    } else if (nextIdx === -1) {
      fakeMove(carouselList.length - 1);
    }
    setCurIdx(nextIdx);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
      isDetail &&
        (carouselRef.current.style.height =
          (imgsRef.current[nextIdx + 1]?.offsetHeight || 0) / 10 + 'rem');
    }
  };

  let touchStartX: number;
  let touchEndX: number;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const curTouchX = e.nativeEvent.changedTouches[0].clientX;
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = '';
      carouselRef.current.style.transform = `translateX(calc(-${curIdx + 1}00% - ${
        touchStartX - curTouchX
      }px))`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;
    const moveToNext = touchStartX - touchEndX > 50;
    const moveToPrev = touchEndX - touchStartX > 50;
    if (moveToNext) {
      handleClick(1);
    } else if (moveToPrev) {
      handleClick(-1);
    } else {
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = 'all 0.5s ease-in-out';
        carouselRef.current.style.transform = `translateX(-${curIdx + 1}00%)`;
      }
    }
  };

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${curIdx + 1}00%)`;
    }
  }, [curIdx]);

  const formatIndex = (idx: number) => {
    if (idx < 1) {
      return carouselList.length;
    } else if (idx > carouselList.length) {
      return 1;
    } else {
      return idx;
    }
  };

  return (
    <>
      <Container>
        <Button onClick={() => handleClick(-1)} $isLeft={true}>
          <GrPrevious size={24} color={theme.color.gray.main} />
        </Button>
        <CarouselBox
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => canShowDetail && setIsOpenDetail(true)}
          $isDetail={isDetail || false}
        >
          {carouselArray.map(
            (val, idx) =>
              val && (
                <Img
                  key={idx}
                  src={val.imageUrl}
                  ref={(ref) => (imgsRef.current[idx] = ref)}
                  $isDetail={isDetail || false}
                />
              ),
          )}
        </CarouselBox>
        <Button onClick={() => handleClick(1)} $isLeft={false}>
          <GrNext size={24} color={theme.color.gray.main} />
        </Button>
        <Indicator
          $isDetail={isDetail || false}
          $isBlackIndicator={isBlackIndicator || false}
        >
          <RegularText
            size={14}
            color={isDetail ? theme.color.gray.main : theme.color.tint.white}
          >
            {formatIndex(curIdx + 1)} / {carouselList.length}
          </RegularText>
        </Indicator>
      </Container>
      {isOpenDetail && (
        <ImageDetail
          setIsOpenDetail={setIsOpenDetail}
          carouselList={carouselList}
          idx={curIdx || 0}
        />
      )}
    </>
  );
};

export default Carousel;

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow-x: clip;
`;

const CarouselBox = styled.div<{ $isDetail: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  aspect-ratio: ${({ $isDetail }) => ($isDetail ? '' : '1.32')};
`;

const Img = styled.img<{ $isDetail: boolean }>`
  min-width: 100%;
  width: 100%;
  height: ${({ $isDetail }) => ($isDetail ? '' : '100%')};
  object-fit: contain;
`;

const Button = styled.button<{ $isLeft: boolean }>`
  padding: 1.6rem 0.4rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(222, 234, 255, 0.3);
  ${({ $isLeft }) =>
    $isLeft
      ? 'left: 0; border-radius: 0 0.8rem 0.8rem 0;'
      : 'right: 0; border-radius: 0.8rem 0 0 0.8rem;'}
`;

const Indicator = styled.div<{
  $isDetail: boolean;
  $isBlackIndicator: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  background: ${({ $isDetail, $isBlackIndicator }) =>
    $isDetail
      ? 'rgba(255, 255, 255, 0.30)'
      : $isBlackIndicator
        ? 'rgba(0, 0, 0, 0.70)'
        : 'rgba(0, 0, 0, 0.35)'};
  ${({ $isDetail }) =>
    $isDetail
      ? 'bottom: -4rem; left: 50%; transform: translateX(-50%); border: 0.05rem solid ${({ theme }) => theme.color.gray[50]};'
      : 'right: 1rem; bottom: 1.2rem;'};
`;
