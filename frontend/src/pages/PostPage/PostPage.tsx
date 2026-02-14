import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, getUser } from '../../services/api';
import { useUser } from '../../hooks/useUser';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import type { Post } from '../../types/post';
import type { User } from '../../types/user';
import './PostPage.css';

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const { userId, isIdentified } = useUser();

  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      setError('Invalid post ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getPost(postId)
      .then((postData) => {
        setPost(postData);
        return getUser(postData.userId);
      })
      .then((userData) => {
        setAuthor(userData);
      })
      .catch((err) => {
        console.error('firas-failed to fetch post data:', err);
        setError('Failed to load post. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className="error">
        <p>{error || 'Post not found'}</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="post-page">
      <Link to="/" className="back-link">
        Back to posts
      </Link>

      <div className="user-banner">
        {isIdentified ? (
          <span className="user-banner-identified">
            Watching as User #{userId}
          </span>
        ) : (
          <span className="user-banner-anonymous">
            Anonymous viewer — watch progress won't be tracked
          </span>
        )}
      </div>

      <article className="post-content">
        <h1 className="post-title">{post.title}</h1>
        {author && (
          <div className="post-meta">
            By {author.name} (@{author.username})
          </div>
        )}
        <p className="post-body">{post.body}</p>
      </article>

      {post.mediaclipId ? (
        <section className="video-section">
          <h2 className="video-section-title">Video</h2>
          <VideoPlayer mediaclipId={post.mediaclipId} userId={userId} />
        </section>
      ) : (
        <div className="no-video">
          No video is associated with this post.
        </div>
      )}
    </div>
  );
}
