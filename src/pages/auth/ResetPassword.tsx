import { WorkInProgress } from '@components/ui/WorkInProgress';

export function ResetPassword() {
  return (
    <WorkInProgress
      title='Restablecer Contraseña'
      message='Esta funcionalidad está en desarrollo. Estamos implementando un sistema robusto y seguro para el restablecimiento de contraseñas.'
      showBackButton={true}
      backTo='/login'
      backLabel='Volver al inicio de sesión'
    />
  );
}
