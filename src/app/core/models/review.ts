export interface Review {
  id: number;
  productId: number;
  product?: string;
  userId: number;
  user?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  id: number;
  productId: number;
  nameProduct?: string;
  userId: number;
  nameUser?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
