export interface IProduct {
  id?: string;
  title: string;
  price: number;
  imageURL: string;
  inventory: number;
  rating?: number;
  createdAt?: string;
}
