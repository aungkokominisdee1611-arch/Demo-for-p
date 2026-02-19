export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isDiscount: boolean;
  stock: number;
}

export interface ProductCreateUpdate {
  name: string;
  price: number;
  category: string;
  isDiscount: boolean;
  stock: number;
}
