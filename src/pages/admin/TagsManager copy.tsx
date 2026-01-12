import React, { useState, useEffect } from 'react';
import { tagService, Tag } from '@services/tag.service';

export const TagsManager: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [editTagName, setEditTagName] = useState('');

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await tagService.getAllTags();
      setTags(data);
    } catch (err) {
      console.error('Error loading tags:', err);
      setError('Error al cargar los tags');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      setIsSaving(true);
      setError(null);
      await tagService.createTag(newTagName.trim());
      setNewTagName('');
      await loadTags();
    } catch (err) {
      console.error('Error creating tag:', err);
      setError('Error al crear el tag');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setEditTagName(tag.name);
  };

  const handleUpdate = async () => {
    if (!editingTag || !editTagName.trim()) return;

    try {
      setIsSaving(true);
      setError(null);
      await tagService.updateTag(editingTag.id, editTagName.trim());
      setEditingTag(null);
      setEditTagName('');
      await loadTags();
    } catch (err) {
      console.error('Error updating tag:', err);
      setError('Error al actualizar el tag');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (tag: Tag) => {
    if (!confirm(`¿Estás seguro de eliminar el tag "${tag.name}"?`)) return;

    try {
      setIsSaving(true);
      setError(null);
      await tagService.deleteTag(tag.id);
      await loadTags();
    } catch (err) {
      console.error('Error deleting tag:', err);
      setError('Error al eliminar el tag. Puede estar en uso por posts.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Tags</h1>
        <p className="text-gray-600">Administra los tags para categorizar tus posts</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Create Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Nuevo Tag</h2>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Nombre del tag..."
            disabled={isSaving}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isSaving || !newTagName.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Crear
          </button>
        </form>
      </div>

      {/* Tags List */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Tags ({tags.length})
        </h2>

        {tags.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay tags creados
          </div>
        ) : (
          <div className="space-y-3">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                {editingTag?.id === tag.id ? (
                  <div className="flex-1 flex gap-3">
                    <input
                      type="text"
                      value={editTagName}
                      onChange={(e) => setEditTagName(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      onClick={handleUpdate}
                      disabled={isSaving || !editTagName.trim()}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingTag(null)}
                      disabled={isSaving}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{tag.name}</span>
                      {tag.posts && tag.posts.length > 0 && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({tag.posts.length} posts)
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(tag)}
                        disabled={isSaving}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition disabled:opacity-50"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(tag)}
                        disabled={isSaving}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition disabled:opacity-50"
                        title="Eliminar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
