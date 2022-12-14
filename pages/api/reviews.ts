import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/prismaClient'
import { uuid } from 'uuidv4'
import { Order } from '../../interfaces'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      if (!req.query) return res.status(400).send({ error: 'Please Provide ProductId' })
      await getReviews(req, res); break
    case 'POST':
      if (!req.body) return res.status(400).send({ error: 'Please Provide Request Body' })
      await addReview(req, res); break
    default:
      res.status(405).json({ error: 'Invalid request method!' }); break
  }
}
export default handler


//--------------------------- Prisma Operations ---------------------------

const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  let productId = Number(req.query.productId)

  await prisma.review.findMany({
    where: { productId },
    orderBy: { assignedAt: 'desc' }
  })
    .then(orders => res.status(200).json(orders))
    .catch(error => console.log(error.message))
}

// req.body: rating,  text,  userId, productId
const addReview = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.review.create({
    data: req.body
  })
    .then(review => res.status(200).json(review))
    .catch(error => console.log(error))
}
