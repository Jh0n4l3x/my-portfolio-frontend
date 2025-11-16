import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchService, { SearchResults, BlogPost } from '../../services/search.service';
import { Project, Technology } from '../../types';
// Perfil devuelto por la búsqueda (shape simplificado)
interface SearchProfile {
  id: string;
  user: {
    username: string;
    firstName?: string;
    lastName?: string;
  };
}

interface GlobalSearchProps {
  username?: string;
}

export function GlobalSearch({ username }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Keyboard navigation state
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});

  // Safe results wrapper to avoid TS null checks in JSX
  const rs = useMemo(() => results ?? { projects: [], profiles: [], posts: [], technologies: [] }, [results]);

  // Flatten results to a single list for keyboard navigation
  const flattenedResults = useMemo(() => {
    const items: Array<{ url: string; label: string }> = [];
    if (!rs) return items;

    rs.projects?.slice(0, 3).forEach((p: Project) => items.push({ url: `/projects/${p.id}`, label: p.title }));
    const profiles = (rs.profiles ?? []) as unknown as SearchProfile[];
    profiles.slice(0, 3).forEach((pr) => items.push({ url: `/${pr.user.username}`, label: `${pr.user.firstName} ${pr.user.lastName}` }));
    rs.posts?.slice(0, 3).forEach((po: BlogPost) => items.push({ url: username ? `/${username}/blog/${po.slug}` : `/blog/${po.slug}`, label: po.title }));
    rs.technologies?.slice(0, 5).forEach((t: Technology) => items.push({ url: `/projects?technology=${t.id}`, label: t.name }));
    return items;
  }, [rs, username]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts: '/' to focus search, Escape to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      // Ignore when typing in inputs or contenteditable
      if (e.key === '/' && inputRef.current && active && active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA' && active.getAttribute('contenteditable') !== 'true') {
        e.preventDefault();
        inputRef.current.focus();
        setShowResults(true);
        setFocusedIndex(-1);
        return;
      }

      if (!showResults) return;

      if (e.key === 'Escape') {
        setShowResults(false);
        inputRef.current?.blur();
        setFocusedIndex(-1);
        return;
      }

      // Keyboard navigation within results
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, flattenedResults.length - 1));
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        const item = flattenedResults[focusedIndex];
        if (item) {
          setShowResults(false);
          setQuery('');
          setFocusedIndex(-1);
          navigate(item.url);
        }
      }

      // Si no hay resultados enfocados pero hay query, ir a página de resultados
      if (e.key === 'Enter' && focusedIndex === -1 && query.trim().length >= 2) {
        e.preventDefault();
        setShowResults(false);
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [flattenedResults, focusedIndex, showResults, navigate, query]);

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
          setShowResults(true);
          setFocusedIndex(-1);
        } catch (error) {
          console.error('Error en búsqueda:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults(null);
        setSuggestions([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  const totalResults =
    (results?.projects.length || 0) +
    (results?.profiles.length || 0) +
    (results?.posts.length || 0) +
    (results?.technologies.length || 0);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar proyectos, perfiles, posts... (tecla '/')"
          aria-label="Buscar proyectos, perfiles y posts"
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {showResults && query.length >= 2 && (
        <div
          role="listbox"
          aria-label="Resultados de búsqueda"
          className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
        >
          {totalResults === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No se encontraron resultados para "{query}"
            </div>
          ) : (
            <div className="py-2">
              {/* Proyectos */}
              {rs.projects && rs.projects.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Proyectos ({rs.projects.length})
                  </div>
                  {rs.projects.slice(0, 3).map((project: Project) => {
                    const index = flattenedResults.findIndex((i) => i.url === `/projects/${project.id}`);
                    return (
                      <div
                        key={project.id}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`block px-4 py-2 hover:bg-gray-50 transition-colors ${focusedIndex === index ? 'bg-primary-50' : ''}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                        onMouseLeave={() => setFocusedIndex(-1)}
                        onClick={() => {
                          setShowResults(false);
                          setQuery('');
                        }}
                        role="option"
                        aria-selected={focusedIndex === index}
                      >
                        <Link to={`/projects/${project.id}`} className="block">
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-gray-500 truncate">{project.description}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Perfiles */}
              {rs.profiles && rs.profiles.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Perfiles ({rs.profiles.length})
                  </div>
                  {((rs.profiles ?? []) as unknown as SearchProfile[]).slice(0, 3).map((profile) => {
                    const index = flattenedResults.findIndex((i) => i.url === `/${profile.user.username}`);
                    return (
                      <div
                        key={profile.id}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`block px-4 py-2 hover:bg-gray-50 transition-colors ${focusedIndex === index ? 'bg-primary-50' : ''}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                        onMouseLeave={() => setFocusedIndex(-1)}
                        onClick={() => {
                          setShowResults(false);
                          setQuery('');
                        }}
                        role="option"
                        aria-selected={focusedIndex === index}
                      >
                        <Link to={`/${profile.user.username}`} className="block">
                          <div className="font-medium">{profile.user.firstName} {profile.user.lastName}</div>
                          <div className="text-sm text-gray-500">@{profile.user.username}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Posts */}
              {rs.posts && rs.posts.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Posts ({rs.posts.length})
                  </div>
                  {rs.posts.slice(0, 3).map((post: BlogPost) => {
                    const index = flattenedResults.findIndex((i) => i.url === `/blog/${post.slug}`);
                    return (
                      <div
                        key={post.id}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`block px-4 py-2 hover:bg-gray-50 transition-colors ${focusedIndex === index ? 'bg-primary-50' : ''}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                        onMouseLeave={() => setFocusedIndex(-1)}
                        onClick={() => {
                          setShowResults(false);
                          setQuery('');
                        }}
                        role="option"
                        aria-selected={focusedIndex === index}
                      >
                        <Link to={username ? `/${username}/blog/${post.slug}` : `/blog/${post.slug}`} className="block">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-gray-500 truncate">{post.excerpt}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tecnologías */}
              {rs.technologies && rs.technologies.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Tecnologías ({rs.technologies.length})
                  </div>
                  <div className="px-4 py-2 flex flex-wrap gap-2">
                    {rs.technologies.slice(0, 5).map((tech: Technology) => {
                      const index = flattenedResults.findIndex((i) => i.url === `/projects?technology=${tech.id}`);
                      return (
                        <button
                          key={tech.id}
                          ref={(el) => (itemRefs.current[index] = el)}
                          onClick={() => {
                            setShowResults(false);
                            setQuery('');
                            navigate(`/projects?technology=${tech.id}`);
                          }}
                          onMouseEnter={() => setFocusedIndex(index)}
                          onMouseLeave={() => setFocusedIndex(-1)}
                          aria-label={`Filtrar por ${tech.name}`}
                          className={`px-2 py-1 ${focusedIndex === index ? 'bg-primary-100' : 'bg-gray-100'} rounded text-sm`}
                        >
                          {tech.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="border-t border-gray-200 pt-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Sugerencias
                  </div>
                  <div className="px-4 py-2 flex flex-wrap gap-2">
                    {suggestions.slice(0, 5).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(suggestion)}
                        aria-label={`Sugerencia ${suggestion}`}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-sm hover:bg-primary-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ver todos los resultados */}
              {totalResults > 0 && (
                <div className="border-t border-gray-200 pt-2">
                  <div className="px-4 py-2">
                    <Link
                      to={`/${username}/search?q=${encodeURIComponent(query)}`}
                      onClick={() => {
                        setShowResults(false);
                        setQuery('');
                      }}
                      className="block w-full text-center text-primary-600 hover:text-primary-700 text-sm font-medium hover:bg-primary-50 py-2 rounded transition-colors"
                    >
                      Ver todos los resultados ({totalResults})
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
