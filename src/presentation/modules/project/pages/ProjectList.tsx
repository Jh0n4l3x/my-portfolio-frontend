import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { projectService } from '@services/project.service';
import { useAuth } from '@hooks/useAuth';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  Copy,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import { Project } from '@/shared/types';

type FilterType = 'all' | 'published' | 'draft' | 'archived';

export function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = (searchParams.get('filter') as FilterType) || 'all';
  const { user: currentUser } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>(filterParam);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setFilter(filterParam);
  }, [filterParam]);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Current user:', currentUser); // Debug log
      const data = await projectService.getAll();
      console.log('Projects loaded:', data.length, data); // Debug log
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const applyFilters = () => {
    let result = [...projects];

    // Filter by status
    if (filter === 'published') {
      result = result.filter((p) => p.status === 'PUBLISHED');
    } else if (filter === 'draft') {
      result = result.filter((p) => p.status === 'DRAFT');
    } else if (filter === 'archived') {
      result = result.filter((p) => p.status === 'ARCHIVED');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      console.log('Applying search filter:', query);
      console.log('Projects before search filter:', result.length);
      result = result.filter(
        (p) => {
          const titleMatch = p.title?.toLowerCase().includes(query);
          const descriptionMatch = p.description?.toLowerCase().includes(query);
          console.log(`Project "${p.title}": titleMatch=${titleMatch}, descriptionMatch=${descriptionMatch}`);
          return titleMatch || descriptionMatch;
        }
      );
      console.log('Projects after search filter:', result.length);
    }

    setFilteredProjects(result);
  };

  useEffect(() => {
    console.log('useEffect triggered - projects:', projects.length, 'filter:', filter, 'searchQuery:', searchQuery);
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, filter, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery, itemsPerPage]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: newFilter });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${title}"?`)) return;

    try {
      await projectService.delete(id);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error al eliminar el proyecto');
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      await projectService.toggleFeatured(project.id);
      await loadProjects();
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('Error al cambiar el estado destacado');
    }
  };

  const handleClone = async (id: string) => {
    try {
      await projectService.cloneProject(id);
      await loadProjects();
    } catch (error) {
      console.error('Error cloning project:', error);
      alert('Error al clonar el proyecto');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      PUBLISHED: 'bg-green-100 text-green-800',
      DRAFT: 'bg-yellow-100 text-yellow-800',
      ARCHIVED: 'bg-gray-100 text-gray-800',
    };
    const labels = {
      PUBLISHED: 'Publicado',
      DRAFT: 'Borrador',
      ARCHIVED: 'Archivado',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div>
      <div>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
            <p className="text-gray-600 mt-2">
              Gestiona todos tus proyectos del portafolio
            </p>
          </div>
          <Link
            to="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus size={20} />
            Nuevo Proyecto
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchQuery}
                onChange={(e) => {
                  console.log('Search input changed:', e.target.value);
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'published', 'draft', 'archived'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f === 'all' && 'Todos'}
                {f === 'published' && 'Publicados'}
                {f === 'draft' && 'Borradores'}
                {f === 'archived' && 'Archivados'}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Table/List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-gray-500 mb-4">No se encontraron proyectos</p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus size={20} />
              Crear Primer Proyecto
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proyecto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propietario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tecnologías
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.thumbnail && (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{project.title}</p>
                            {project.featured && (
                              <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <div>
                          {project.user ? (
                            project.user.id === currentUser?.id ? (
                              <p className="text-sm font-medium text-primary">Yo</p>
                            ) : (
                              <>
                                <p className="text-sm font-medium text-gray-900">
                                  {project.user.firstName} {project.user.lastName}
                                </p>
                                {project.user.username && (
                                  <p className="text-xs text-gray-500">@{project.user.username}</p>
                                )}
                              </>
                            )
                          ) : (
                            <p className="text-sm text-gray-500">Usuario desconocido</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech.id}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {tech.name}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">{formatDate(project.createdAt)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Featured */}
                        <button
                          onClick={() => handleToggleFeatured(project)}
                          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                            project.featured ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                          title={project.featured ? 'Quitar de destacados' : 'Marcar como destacado'}
                        >
                          <Star size={18} className={project.featured ? 'fill-yellow-500' : ''} />
                        </button>

                        {/* View */}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            title="Ver proyecto"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}

                        {/* Clone */}
                        <button
                          onClick={() => handleClone(project.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Clonar proyecto"
                        >
                          <Copy size={18} />
                        </button>

                        {/* Edit */}
                        <Link
                          to={`/admin/projects/edit/${project.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && filteredProjects.length > 0 && (
          <div className="mt-6 flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} de {filteredProjects.length} proyectos
              </span>
              <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
                  Por página:
                </label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Página anterior"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Página siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        {!loading && projects.length > 0 && (
          <div className="mt-6 flex gap-4 text-sm text-gray-600">
            <span>Total: {projects.length} proyectos</span>
            <span>•</span>
            <span>Publicados: {projects.filter((p) => p.status === 'PUBLISHED').length}</span>
            <span>•</span>
            <span>Borradores: {projects.filter((p) => p.status === 'DRAFT').length}</span>
            <span>•</span>
            <span>Archivados: {projects.filter((p) => p.status === 'ARCHIVED').length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
