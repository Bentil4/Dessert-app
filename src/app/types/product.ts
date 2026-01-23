export interface IProductImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface IProduct {
  id: string;
  name: string;
  imageURL: IProductImages;
  category: string;
  price: number;
}
