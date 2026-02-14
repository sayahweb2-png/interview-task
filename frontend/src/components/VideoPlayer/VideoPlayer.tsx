import { useRef, useEffect, useState } from 'react';
import { useVideoTracking } from '../../hooks/useVideoTracking';
import './VideoPlayer.css';

interface VideoPlayerProps {
  mediaclipId: string;
  userId: number | null;
}

// BB player API from window.bluebillywig.players array
function findPlayerAPI(): BBPlayer | null {
  const bb = (window as any).bluebillywig;
  if (!bb || !bb.players || bb.players.length === 0) return null;

  const player = bb.players[bb.players.length - 1];
  if (player && typeof player.on === 'function') {
    return player as BBPlayer;
  }

  return null;
}

function waitForPlayerAPI(): Promise<BBPlayer> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 150; 

    const check = setInterval(() => {
      attempts++;

      const player = findPlayerAPI();
      if (player) {
        clearInterval(check);
        resolve(player);
        return;
      }

      if (attempts >= maxAttempts) {
        clearInterval(check);
        reject(new Error('player api not found after timeout'));
      }
    }, 100);
  });
}

export default function VideoPlayer({ mediaclipId, userId }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<BBPlayer | null>(null);
  const [player, setPlayer] = useState<BBPlayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { hasReached40, hasCompleted } = useVideoTracking({
    player,
    userId,
    mediaclipId,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    setLoading(true);
    setError(null);
    setPlayer(null);
    playerRef.current = null;

    // clear previous player
    containerRef.current.innerHTML = '';

    // create the BB per-clip embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://demo.bbvms.com/p/default/c/${mediaclipId}.js`;
    containerRef.current.appendChild(script);

    waitForPlayerAPI()
      .then((bbPlayer) => {
        if (cancelled) return;
        setLoading(false);
        playerRef.current = bbPlayer;
        setPlayer(bbPlayer);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(`[VideoPlayer] ${err.message}`);
        setError('Failed to load video player');
        setLoading(false);
      });

    return () => {
      cancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.destruct();
        } catch {
          // ignore for now 
        }
        playerRef.current = null;
        setPlayer(null);
      }
    };
  }, [mediaclipId]);

  if (error) {
    return (
      <div className="video-player-error">
        {error}
      </div>
    );
  }

  return (
    <div className="video-player-wrapper">
      {loading && (
        <div className="video-player-loading">Loading video player...</div>
      )}
      <div ref={containerRef} className="video-player-container" />
      {userId !== null && (
        <div className="tracking-status">
          <span className={hasReached40 ? 'reached' : ''}>
            {hasReached40 ? '40% watched' : 'Watching...'}
          </span>
          <span className={hasCompleted ? 'reached' : ''}>
            {hasCompleted ? 'Completed' : 'Not completed'}
          </span>
        </div>
      )}
    </div>
  );
}
