import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useGlobalSearch } from '../hooks/usePortfolio';
import { Project, Technology } from '../types';
import { BlogPost } from '../services/search.service';

interface SearchProfile {
  id: string;
  user: {
    username: string;
    firstName?: string;
    lastName?: string;
  };
}

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, loading } = useGlobalSearch();

  // Forzar la búsqueda con el query de la URL
  useEffect(() => {
    if (query) {
      // El hook useGlobalSearch ya maneja la búsqueda automáticamente
    }
  }, [query]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
    }
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  const totalResults =
    (results?.projects.length || 0) +
    (results?.profiles.length || 0) +
    (results?.posts.length || 0) +
    (results?.technologies.length || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header de búsqueda */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar proyectos, perfiles, posts..."
                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(query);
                  }
                }}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {loading ? (
                'Buscando...'
              ) : (
                `${totalResults} resultado${totalResults !== 1 ? 's' : ''} para "${query}"`
              )}
            </div>
          </div>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
          </div>
        ) : query && results ? (
          <div className="space-y-8">
            {/* Proyectos */}
            {results.projects && results.projects.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Proyectos ({results.projects.length})
                  </h2>
                  <Link
                    to={`/projects?q=${encodeURIComponent(query)}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Ver todos →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.projects.map((project: Project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          <Link to={`/projects/${project.id}`} className="hover:text-primary-600">
                            {project.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            por @{project.user?.username}
                          </span>
                          <Link
                            to={`/projects/${project.id}`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            Ver proyecto →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Perfiles */}
            {results.profiles && results.profiles.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Perfiles ({results.profiles.length})
                  </h2>
                  <Link
                    to={`/profiles?q=${encodeURIComponent(query)}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Ver todos →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {((results.profiles ?? []) as unknown as SearchProfile[]).map((profile) => (
                    <div key={profile.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {profile.user.firstName?.[0]}{profile.user.lastName?.[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            <Link to={`/${profile.user.username}`} className="hover:text-primary-600">
                              {profile.user.firstName} {profile.user.lastName}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm">@{profile.user.username}</p>
                        </div>
                      </div>
                      <Link
                        to={`/${profile.user.username}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Ver perfil →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Posts */}
            {results.posts && results.posts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Posts ({results.posts.length})
                  </h2>
                  <Link
                    to={`/blog?q=${encodeURIComponent(query)}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Ver todos →
                  </Link>
                </div>
                <div className="space-y-4">
                  {results.posts.map((post: BlogPost) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary-600">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('es-ES')}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Leer más →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tecnologías */}
            {results.technologies && results.technologies.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tecnologías ({results.technologies.length})
                </h2>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-wrap gap-3">
                    {results.technologies.map((tech: Technology) => (
                      <Link
                        key={tech.id}
                        to={`/projects?technology=${tech.id}`}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        {tech.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {totalResults === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda o verifica la ortografía.
                </p>
              </div>
            )}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ingresa un término de búsqueda
            </h3>
            <p className="text-gray-600">
              Escribe al menos 2 caracteres para comenzar a buscar.
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ¿Qué estás buscando?
            </h3>
            <p className="text-gray-600">
              Busca proyectos, perfiles, posts del blog o tecnologías.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}