import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contactService, { ContactMessage, ContactStats } from '../services/contact.service';
import { useAuth } from '../hooks/useAuth';

export function MyMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
    loadStats();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await contactService.getMyMessages();
      setMessages(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los mensajes');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await contactService.getMyStats();
      setStats(data);
    } catch (err: any) {
      console.error('Error al cargar estadísticas:', err);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await contactService.markMyMessageAsRead(id);
      await loadMessages();
      await loadStats();
      if (selectedMessage?.id === id) {
        setSelectedMessage(prev => prev ? { ...prev, read: true } : null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al marcar como leído');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tus mensajes.</p>
          <Link
            to="/login"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Mis Mensajes de Contacto</h1>
        <p className="text-gray-600">
          Aquí puedes ver todos los mensajes que te han enviado a través de tu página de contacto.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">✗ {error}</p>
        </div>
      )}

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Mensajes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">No Leídos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Leídos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.read}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de mensajes */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Mensajes</h2>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <p>Cargando mensajes...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No tienes mensajes</p>
              </div>
            ) : (
              messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-primary-50' : ''
                  } ${!message.read ? 'border-l-4 border-l-primary-600' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium truncate">{message.name}</p>
                    <div className="flex items-center space-x-2">
                      {!message.read && (
                        <span className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">{message.subject}</p>
                  <p className="text-xs text-gray-500">{formatDate(message.createdAt)}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detalle del mensaje */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>De: {selectedMessage.name}</span>
                    <span>•</span>
                    <span>{selectedMessage.email}</span>
                    <span>•</span>
                    <span>{formatDate(selectedMessage.createdAt)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!selectedMessage.read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Marcar como leído"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="flex space-x-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Responder por Email
                </a>
                {selectedMessage.read && (
                  <span className="px-6 py-3 bg-green-100 text-green-800 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Leído
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium mb-2">Selecciona un mensaje</p>
                <p className="text-sm">Elige un mensaje de la lista para ver su contenido</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}