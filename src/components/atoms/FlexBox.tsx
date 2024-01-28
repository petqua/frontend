interface FlexBox {
  children: React.ReactNode;
  col?: boolean;
  gap?: string;
  justify?: string;
  align?: string;
  style?: any;
  onClick?: () => void;
}
const FlexBox = ({
  children,
  col,
  gap,
  justify,
  align,
  style,
  onClick,
}: FlexBox) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: col ? 'column' : 'row',
        gap: gap || '0',
        // 설정안했을 시의 기본값으로 flex-start가 나을지 center가 나을지 의논
        justifyContent: justify || 'flex-start',
        alignItems: align || 'flex-start',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FlexBox;
