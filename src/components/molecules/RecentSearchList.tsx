import { styled } from 'styled-components';
import { useSearchStore } from '../../states';
import { BoldText, FlexBox, MediumText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  margin-top: 2rem;
  gap: 3.5rem;
`;

const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 2.4rem;
  width: 100%;
`;

const KeywordBox = styled.div`
  height: 2.4rem;
  display: flex;
  align-items: center;
  border-bottom: 0.05rem solid ${({ theme }) => theme.color.gray[60]};
  gap: 1rem;
  width: calc(50% - 0.5rem);
`;

const RecentSearchList = () => {
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

  const handleRemoveAllRecentInput = () => {
    setRecentInputs([]);
  };

  const handleRemoveRecentInput = (id: number) => {
    const newRecentInput = recentInputs.filter((_, idx) => {
      return idx !== id;
    });
    setRecentInputs(newRecentInput);
  };

  const handleClick = (keyword: string) => {
    navigate(`/results?search_query=${keyword}`);
    setSearchInput(keyword);
    handleAddRecentInput(keyword);
  };

  return (
    <Container>
      <FlexBox justify="space-between" align="center" style={{ width: '100%' }}>
        <BoldText size={16} color={theme.color.gray[70]}>
          최근 검색어
        </BoldText>
        <button onClick={handleRemoveAllRecentInput}>
          <RegularText size={14} color={theme.color.gray[50]}>
            모두 지우기
          </RegularText>
        </button>
      </FlexBox>
      <KeywordWrapper>
        {recentInputs &&
          recentInputs.map((text: string, idx: number) => (
            <KeywordBox key={idx}>
              <MediumText
                size={14}
                color={theme.color.gray[60]}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  cursor: 'pointer',
                }}
                onClick={() => handleClick(text)}
              >
                {text}
              </MediumText>
              <button onClick={() => handleRemoveRecentInput(idx)}>
                <AiOutlineCloseCircle size={16} color={theme.color.gray[60]} />
              </button>
            </KeywordBox>
          ))}
      </KeywordWrapper>
    </Container>
  );
};

export default RecentSearchList;
