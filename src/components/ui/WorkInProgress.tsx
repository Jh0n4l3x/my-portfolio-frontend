import { Construction, Hammer, Wrench, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkInProgressProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  backTo?: string;
  backLabel?: string;
}

export function WorkInProgress({
  title = 'Página en Construcción',
  message = 'Estamos trabajando en esta funcionalidad. Pronto estará disponible.',
  showBackButton = true,
  backTo = '/',
  backLabel = 'Volver al inicio',
}: WorkInProgressProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Animated Construction Banner */}
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 h-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>

          <div className="p-8 sm:p-12">
            {/* Animated Icons */}
            <div className="relative h-32 mb-8">
              {/* Construction Cone Icon - Center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Construction
                    className="h-20 w-20 text-yellow-500 animate-bounce"
                    style={{ animationDuration: '2s' }}
                  />
                  <div className="absolute -top-1 -right-1">
                    <AlertTriangle className="h-6 w-6 text-orange-500 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Hammer Icon - Left */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <Hammer
                  className="h-12 w-12 text-gray-400 animate-swing"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>

              {/* Wrench Icon - Right */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <Wrench
                  className="h-12 w-12 text-gray-400 animate-swing"
                  style={{ animationDelay: '1s' }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {title}
              </h1>

              <div className="inline-block">
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border-2 border-yellow-300 rounded-full">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>
                    <span
                      className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                  <span className="text-sm font-semibold text-yellow-800">
                    En desarrollo
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                {message}
              </p>

              {/* Progress Bar */}
              <div className="pt-6 pb-2">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-progress"></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Trabajando en ello...
                </p>
              </div>

              {/* Estimated Time */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">⏰ Tiempo estimado:</span> Próximamente
                </p>
              </div>

              {/* Back Button */}
              {showBackButton && (
                <div className="pt-6">
                  <Link
                    to={backTo}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-105 shadow-lg"
                  >
                    {backLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Animated Bottom Banner */}
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 py-4 px-6">
            <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: '0.3s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: '0.6s' }}
                ></div>
              </div>
              <span>Nuestro equipo está trabajando para completar esta función</span>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InfoCard
            icon="🚀"
            title="Pronto"
            description="Funcionalidad en desarrollo"
          />
          <InfoCard
            icon="🔧"
            title="Mejorando"
            description="Optimizando experiencia"
          />
          <InfoCard
            icon="✨"
            title="Calidad"
            description="Garantizando excelencia"
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center transform transition-transform hover:scale-105">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}
