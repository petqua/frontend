import { useNavigate } from 'react-router-dom';
import { FlexBox } from '../components/atoms';
import { Confirm, MenuItem, TopNav } from '../components/molecules';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { patchSignOutAPI } from '../apis';
import { useAuthStore } from '../states';

const OptionPage = () => {
  const navigate = useNavigate();
  const [isOpenLogoutConfirm, setIsOpenLogoutConfirm] = useState(false);
  const { accessToken, logout } = useAuthStore();

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

  const { mutate } = useMutation({
    mutationFn: () => patchSignOutAPI(),
    onSuccess: () => {
      logout();
      alert('로그아웃');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <>
      <TopNav backBtn title="설정" />
      <FlexBox
        col
        padding="2.4rem 0"
        fullWidth
        onClick={() => console.log(accessToken)}
      >
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
          handleYes={mutate}
        />
      )}
    </>
  );
};

export default OptionPage;
