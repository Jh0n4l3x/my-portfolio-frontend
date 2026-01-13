import { portfolioService } from '@/infrastructure/adapters/service/portfolio.service';
import searchService, { SearchResults } from '@/infrastructure/adapters/service/search.service';
import { Project } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export const usePortfolio = (username: string | undefined) => {
  return useQuery({
    queryKey: ['portfolio', username],
    queryFn: () => portfolioService.getByUsername(username!),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useCheckUsername = (username: string, enabled = true) => {
  return useQuery({
    queryKey: ['check-username', username],
    queryFn: () => portfolioService.checkUsernameAvailability(username),
    enabled: enabled && username.length >= 3,
    staleTime: 0, // Siempre verificar
  });
};

export const useCheckEmail = (email: string, enabled = true) => {
  return useQuery({
    queryKey: ['check-email', email],
    queryFn: () => portfolioService.checkEmailAvailability(email),
    enabled: enabled && email.length > 0 && email.includes('@'),
    staleTime: 0, // Siempre verificar
  });
};

export const useCheckPhone = (phone: string, enabled = true) => {
  return useQuery({
    queryKey: ['check-phone', phone],
    queryFn: () => portfolioService.checkPhoneAvailability(phone),
    enabled: enabled && phone.length >= 10,
    staleTime: 0, // Siempre verificar
  });
};

export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        try {
          setLoading(true);
          const [searchResults, suggestionsData] = await Promise.all([
            searchService.globalSearch(query),
            searchService.getSuggestions(query),
          ]);
          setResults(searchResults);
          setSuggestions([
            ...suggestionsData.projects,
            ...suggestionsData.technologies,
            ...suggestionsData.skills,
          ]);
        } catch (error) {
          console.error('Error en búsqueda:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults(null);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    suggestions,
    loading,
  };
}

export function useProjectSearch() {
  const [filters, setFilters] = useState({
    query: '',
    technologyId: '',
    userId: '',
    featured: false,
  });
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const searchResults = await searchService.searchProjects(filters);
        setResults(searchResults);
      } catch (error) {
        console.error('Error searching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [filters]);

  return {
    filters,
    setFilters,
    results,
    loading,
  };
}
