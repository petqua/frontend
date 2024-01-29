import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { BoldText, FlexBox, RegularText } from '../atoms';

interface PreviewListTitle {
  title: string;
  subTitle?: string;
  path: string;
}

const PreviewListTitle = ({ title, subTitle, path }: PreviewListTitle) => {
  const navigate = useNavigate();
  return (
    <FlexBox
      justify="space-between"
      align="flex-end"
      style={{ padding: '0 1.4rem', width: '100%' }}
    >
      <FlexBox col gap="0.8rem">
        <BoldText size={22} color={theme.color.gray.main}>
          {title}
        </BoldText>
        {subTitle && (
          <RegularText size={14} color={theme.color.gray[70]}>
            {subTitle}
          </RegularText>
        )}
      </FlexBox>
      <FlexBox onClick={() => navigate(path)} style={{ cursor: 'pointer' }}>
        <RegularText size={14} color={theme.color.gray[50]}>
          더보기 {'>'}
        </RegularText>
      </FlexBox>
    </FlexBox>
  );
};

export default PreviewListTitle;
