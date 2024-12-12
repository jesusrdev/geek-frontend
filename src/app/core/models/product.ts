import { Brand } from './brand';
import { Category } from './category';
import { Subcategory } from './subcategory';

export interface Product {
  id: number;
  nameProduct: string;
  description: string;
  largeDescription: string;
  price: number;
  stock: number;
  discount: number;
  status: number;
  categoryId: number;
  category?: Category;
  brandId: number;
  brand?: Brand;
  subCategoryId: number;
  subcategory?: Subcategory;
  images: ImageProduct[];
}

export interface ImageProduct {
  id: number;
  urlImage?: string;
  imageProduct?: string;
  productId: number;
  nameProduct: string;
}
