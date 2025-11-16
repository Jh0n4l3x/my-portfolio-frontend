import { useState } from 'react';
import { authService } from '../../services/auth.service';

interface TwoFactorAuthProps {
  isEnabled?: boolean;
  onSuccess?: () => void;
}

export function TwoFactorAuth({ isEnabled = false, onSuccess }: TwoFactorAuthProps) {
  const [step, setStep] = useState<'idle' | 'verify'>('idle');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEnable2FA = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.enable2FA();
      setStep('verify');
      setSuccess(response.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al habilitar 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verify2FA(code);
      setSuccess(response.message);
      setStep('idle');
      setCode('');
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Código inválido');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!confirm('¿Estás seguro de que deseas deshabilitar 2FA?')) return;

    setLoading(true);
    setError(null);
    try {
      const response = await authService.disable2FA();
      setSuccess(response.message);
      setStep('idle');
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al deshabilitar 2FA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Autenticación de Dos Factores (2FA)</h2>
      <p className="text-gray-600 mb-6">
        Agrega una capa extra de seguridad a tu cuenta requiriendo un código de verificación
        además de tu contraseña.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {step === 'idle' && (
        <div className="space-y-4">
          {isEnabled ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-green-800">2FA Habilitado</p>
                  <p className="text-sm text-green-600">Tu cuenta está protegida con autenticación de dos factores</p>
                </div>
              </div>
              <button
                onClick={handleDisable2FA}
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Deshabilitar 2FA'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleEnable2FA}
              disabled={loading}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Habilitar 2FA'}
            </button>
          )}
        </div>
      )}

      {step === 'verify' && (
        <form onSubmit={handleVerify2FA} className="space-y-4">
          <div>
            <p className="text-gray-600 mb-4">
              Se ha enviado un código de 6 dígitos a tu correo electrónico. 
              Revisa tu bandeja de entrada y spam.
            </p>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2">
              Código de Verificación (6 dígitos):
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              pattern="[0-9]{6}"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="123456"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Verificar y Activar'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('idle');
                setCode('');
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
