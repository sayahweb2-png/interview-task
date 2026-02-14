export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithVideo extends Post {
  mediaclipId: string | null;
}
