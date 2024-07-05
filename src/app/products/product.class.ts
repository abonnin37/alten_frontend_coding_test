export class Product {
  // tslint:disable-next-line:variable-name
  _id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

export interface ProductPayload {
  products: Product[];
  total: number;
}
