import { Product } from "../interfaces"

interface Props{
  name: string,
  email: string,
  phone?: number
  message?: string,
  address?: string,
  products?: Product[],
  orderNr?:string
}

export default async (details: Props) => {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(details)
  }
  return await fetch("api/sendEmail", config).then(res => res.json());
}
