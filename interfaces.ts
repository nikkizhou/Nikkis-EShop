
export interface Product{
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating: { count: number, rate: number }
  quantity: number
}

export type Cart = Product[]

export interface UserI{
  id?: string
  file?: string | File
  image?: string | ArrayBuffer
  name?:string
  address?:string
  phone?: number
  email?: string 
  role?: string
  cart?: Cart
}

export interface Order {
  id: string
  userId: string
  productId: number
  quantity: number
  assignedAt: string
  product: Product
  orderNr: string
  rated: boolean
}

export interface Review {
  id: string
  userId: string
  productId: number
  assignedAt: string
  rating: number
  text: string
}
