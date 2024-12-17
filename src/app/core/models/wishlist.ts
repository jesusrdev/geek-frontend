import { Product } from './product';

export interface Wishlist {
  id: number;
  userApplicationId: number;
  productId: number;
  product: Product;
}

export interface WishlistForm {
  id: number;
  productId: number;
  nameUser: string;
  nameProduct: string;
}
