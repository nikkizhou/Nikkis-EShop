import express, { Request, Response, Application } from 'express';
import contactEmail from '../controllers/nodemailer'

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const mail: Object = {
    from: name,
    to: process.env.ADDRESS,
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

export default router
