export interface Product {
  _id: string;
  brand: string;
  shortName: string;
  longName: string;
  description: any;
  specifications: any;
  price: number;
  mainImage: string;
  categories: string[];
  sizes: string[];
  colors: string[];
  images: string[];
  inventoryQuantity: number;
  discount: { percentage: number; active: boolean };
  bestSeller: boolean;
  reviewsRatings: Review[];
}
export interface Review {
  productId: string;
  user: {
    name: string;
    profilePic: string;
  };
  message: string;
  rate: number;
  date: Date;
}
