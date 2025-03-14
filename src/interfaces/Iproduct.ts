export interface IProductDetail {
  title: string;
  content: string;
}

export interface IProductCreate {
  product_title: string;
  product_company_title: string;
  price: number;
  main_image: string;
  images: string[];
  in_stock: number;
  discount_percent: number;
  details: IProductDetail[];
}

export interface IProduct extends IProductCreate {
  id: string;
  createdAt: string;
  stock_status?: string;
  stock_quantity?: number;
  sku?: string;
  categories?: Array<{ name: string }>;
  status?: string;
  regular_price?: number;
  sale_price?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  description?: string;
  short_description?: string;
}
