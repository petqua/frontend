import { FlexBox } from '../components/atoms';
import { MenuItem, TopNav } from '../components/molecules';

const OptionPage = () => {
  const MENU_LIST = [
    { text: '알림 설정', path: '' },
    { text: '운송지 관리', path: '' },
    { text: '회원탈퇴', onClick: () => {} },
    { text: '로그아웃', onClick: () => {} },
  ];

  return (
    <>
      <TopNav backBtn title="설정" />
      <FlexBox col padding="2.4rem 0" fullWidth>
        {MENU_LIST.map((item) => (
          <MenuItem
            key={item.text}
            text={item.text}
            path={item.path}
            onClick={item.onClick}
          />
        ))}
      </FlexBox>
    </>
  );
};

export default OptionPage;
