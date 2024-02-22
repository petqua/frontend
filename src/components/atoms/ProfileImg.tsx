import { styled } from 'styled-components';

interface ProfileImg {
  size: number;
  url: string;
}

const ProfileImg = ({ size, url }: ProfileImg) => {
  return (
    <ImgContainer style={{ width: `${size}rem` }}>
      {url && <Image src={url} alt="profile-img" />}
    </ImgContainer>
  );
};

export default ProfileImg;

const ImgContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray[30]};
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
