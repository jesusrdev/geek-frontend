import { Brand } from './brand';
import { Category } from './category';
import { Subcategory } from './subcategory';
import { CommentResponse } from './comment';

export interface Product {
  id: number;
  nameProduct: string;
  description: string;
  largeDescription: string;
  price: number;
  stock: number;
  discount?: number;
  status: boolean;
  categoryId: number;
  category?: Category;
  brandId: number;
  brand?: Brand;
  subCategoryId: number;
  subcategory?: Subcategory;
  images: ImageProduct[];
  review?: number;
  comments?: CommentResponse[];
}

export interface ProductList {
  id: number;
  nameProduct: string;
  description: string;
  largeDescription: string;
  price: number;
  stock?: number;
  status: boolean;
  categoryId: number;
  nameCategory: string;
  brandId: number;
  nameBrand: string;
  subCategoryId: number;
  nameSubcategory: string;
  discount?: number;
  review?: number;
  image?: string;
}

export interface ImageProduct {
  id: number;
  urlImage?: string;
  imageProduct?: string;
  productId: number;
  nameProduct: string;
}
