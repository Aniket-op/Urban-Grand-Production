export const WHATSAPP_NUMBER = "918307473499"; // Replace with actual number

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export const categories = [
  { slug: "men", name: "Men" },
  { slug: "women", name: "Women" },
  { slug: "kids", name: "Kids" },
  { slug: "accessories", name: "Accessories" },
];
