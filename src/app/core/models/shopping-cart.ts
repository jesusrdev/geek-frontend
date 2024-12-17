import { User } from './user';
import { Product } from './product';

export interface ShoppinCart {
  id: number;
  userId: number;
  user?: User;
  totalPrice: number;
  discount: number;
}

export interface ShoppingCartItem {
  id: number;
  cartId: number;
  shoppingCart?: ShoppinCart;
  productId: number;
  product?: Product;
  quantity: number;
  price: number;
}

export interface CartItemForm {
  id: number;
  productId: number;
  quantity: number;
}
