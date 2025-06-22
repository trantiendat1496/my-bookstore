export interface Author {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  is_leaf: boolean;
}

export interface Seller {
  id: number;
  sku: string;
  name: string;
  link: string;
  logo: string;
  price: number;
  product_id: string;
  store_id: number;
  is_best_store: boolean;
  is_offline_installment_supported: boolean | null;
}

export interface Image {
  base_url: string;
  is_gallery: boolean;
  label: string | null;
  large_url: string;
  medium_url: string;
  position: number | null;
  small_url: string;
  thumbnail_url: string;
}

export interface QuantitySold {
  text: string;
  value: number;
}

export interface Attribute {
  code: string;
  name: string;
  value: string;
}

export interface Specification {
  name: string;
  attributes: Attribute[];
}

export interface Book {
  id: string;
  name: string;
  authors: Author[];
  book_cover: string | null;
  categories: Category;
  current_seller: Seller;
  description: string;
  images?: Image[];
  list_price: number;
  original_price: number;
  quantity_sold?: QuantitySold;
  rating_average: number;
  short_description: string;
  specifications: Specification[];
  price: number; // Thêm từ current_seller.price để sử dụng trong UI
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface User {
  email: string;
  name?: string;
  role?: string;
  token?: string;
}