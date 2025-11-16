import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileService } from '@services/profile.service';
import { Save, User, MapPin, Globe, Github, Linkedin, Twitter, Image } from 'lucide-react';

interface ProfileFormData {
  bio: string;
  title: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  avatar?: string;
}

export function ProfileEditor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    bio: '',
    title: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    avatar: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profile = await profileService.getMyProfile();
      if (profile) {
        setProfileExists(true);
        setFormData({
          bio: profile.bio || '',
          title: profile.title || '',
          location: profile.location || '',
          website: profile.website || '',
          github: profile.github || '',
          linkedin: profile.linkedin || '',
          twitter: profile.twitter || '',
          avatar: profile.avatar || '',
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      // Si no existe perfil, no es un error
      setProfileExists(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bio.trim()) {
      setError('La biografía es obligatoria');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const dataToSubmit = {
        bio: formData.bio,
        title: formData.title || undefined,
        location: formData.location || undefined,
        website: formData.website || undefined,
        github: formData.github || undefined,
        linkedin: formData.linkedin || undefined,
        twitter: formData.twitter || undefined,
        avatar: formData.avatar || undefined,
      };

      if (profileExists) {
        await profileService.update(dataToSubmit);
      } else {
        await profileService.create(dataToSubmit);
        setProfileExists(true);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
        : undefined;
      setError(errorMessage || 'Error al guardar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-gray-600 mt-2">
            Actualiza tu información personal y enlaces sociales
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            ✓ Perfil actualizado correctamente
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Image size={24} />
              Avatar
            </h2>
            
            <div className="flex items-center gap-6">
              {/* Avatar Preview */}
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>

              {/* Avatar URL Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL del Avatar
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://ejemplo.com/mi-avatar.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ingresa la URL de tu imagen de perfil
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={24} />
              Información Personal
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Profesional
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="ej: Full Stack Developer, UI/UX Designer"
              />
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biografía *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Cuéntanos sobre ti, tu experiencia y tus pasiones..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.bio.length} caracteres
              </p>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="ej: Madrid, España"
              />
            </div>
          </div>

          {/* Links & Social */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe size={24} />
              Enlaces y Redes Sociales
            </h2>

            {/* Website */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe size={16} />
                Sitio Web Personal
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://tu-sitio-web.com"
              />
            </div>

            {/* GitHub */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Github size={16} />
                GitHub
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://github.com/tu-usuario"
              />
            </div>

            {/* LinkedIn */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Linkedin size={16} />
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://linkedin.com/in/tu-usuario"
              />
            </div>

            {/* Twitter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Twitter size={16} />
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://twitter.com/tu-usuario"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-gray-50 p-4 -mx-8 -mb-8 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
