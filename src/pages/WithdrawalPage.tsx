import { useNavigate } from 'react-router-dom';
import { BlueButton, TopNav, WhiteButton } from '../components/molecules';
import { BoldText, CheckBox, FlexBox, RegularText } from '../components/atoms';
import { theme } from '../styles/theme';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteMembersAPI } from '../apis';
import { useAuthStore } from '../states';

const InfoListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlexBox gap="1rem">
      <RegularText
        size={14}
        color={theme.color.gray[50]}
        style={{ paddingTop: '0.3rem' }}
      >
        •
      </RegularText>
      <RegularText
        size={14}
        color={theme.color.gray[50]}
        style={{ lineHeight: '150%' }}
      >
        {children}
      </RegularText>
    </FlexBox>
  );
};

const WithdrawalPage = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { accessToken, logout } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: () => deleteMembersAPI(),
    onSuccess: () => {
      console.log(accessToken);
      logout();
      alert('회원탈퇴 되었습니다.');
      navigate(-1);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onClickWithdrawal = () => {
    if (!checked) {
      alert('안내사항에 동의해주세요');
    } else {
      mutate();
    }
  };

  return (
    <>
      <TopNav backBtn title="회원 탈퇴" />
      <FlexBox col justify="space-between" align="center" style={{ flex: 1 }}>
        <FlexBox
          col
          align="center"
          padding="0 3.2rem"
          gap="2.4rem"
          style={{ margin: '5.5rem 0' }}
        >
          <img
            alt="caution"
            src="/icons/caution.svg"
            // style={{ margin: '1.6rem 0' }}
          />
          <BoldText
            size={20}
            color={theme.color.gray.main}
            style={{
              textAlign: 'center',
              lineHeight: '180%',
              margin: '1.6rem 0',
            }}
          >
            회원 탈퇴 시 <br />
            고객님의 모든 정보가 소멸되며
            <br />
            이전으로{' '}
            <span style={{ color: theme.color.blue[80] }}>복구 불가능</span>
            합니다.
            <br />
          </BoldText>
          <InfoListItem>
            탈퇴 이후 데이터 삭제로 인해 고객센터 대응에 어려움이
            있을수있습니다.
          </InfoListItem>
          <InfoListItem>
            탈퇴 시 60일간 동일 계정과 번호로 회원가입을 할 수 없습니다.
          </InfoListItem>
        </FlexBox>

        <FlexBox col padding="0 1.4rem" fullWidth gap="2rem">
          <FlexBox align="center" gap="1.2rem">
            <CheckBox
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            />
            <RegularText size={14} color={theme.color.gray.main}>
              안내 사항을 모두 확인했으며 동의 합니다.
            </RegularText>
          </FlexBox>
          <FlexBox gap="1rem" fullWidth>
            <WhiteButton text="회원탈퇴" onClick={onClickWithdrawal} isRound />
            <BlueButton text="취소하기" onClick={() => navigate(-1)} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default WithdrawalPage;
