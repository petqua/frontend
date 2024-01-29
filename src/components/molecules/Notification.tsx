import styled from 'styled-components';
import { RegularText } from '../atoms';
import { theme } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.6rem;
  background-color: #f7f7f7;
  cursor: pointer;
`;

interface Annoucement {
  id: number;
  title: string;
  linkUrl: string;
}
interface Notification {
  announcementList: Array<Annoucement>;
}

const MOCK_DATA = '[공지] 펫쿠아 프론트엔드 개발자 구인 중!';

const Notification = ({ announcementList }: Notification) => {
  return (
    <Container>
      <RegularText size={12} color={theme.color.gray.main}>
        {announcementList && announcementList.length > 0
          ? announcementList[0].title
          : MOCK_DATA}
      </RegularText>
    </Container>
  );
};

export default Notification;
