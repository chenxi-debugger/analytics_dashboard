import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../api/client';

// Loads the user named in "?id=..." — or the newest user when no id is given,
// so the sidebar links "View" / "Edit" still show something useful.
export default function useUserFromQuery() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (id) {
        setUser(await apiFetch(`/api/users/${id}`));
      } else {
        const data = await apiFetch('/api/users?limit=1');
        setUser(data.items[0] || null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { user, setUser, loading, error, reload: load };
}
