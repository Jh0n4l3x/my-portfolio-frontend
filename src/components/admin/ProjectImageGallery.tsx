import React, { useState } from 'react';
import { projectImageService, ProjectImage } from '@services/project-image.service';

interface ProjectImageGalleryProps {
  projectId: string;
  images: ProjectImage[];
  onImagesChange: () => void;
  editable?: boolean;
}

export const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({
  projectId,
  images,
  onImagesChange,
  editable = false,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragStart = (index: number) => {
    if (editable) {
      setDraggedIndex(index);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || !editable) return;

    if (draggedIndex !== index) {
      const newImages = [...images];
      const draggedImage = newImages[draggedIndex];
      newImages.splice(draggedIndex, 1);
      newImages.splice(index, 0, draggedImage);
      
      // Aquí actualizaríamos el estado localmente
      // Pero como no tenemos acceso directo, llamamos a onImagesChange
    }
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || !editable) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    setIsLoading(true);
    try {
      const imageIds = newImages.map(img => img.id);
      await projectImageService.reorder(projectId, imageIds);
      onImagesChange();
    } catch (error) {
      console.error('Error reordering images:', error);
    } finally {
      setIsLoading(false);
      setDraggedIndex(null);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!editable || !confirm('¿Estás seguro de eliminar esta imagen?')) return;

    setIsLoading(true);
    try {
      await projectImageService.delete(projectId, imageId);
      onImagesChange();
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAlt = async (imageId: string) => {
    if (!editable) return;

    const currentImage = images.find(img => img.id === imageId);
    const newAlt = prompt('Texto alternativo:', currentImage?.alt || '');
    
    if (newAlt === null) return; // Cancelado

    setIsLoading(true);
    try {
      await projectImageService.update(projectId, imageId, { alt: newAlt });
      onImagesChange();
    } catch (error) {
      console.error('Error updating image alt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No hay imágenes en este proyecto
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          draggable={editable}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          className={`
            relative group rounded-lg overflow-hidden shadow-md
            ${editable ? 'cursor-move' : ''}
            ${draggedIndex === index ? 'opacity-50' : ''}
            ${isLoading ? 'pointer-events-none' : ''}
          `}
        >
          <img
            src={image.url}
            alt={image.alt || `Image ${index + 1}`}
            className="w-full h-48 object-cover"
          />
          
          {editable && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200">
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleUpdateAlt(image.id)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  title="Editar texto alternativo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  title="Eliminar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {image.alt && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 truncate">
              {image.alt}
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            #{index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};
