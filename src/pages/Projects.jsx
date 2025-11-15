import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectAPI } from '../utils/api';

const ADMIN_EMAIL = 'infantaantoni@gmail.com'; 

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', githubRepo: '', liveDemo: '', tags: '' });
  const [editing, setEditing] = useState(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, tags: form.tags.split(',').map(t => t.trim()), firebaseUID: user.uid };
      if (editing) {
        await projectAPI.updateProject(editing, data);
      } else {
        await projectAPI.createProject(data);
      }
      setForm({ title: '', description: '', githubRepo: '', liveDemo: '', tags: '' });
      setEditing(null);
      fetchProjects();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await projectAPI.deleteProject(id, { firebaseUID: user.uid });
      fetchProjects();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLike = async (id) => {
    try {
      await projectAPI.likeProject(id);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      {/* Admin: Create/Edit Form */}
      {isAdmin && user && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">{editing ? 'Edit' : 'Add'} Project</h3>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="GitHub Repo"
            value={form.githubRepo}
            onChange={(e) => setForm({ ...form, githubRepo: e.target.value })}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Live Demo (optional)"
            value={form.liveDemo}
            onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full p-3 border rounded mb-4"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
              {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => { setEditing(null); setForm({ title: '', description: '', githubRepo: '', liveDemo: '', tags: '' }); }}
                className="bg-gray-500 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-2 mb-4">
              {project.tags?.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Live Demo</a>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => handleLike(project._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                ❤️ {project.likes || 0}
              </button>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(project._id); setForm({ ...project, tags: project.tags.join(', ') }); }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
