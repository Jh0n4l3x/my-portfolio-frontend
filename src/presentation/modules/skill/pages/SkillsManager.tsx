import React, { useState, useEffect } from 'react';
import { skillService } from '@services/skill.service';
import { profileService } from '@services/profile.service';
import { SkillForm } from '@components/admin/SkillForm';
import { SkillsList } from '@components/admin/SkillsList';
import { Skill } from '@/shared/types';

export const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let profile;
      try {
        // Intentar obtener el perfil existente
        profile = await profileService.getMyProfile();
      } catch (err) {
        // Si el perfil no existe (404), crearlo automáticamente
        const error = err as { response?: { status: number } };
        if (error.response?.status === 404) {
          console.log('Profile not found, creating one...');
          profile = await profileService.create({
            bio: 'Mi biografía',
            title: 'Desarrollador',
          });
        } else {
          throw err;
        }
      }
      
      setProfileId(profile.id);
      setSkills(profile.skills || []);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Error al cargar el perfil. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: {
    name: string;
    category: string;
    level: number;
    icon?: string;
  }) => {
    if (!profileId) return;

    try {
      setIsSaving(true);
      setError(null);
      await skillService.create({ ...data, profileId });
      await loadProfile();
      setShowForm(false);
    } catch (err) {
      console.error('Error creating skill:', err);
      setError('Error al crear la habilidad');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (data: {
    name: string;
    category: string;
    level: number;
    icon?: string;
  }) => {
    if (!editingSkill) return;

    try {
      setIsSaving(true);
      setError(null);
      await skillService.update(editingSkill.id, data);
      await loadProfile();
      setEditingSkill(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error updating skill:', err);
      setError('Error al actualizar la habilidad');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (skillId: string) => {
    try {
      setIsSaving(true);
      setError(null);
      await skillService.delete(skillId);
      await loadProfile();
    } catch (err) {
      console.error('Error deleting skill:', err);
      setError('Error al eliminar la habilidad');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSkill(null);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Habilidades</h1>
            <p className="mt-1 text-sm text-gray-600">
              Administra tus habilidades técnicas y profesionales
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nueva Habilidad
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingSkill ? 'Editar Habilidad' : 'Nueva Habilidad'}
          </h2>
          <SkillForm
            onSubmit={editingSkill ? handleUpdate : handleCreate}
            initialData={editingSkill || undefined}
            onCancel={handleCancelForm}
            isLoading={isSaving}
          />
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Mis Habilidades
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({skills.length} total)
            </span>
          </h2>
        </div>
        <SkillsList
          skills={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
};
