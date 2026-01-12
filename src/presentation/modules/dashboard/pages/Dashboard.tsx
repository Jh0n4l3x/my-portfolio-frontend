import { Users, FileText, Briefcase, Code, Tag, TrendingUp } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import adminDashboardService, {
  DashboardStats,
  RecentUser,
  RecentProject,
  TopTechnology,
} from '@services/admin-dashboard.service';
import { userDashboardService, UserStats, UserRecentProject } from '@services/user-dashboard.service';
import { useAuthStore } from '@store/authStore';

export function Dashboard() {
  const { username } = useParams();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  const [adminStats, setAdminStats] = useState<DashboardStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [userRecentProjects, setUserRecentProjects] = useState<UserRecentProject[]>([]);
  const [topTechs, setTopTechs] = useState<TopTechnology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        if (isAdmin) {
          // Cargar datos de admin
          const [statsData, usersData, projectsData, techsData] = await Promise.all([
            adminDashboardService.getDashboardStats(),
            adminDashboardService.getRecentUsers(5),
            adminDashboardService.getRecentProjects(5),
            adminDashboardService.getTopTechnologies(5),
          ]);

          setAdminStats(statsData);
          setRecentUsers(usersData);
          setRecentProjects(projectsData);
          setTopTechs(techsData);
        } else {
          // Cargar datos del usuario actual
          const [statsData, projectsData] = await Promise.all([
            userDashboardService.getMyStats(),
            userDashboardService.getMyRecentProjects(5),
          ]);

          setUserStats(statsData);
          setUserRecentProjects(projectsData);
        }
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user, isAdmin]);

  // Si el username en la URL no coincide con el del usuario actual y no es admin, redirigir
  if (username && user && username !== user.username && !isAdmin) {
    return <Navigate to={`/admin/${user.username}`} replace />;
  }

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Estadísticas y gestión del sistema</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {isAdmin ? (
                <>
                  {/* Admin Stats */}
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="text-blue-500" size={24} />
                      <span className="text-xs text-gray-500">USUARIOS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{adminStats?.users.total || 0}</p>
                    <p className="text-sm text-green-600 mt-1">
                      {adminStats?.users.active || 0} activos
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <div className="flex items-center justify-between mb-2">
                      <Briefcase className="text-purple-500" size={24} />
                      <span className="text-xs text-gray-500">PROYECTOS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{adminStats?.projects.total || 0}</p>
                    <p className="text-sm text-green-600 mt-1">
                      {adminStats?.projects.published || 0} publicados
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="text-green-500" size={24} />
                      <span className="text-xs text-gray-500">POSTS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{adminStats?.posts.total || 0}</p>
                    <p className="text-sm text-green-600 mt-1">
                      {adminStats?.posts.published || 0} publicados
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="text-orange-500" size={24} />
                      <span className="text-xs text-gray-500">HABILIDADES</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{adminStats?.skills.total || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">registradas</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <Code className="text-red-500" size={24} />
                      <span className="text-xs text-gray-500">TECNOLOGÍAS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{adminStats?.technologies.total || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">en el sistema</p>
                  </div>
                </>
              ) : (
                <>
                  {/* User Stats */}
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <div className="flex items-center justify-between mb-2">
                      <Briefcase className="text-purple-500" size={24} />
                      <span className="text-xs text-gray-500">MIS PROYECTOS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{userStats?.totalProjects || 0}</p>
                    <p className="text-sm text-green-600 mt-1">
                      {userStats?.publishedProjects || 0} publicados
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <Code className="text-blue-500" size={24} />
                      <span className="text-xs text-gray-500">HABILIDADES</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{userStats?.totalSkills || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">en mi perfil</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <Tag className="text-green-500" size={24} />
                      <span className="text-xs text-gray-500">BORRADORES</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{userStats?.draftProjects || 0}</p>
                    <p className="text-sm text-yellow-600 mt-1">sin publicar</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="text-orange-500" size={24} />
                      <span className="text-xs text-gray-500">ARCHIVADOS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{userStats?.archivedProjects || 0}</p>
                    <p className="text-sm text-gray-600 mt-1">completados</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="text-red-500" size={24} />
                      <span className="text-xs text-gray-500">VISTAS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{userStats?.profileViews || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">al perfil</p>
                  </div>
                </>
              )}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {isAdmin ? (
                <>
                  {/* Recent Users (Admin) */}
                  <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Usuarios Recientes</h2>
                      <Link
                        to="/admin/users"
                        className="text-sm text-primary hover:underline"
                      >
                        Ver todos
                      </Link>
                    </div>
                    <div className="divide-y">
                      {recentUsers.length > 0 ? (
                        recentUsers.map((usr) => (
                          <div key={usr.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {usr.firstName} {usr.lastName}
                                </p>
                                <p className="text-sm text-gray-500">@{usr.username}</p>
                              </div>
                              <div className="text-right">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    usr.role === 'ADMIN'
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {usr.role}
                                </span>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatDate(usr.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          No hay usuarios recientes
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Projects (Admin) */}
                  <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Proyectos Recientes</h2>
                      <Link
                        to="/admin/projects"
                        className="text-sm text-primary hover:underline"
                      >
                        Ver todos
                      </Link>
                    </div>
                    <div className="divide-y">
                      {recentProjects.length > 0 ? (
                        recentProjects.map((proj) => (
                          <div key={proj.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{proj.title}</p>
                                <p className="text-sm text-gray-500 line-clamp-1">
                                  {proj.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {proj.user ? `Por @${proj.user.username}` : 'Usuario desconocido'}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    proj.status === 'PUBLISHED'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {proj.status}
                                </span>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatDate(proj.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          No hay proyectos recientes
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* My Recent Projects (User) */}
                  <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Mis Proyectos Recientes</h2>
                      <Link
                        to="/admin/projects"
                        className="text-sm text-primary hover:underline"
                      >
                        Ver todos
                      </Link>
                    </div>
                    <div className="divide-y">
                      {userRecentProjects.length > 0 ? (
                        userRecentProjects.map((proj) => (
                          <div key={proj.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{proj.title}</p>
                                <p className="text-sm text-gray-500">Estado: {proj.status}</p>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-xs text-gray-400">
                                  {formatDate(proj.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          No tienes proyectos recientes
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions (User) */}
                  <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-bold text-gray-900">Acciones Rápidas</h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <Link
                        to="/admin/projects/new"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Briefcase className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Crear Nuevo Proyecto</p>
                          <p className="text-sm text-gray-500">Agrega un proyecto a tu portafolio</p>
                        </div>
                      </Link>

                      <Link
                        to="/admin/profile"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Users className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Editar Mi Perfil</p>
                          <p className="text-sm text-gray-500">Actualiza tu información personal</p>
                        </div>
                      </Link>

                      <Link
                        to="/admin/skills"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Code className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Gestionar Habilidades</p>
                          <p className="text-sm text-gray-500">Agrega o edita tus skills</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Top Technologies (Admin Only) */}
            {isAdmin && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Tecnologías Más Usadas</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {topTechs.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <Tag size={32} style={{ color: tech.color }} />
                        <p className="mt-2 font-medium text-gray-900 text-center">
                          {tech.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {tech.projectCount} {tech.projectCount === 1 ? 'proyecto' : 'proyectos'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}