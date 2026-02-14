import { Routes, Route } from 'react-router-dom';
import PostPage from './pages/PostPage/PostPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
