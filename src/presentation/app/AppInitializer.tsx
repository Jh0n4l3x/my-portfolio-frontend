import { useAuthStore } from '@/shared/store';
import { useEffect } from 'react';

export function AppInitializer() {
  const {setAuth} =  useAuthStore((state) => state.setAuth);

  useEffect(() => {
  }, []);
  
  return null;
}
