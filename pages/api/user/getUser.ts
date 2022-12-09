import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { UserI } from '../../../interfaces';
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    if (!req.query)
      return res.status(400).json({ message: 'Please Provide User Email as Param' })

    const [email, name] = [req.query.email as string, req.query.name as string]
    let user = await prisma.user.findUnique({ where: { email } })

    if (!user)
      user = await prisma.user.create({ data: { email, name } })
    res.status(200).json(user)
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}

export default handler
