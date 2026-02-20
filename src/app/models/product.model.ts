export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  categoryId?: number;
  isDiscount: boolean;
  stock: number;
}

export interface ProductCreateUpdate {
  name: string;
  price: number;
  categoryId: number;
  isDiscount: boolean;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
}
export interface CategoryResponse {
  success: boolean;
  message: string;
  code: number;
  data: Category;
}
