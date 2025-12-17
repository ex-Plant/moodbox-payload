export type MoneyT = {
  amount: string
  currencyCode: string
}

export type ImageT = {
  id: string
  url: string
  altText: string | null
  width: number
  height: number
}

export type ProductVariantT = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: MoneyT
  compareAtPrice: MoneyT | null
  image: ImageT | null
  product?: {
    productType: string
    description: string
    descriptionHtml: string
    availableForSale: boolean
    tags: string[]
    vendor: string
  }
}

export type ProductT = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  status: string
  tags: string[]
  vendor: string
  productType: string
  priceRange: {
    minVariantPrice: MoneyT
    maxVariantPrice: MoneyT
  }
  images: {
    edges: {
      node: ImageT
    }[]
  }
  variants: {
    edges: {
      node: ProductVariantT
    }[]
  }
  secondName: {
    key: string
    value: string
  } | null
  material: {
    key: string
    value: string
  } | null
}

export type CollectionT = {
  id: string
  handle: string
  title: string
  description: string
  image: ImageT | null
  products: {
    edges: {
      node: ProductT
    }[]
  }
}

export type CartLineT = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: {
      name: string
      value: string
    }[]
    product: {
      id: string
      handle: string
      title: string
      featuredImage: ImageT | null
    }
    price: MoneyT
  }
  cost: {
    totalAmount: MoneyT
  }
}

export type CartT = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: {
      node: CartLineT
    }[]
  }
  cost: {
    subtotalAmount: MoneyT
    totalAmount: MoneyT
    totalTaxAmount: MoneyT | null
  }
}

export type ShopifyResponseT<T> = {
  data: T
  errors?: {
    message: string
    locations?: { line: number; column: number }[]
    path?: string[]
  }[]
}
