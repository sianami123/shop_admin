export interface IProduct {
  createdAt: string;
  discount: number;
  id: string;
  mainImage: string;
  imageURL: string[];
  price: number;
  description: string;
  stock: number;
  title: string;
  details: {
    title: string;
    content: string;
  }[];
}
