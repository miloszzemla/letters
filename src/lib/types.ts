export interface Letter {
  id: string;
  greeting: string;
  body: string;
  author: string;
  createdAt: string;
  status: 'pending' | 'published' | 'rejected';
}
