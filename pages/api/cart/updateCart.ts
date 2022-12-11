import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { operation, productId,userId } = req.query;
  //if (req.method !== 'PUT') return res.send({error:'Wrong request method. Only Put allowed'})
 
  switch (operation) {
    case 'increaseQty':
      await prisma.cartProductsOnUsers.update({
        where: {
          userId_productId: { userId:(userId as string), productId:Number(productId) },
        },
        data:{quantity:{increment:1}},
        //data: { name:'test' }
      })
      res.send({ message: 'test!!' })
      
      
      break;
    case 'decreaseQty':
      
      break;
    case 'addProduct':
      await prisma.cartProductsOnUsers.create({
        data: {
          userId: (userId as string),
          productId: Number(productId),
          quantity:1
        },
      })
      // const user = await prisma.user.findUnique({ where: { id: (userId as string) } })
      // console.log(user, 'user in line 39 in Cart');
      res.send({ message: 'test!!' })

      
      break;
    case 'removeProduct':
      
      break;
  
    case 'getCart':
      const cart = await prisma.cartProductsOnUsers.findMany({ where: { userId: (userId as string) } })
      res.status(200).send({cart})
      break;
    default:
      break;
  }

  // try {
  //   const id = req.query.id as string
  //   const reqBody = JSON.parse(req.body)
  //   const reqBodyFixed = { ...reqBody, phone: Number(reqBody.phone) }

  //   await prisma.user.update({
  //     where: { id: id },
  //     data: reqBodyFixed
  //   })

  //   res.status(200).json({ message: 'Profile Updated!' })
  // } catch (error) {
  //   res.status(500).json({ error: error.message })
  // }

}

export default handler
