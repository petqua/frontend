import { useState, useEffect } from 'react';
// 검색어를 한 글자 칠 때마다 API 요청을 보내는 것은 비용적인 측면에서 최적화가 필요.
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
