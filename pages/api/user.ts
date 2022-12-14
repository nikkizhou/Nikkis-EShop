import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/prismaClient'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET':
      await getUser(req, res); break;
    case 'PUT':
      await updateUser(req, res); break;
    default:
      res.status(405).json({error:'Invalid request method!'})
      break;
  }
}

export default handler



//--------------------------- HTTP Response Operations ---------------------------

const getUser = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.query) return res.status(400).json({ message: 'Please Provide User Email as Param' })
  const [email, name] = [req.query.email as string, req.query.name as string]
  const DbQuery = {
    where: { email },
    update: {},
    create: { email, name },
  }
  await prisma.user.upsert(DbQuery)
    .then(user => res.status(200).json(user))
    .catch(error => console.log(error))
}


const updateUser = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (!req.body) return res.status(400).json({ error: 'Please Provide Request Body' })
    const DbQuery = {
      where: { id: req.body.id },
      data: req.body
    }
    await prisma.user.update(DbQuery)
      .then(user => res.status(200).json(user))
      .catch(error => console.log(error))  
}
