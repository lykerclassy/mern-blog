import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // If id exists, we are editing
  const [formData, setFormData] = useState({ title: '', content: '', category: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => setFormData({
            title: res.data.title,
            content: res.data.content,
            category: res.data.category
        }))
        .catch(err => console.log(err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/posts/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/posts', formData);
      }
      navigate('/');
    } catch (err) {
      // Display Joi error from backend
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Post' : 'Create New Post'}</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input 
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})} 
            placeholder="Enter post title"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <input 
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})} 
            placeholder="e.g., Tech, Life, Coding"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea 
            rows="6"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})} 
            placeholder="Write your post here..."
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {id ? 'Update Post' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;