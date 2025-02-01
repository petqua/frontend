import styled from 'styled-components';
import { TopNav } from '../components/molecules';
import { theme } from '../styles/theme';

const notifications = [
  {
    id: 1,
    type: 'comment',
    content: '회원님이 작성한 글에 댓글이 달렸습니다.',
    message: '“안녕하세요 좋은 정보 감사합니다! 혹시 합사에 대해서 더 자...',
    time: '11/23 07:00',
  },
  {
    id: 2,
    type: 'like',
    content: '회원님이 작성한 글에 ‘펫쿠아’님이 좋아합니다.',
    message: '',
    time: '11/23 07:00',
  },
  {
    id: 3,
    type: 'like',
    content: '회원님이 작성한 글에 ‘펫쿠아’님이 좋아합니다.',
    message: '',
    time: '11/23 07:00',
  },
  {
    id: 4,
    type: 'comment',
    content: '회원님이 작성한 글에 댓글이 달렸습니다.',
    message: '“안녕하세요 좋은 정보 감사합니다! 혹시 합사에 대해서 더 자...',
    time: '11/23 07:00',
  },
  {
    id: 5,
    type: 'comment',
    content: '회원님이 작성한 글에 댓글이 달렸습니다.',
    message: '“안녕하세요 좋은 정보 감사합니다! 혹시 합사에 대해서 더 자...',
    time: '11/23 07:00',
  },
];

// ✅ 읽은 글 ID 리스트
const readNotifications = [1, 3, 6, 7];

const AlarmPage = () => {
  return (
    <>
      <TopNav backBtn title="알림" />
      <NotificationContainer>
        {notifications.map((item) => (
          <AlarmItem key={item.id} isRead={readNotifications.includes(item.id)}>
            <NotificationText>{item.content}</NotificationText>
            {item.message && <MessagePreview>{item.message}</MessagePreview>}
            <NotificationTime>{item.time}</NotificationTime>
          </AlarmItem>
        ))}
      </NotificationContainer>
    </>
  );
};

export default AlarmPage;

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlarmItem = styled.div<{ isRead: boolean }>`
  padding: 1.5rem;
  background-color: ${(props) =>
    props.isRead ? '#eef3fe' : '#ffffff'}; // ✅ 읽은 글 배경 변경
`;

const NotificationText = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`;

const MessagePreview = styled.div`
  font-size: 1.4rem;
  color: ${theme.color.gray[50]};
  margin-top: 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotificationTime = styled.div`
  font-size: 1.4rem;
  color: ${theme.color.gray[50]};
  margin-top: 0.3rem;
`;
