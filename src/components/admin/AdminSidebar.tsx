import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  TrendingUp,
  Code,
  Users,
  FolderOpen,
  FolderEdit,
  Archive,
  PlusCircle,
  Tag,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import { useState, useEffect } from 'react';
import { profileService } from '@services/profile.service';
import type { Profile } from '../../types';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  children?: NavItem[];
}

export function AdminSidebar() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'ADMIN';
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: `/admin/${user?.username}`,
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Proyectos',
      path: '/admin/projects',
      icon: <Briefcase size={20} />,
      children: [
        { name: 'Todos', path: '/admin/projects', icon: <FolderOpen size={18} /> },
        { name: 'Publicados', path: '/admin/projects?filter=published', icon: <FolderOpen size={18} /> },
        { name: 'Borradores', path: '/admin/projects?filter=draft', icon: <FolderEdit size={18} /> },
        { name: 'Archivados', path: '/admin/projects?filter=archived', icon: <Archive size={18} /> },
        { name: 'Nuevo Proyecto', path: '/admin/projects/new', icon: <PlusCircle size={18} /> },
      ],
    },
    {
      name: 'Blog',
      path: '/admin/blog',
      icon: <FileText size={20} />,
      children: [
        { name: 'Posts', path: '/admin/blog', icon: <FileText size={18} /> },
        { name: 'Tags', path: '/admin/tags', icon: <Tag size={18} /> },
        { name: 'Nuevo Post', path: '/admin/blog/new', icon: <PlusCircle size={18} /> },
      ],
    },
    {
      name: 'Mi Perfil',
      path: '/admin/profile',
      icon: <User size={20} />,
    },
    {
      name: 'Mensajes',
      path: '/admin/messages',
      icon: <MessageSquare size={20} />,
    },
    {
      name: 'Skills',
      path: '/admin/skills',
      icon: <TrendingUp size={20} />,
    },
  ];

  // Agregar sección de tecnologías y administración solo para admins
  if (isAdmin) {
    navItems.push({
      name: 'Tecnologías',
      path: '/admin/technologies',
      icon: <Code size={20} />,
    });
    navItems.push({
      name: 'Usuarios',
      path: '/admin/users',
      icon: <Users size={20} />,
    });
  }

  // Agregar configuración de seguridad al final para todos los usuarios
  navItems.push({
    name: 'Configuración',
    path: '/admin/security',
    icon: <Shield size={20} />,
  });

  const isActive = (path: string) => {
    // Eliminar query params para comparación
    const currentPath = location.pathname;
    const targetPath = path.split('?')[0];
    
    if (targetPath === `/admin/${user?.username}`) {
      return currentPath === targetPath;
    }
    
    return currentPath.startsWith(targetPath);
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <Link to={`/${user?.username}`} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={user?.firstName || user?.username || 'User'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-white font-bold text-xl">
                {user?.firstName?.[0] || user?.username?.[0] || 'P'}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-bold text-gray-900">My Portfolio</h2>
            <p className="text-xs text-gray-500">Panel Admin</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              {/* Parent Item */}
              <Link
                to={item.path.split('?')[0]}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
                {item.badge !== undefined && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>

              {/* Children Items */}
              {item.children && (
                <ul className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          location.pathname + location.search === child.path ||
                          (location.pathname === child.path.split('?')[0] && !location.search && !child.path.includes('?'))
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {child.icon}
                        <span>{child.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={user?.firstName || user?.username || 'User'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-gray-600 font-semibold">
                {user?.firstName?.[0] || user?.username?.[0] || 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName || user?.username}
            </p>
            <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
