export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UserWatchUpdate {
  watchedVideos?: string[];
  completedVideos?: string[];
}
