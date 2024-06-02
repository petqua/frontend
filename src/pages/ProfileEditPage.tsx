import styled from 'styled-components';
import { BlueButton, TopNav } from '../components/molecules';
import { FlexBox, LightText } from '../components/atoms';
import { theme } from '../styles/theme';
import { useState } from 'react';
import { IoCloseCircleSharp } from '../components/atoms/Icon';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const specialCharRegex = /[,_\/-]/;

  const [nickname, setNickname] = useState('');
  const [isError, setIsError] = useState('');

  const onClickBtn = () => {
    if (nickname === '펫쿠아') {
      setIsError('이미 존재하는 닉네임입니다.');
    } else if (specialCharRegex.test(nickname)){
      setIsError('특수문자를 제외해주세요.');
    } else {
      setIsError('');
      alert('프로필 수정완료');
      navigate(-2);
    }
  };

  return (
    <>
      <TopNav backBtn title="프로필 수정" />
      <FlexBox col padding="2.4rem 1.4rem" gap="4rem" fullWidth>
        {/* Input Section */}
        <FlexBox col gap="0.8rem" fullWidth>
          <FlexBox
            padding="1.4rem"
            justify="space-between"
            align="center"
            gap="1rem"
            fullWidth
            style={{
              border: `0.05rem solid ${isError!=='' ? theme.color.tint.red : theme.color.gray[50]}`,
            }}
          >
            <Input
              value={nickname}
              placeholder="닉네임 입력(최대15자)"
              onChange={(e) => setNickname(e.target.value)}
            />
            {nickname && (
              <IoCloseCircleSharp
                size={24}
                color={theme.color.gray[40]}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setNickname('');
                }}
              />
            )}
          </FlexBox>
          <LightText
            color={isError!=='' ? theme.color.tint.red : theme.color.gray[70]}
            size={12}
          >
            {isError !== ''
              ? isError
              : '현재 닉네임 : 펫쿠아'}
          </LightText>
        </FlexBox>

        {/* Edit Button */}
        <BlueButton
          text="완료"
          onClick={onClickBtn}
          disabled={nickname.length < 2 || nickname.length > 12}
        />

        {/* Info Section */}
        <FlexBox col gap="1rem">
          <LightText size={12} color={theme.color.gray[70]}>
            • 길이는 최소 2 최대 12자 이내
          </LightText>
          <LightText size={12} color={theme.color.gray[70]}>
            • 중복 닉네임 불가
          </LightText>
          <LightText size={12} color={theme.color.gray[70]}>
            • 한글, 영문 대소문자, 숫자 조합
          </LightText>
          <LightText size={12} color={theme.color.gray[70]}>
            • , / _ - 등의 특수문자도 제외
          </LightText>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default ProfileEditPage;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray.main};
`;
