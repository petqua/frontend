import styled from 'styled-components';
import {
  BoldText,
  CustomHr,
  FlexBox,
  MediumText,
  ProfileImg,
} from '../components/atoms';
import { BottomNavBar, MenuItem, TopNav } from '../components/molecules';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';

interface MenuSection {
  title: string;
  children: React.ReactNode;
}

const MenuSection = ({ title, children }: MenuSection) => {
  return (
    <Section>
      <BoldText
        size={20}
        color={theme.color.blue[80]}
        style={{ padding: '0 1.4rem', marginBottom: '1.4rem' }}
      >
        {title}
      </BoldText>
      {children}
    </Section>
  );
};

const MyPage = () => {
  const navigate = useNavigate();

  const MENU_LIST = [
    { text: '내 입양내역 조회', path: '/order' },
    { text: '입양 후기', path: '/review?category=write' },
    { text: '찜목록', path: '/wish' },
    { text: '고객센터', path: '' },
  ];

  return (
    <>
      <TopNav alarm basket option title="마이페이지" />

      {/* Profile */}
      <FlexBox justify="space-between" align="center" padding="2.4rem 1.4rem">
        <FlexBox align="center" gap="2.4rem">
          <ProfileImg size={6.8} url="" />
          <BoldText size={24} color={theme.color.gray[70]}>
            펫쿠아
          </BoldText>
        </FlexBox>
        <ProfileBtn onClick={() => navigate('')}>
          <MediumText
            color={theme.color.gray[60]}
            size={12}
            onClick={() => navigate('/myPage/edit')}
          >
            프로필 수정
          </MediumText>
        </ProfileBtn>
      </FlexBox>
      <CustomHr height="0.8rem" color={theme.color.gray[10]} />

      {/* Menu */}
      <MenuSection title="나의 주문 내역">
        {MENU_LIST.map((item) => (
          <MenuItem
            key={item.text}
            text={item.text}
            path={item.path}
            isBlueArrow
          />
        ))}
      </MenuSection>

      <BottomNavBar activeButton="profile" />
    </>
  );
};

export default MyPage;

const ProfileBtn = styled.button`
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  border: 0.05rem solid ${({ theme }) => theme.color.gray[60]};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2.4rem 0;
`;
