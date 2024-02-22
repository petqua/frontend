interface FlexBox {
  children: React.ReactNode;
  col?: boolean;
  gap?: string;
  justify?: string;
  align?: string;
  padding?: string;
  fullWidth?: boolean;
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
  fullWidth,
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
        width: fullWidth ? '100%' : 'auto',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FlexBox;
