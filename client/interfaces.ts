
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

export interface UserI{
  file?: string | File
  imagePreviewUrl?: string | ArrayBuffer | any
  name?:string
  address?:string
  active?: string
  phone?: number
  email:string 
}
