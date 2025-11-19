import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if(window.confirm("Are you sure you want to delete this?")) {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      navigate('/');
    }
  };

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
        </span>
        <h1 className="text-4xl font-bold mt-4 text-gray-900">{post.title}</h1>
        <p className="text-gray-500 mt-2 text-sm">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
        {post.content}
      </div>

      <div className="border-t pt-6 flex gap-4">
        <Link 
            to={`/edit/${post._id}`} 
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
            Edit
        </Link>
        <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
            Delete
        </button>
        <Link to="/" className="ml-auto text-gray-600 hover:text-gray-900 py-2">
            Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;