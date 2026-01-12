import React, { useState, useEffect } from 'react';
import { technologyService } from '@services/technology.service';
import { TechnologyForm } from '@components/admin/TechnologyForm';
import { TechnologyList } from '@components/admin/TechnologyList';
import { TechnologyWithStats } from '@/shared/types';

export const TechnologiesManager: React.FC = () => {
  const [technologies, setTechnologies] = useState<TechnologyWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState<TechnologyWithStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await technologyService.getAllWithStats();
      setTechnologies(data);
    } catch (err) {
      console.error('Error loading technologies:', err);
      setError('Error al cargar las tecnologías');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: {
    name: string;
    category?: string;
    icon?: string;
    color?: string;
  }) => {
    try {
      setIsSaving(true);
      setError(null);
      await technologyService.create(data);
      await loadTechnologies();
      setShowForm(false);
    } catch (err) {
      console.error('Error creating technology:', err);
      setError('Error al crear la tecnología');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (data: {
    name: string;
    category?: string;
    icon?: string;
    color?: string;
  }) => {
    if (!editingTech) return;

    try {
      setIsSaving(true);
      setError(null);
      await technologyService.update(editingTech.id, data);
      await loadTechnologies();
      setEditingTech(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error updating technology:', err);
      setError('Error al actualizar la tecnología');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (techId: string) => {
    try {
      setIsSaving(true);
      setError(null);
      await technologyService.delete(techId);
      await loadTechnologies();
    } catch (err) {
      console.error('Error deleting technology:', err);
      setError('Error al eliminar la tecnología');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (tech: TechnologyWithStats) => {
    setEditingTech(tech);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTech(null);
  };

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(technologies.map(tech => tech.category).filter(Boolean))).sort();

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Tecnologías</h1>
            <p className="mt-1 text-sm text-gray-600">
              Administra las tecnologías disponibles para tus proyectos
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2 justify-center md:justify-start"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nueva Tecnología
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
            {editingTech ? 'Editar Tecnología' : 'Nueva Tecnología'}
          </h2>
          <TechnologyForm
            onSubmit={editingTech ? handleUpdate : handleCreate}
            initialData={editingTech || undefined}
            onCancel={handleCancelForm}
            isLoading={isSaving}
          />
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-xl font-semibold">
            Tecnologías
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredTechnologies.length} de {technologies.length})
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar tecnologías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <TechnologyList
          technologies={filteredTechnologies}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
};
