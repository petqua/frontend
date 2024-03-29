import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { WhiteButton } from '../molecules';

const ProductDetailContents = ({ data }: { data: string[] | undefined }) => {
  const contentsRef = useRef<HTMLDivElement>(null);
  const [isExceed, setIsExceed] = useState(false);
  const CONTENTS_MAX_HEIGHT = 400;

  useEffect(() => {
    const content = contentsRef.current;
    if (content) {
      const height = content?.clientHeight;
      setIsExceed(height > CONTENTS_MAX_HEIGHT);
    }
  }, []);

  return (
    <Container>
      <div
        ref={contentsRef}
        style={{
          overflow: 'hidden',
          maxHeight: isExceed ? CONTENTS_MAX_HEIGHT : 'none',
        }}
      >
        {data?.map((src, idx) => (
          <img key={idx} src={src} style={{ width: '100%' }} />
        ))}
      </div>
      {isExceed && (
        <div style={{ position: 'relative' }}>
          <GradientBox />
          <WhiteButton
            text="상품정보 더보기"
            onClick={() => setIsExceed(false)}
            isDown
          />
        </div>
      )}
    </Container>
  );
};

export default ProductDetailContents;

const Container = styled.div`
  padding: 1.4rem;
`;

const GradientBox = styled.div`
  background-image: linear-gradient(to bottom, transparent, white);
  width: 101%;
  height: 7rem;
  position: absolute;
  top: -7rem;
`;
