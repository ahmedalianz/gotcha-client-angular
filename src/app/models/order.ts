export interface Order {
  _id?: string;
  products: {
    price: number;
    size: string;
    color: string;
    product: {
      _id: string;
      shortName: string;
      mainImage: string;
      quantity: number;
    };
  }[];
  price: number;
  date: Date;
  shipping: {
    name: string;
    phone: string;
    adress: {
      country: string;
      city: string;
    };
  };
  paymentMethod: string;
  status: string;
}
