import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Illustration */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <Search className="w-32 h-32 text-gray-600 animate-bounce" />
            <div className="absolute inset-0 blur-2xl opacity-20 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
          
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </Link>
        </div>

        {/* Footer hint */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>¿Necesitas ayuda? Contáctanos o vuelve a la página principal.</p>
        </div>
      </div>
    </div>
  );
};
