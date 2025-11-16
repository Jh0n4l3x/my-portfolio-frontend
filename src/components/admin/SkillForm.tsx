import React, { useState } from 'react';
import type { Skill } from '../../types';

interface SkillFormProps {
  onSubmit: (data: {
    name: string;
    category: string;
    level: number;
    icon?: string;
  }) => void;
  initialData?: Skill;
  onCancel?: () => void;
  isLoading?: boolean;
}

const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile',
  'Design',
  'Tools',
  'Other',
];

export const SkillForm: React.FC<SkillFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Frontend',
    level: initialData?.level || 1,
    icon: initialData?.icon || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la Habilidad *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
          disabled={isLoading}
          placeholder="ej: React, Node.js, MongoDB"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría *
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          required
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        >
          {SKILL_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
          Nivel de Dominio: {formData.level}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">1</span>
          <input
            type="range"
            id="level"
            min="1"
            max="5"
            value={formData.level}
            onChange={(e) => handleChange('level', parseInt(e.target.value))}
            disabled={isLoading}
            className="flex-1"
          />
          <span className="text-xs text-gray-500">5</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Básico</span>
          <span>Intermedio</span>
          <span>Avanzado</span>
          <span>Experto</span>
        </div>
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
              <img src={formData.icon} alt="Icon" className="w-6 h-6" />
            ) : (
              <span className="text-2xl">{formData.icon}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Habilidad'}
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
