// src/hooks/useCategories.js
import { useEffect, useState } from 'react';

const CATEGORY_API = 'http://localhost:8080/api/1.0/categories';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      setCategories(data);
    } catch (e) {
      console.error('Failed to load categories', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    reload: fetchCategories,
  };
}
