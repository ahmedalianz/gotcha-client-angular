export interface Category {
  _id: string;
  name: string;
  subCategories: SubCategory[];
}
export interface SubCategory {
  name: string;
}
