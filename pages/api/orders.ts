import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/prismaClient'
import ShortUniqueId from 'short-unique-id'
import { Order } from '../../interfaces'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      if (!req.query) return res.status(400).send({ error: 'Please Provide UserId' })
      await getOrders(req, res); break
    case 'POST':
      if (!req.body) return res.status(400).send({ error: 'Please Provide Request Body' })
      await addOrders(req, res); break
    case 'PUT':
      if (!req.body) return res.status(400).send({ error: 'Please Provide Request Body' })
      await updateOrder(req, res); break
    default:
      res.status(405).json({ error: 'Invalid request method!' }); break
  } 
}
export default handler


//--------------------------- Prisma Operations ---------------------------

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  let userId = req.query.userId as string
  
  await prisma.orderItem.findMany({
    where:{userId},
    include: { product: true },
    orderBy:{assignedAt:'desc'}
  })
    .then(orders => res.status(200).json(orders))
    .catch(error => console.log(error.message))
}


const addOrders = async (req: NextApiRequest, res: NextApiResponse) => { 
  const uid = new ShortUniqueId({ length: 15 })
  const orderNr = uid()
  const orders = req.body.map((order: Order) => ({ ...order, orderNr }))
  
  await prisma.orderItem.createMany({
    data: orders
  })
   .then(orders => res.status(200).json(orders))
   .catch(error => console.log(error))  
}

const updateOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body,'req body line 55');
  
  await prisma.orderItem.update({
    where: { id: req.body.id },
    data: req.body
  })
    .then(newOrder => res.status(200).json(newOrder))
    .catch(error => console.log(error))
}
