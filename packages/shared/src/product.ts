export interface ProductType {
  id: number;
  name: string;
  features: string[];
  price: number;
  stock: number;
  duration: number;
}

export interface CategoryType {
  id: number;
  name: string;
  products: ProductType[];
}
