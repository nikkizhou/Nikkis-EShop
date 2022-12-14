import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../prisma/prismaClient'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getCart(req, res); break;
    case 'PUT':
      await updateCart(req, res); break;
    default:
      res.status(405).json({error:'Invalid request method!'})
      break;
  }
}
export default handler


//--------------------------- HTTP Response Operations ---------------------------

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query)
    return res.status(400).json({ message: 'Please Provide UserId as Param' })
  const userId = req.query.userId as string
  await fetchCartPrimsma(userId)
    .then(cart => res.status(200).json(cart))
    .catch(error => console.log(error.message))
}

const updateCart = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body)
    return res.status(400).json({ message: 'Please Provide operation, productId, userId as Request Body' })
  const { operation, productId, userId } = req.body

  switch (operation) {
    case 'increaseQty': case 'decreaseQty':
      await updateQtyPrimsma(operation, userId, productId);
      break;
    case 'removeProduct':
      await deleteProPrimsma(userId, productId);
      break;
    default:
      return res.status(400).json('Operation type must be increaseQty, decreaseQty or removeProduct ');
    }
  
  return res.status(200).json(await fetchCartPrimsma(userId));
  // here the whold cart was sent back even though only one product was updated,
  // this is because removeProduct sends back the whole cart too.
  // in this way it's easier to unificate in cartActions and cartSlices
}


//------------------------------ Prisma Operations --------------------------------

const fetchCartPrimsma = async(userId:string) => {
  const updatedCart = await prisma.cartItem.findMany({
    where: { userId },
    select: { product: true, quantity: true },
    orderBy: { assignedAt: 'asc' },
  });
  return updatedCart.map(pro =>( { ...pro.product, quantity: pro.quantity } ))
}

const updateQtyPrimsma = async (operation:string, userId:string, productId:number) => {
  const qtyQuery = operation == 'increaseQty'? { increment: 1 }: { decrement: 1 }
  await prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: { quantity: qtyQuery },
    create: { userId, productId, quantity: 1 },
  })
}

const deleteProPrimsma = async (userId: string, productId: number) => {
  await prisma.cartItem.delete({
    where: { userId_productId: { userId, productId } }
  })
}
