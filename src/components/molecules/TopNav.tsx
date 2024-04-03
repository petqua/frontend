import { FlexBox, MediumText, RegularText } from '../atoms';
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
  searchBar?: boolean;
  title?: string;
  isBlue?: boolean; // 타이틀 파란색 여부
  backToHome?: boolean; // 상품 리스트 페이지에서 필터링에 관계없이 홈화면으로 바로 이동시 필요
}

const TopNav = ({
  backBtn,
  search,
  basket,
  alarm,
  wish,
  searchBar,
  title,
  isBlue,
  backToHome,
}: TopNav) => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <FlexBox
          justify="flex-start"
          align="center"
          gap="1.4rem"
          style={{ width: searchBar ? '' : '6rem' }}
        >
          {backBtn && (
            <GoChevronLeft
              size={24}
              color={theme.color.gray.main}
              onClick={() => (backToHome ? navigate('/') : navigate(-1))}
              style={{ cursor: 'pointer' }}
            />
          )}

          {alarm && (
            <img
              src="/icons/alarm.svg"
              alt="alarm"
              onClick={() => navigate('/alarm')}
              style={{ cursor: 'pointer' }}
            />
          )}
        </FlexBox>
        {searchBar && (
          <SearchBar onClick={() => navigate('/search')}>
            <RegularText size={12} color={theme.color.gray.main}>
              검색어를 입력해주세요
            </RegularText>
            <CiSearch size={20} color={theme.color.gray.main} />
          </SearchBar>
        )}
        {title && (
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
          {wish && (
            <img
              src="/icons/bubble-like-gray.svg"
              alt="wish"
              style={{ width: '2.2rem', height: '2.2rem', cursor: 'pointer' }}
              onClick={() => navigate('/wish')}
            />
          )}
          {basket && (
            <img
              src="/icons/basket.svg"
              alt="basket"
              style={{ width: '2.4rem', height: '2.4rem', cursor: 'pointer' }}
              onClick={() => navigate('/cart')}
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
  gap: 1.2rem;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.color.blue[10]};
  cursor: pointer;
`;
