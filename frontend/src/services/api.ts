import axios from 'axios';
import type { Post } from '../types/post';
import type { User, WatchUpdate } from '../types/user';

const api = axios.create({
  baseURL: '/api',
});

export async function getAllPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>('/posts');
  return response.data;
}

export async function getPost(id: number): Promise<Post> {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
}

export async function getUser(id: number): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

export async function updateUserWatchData(
  userId: number,
  data: WatchUpdate,
): Promise<unknown> {
  const response = await api.patch(`/users/${userId}`, data);
  return response.data;
}
