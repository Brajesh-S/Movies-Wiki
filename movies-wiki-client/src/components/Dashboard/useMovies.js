import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useMovies = (authToken) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const api = axios.create({
        baseURL: 'https://movies-wiki.onrender.comapi',
        headers: { Authorization: `Bearer ${authToken}` }
      });

      const endpoint = searchTerm.trim() 
        ? `/search?query=${searchTerm}`
        : `/movies/popular?page=${currentPage}`;

      const response = await api.get(endpoint);
      
      const data = response.data;

      setMovies(data);
      setTotalPages(data.page);

      if (searchTerm.trim()) setCurrentPage(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, [authToken, searchTerm, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page) => {
    if (page >= 1) {
      setCurrentPage(page);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
}

  return {
    movies,
    searchTerm,
    currentPage,
    totalPages,
    loading,
    error,
    handleSearch: (term) => {
      setSearchTerm(term);
      if (term.length > 0) setCurrentPage(1);
    },
    handlePageChange
  };
};

export default useMovies;