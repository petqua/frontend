import { FlexBox, MediumText } from '../atoms';
import { theme } from '../../styles/theme';
import { CiSearch } from 'react-icons/ci';
import { GoChevronLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface TopNav {
  backBtn?: boolean;
  search?: boolean;
  basket?: boolean;
  alarm?: boolean;
  wish?: boolean;
  logo?: boolean;
  title?: string;
  isBlue?: boolean; // 타이틀 파란색 여부
}

const TopNav = ({
  backBtn,
  search,
  basket,
  alarm,
  wish,
  logo,
  title,
  isBlue,
}: TopNav) => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <FlexBox
          justify="flex-start"
          align="center"
          gap="1.4rem"
          style={{ width: '6rem' }}
        >
          {backBtn && (
            <GoChevronLeft
              size={24}
              color={theme.color.gray.main}
              onClick={() => navigate(-1)}
            />
          )}

          {alarm && (
            <img
              src="/icons/alarm.svg"
              alt="alarm"
              onClick={() => navigate('/alarm')}
            />
          )}
        </FlexBox>
        {logo ? (
          <img src="/icons/logo-typo.svg" alt="logo" />
        ) : (
          <MediumText
            size={16}
            color={isBlue ? theme.color.blue.main : theme.color.gray.main}
          >
            {title}
          </MediumText>
        )}
        <FlexBox
          justify="flex-end"
          align="center"
          gap="1.6rem"
          style={{ width: '6rem' }}
        >
          {search && <CiSearch size={24} onClick={() => navigate('/search')} />}
          {basket && (
            <img
              src="/icons/basket.svg"
              alt="basket"
              style={{ width: '2.4rem', height: '2.4rem' }}
              onClick={() => navigate('/cart')}
            />
          )}
          {wish && (
            <img
              src="/icons/bubble-like-gray.svg"
              alt="wish"
              style={{ width: '2.2rem', height: '2.2rem' }}
              onClick={() => navigate('/wish')}
            />
          )}
        </FlexBox>
      </Container>
      <div style={{ height: '5.6rem' }} />
    </>
  );
};

export default TopNav;

const Container = styled.nav`
  width: 100%;
  max-width: 50rem;
  height: 5.6rem;
  background-color: ${({ theme }) => theme.color.tint.white};
  padding: 1.6rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
`;
