# Portfolio Frontend - React + TypeScript

Frontend moderno para portafolio profesional construido con React, TypeScript, y Vite.

## 🛠 Tech Stack

- **React 18** - Biblioteca de UI
- **TypeScript 5** - Tipado estático
- **Vite 5** - Build tool ultra-rápido
- **TailwindCSS 3** - Utility-first CSS
- **React Router v6** - Routing
- **Zustand** - State management
- **React Query** - Data fetching & caching
- **React Hook Form** - Formularios
- **Zod** - Validación de schemas
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes Reutilizables
│   ├── layout/         # Layout components (Header, Footer)
│   └── auth/           # Auth components (ProtectedRoute)
│
├── pages/              # Páginas/Rutas
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── auth/
│   │   └── Login.tsx
│   └── admin/
│       └── Dashboard.tsx
│
├── services/           # API Services
│   ├── api/
│   │   └── client.ts  # Axios instance configurado
│   ├── auth.service.ts
│   └── project.service.ts
│
├── store/             # Zustand stores
│   └── authStore.ts   # Auth state
│
├── hooks/             # Custom Hooks
│
├── types/             # TypeScript Types
│   └── index.ts       # Interfaces & Types
│
├── utils/             # Utilidades
│
├── App.tsx            # App principal con routes
├── main.tsx           # Entry point
└── index.css          # Tailwind imports
```

## 🎨 Características

### Rutas

- `/` - Home page
- `/projects` - Lista de proyectos
- `/projects/:id` - Detalle de proyecto
- `/about` - Sobre mí
- `/contact` - Contacto
- `/login` - Login de admin
- `/admin` - Dashboard admin (protegido)

### State Management

**Zustand** para estado global:
- Auth state (user, token, isAuthenticated)

**React Query** para server state:
- Caching automático
- Refetch strategies
- Loading & error states

### API Integration

Axios client configurado con:
- Base URL automática
- Interceptors para JWT
- Auto-logout en 401
- Error handling

```typescript
// Uso
import { projectService } from '@services/project.service';

const projects = await projectService.getAll();
```

### Protección de Rutas

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Forms

React Hook Form + Zod para validación:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## 🎨 Estilos

### Tailwind CSS

Configuración personalizada en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#3b82f6',
    50: '#eff6ff',
    // ... more shades
    900: '#1e3a8a',
  },
}
```

### Clases Personalizadas

```css
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

## 📝 Variables de Entorno

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🔧 Scripts

```bash
npm run dev         # Desarrollo
npm run build       # Build para producción
npm run preview     # Preview del build
npm run lint        # ESLint
npm run type-check  # TypeScript check
```

## 🧩 Componentes Principales

### Layout

```tsx
<Layout>
  <Header />
  <main>
    <Outlet /> {/* React Router */}
  </main>
  <Footer />
</Layout>
```

### Protected Route

```tsx
function ProtectedRoute({ children }) {
  const isAuth = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

## 🎯 TypeScript

Configuración estricta:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

Path aliases configurados:

```typescript
import { Layout } from '@components/layout/Layout';
import { authService } from '@services/auth.service';
import type { User } from '@types/index';
```

## 📦 Build

```bash
# Build optimizado
npm run build

# Salida en /dist
# Listo para servir con Nginx, Vercel, etc.
```

Optimizaciones automáticas de Vite:
- Code splitting
- Tree shaking
- Asset optimization
- CSS minification

## 🐳 Docker

```bash
# Build imagen
docker build -t portfolio-frontend .

# Run contenedor
docker run -p 5173:5173 portfolio-frontend
```

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Nginx
```nginx
server {
    listen 80;
    root /var/www/html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📱 Responsive Design

Mobile-first approach con Tailwind:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

## 🎨 Icons

Lucide React para iconos:

```tsx
import { Menu, X, Github, Linkedin } from 'lucide-react';

<Menu size={24} />
```

## 📧 Notificaciones

Sonner para toast messages:

```tsx
import { toast } from 'sonner';

toast.success('¡Operación exitosa!');
toast.error('Error al procesar');
```

## 🤝 Contribuir

Sigue los estándares:
- ESLint rules
- Prettier formatting
- TypeScript types
- Component documentation

---

**Desarrollado con React + TypeScript** ⚛️
