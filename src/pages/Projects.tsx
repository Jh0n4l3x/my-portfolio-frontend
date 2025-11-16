import { usePortfolio } from '@hooks/usePortfolio';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ExternalLink, Github, Calendar } from 'lucide-react';

export function Projects() {
  const { username } = useParams();
  const { data: portfolio, isLoading, error } = usePortfolio(username);

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return <Navigate to="/404" replace />;
  }

  const projects = portfolio.projects;
  const displayName = `${portfolio.firstName || ''} ${portfolio.lastName || ''}`.trim() || portfolio.username;

  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Proyectos de {displayName}</h1>
        <p className="text-lg text-gray-600">
          Explora los proyectos en los que ha trabajado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <Link
            key={project.id}
            to={`/${username}/projects/${project.id}`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {project.thumbnail && (
              <div className="h-48 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <span
                    key={tech.id}
                    className="px-2 py-1 text-sm rounded font-medium text-white"
                    style={{
                      backgroundColor: tech.technology.color || tech.color || '#3B82F6',
                    }}
                  >
                    {tech.technology.name}
                  </span>
                ))}
                {project.technologies && project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <Github size={18} className="hover:text-primary transition-colors" />
                  )}
                  {project.liveUrl && (
                    <ExternalLink size={18} className="hover:text-primary transition-colors" />
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {projects && projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No hay proyectos disponibles</p>
        </div>
      )}
    </div>
  );
}
