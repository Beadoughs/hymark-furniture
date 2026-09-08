export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText?: string | null;
};

export type ShopifySelectedOption = {
  name: string;
  value: string;
};

export type ShopifyProductOption = {
  name: string;
  values: string[];
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  image?: ShopifyImage | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType?: string | null;
  tags: string[];
  featuredImage?: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  options: ShopifyProductOption[];
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>;
  };
  images?: {
    edges: Array<{ node: ShopifyImage }>;
  };
};

export type ShopifyCollection = {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: ShopifyImage | null;
  products: {
    edges: Array<{ node: ShopifyProduct }>;
  };
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image?: ShopifyImage | null;
    product: {
      title: string;
      handle: string;
    };
    price: ShopifyMoney;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
  lines: {
    edges: Array<{ node: ShopifyCartLine }>;
  };
};

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};
