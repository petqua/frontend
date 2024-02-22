import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { FlexBox, RegularText } from '../atoms';
import { BlueButton, PopUp } from '../molecules';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postWishAPI } from '../../apis';
import { useParams } from 'react-router-dom';
import { usePopUpStore } from '../../states';

interface BottomPayBar {
  wishCount: number;
  isWished: boolean;
}

const BottomPayBar = ({ wishCount, isWished }: BottomPayBar) => {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const { setState, setAction, isOpenPopUp, setIsOpenPopUp } = usePopUpStore();

  const { mutate } = useMutation({
    mutationFn: () => postWishAPI(parseInt(productId || '0')),
    onSuccess: () => {
      setAction('wish');
      if (isWished) {
        setState('filled');
      } else {
        setState('add');
      }
      queryClient.refetchQueries({ queryKey: ['product-detail', productId] });
      setIsOpenPopUp(true);
      queryClient.refetchQueries({ queryKey: ['wishes'] });
    },
    onError: (err) => {
      setAction('wish');
      console.error(err);
    },
  });

  return (
    <Container>
      <FlexBox col gap="0.4rem" align="center">
        <img
          src={
            isWished
              ? '/icons/bubble-like-filled.svg'
              : '/icons/bubble-like-gray.svg'
          }
          style={{ width: '2.8rem', height: '2.8rem' }}
          onClick={() => mutate()}
        />
        <RegularText size={10} color={theme.color.gray[70]}>
          {wishCount}
        </RegularText>
      </FlexBox>
      <BlueButton text="입양하기" onClick={() => {}} style={{ width: '85%' }} />

      {/* ========== 팝업 창 ========== */}
      {isOpenPopUp && <PopUp />}
    </Container>
  );
};

export default BottomPayBar;

const Container = styled.div`
  position: fixed;
  width: 100%;
  max-width: 50rem;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.tint.white};
  border-top: 0.25px solid ${({ theme }) => theme.color.gray[50]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem;
`;
