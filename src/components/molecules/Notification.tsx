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

const Notification = () => {
  return (
    <Container>
      <RegularText size={12} color={theme.color.gray.main}>
        [공지] 펫쿠아 앱 출시 기념 이벤트 진행중 ! 안전운송 사전 신청하러 가기
      </RegularText>
    </Container>
  );
};

export default Notification;
