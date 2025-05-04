import { Product } from './product';
import { User } from './user';

export interface Comment {
  id: number;
  productId: number;
  product?: Product;
  userId: number;
  user?: User;
  content: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  parentCommentId: number;
  parentComment?: Comment;
  commentsChild?: Comment[];
}

export interface CommentResponse {
  id: number;
  productId: number;
  nameProduct?: string;
  userId: number;
  nameUser?: string;
  content?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  parentCommentId?: number;
}
