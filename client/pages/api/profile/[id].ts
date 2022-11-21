import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Data = {
  message?: string
  error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const id = req.query.id as string
    const reqBody = JSON.parse(req.body)
    const reqBodyFixed = { ...reqBody, phone: Number(reqBody.phone)}
    
    await prisma.user.update({
      where: { id: id },
      data: reqBodyFixed
    })
    
    res.status(200).json({ message: 'Profile Updated!' })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:error.message})
  }
  
 }

export default handler
