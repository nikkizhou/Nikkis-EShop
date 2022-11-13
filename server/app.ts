import express, { Request, Response, Application } from 'express';
import "dotenv/config"
import cors from "cors"
import contactEmail from './nodemailer'

const router = express.Router();

router.post("/contact", (req: Request, res: Response) => {
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


const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

export default app;
