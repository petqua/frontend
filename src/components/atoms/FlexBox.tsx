interface FlexBox {
  children: React.ReactNode;
  col?: boolean;
  gap?: string;
  justify?: string;
  align?: string;
  padding?: string;
  style?: any;
  onClick?: () => void;
}

const FlexBox = ({
  children,
  col,
  gap,
  justify,
  align,
  padding,
  style,
  onClick,
}: FlexBox) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: col ? 'column' : 'row',
        gap: gap || '0',
        justifyContent: justify || 'flex-start',
        alignItems: align || 'flex-start',
        padding: padding || '0',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FlexBox;
