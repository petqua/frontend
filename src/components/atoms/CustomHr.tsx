import styled from 'styled-components';

const Hr = styled.hr<{ $height: string; $color: string }>`
  height: ${({ $height }) => $height};
  background-color: ${({ $color }) => $color};
  border: none;
`;

interface CustomHr {
  height: string;
  color: string;
}

const CustomHr = ({ height, color }: CustomHr) => {
  return <Hr $height={height} $color={color} />;
};

export default CustomHr;
