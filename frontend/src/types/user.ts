export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface WatchUpdate {
  watchedVideos?: string[];
  completedVideos?: string[];
}
