import {
  BottomNavBar,
  FullScreen,
  RecentSearchList,
  SearchBar,
  TrendingKeywordList,
} from '../components/molecules';
import { useSearchStore } from '../states';
import { useDebounce } from '../hooks';
import { getTrendingKeywordsAPI } from '../apis';
import { useQuery } from '@tanstack/react-query';

const SearchPage = () => {
  const { searchInput } = useSearchStore();

  const debouncedQuery = useDebounce(searchInput, 300);

  const { data: trendingKeywordsData } = useQuery({
    queryKey: ['trendingKeywords', debouncedQuery],
    queryFn: () => getTrendingKeywordsAPI(debouncedQuery, 10),
    staleTime: 20 * 1000,
    gcTime: 60 * 1000,
  });

  return (
    <FullScreen>
      <SearchBar />
      {searchInput ? (
        <TrendingKeywordList
          data={trendingKeywordsData}
          debouncedQuery={debouncedQuery}
        />
      ) : (
        <RecentSearchList />
      )}
      <BottomNavBar activeButton="search" />
    </FullScreen>
  );
};

export default SearchPage;
