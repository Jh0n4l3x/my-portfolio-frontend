import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, UserCircle, Check, X, ArrowLeft } from 'lucide-react';
import { useInitiateRegistration, useCompleteRegistration } from '@hooks/useAuth';
import { useCheckUsername, useCheckEmail, useCheckPhone } from '@hooks/usePortfolio';
import { PhoneInput } from '@components/ui/PhoneInput';

export function Register() {
  const [step, setStep] = useState<'form' | 'verification'>('form');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    firstName: '',
    lastName: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const initiateRegistrationMutation = useInitiateRegistration();
  const completeRegistrationMutation = useCompleteRegistration();

  useEffect(() => {
    if (initiateRegistrationMutation.isSuccess) {
      setStep('verification');
    }
  }, [initiateRegistrationMutation.isSuccess]);
  
  const { data: usernameCheck, isLoading: checkingUsername } = useCheckUsername(
    formData.username,
    formData.username.length >= 3
  );

  const { data: emailCheck, isLoading: checkingEmail } = useCheckEmail(
    formData.email,
    formData.email.length > 0 && formData.email.includes('@')
  );

  const { data: phoneCheck, isLoading: checkingPhone } = useCheckPhone(
    formData.phone,
    formData.phone.length >= 10
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usernameValidation.valid) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (!isPasswordValid) {
      return;
    }

    if (!usernameCheck?.available || !emailCheck?.available) {
      return;
    }

    if (formData.phone && !phoneCheck?.available) {
      return;
    }

    initiateRegistrationMutation.mutate({
      email: formData.email,
      username: formData.username,
      password: formData.password,
      phone: formData.phone || undefined,
      firstName: formData.firstName || undefined,
      lastName: formData.lastName || undefined,
    });
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      return;
    }

    completeRegistrationMutation.mutate({
      email: formData.email,
      verificationCode: verificationCode.trim(),
    });
  };

  const handleBackToForm = () => {
    setStep('form');
    setVerificationCode('');
  };

  const getUsernameStatus = () => {
    if (formData.username.length < 3) return null;
    if (checkingUsername) return 'checking';
    return usernameCheck?.available ? 'available' : 'taken';
  };

  const getEmailStatus = () => {
    if (!formData.email.includes('@')) return null;
    if (checkingEmail) return 'checking';
    return emailCheck?.available ? 'available' : 'taken';
  };

  const getPhoneStatus = () => {
    if (formData.phone.length < 10) return null;
    if (checkingPhone) return 'checking';
    return phoneCheck?.available ? 'available' : 'taken';
  };

  // Validación de contraseña
  const validatePassword = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    };
  };

  // Validación de username
  const validateUsername = (username: string) => {
    if (username.length < 3) return { valid: false, message: '' };
    if (username.startsWith('-') || username.endsWith('-')) {
      return { valid: false, message: 'El username no puede comenzar ni terminar con guión' };
    }
    return { valid: true, message: '' };
  };

  const passwordValidation = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const usernameValidation = validateUsername(formData.username);

  const usernameStatus = getUsernameStatus();
  const emailStatus = getEmailStatus();
  const phoneStatus = getPhoneStatus();
  const passwordMatch = !formData.confirmPassword || formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 'form' ? 'Crea tu portafolio' : 'Verifica tu email'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'form' 
              ? 'Registra tu cuenta y comparte tus proyectos con el mundo'
              : `Hemos enviado un código de verificación a ${formData.email}`
            }
          </p>
        </div>

        {step === 'form' ? (
          <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 pr-10 border ${
                    emailStatus === 'available' ? 'border-green-500' :
                    emailStatus === 'taken' ? 'border-red-500' :
                    'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {emailStatus && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {emailStatus === 'checking' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
                    )}
                    {emailStatus === 'available' && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    {emailStatus === 'taken' && (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {emailStatus === 'taken' && (
                <p className="mt-1 text-sm text-red-600">Este email ya está registrado</p>
              )}
              {emailStatus === 'available' && (
                <p className="mt-1 text-sm text-green-600">Email disponible</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  pattern="[a-zA-Z0-9_-]+"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 pr-10 border ${
                    usernameStatus === 'available' ? 'border-green-500' :
                    usernameStatus === 'taken' ? 'border-red-500' :
                    'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                  placeholder="username"
                  value={formData.username}
                  onChange={(e) => {
                    // Convertir a minúsculas, reemplazar espacios con guiones, eliminar caracteres especiales
                    const sanitized = e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, '-') // Espacios a guiones
                      .replace(/[^a-z0-9_-]/g, ''); // Solo letras, números, guiones y guión bajo
                    setFormData({ ...formData, username: sanitized });
                  }}
                />
                {usernameStatus && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {usernameStatus === 'checking' && (
                      <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                    )}
                    {usernameStatus === 'available' && <Check className="h-5 w-5 text-green-500" />}
                    {usernameStatus === 'taken' && <X className="h-5 w-5 text-red-500" />}
                  </div>
                )}
              </div>
              {!usernameValidation.valid && usernameValidation.message && (
                <p className="mt-1 text-sm text-red-600">{usernameValidation.message}</p>
              )}
              {formData.username.length >= 3 && usernameValidation.valid && (
                <p className={`mt-1 text-xs ${
                  usernameStatus === 'available' ? 'text-green-600' :
                  usernameStatus === 'taken' ? 'text-red-600' :
                  'text-gray-500'
                }`}>
                  {usernameStatus === 'available' && `✓ Tu portafolio será: localhost:5173/${formData.username}`}
                  {usernameStatus === 'taken' && '✗ Este username ya está en uso'}
                  {usernameStatus === 'checking' && 'Verificando disponibilidad...'}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <PhoneInput
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                placeholder="3001234567"
                required={false}
              />
              {phoneStatus === 'taken' && (
                <p className="mt-1 text-sm text-red-600">Este número ya está registrado</p>
              )}
              {phoneStatus === 'available' && formData.phone.length >= 10 && (
                <p className="mt-1 text-sm text-green-600">Número disponible</p>
              )}
              {phoneStatus === 'checking' && (
                <p className="mt-1 text-sm text-gray-500">Verificando número...</p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre (opcional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido (opcional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Pérez"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border ${
                    formData.password && !isPasswordValid ? 'border-red-500' : 
                    formData.password && isPasswordValid ? 'border-green-500' : 
                    'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {/* Validación de requisitos de contraseña - solo visible cuando está enfocado */}
              {focusedField === 'password' && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-medium text-gray-700 mb-1">La contraseña debe contener:</p>
                  <div className="space-y-1">
                    <div className={`flex items-center gap-1 text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.minLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Mínimo 8 caracteres</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.hasUpperCase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Al menos una mayúscula (A-Z)</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.hasLowerCase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Al menos una minúscula (a-z)</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Al menos un número (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.hasSpecialChar ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Al menos un carácter especial (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 pr-10 border ${
                    !passwordMatch ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {formData.confirmPassword && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {passwordMatch ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {!passwordMatch && (
                <p className="mt-1 text-xs text-red-600">
                  Las contraseñas no coinciden
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={
                initiateRegistrationMutation.isPending || 
                !passwordMatch || 
                usernameStatus !== 'available' ||
                formData.username.length < 3
              }
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {initiateRegistrationMutation.isPending ? 'Enviando código...' : 'Enviar código de verificación'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
        ) : (
          <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleVerificationSubmit}>
            <div className="space-y-4">
              {/* Verification Code */}
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Código de verificación
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    required
                    maxLength={6}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm text-center text-2xl font-mono tracking-widest"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => {
                      // Solo permitir números
                      const value = e.target.value.replace(/\D/g, '');
                      setVerificationCode(value);
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Ingresa el código de 6 dígitos que enviamos a tu email
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={completeRegistrationMutation.isPending || verificationCode.length !== 6}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {completeRegistrationMutation.isPending ? 'Verificando...' : 'Verificar y crear cuenta'}
              </button>
            </div>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={handleBackToForm}
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center justify-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al formulario
              </button>
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
