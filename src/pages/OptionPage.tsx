import { useNavigate } from 'react-router-dom';
import { FlexBox } from '../components/atoms';
import { Confirm, MenuItem, TopNav } from '../components/molecules';
import { useState } from 'react';

const OptionPage = () => {
  const navigate = useNavigate();
  const [isOpenLogoutConfirm, setIsOpenLogoutConfirm] = useState(false);

  const MENU_LIST = [
    { text: '알림 설정', path: '' },
    { text: '운송지 관리', path: '' },
    {
      text: '회원탈퇴',
      onClick: () => {
        navigate('/withdrawal');
      },
    },
    {
      text: '로그아웃',
      onClick: () => {
        setIsOpenLogoutConfirm(true);
      },
    },
  ];

  const onClickLogout = () => {
    alert('로그아웃');
  };

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
      {isOpenLogoutConfirm && (
        <Confirm
          text="로그아웃 하시겠습니까?"
          setIsOpenConfirm={setIsOpenLogoutConfirm}
          handleYes={onClickLogout}
        />
      )}
    </>
  );
};

export default OptionPage;
