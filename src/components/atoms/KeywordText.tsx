import { styled } from 'styled-components';
import { RegularText } from '.';
import { theme } from '../../styles/theme';

const Highlight = styled.span`
  color: ${({ theme }) => theme.color.blue[80]};
`;

interface KeywordText {
  keyword: string;
  query: string;
}

// 검색어 같은 부분 하이라이팅.
const KeywordText = ({ keyword, query }: KeywordText) => {
  if (query !== '' && keyword.includes(query)) {
    const parts = keyword.split(new RegExp(`(${query})`, 'gi'));
    return (
      <RegularText
        size={16}
        color={theme.color.gray[70]}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        }}
      >
        {parts.map((part, index) =>
          part === query ? <Highlight key={index}>{part}</Highlight> : part,
        )}
      </RegularText>
    );
  }
  return (
    <RegularText
      size={16}
      color={theme.color.gray[70]}
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
      }}
    >
      {keyword}
    </RegularText>
  );
};

export default KeywordText;
