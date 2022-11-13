
export interface Product{
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  quantity: number
}

export type Cart = Product[]
