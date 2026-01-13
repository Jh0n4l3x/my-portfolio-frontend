import { WorkInProgress } from "@/presentation/components/feedback/WorkInProgress";


export function ForgotPassword() {
  return (
    <WorkInProgress
      title="Recuperación de Contraseña"
      message="Esta funcionalidad está en desarrollo. Estamos mejorando el proceso de recuperación de contraseña para hacerlo más seguro y eficiente."
      showBackButton={true}
      backTo="/login"
      backLabel="Volver al inicio de sesión"
    />
  );
}

/*
============================================================
CÓDIGO ORIGINAL - COMENTADO TEMPORALMENTE 
HASTA QUE SE COMPLETE EL DESARROLLO DEL BACKEND
============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Phone, Loader2 } from 'lucide-react';
import { useForgotPassword } from '@hooks/useAuth';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'request' | 'sent'>('request');
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'whatsapp'>('email');

  const forgotPasswordMutation = useForgotPassword();

  // Handle initial email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPasswordMutation.mutateAsync({
        email,
        method: 'email',
      });
      setSelectedMethod('email');
      setStep('sent');
    } catch (error) {
      // Error handled by hook
    }
  };

  // Handle alternative method (WhatsApp)
  const handleWhatsAppMethod = async () => {
    try {
      await forgotPasswordMutation.mutateAsync({
        email,
        method: 'whatsapp',
      });
      setSelectedMethod('whatsapp');
    } catch (error) {
      // Error handled by hook
    }
  };

  // Success screen after code is sent
  if (step === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              {selectedMethod === 'email' ? (
                <Mail className="h-8 w-8 text-green-600" />
              ) : (
                <Phone className="h-8 w-8 text-green-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Código Enviado
            </h2>
            <p className="text-gray-600 mb-4">
              Hemos enviado un código de verificación de 6 dígitos a tu{' '}
              <span className="font-semibold">
                {selectedMethod === 'email' ? 'correo electrónico' : 'WhatsApp'}
              </span>
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-6">
              <p className="text-sm text-gray-700 font-medium">
                {selectedMethod === 'email' ? email : 'número registrado'}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                El código expirará en <strong>10 minutos</strong>
              </p>
            </div>
          </div>

          <Link
            to="/reset-password"
            state={{ email, method: selectedMethod }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Ingresar Código
          </Link>

          {selectedMethod === 'email' && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o enviar por</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppMethod}
                disabled={forgotPasswordMutation.isPending}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border-2 border-green-500 rounded-lg shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Phone size={20} />
                    Enviar por WhatsApp
                  </>
                )}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              setStep('request');
              setSelectedMethod('email');
            }}
            className="w-full text-center text-sm text-gray-600 hover:text-gray-900 pt-2"
          >
            ← Volver a ingresar correo
          </button>
        </div>
      </div>
    );
  }

  // Initial form to enter email
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/login" className="flex items-center gap-2 text-primary hover:text-primary-600 mb-6">
            <ArrowLeft size={20} />
            Volver al inicio de sesión
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="tu@email.com"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Enviaremos un código de verificación a este correo
              </p>
            </div>

            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {forgotPasswordMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Enviando código...
                </>
              ) : (
                <>
                  <Mail size={20} />
                  Enviar código por email
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-600">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

*/
