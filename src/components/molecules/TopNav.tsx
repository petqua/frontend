import { FlexBox, MediumText } from '../atoms';
import { theme } from '../../styles/theme';
import { CiSearch } from 'react-icons/ci';
import { GoChevronLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

interface TopNav {
  backBtn?: boolean;
  search?: boolean;
  basket?: boolean;
  alarm?: boolean;
  like?: boolean;
  logo?: boolean;
  title?: string;
  isBlue?: boolean; // 타이틀 파란색 여부
}

const TopNav = ({
  backBtn,
  search,
  basket,
  alarm,
  like,
  logo,
  title,
  isBlue,
}: TopNav) => {
  const navigate = useNavigate();

  return (
    <FlexBox
      justify="space-between"
      align="center"
      style={{
        padding: '1.6rem 1.4rem',
        width: '100%',
      }}
    >
      <FlexBox
        justify="flex-start"
        align="center"
        gap="1.4rem"
        style={{ width: '6rem' }}
      >
        {backBtn && (
          <button onClick={() => navigate(-1)}>
            <GoChevronLeft size={24} color={theme.color.gray.main} />
          </button>
        )}

        {alarm && (
          <button onClick={() => navigate('/alarm')}>
            <img src="/icons/alarm.svg" />
          </button>
        )}
      </FlexBox>
      {logo ? (
        <img src="/icons/logo-typo.svg" />
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
        {search && (
          <button onClick={() => navigate('/search')}>
            <CiSearch size={24} />
          </button>
        )}
        {basket && (
          <button onClick={() => navigate('/basket')}>
            <img
              src="/icons/basket.svg"
              style={{ width: '2.4rem', height: '2.4rem' }}
            />
          </button>
        )}
        {like && (
          <button onClick={() => navigate('/like')}>
            <img src="/icons/bubble-like.svg" />
          </button>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default TopNav;
