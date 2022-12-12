import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { UserI } from '../../../interfaces';
const prisma = new PrismaClient();


const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  switch (req.method) {
    case 'GET':
      getUser(req, res); break;
    case 'PUT':
      updateUser(req, res); break;
    default:
      res.status(400).json({error:'Invalid request method!'})
      break;
  }
}

export default handler


const getUser = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    if (!req.query) return res.status(400).json({ message: 'Please Provide User Email as Param' })

    const [email, name] = [req.query.email as string, req.query.name as string]
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        cart: { create: [] }
      },
    })
    //console.log(user,'user api/user line 36');
    
    res.status(200).json(user)

  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error.message })
  }
}


const updateUser = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log(req.body,'req.body api/user line 47');
  
  try {
    if (!req.body) return res.status(400).json({ error: 'Please Provide Request Body' })
    const newProfile = await prisma.user.update({
      where: { id: req.body.id },
      data: req.body
    })
    res.status(200).json(newProfile)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
