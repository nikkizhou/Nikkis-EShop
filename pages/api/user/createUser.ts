import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { UserI } from '../../../interfaces';
const prisma = new PrismaClient();

type Data = {
  message?: string|UserI
  error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (!req.body) return res.status(400).json({message:'Please Provide Request Body'})
    const {email,name} = req.body
    const user = await prisma.user.create({ data: { email,name } })
    res.status(200).json({ message: user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}

export default handler
