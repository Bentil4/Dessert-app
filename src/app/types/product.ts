export interface IProductImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface IProduct {
  id: string;
  name: string;
  image: IProductImages;
  category: string;
  price: number;
}
