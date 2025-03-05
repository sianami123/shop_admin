export interface IProduct {
  id?: string;
  title: string;
  price: number;
  imageURL: string;
  rating?: number;
  description?: string;
  short_description?: string;
  stock_status?: string;
  stock_quantity?: number | null;
  sku?: string;
  categories?: Array<{ id: number; name: string }>;
  status?: string;
  type?: string;
  date_created?: string;
  date_modified?: string;
  on_sale?: boolean;
  regular_price?: string;
  sale_price?: string;
  weight?: string;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
}
