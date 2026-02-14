import { Routes, Route, Link } from 'react-router-dom';
import PostPage from './pages/PostPage/PostPage';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1>BB Challenge</h1>
      <p className="subtitle">Select a post to view with embedded video player</p>
      <div className="post-list">
        {Array.from({ length: 90 }, (_, i) => i + 1).map((id) => (
          <Link key={id} to={`/post/${id}`} className="post-link">
            <div className="post-card">
              <span className="post-number">#{id}</span>
              <span>View Post {id}</span>
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
