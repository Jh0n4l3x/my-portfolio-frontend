import React, { useState } from 'react';
import type { Technology } from '../../types';

interface TechnologyFormProps {
  onSubmit: (data: {
    name: string;
    category?: string;
    icon?: string;
    color?: string;
  }) => void;
  initialData?: Technology;
  onCancel?: () => void;
  isLoading?: boolean;
}

const TECH_CATEGORIES = [
  'Frontend Framework',
  'Backend Framework',
  'Database',
  'Programming Language',
  'Cloud Service',
  'DevOps Tool',
  'Mobile',
  'Design Tool',
  'Testing',
  'Other',
];

const PRESET_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
];

export const TechnologyForm: React.FC<TechnologyFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    icon: initialData?.icon || '',
    color: initialData?.color || '#3B82F6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la Tecnología *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
          disabled={isLoading}
          placeholder="ej: React, TypeScript, Docker"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        >
          <option value="">Seleccionar categoría...</option>
          {TECH_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
          Icono (URL o emoji)
        </label>
        <input
          type="text"
          id="icon"
          value={formData.icon}
          onChange={(e) => handleChange('icon', e.target.value)}
          disabled={isLoading}
          placeholder="ej: 🚀 o https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
        {formData.icon && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <span>Vista previa:</span>
            {formData.icon.startsWith('http') ? (
              <img src={formData.icon} alt="Icon" className="w-8 h-8" />
            ) : (
              <span className="text-3xl">{formData.icon}</span>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <div className="flex gap-2 mb-2">
          {PRESET_COLORS.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => handleChange('color', color)}
              className={`w-8 h-8 rounded-full border-2 transition ${
                formData.color === color ? 'border-gray-900 scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <input
          type="color"
          id="color"
          value={formData.color}
          onChange={(e) => handleChange('color', e.target.value)}
          disabled={isLoading}
          className="w-full h-10 px-1 py-1 border border-gray-300 rounded-md disabled:bg-gray-100"
        />
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <span>Vista previa:</span>
          <div
            className="px-3 py-1 rounded text-white font-medium"
            style={{ backgroundColor: formData.color }}
          >
            {formData.name || 'Tecnología'}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Tecnología'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
