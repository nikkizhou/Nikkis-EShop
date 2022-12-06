
export interface Product{
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating: { count: number, rate:number}
}

export type Cart = Product[]

export interface UserI{
  id: string
  file?: string | File
  image?: string | ArrayBuffer | any
  name?:string
  address?:string
  phone?: number
  email:string 
}
