import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { useUser } from '@auth0/nextjs-auth0';
const prisma = new PrismaClient();

type Data = {
  message?: string
  error?: string
}


//  api/cart/?operation="addqty", productId=2
//  api/cart/addqty
//  api/cart/reduceqty
//  api/cart/addProduct
//  api/cart/deleteProduct

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //const { user, error, isLoading } = useUser();
  const query = req.query;
  const { operation, productId,userId } = query;
  //if (req.method !== 'PUT') return res.send({error:'Wrong request method. Only Put allowed'})
  const user = await prisma.user.findUnique({ where: { id: (userId as string) } })
  console.log(user);

  switch (operation) {
    case 'increaseQty':
      prisma.user.update({
        where: {
          id: (userId as string),
          //@ts-ignore
          cart: { productId: productId },
        },
        //@ts-ignore
        data: { cart: {quantity:{increment:1}} }
      })
      console.log('test!!');
      res.send({message:'test!!'})
      
      break;
    case 'decreaseQty':
      
      break;
    case 'addProduct':
      
      break;
    case 'deleteProduct':
      
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
