import { DefaultTheme, styled } from 'styled-components';

interface TextProps {
  children: React.ReactNode; // 글자 텍스트
  size: number; // 글자 사이즈
  color: string; // 글자 색상
  style?: any; // 이외 스타일
  onClick?: () => void; // 클릭 이벤트
}

interface FontProps {
  theme: DefaultTheme;
  $fontTheme: string;
}

export const LightText = ({
  children,
  size,
  color,
  style,
  onClick,
}: TextProps) => {
  const fontTheme = `light${size}`;
  return (
    <Text
      $fontTheme={fontTheme}
      style={{ ...style, color: color }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

export const RegularText = ({
  children,
  size,
  color,
  style,
  onClick,
}: TextProps) => {
  const fontTheme = `regular${size}`;
  return (
    <Text
      $fontTheme={fontTheme}
      style={{ ...style, color: color }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

export const MediumText = ({
  children,
  size,
  color,
  style,
  onClick,
}: TextProps) => {
  const fontTheme = `medium${size}`;
  return (
    <Text
      $fontTheme={fontTheme}
      style={{ ...style, color: color }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

export const BoldText = ({
  children,
  size,
  color,
  style,
  onClick,
}: TextProps) => {
  const fontTheme = `bold${size}`;
  return (
    <Text
      $fontTheme={fontTheme}
      style={{ ...style, color: color }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

const Text = styled.p<FontProps>`
  ${({ theme, $fontTheme }) => theme.font[$fontTheme]}
  line-height: 1;
`;
