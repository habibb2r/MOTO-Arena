// Main Product type
export type TProduct = {
  _id?: string;
  productId?: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  photo?: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt?: Date; 
  updatedAt?: Date;
};

// Response type for a single product
export type TProductResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TProduct;
};

// Response type for multiple products
export type TProductsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TProduct[];
};

// Optional: type for creating a product (no `_id`, `createdAt`, etc.)
export type TCreateProductPayload = Omit<TProduct, '_id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;

// Optional: type for updating a product (usually partial)
export type TUpdateProductPayload = Partial<TCreateProductPayload> & {
  _id: string;
};
