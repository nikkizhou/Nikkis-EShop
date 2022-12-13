import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer"



const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.body) return res.status(400).send({ error: 'Please Provide Request Body' })
  if (req.method != 'POST') return res.status(400).send({ error: 'Only POST method accepted!' })

  
  const { name, email, message } = req.body;
  const mail: Object = {
    from: name,
    to: process.env.CONTACT_EMAIL_ADDRESS,
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  

  const contactEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CONTACT_EMAIL_ADDRESS,
      pass: process.env.CONTACT_EMAIL_PASS
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  contactEmail.verify((error) => {
    if (error) console.log(error);
    else console.log("Ready to Send");
  });

  await contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.log(error);
      res.send({ status: { error: error.message } });
    }
    else res.send({ status: "Message Sent" });
  });
 
}

export default handler
