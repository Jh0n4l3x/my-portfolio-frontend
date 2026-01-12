import { useAuthStore } from '@store/authStore';
import { useLogout } from '@hooks/useAuth';
import { LogOut, Bell, Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { profileService } from '@services/profile.service';
import { Profile } from '@/shared/types';


export function AdminHeader() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar proyectos, posts, tecnologías..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* View Public Profile */}
          <Link
            to={`/${user?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Ver perfil público"
          >
            <ExternalLink size={18} />
            <span className="text-sm font-medium hidden md:inline">Ver Portfolio</span>
          </Link>

          {/* Notifications */}
          <button
            className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Notificaciones"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu with Logout */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            {/* Avatar */}
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
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName || user?.email}
              </p>
              <p className="text-xs text-gray-500">
                @{user?.username} · {user?.role}
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium hidden md:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
