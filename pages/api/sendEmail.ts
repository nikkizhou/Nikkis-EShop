import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) return res.status(400).send({ error: 'Please Provide Request Body' })
  if (req.method != 'POST') return res.status(405).send({ error: 'Only POST method accepted!' })
  const { name, email, message, orderNr, phone, address, products } = req.body;
 
  const htmlForOrders = 
    `<h1>Thanks for your order at Nikki's Eshop!<h1> 
    <h3>Order number: ${req.body.orderNr};<h3>
    <h3>Address: ${address}; &emsp;&emsp;Phone: ${phone};<h3>
    <h2>Products Details: <h2>
    ${products?.map(pro => `
        <img src=${pro.image} width=100 height=100> 
        <p>ProductId: ${pro.id};&emsp;&emsp;
          Name: ${pro.title};<br>
          Amount:${pro.quantity};&emsp;&emsp;&emsp;
          Price:${(pro.price * pro.quantity)}kr;
        <p>
      `)}
    `

  const htmlForContactForm =
    `<p>Name: ${name}</p>
     <p>Email: ${email}</p>
     <p>Message: ${message}</p>`
  
  const mail: Object = 
    {
      from: name,
      to: email,
      subject: orderNr ? "Order confirmation" : "Contact Form Submission",
      html: orderNr ? htmlForOrders : htmlForContactForm,
    }
  

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
