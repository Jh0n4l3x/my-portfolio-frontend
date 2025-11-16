import React from 'react';
import type { TechnologyWithStats } from '../../types';

interface TechnologyListProps {
  technologies: TechnologyWithStats[];
  onEdit: (tech: TechnologyWithStats) => void;
  onDelete: (techId: string) => void;
  isLoading?: boolean;
}

export const TechnologyList: React.FC<TechnologyListProps> = ({
  technologies,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const groupedTechs = technologies.reduce((acc, tech) => {
    const category = tech.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, TechnologyWithStats[]>);

  const handleDelete = (tech: TechnologyWithStats) => {
    if (confirm(`¿Estás seguro de eliminar "${tech.name}"?`)) {
      onDelete(tech.id);
    }
  };

  if (technologies.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tecnologías</h3>
        <p className="mt-1 text-sm text-gray-500">Comienza agregando la primera tecnología.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTechs).map(([category, techs]) => (
        <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {category}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({techs.length})
              </span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {techs
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tech) => (
                <div
                  key={tech.id}
                  className={`
                    border border-gray-200 rounded-lg p-4 hover:shadow-md transition
                    ${isLoading ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      {tech.icon && (
                        <div className="flex-shrink-0">
                          {tech.icon.startsWith('http') ? (
                            <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
                          ) : (
                            <span className="text-3xl">{tech.icon}</span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 truncate">
                          {tech.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Usado en {tech.projectCount} proyecto{tech.projectCount !== 1 ? 's' : ''}
                        </p>
                        {tech.color && (
                          <div
                            className="mt-1 inline-block px-2 py-0.5 text-xs font-medium text-white rounded"
                            style={{ backgroundColor: tech.color }}
                          >
                            {tech.color}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => onEdit(tech)}
                        disabled={isLoading}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition disabled:opacity-50"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(tech)}
                        disabled={isLoading}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
