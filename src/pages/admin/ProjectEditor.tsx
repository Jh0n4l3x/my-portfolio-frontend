import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '@services/project.service';
import { technologyService } from '@services/technology.service';
import { projectImageService, ProjectImage } from '@services/project-image.service';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import type { Technology, CreateProjectDto } from '../../types';
import { ProjectImageGallery } from '@components/admin/ProjectImageGallery';
import { ImageUploader } from '@components/admin/ImageUploader';

interface ProjectFormData {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  technologyIds: string[];
}

export function ProjectEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    content: '',
    thumbnail: '',
    liveUrl: '',
    githubUrl: '',
    status: 'DRAFT',
    featured: false,
    technologyIds: [],
  });

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
  const [imagesLoading, setImagesLoading] = useState(false);

  useEffect(() => {
    loadTechnologies();
    if (isEditing && id) {
      loadProject(id);
    }
  }, [id, isEditing]);

  const loadTechnologies = async () => {
    try {
      const data = await technologyService.getAll();
      setTechnologies(data);
    } catch (err) {
      console.error('Error loading technologies:', err);
      setError('Error al cargar las tecnologías');
    }
  };

  const loadProject = async (projectId: string) => {
    try {
      setLoading(true);
      const project = await projectService.getById(projectId);
      setFormData({
        title: project.title,
        description: project.description,
        content: project.content || '',
        thumbnail: project.thumbnail || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        status: project.status,
        featured: project.featured,
        technologyIds: project.technologies.map((t) => t.technologyId),
      });
      
      // Load project images
      await loadProjectImages(projectId);
    } catch (err) {
      console.error('Error loading project:', err);
      setError('Error al cargar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const loadProjectImages = async (projectId: string) => {
    try {
      setImagesLoading(true);
      const images = await projectImageService.getByProject(projectId);
      setProjectImages(images);
    } catch (error) {
      console.error('Error loading project images:', error);
    } finally {
      setImagesLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('El título y la descripción son obligatorios');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const dataToSubmit: CreateProjectDto = {
        ...formData,
        status: asDraft ? 'DRAFT' : formData.status,
      };

      if (isEditing && id) {
        await projectService.update(id, dataToSubmit);
      } else {
        await projectService.create(dataToSubmit);
      }

      navigate('/admin/projects');
    } catch (err) {
      console.error('Error saving project:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
        : undefined;
      setError(errorMessage || 'Error al guardar el proyecto');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTechnologyToggle = (techId: string) => {
    setFormData((prev) => ({
      ...prev,
      technologyIds: prev.technologyIds.includes(techId)
        ? prev.technologyIds.filter((id) => id !== techId)
        : [...prev.technologyIds, techId],
    }));
  };

  const handleImageUpload = async (file: File) => {
    if (!id) return;

    try {
      setImagesLoading(true);
      const newImage = await projectImageService.uploadImage(id, file);
      setProjectImages(prev => [...prev, newImage]);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    } finally {
      setImagesLoading(false);
    }
  };

  const handleImagesChange = async () => {
    if (!id) return;
    await loadProjectImages(id);
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin/projects')}
              className="flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver a proyectos
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isEditing ? 'Modifica los detalles del proyecto' : 'Crea un nuevo proyecto para tu portafolio'}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Básica</h2>
            
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Proyecto *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Mi Proyecto Increíble"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Corta *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Una breve descripción del proyecto..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length} caracteres</p>
            </div>

            {/* Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido Detallado
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                placeholder="Descripción detallada del proyecto, tecnologías usadas, características, etc."
              />
              <p className="text-xs text-gray-500 mt-1">
                Puedes usar Markdown para formatear el contenido
              </p>
            </div>

            {/* Thumbnail */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la Imagen Principal
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.thumbnail && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-2">Vista previa:</p>
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="max-w-xs rounded-lg border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Enlaces</h2>

            {/* Live URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Proyecto en Vivo
              </label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://mi-proyecto.com"
              />
            </div>

            {/* GitHub URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Repositorio GitHub
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://github.com/usuario/proyecto"
              />
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tecnologías</h2>
            <p className="text-sm text-gray-600 mb-4">
              Selecciona las tecnologías utilizadas en este proyecto
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleTechnologyToggle(tech.id)}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.technologyIds.includes(tech.id)
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tech.icon && <span className="text-xl">{tech.icon}</span>}
                    <span className="text-sm font-medium">{tech.name}</span>
                    {tech.color && (
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: tech.color }}
                        title={tech.color}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {technologies.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No hay tecnologías disponibles. Crea algunas primero.
              </p>
            )}
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuración</h2>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado del Proyecto
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="DRAFT">Borrador</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="ARCHIVED">Archivado</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
                Marcar como proyecto destacado
              </label>
            </div>
          </div>

          {/* Project Images */}
          {id && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Imágenes del Proyecto</h2>
              <p className="text-sm text-gray-600 mb-4">
                Gestiona las imágenes de tu proyecto. Puedes arrastrar para reordenar.
              </p>

              {/* Image Uploader */}
              <div className="mb-6">
                <ImageUploader
                  onImageSelect={handleImageUpload}
                  disabled={imagesLoading}
                />
              </div>

              {/* Image Gallery */}
              {imagesLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ProjectImageGallery
                  projectId={id}
                  images={projectImages}
                  onImagesChange={handleImagesChange}
                  editable={true}
                />
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-gray-50 p-4 -mx-8 -mb-8 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            
            {formData.status !== 'DRAFT' && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={saving}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Guardar como Borrador
              </button>
            )}

            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
            >
              <Eye size={20} />
              Vista Previa
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Guardando...' : isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
