import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getCart(req, res); break;
    case 'PUT':
      updateCart(req, res); break;
    default:
      res.status(400).json({error:'Invalid request method!'})
      break;
  }
}

export default handler

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query) return res.status(400).json({ message: 'Please Provide cart Email as Param' })
    const userId = req.query.userId as string
    //cart: [{userId:'adslkhj213', productId:1}, {userId:'vlwj234', productId:5},]
    const cart = await prisma.cartProductsOnUsers.findMany({ where: { userId } })
    console.log(cart,'cart in api/cart line 27');
    res.status(200).json(cart)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//[key: string]: any;
const updateCart = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) return res.status(400).json({ message: 'Please Provide Request Body' })
  const { operation, productId, userId } = req.body

  switch (operation) {
    case 'increaseQty':
      console.log(userId,'userId line 41 api/cart');
      
      const updatedPro = await prisma.cartProductsOnUsers.upsert({
        where: { userId_productId: { userId, productId } },
        update: { quantity: { increment: 1 } },
        create: { userId, productId, quantity: 1 },
      })
      return updatedPro;
  
    case 'decreaseQty':

      break;
    case 'removeProduct':

      break;
    default:
      break;
  }
}


// const increaseQty = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (!req.body) return res.status(400).json({ message: 'Please Provide Request Body' })
//     const newProfile = await prisma.cartProductsOnUsers.update({
//       where: { id: req.body.id },
//       data: req.body
//     })
//     res.status(200).json(newProfile)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }
