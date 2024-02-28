import styled from 'styled-components';

const Hr = styled.hr<{ $height: string; $color: string }>`
  height: ${({ $height }) => $height};
  background-color: ${({ $color }) => $color};
  border: none;
`;

interface CustomHr {
  height: string;
  color: string;
  style?: any;
}

const CustomHr = ({ height, color, style }: CustomHr) => {
  return <Hr $height={height} $color={color} style={{ ...style }} />;
};

export default CustomHr;
