import { usePortfolio } from '@hooks/usePortfolio';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Globe } from 'lucide-react';

export function Home() {
  const { username } = useParams();
  const { data: portfolio, isLoading, error } = usePortfolio(username);

  if (isLoading) {
    return (
      <div className="container-custom py-20">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando portafolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return <Navigate to="/404" replace />;
  }

  const profile = portfolio.profile;
  const displayName = `${portfolio.firstName || ''} ${portfolio.lastName || ''}`.trim() || portfolio.username;
  const featuredProjects = portfolio.projects.filter((p: { featured: boolean }) => p.featured);

  return (
    <div>
      <section className="container-custom py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Avatar */}
          {profile?.avatar && (
            <div className="mb-8 flex justify-center">
              <img
                src={profile.avatar}
                alt={displayName}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Hola, soy <span className="text-primary">{displayName}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {profile?.title || 'Desarrollador Full Stack'}
          </p>
          {profile?.location && <p className="text-gray-500 mb-8">📍 {profile.location}</p>}
          {profile?.bio && <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">{profile.bio}</p>}
          
          <Link
            to={`/${username}/projects`}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
          >
            Ver Proyectos
            <ArrowRight size={20} />
          </Link>

          <div className="flex gap-6 justify-center mt-8">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Github size={24} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                <Globe size={24} />
              </a>
            )}
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyectos Destacados</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Mis proyectos más recientes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 3).map((project: { id: string; thumbnail?: string; title: string; description: string }) => (
                <Link key={project.id} to={`/${username}/projects/${project.id}`} className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {project.thumbnail ? (
                    <div className="h-48 overflow-hidden">
                      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            {portfolio.projects.length > 3 && (
              <div className="text-center mt-12">
                <Link
                  to={`/${username}/projects`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Ver todos los proyectos
                  <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {profile?.skills && profile.skills.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Habilidades</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Tecnologías con las que trabajo</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {profile.skills.map((skill: { id: string; name: string; category: string; level: number }) => (
                <div key={skill.id} className="bg-white border-2 border-gray-100 rounded-lg p-6 text-center hover:border-primary hover:shadow-md transition-all">
                  <p className="font-semibold mb-2">{skill.name}</p>
                  <p className="text-sm text-gray-500">{skill.category}</p>
                  <div className="mt-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < skill.level ? 'bg-primary' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}