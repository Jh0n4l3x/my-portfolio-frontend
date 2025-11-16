import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { usePortfolio } from '@hooks/usePortfolio';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';

export function ProjectDetail() {
  const { username, id } = useParams<{ username: string; id: string }>();
  const navigate = useNavigate();
  const { data: portfolio, isLoading, error } = usePortfolio(username);

  const project = portfolio?.projects.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio || !project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="container-custom py-12">
      <button
        onClick={() => navigate(`/${username}/projects`)}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Volver a proyectos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
            />
          )}

          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>
                {new Date(project.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            
            {project.featured && (
              <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                Destacado
              </span>
            )}
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {project.content && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Detalles</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.content}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Información</h3>

            <div className="space-y-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <Github size={20} />
                  <span>Ver código fuente</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Ver demo en vivo</span>
                </a>
              )}
            </div>

            <hr className="my-6" />

            <div>
              <h4 className="font-semibold mb-3">Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      backgroundColor: tech.technology.color || tech.color || '#3B82F6',
                    }}
                  >
                    {tech.technology.name}
                  </span>
                ))}
              </div>
            </div>

            <hr className="my-6" />

            <div>
              <h4 className="font-semibold mb-2">Estado</h4>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  project.status === 'PUBLISHED'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'DRAFT'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {project.status === 'PUBLISHED'
                  ? 'Publicado'
                  : project.status === 'DRAFT'
                  ? 'Borrador'
                  : 'Archivado'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
