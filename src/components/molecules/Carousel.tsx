import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 38rem;
  overflow: hidden;
`;

const CarouselBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

interface Button {
  $isLeft: boolean;
}

const Button = styled.button<Button>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $isLeft }) => ($isLeft ? 'left: 0;' : 'right: 0;')}
  z-index: 1;
`;

interface Carousel {
  carouselList: Array<string>;
}

const Carousel = ({ carouselList }: Carousel) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [curIdx, setCurIdx] = useState(0);

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
    }
  };

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${curIdx + 1}00%)`;
    }
  }, [curIdx]);

  return (
    <Container>
      <Button onClick={() => handleClick(-1)} $isLeft={true}>
        <IoIosArrowBack size={36} />
      </Button>
      <CarouselBox ref={carouselRef}>
        {carouselArray.map((src, idx) => (
          <Img key={idx} src={src} />
        ))}
      </CarouselBox>
      <Button onClick={() => handleClick(1)} $isLeft={false}>
        <IoIosArrowForward size={36} />
      </Button>
    </Container>
  );
};

export default Carousel;
