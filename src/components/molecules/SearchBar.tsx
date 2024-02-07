import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSearchStore } from '../../states';
import { IoIosArrowBack } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { TiDelete } from 'react-icons/ti';
import { theme } from '../../styles/theme';

const TopBar = styled.header`
  display: flex;
  width: 100%;
  height: 5rem;
  gap: 1rem;
  padding: 1rem 1rem;
`;

const InputDiv = styled.div`
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  background-color: ${({ theme }) => theme.color.gray[30]};
  padding: 0.5rem 1rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  background: none;
  ${({ theme }) => theme.font.regular14};
`;

const SearchBar = () => {
  const { searchInput, setSearchInput, recentInputs, setRecentInputs } =
    useSearchStore();

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

  const onChangeHandler = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e: any) => {
    if (searchInput && e.keyCode === 13) {
      setSearchInput(searchInput);
      handleAddRecentInput(searchInput);
      navigate(`/results?search_query=${searchInput}`);
    }
  };

  const navigate = useNavigate();

  return (
    <TopBar>
      <button
        onClick={() => {
          setSearchInput('');
          navigate(-1);
        }}
      >
        <IoIosArrowBack size={24} />
      </button>
      <InputDiv>
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={searchInput}
          onChange={onChangeHandler}
          onKeyDown={handleSearch}
        />
        {searchInput ? (
          <button onClick={() => setSearchInput('')}>
            <TiDelete size={22} color={theme.color.gray[40]} />
          </button>
        ) : (
          <button>
            <CiSearch size={22} />
          </button>
        )}
      </InputDiv>
    </TopBar>
  );
};

export default SearchBar;
