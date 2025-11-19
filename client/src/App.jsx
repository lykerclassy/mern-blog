import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './pages/PostList';
import PostForm from './pages/PostForm';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Navigation */}
        <nav className="bg-blue-600 p-4 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">MERN Blog</Link>
            <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
              + Create Post
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/edit/:id" element={<PostForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;