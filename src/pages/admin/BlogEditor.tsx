import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService, Post, CreatePostDto } from '@services/blog.service';
import { tagService, Tag } from '@services/tag.service';

export const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState<CreatePostDto>({
    title: '',
    content: '',
    excerpt: '',
    thumbnail: '',
    published: false,
    tagIds: [],
  });

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTags();
    if (isEdit && id) {
      loadPost(id);
    }
  }, [id, isEdit]);

  const loadTags = async () => {
    try {
      const data = await tagService.getAllTags();
      setAvailableTags(data);
    } catch (err) {
      console.error('Error loading tags:', err);
    }
  };

  const loadPost = async (postId: string) => {
    try {
      setIsLoading(true);
      const post: Post = await blogService.getPostById(postId);
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        thumbnail: post.thumbnail || '',
        published: post.published,
        tagIds: post.tagIds,
      });
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Error al cargar el post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      setError(null);

      if (isEdit && id) {
        await blogService.updatePost(id, formData);
      } else {
        await blogService.createPost(formData);
      }

      navigate('/admin/blog');
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Error al guardar el post');
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof CreatePostDto, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tagId: string) => {
    const currentTags = formData.tagIds || [];
    if (currentTags.includes(tagId)) {
      handleChange('tagIds', currentTags.filter((id) => id !== tagId));
    } else {
      handleChange('tagIds', [...currentTags, tagId]);
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
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Editar Post' : 'Nuevo Post'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            disabled={isSaving}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Título del post..."
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extracto
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            disabled={isSaving}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Breve descripción del post..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido * (HTML)
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            required
            disabled={isSaving}
            rows={20}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 font-mono text-sm"
            placeholder="<p>Contenido del post en HTML...</p>"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de Imagen Principal
          </label>
          <input
            type="url"
            value={formData.thumbnail}
            onChange={(e) => handleChange('thumbnail', e.target.value)}
            disabled={isSaving}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="https://..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                disabled={isSaving}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  formData.tagIds?.includes(tag.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Published */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => handleChange('published', e.target.checked)}
            disabled={isSaving}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
            Publicar inmediatamente
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSaving ? 'Guardando...' : isEdit ? 'Actualizar Post' : 'Crear Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            disabled={isSaving}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
