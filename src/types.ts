interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  stock: string;
  size: string;
}

export type { Product }

export interface CartItem extends Product{
  quantity: number;
}