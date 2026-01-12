import { AppProviders } from './AppProviders';
import { AppRouter } from './AppRouter';
import { AppInitializer } from './AppInitializer'; // opcional, para cargar estado desde backend

export function App() {
  return (
    <AppProviders>
      <AppInitializer />  
      <AppRouter />
    </AppProviders>
  );
}
