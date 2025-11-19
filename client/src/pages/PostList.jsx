import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts?search=${search}`);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search posts by title..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {loading ? <p>Loading...</p> : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold mt-2">{post.title}</h2>
                  <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline font-medium">
                  Read Full Post →
                </Link>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p className="text-center text-gray-500">No posts found.</p>}
        </div>
      )}
    </div>
  );
};

export default PostList;