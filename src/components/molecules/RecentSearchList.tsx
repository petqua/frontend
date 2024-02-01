import { styled } from 'styled-components';
import { useSearchStore } from '../../states';
import { BoldText, FlexBox, MediumText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';
import { AiOutlineCloseCircle } from 'react-icons/ai';

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
  const { recentInputs, setRecentInputs } = useSearchStore();

  const handleRemoveAllRecentInput = () => {
    setRecentInputs([]);
  };

  const handleRemoveRecentInput = (id: number) => {
    const newRecentInput = recentInputs.filter((_, idx) => {
      return idx !== id;
    });
    setRecentInputs(newRecentInput);
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
                }}
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
