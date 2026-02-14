import { useEffect, useRef, useState, useCallback } from 'react';
import { updateUserWatchData } from '../services/api';

interface UseVideoTrackingParams {
  player: BBPlayer | null;
  userId: number | null;
  mediaclipId: string;
}

interface UseVideoTrackingResult {
  hasReached40: boolean;
  hasCompleted: boolean;
}

export function useVideoTracking({
  player,
  userId,
  mediaclipId,
}: UseVideoTrackingParams): UseVideoTrackingResult {
  const [hasReached40, setHasReached40] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const hasReached40Ref = useRef(false);
  const hasCompletedRef = useRef(false);

  // reset tracking state when mediaclipId changes
  useEffect(() => {
    hasReached40Ref.current = false;
    hasCompletedRef.current = false;
    setHasReached40(false);
    setHasCompleted(false);
  }, [mediaclipId]);

  // fires on every timeupdate ,checks if 40% threshold is crossed
  const handleTimeUpdate = useCallback(() => {
    if (!player || !userId || hasReached40Ref.current) return;

    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();

    if (duration <= 0) return;

    const progress = currentTime / duration;

    if (progress >= 0.4) {
      hasReached40Ref.current = true;
      setHasReached40(true);
      console.log(
        `[VideoTracking] User ${userId} reached 40% of clip ${mediaclipId} (${(progress * 100).toFixed(1)}%)`,
      );
      updateUserWatchData(userId, { watchedVideos: [mediaclipId] }).catch(
        (err) =>
          console.error('[VideoTracking] failed to update watchedVideos:', err),
      );
    }
  }, [player, userId, mediaclipId]);

  // fires when the video ends ,marks as completed
  const handleEnded = useCallback(() => {
    if (!userId || hasCompletedRef.current) return;

    hasCompletedRef.current = true;
    setHasCompleted(true);
    console.log(
      `[VideoTracking] User ${userId} completed clip ${mediaclipId}`,
    );
    updateUserWatchData(userId, { completedVideos: [mediaclipId] }).catch(
      (err) =>
        console.error('[VideoTracking] Failed to update completedVideos:', err),
    );
  }, [userId, mediaclipId]);

  
  
  
  
  
  
  
  // attach/detach player event listeners
  useEffect(() => {
    if (!player) return;

    player.on('timeupdate', handleTimeUpdate);
    player.on('ended', handleEnded);

    return () => {
      player.off('timeupdate');
      player.off('ended');
    };
  }, [player, handleTimeUpdate, handleEnded]);

  return { hasReached40, hasCompleted };
}
