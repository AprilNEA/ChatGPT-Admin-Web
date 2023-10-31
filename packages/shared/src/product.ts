export interface IProduct {
  id: number;
  name: string;
  features: string[];
  price: number;
  stock: number;
  duration: number;
}

export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
}
