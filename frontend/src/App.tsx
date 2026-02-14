import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { getAllPosts } from './services/api';
import PostPage from './pages/PostPage/PostPage';
import type { Post } from './types/post';
import './App.css';

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to fetch posts:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="home-page">
      <h1>BB Challenge</h1>
      <p className="subtitle">Select a post to view with embedded video player</p>
      <div className="post-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`} className="post-link">
            <div className="post-card">
              <span className="post-number">#{post.id}</span>
              <span className="post-card-title">{post.title}</span>
              {post.mediaclipId && <span className="has-video">video</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
