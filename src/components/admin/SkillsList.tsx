import React, { useState } from 'react';
import type { Skill } from '../../types';
import { ConfirmDialog } from '@components/ui/ConfirmDialog';

interface SkillsListProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (skillId: string) => void;
  isLoading?: boolean;
}

const LEVEL_LABELS = ['', 'Básico', 'Principiante', 'Intermedio', 'Avanzado', 'Experto'];

export const SkillsList: React.FC<SkillsListProps> = ({
  skills,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const handleDeleteClick = (skill: Skill) => {
    setSkillToDelete(skill);
  };

  const handleConfirmDelete = async () => {
    if (skillToDelete) {
      setIsDeleting(true);
      try {
        await onDelete(skillToDelete.id);
        setSkillToDelete(null);
      } catch (error) {
        console.error('Error deleting skill:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setSkillToDelete(null);
  };

  if (skills.length === 0) {
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay habilidades</h3>
        <p className="mt-1 text-sm text-gray-500">Comienza agregando tu primera habilidad.</p>
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog
        isOpen={!!skillToDelete}
        title="Eliminar Habilidad"
        message={`¿Estás seguro de que deseas eliminar "${skillToDelete?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      <div className="space-y-6">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {category}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({categorySkills.length})
              </span>
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {categorySkills
              .sort((a, b) => b.level - a.level)
              .map((skill) => (
                <div
                  key={skill.id}
                  className={`p-4 hover:bg-gray-50 transition ${isLoading ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {skill.icon && (
                        <div className="flex-shrink-0">
                          {skill.icon.startsWith('http') ? (
                            <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                          ) : (
                            <span className="text-2xl">{skill.icon}</span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-gray-900">{skill.name}</h4>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`h-2 w-8 rounded ${
                                  level <= skill.level ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {LEVEL_LABELS[skill.level]}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onEdit(skill)}
                        disabled={isLoading}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition disabled:opacity-50"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(skill)}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition disabled:opacity-50"
                        title="Eliminar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </>
  );
};
