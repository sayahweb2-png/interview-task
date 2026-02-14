import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseUserResult {
  userId: number | null;
  isIdentified: boolean;
}

export function useUser(): UseUserResult {
  const [searchParams] = useSearchParams();

  const userId = useMemo(() => {
    // check url query param (?user=123)
    const userParam = searchParams.get('user');
    if (userParam) {
      const parsed = parseInt(userParam, 10);
      if (!isNaN(parsed) && parsed > 0) {
        // persist to localStorage for future visits
        localStorage.setItem('user_id', String(parsed));
        return parsed;
      }
    }

    // fallback: check localStorage
    const stored = localStorage.getItem('user_id');
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }

    return null;
  }, [searchParams]);

  return {
    userId,
    isIdentified: userId !== null,
  };
}
