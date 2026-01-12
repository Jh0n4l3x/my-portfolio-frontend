import { Link, useParams } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';import { GlobalSearch } from '@/components/ui/GlobalSearch';

export function Header() {
  const { username } = useParams<{ username: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mostrar navegación básica cuando no hay username (páginas generales)
  const navigation = username
    ? [
        { name: 'Home', href: `/${username}` },
        { name: 'Projects', href: `/${username}/projects` },
        { name: 'Blog', href: `/${username}/blog` },
        { name: 'Contact', href: `/${username}/contact` },
      ]
    : [
        { name: 'Contact', href: '/contact' },
      ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center gap-4">
          <Link to={username ? `/${username}` : '/'} className="text-2xl font-bold text-primary-600">
            {username ? `@${username}` : 'Portfolio'}
          </Link>

          {/* Búsqueda Global - Desktop */}
          <div className="hidden md:block flex-1 max-w-md">
            {username && <GlobalSearch username={username} />}
          </div>

          {navigation.length > 0 && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && navigation.length > 0 && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {/* Búsqueda Global - Mobile */}
            <div className="mb-4">
              {username && <GlobalSearch username={username} />}
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
