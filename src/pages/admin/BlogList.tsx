import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService, Post } from '@services/blog.service';

export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const published = filter === 'published' ? true : filter === 'draft' ? false : undefined;
        const data = await blogService.getAllPosts({ published });
        setPosts(data);
      } catch (err) {
        console.error('Error loading posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [filter]);

  const reloadPosts = async () => {
    try {
      const published = filter === 'published' ? true : filter === 'draft' ? false : undefined;
      const data = await blogService.getAllPosts({ published });
      setPosts(data);
    } catch (err) {
      console.error('Error loading posts:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return;

    try {
      await blogService.deletePost(id);
      await reloadPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Error al eliminar el post');
    }
  };

  const handleTogglePublish = async (post: Post) => {
    try {
      if (post.published) {
        await blogService.unpublishPost(post.id);
      } else {
        await blogService.publishPost(post.id);
      }
      await reloadPosts();
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts del Blog</h1>
        <Link
          to="/admin/blog/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Nuevo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'published', 'draft'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md transition ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'published' ? 'Publicados' : 'Borradores'}
          </button>
        ))}
      </div>

      {/* Posts Table */}
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No hay posts</p>
        </div>
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Título</th>
                <th className="text-left p-4 font-semibold">Estado</th>
                <th className="text-left p-4 font-semibold">Tags</th>
                <th className="text-left p-4 font-semibold">Fecha</th>
                <th className="text-right p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <Link to={`/admin/blog/edit/${post.id}`} className="font-medium text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                        title={post.published ? 'Despublicar' : 'Publicar'}
                      >
                        {post.published ? '👁️' : '📝'}
                      </button>
                      <Link
                        to={`/admin/blog/edit/${post.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
