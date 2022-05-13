import { Product } from './product';
import { User } from './user';

export interface CartItem {
  _id?: string;
  product?: Product;
  user?: User;
  color: string;
  price: number;
  quantity: number;
  size: string;
}
