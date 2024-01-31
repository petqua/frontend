import styled from 'styled-components';
import { GoHomeFill } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { BsPerson } from 'react-icons/bs';
import ChatIcon from '../../assets/chat.svg?react';
import DoubleFish from '../../assets/double-fish.svg?react';
import { RegularText } from '../atoms';
import { theme } from '../../styles/theme';

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 50rem;
  height: 7.2rem;
  background: ${({ theme }) => theme.color.tint.white};
  color: ${({ theme }) => theme.color.gray.main};
  display: flex;
  box-shadow: 0 0.4rem 2.5rem 0 rgba(0, 0, 0, 0.08);
  padding: 1rem 3rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.5rem 1rem;
  }
  justify-content: space-between;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

interface BottomNavBar {
  activeButton: string;
}

const BottomNavBar = ({ activeButton }: BottomNavBar) => {
  return (
    <Footer>
      <NavButton>
        <GoHomeFill
          size={26}
          fill={activeButton === 'home' ? theme.color.blue[70] : undefined}
        />
        <RegularText
          size={10}
          color={
            activeButton === 'home'
              ? theme.color.blue[70]
              : theme.color.gray.main
          }
        >
          홈
        </RegularText>
      </NavButton>
      <NavButton>
        <CiSearch
          size={26}
          fill={activeButton === 'search' ? theme.color.blue[70] : undefined}
        />
        <RegularText
          size={10}
          color={
            activeButton === 'search'
              ? theme.color.blue[70]
              : theme.color.gray.main
          }
        >
          검색
        </RegularText>
      </NavButton>
      <NavButton>
        <DoubleFish
          stroke={
            activeButton === 'grouping' ? theme.color.blue[70] : undefined
          }
        />
        <RegularText
          size={10}
          color={
            activeButton === 'grouping'
              ? theme.color.blue[70]
              : theme.color.gray.main
          }
        >
          합사
        </RegularText>
      </NavButton>
      <NavButton>
        <ChatIcon
          stroke={
            activeButton === 'community' ? theme.color.blue[70] : undefined
          }
        />
        <RegularText
          size={10}
          color={
            activeButton === 'community'
              ? theme.color.blue[70]
              : theme.color.gray.main
          }
        >
          물생활
        </RegularText>
      </NavButton>
      <NavButton>
        <BsPerson
          size={26}
          fill={activeButton === 'profile' ? theme.color.blue[70] : undefined}
        />
        <RegularText
          size={10}
          color={
            activeButton === 'profile'
              ? theme.color.blue[70]
              : theme.color.gray.main
          }
        >
          내정보
        </RegularText>
      </NavButton>
    </Footer>
  );
};

export default BottomNavBar;
