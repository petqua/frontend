import styled from 'styled-components';
import { CiSearch } from 'react-icons/ci';
import { KeywordText } from '../atoms';
import { useSearchStore } from '../../states';
import { useNavigate } from 'react-router-dom';

interface TrendingKeyword {
  id: number;
  keyword: string;
}

interface TrendingKeywordList {
  data: Array<TrendingKeyword>;
  debouncedQuery: string;
}

const RecommendUl = styled.ul`
  padding: 1.8rem 1.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const RecommendLi = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 0.05rem ${({ theme }) => theme.color.gray[50]} solid;
  padding: 1.2rem 0;
  gap: 2rem;
  cursor: pointer;
`;

const TrendingKeywordList = ({ data, debouncedQuery }: TrendingKeywordList) => {
  const { setSearchInput, recentInputs, setRecentInputs } = useSearchStore();
  const navigate = useNavigate();

  // 새로운 검색어 추가
  const handleAddRecentInput = (text: string) => {
    // 중복 검색어 확인
    const isDuplicate = recentInputs.includes(text);

    if (isDuplicate) return;

    // 최근 검색어의 개수가 최대 10개까지 저장할 수 있도록 개수가 10이면 pop.
    if (recentInputs?.length === 10) {
      recentInputs.pop();
    }
    setRecentInputs([text, ...recentInputs]);
  };

  const handleClick = (keyword: string) => {
    navigate('/product?keyword=' + keyword);
    setSearchInput(keyword);
    handleAddRecentInput(keyword);
  };
  return (
    <RecommendUl>
      {Array.isArray(data) &&
        data.map((item) => (
          <RecommendLi
            key={item.id}
            onClick={() => {
              handleClick(item.keyword);
            }}
          >
            <CiSearch size={22} />
            <KeywordText keyword={item.keyword} query={debouncedQuery} />
          </RecommendLi>
        ))}
    </RecommendUl>
  );
};

export default TrendingKeywordList;
