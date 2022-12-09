import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { UserI } from '../../../interfaces';
const prisma = new PrismaClient();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.body) return res.status(400).json({ message: 'Please Provide Request Body' })
    // try to include id in reqBody??
    //const id = req.query.id as string
    //const reqBody = JSON.parse(req.body)
    //const reqBodyFixed = { ...reqBody, phone: Number(reqBody.phone) }
    const newProfile = await prisma.user.update({
      where: { id: req.body.id },
      data: req.body
    })
    
    res.status(200).json(newProfile)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}

export default handler
