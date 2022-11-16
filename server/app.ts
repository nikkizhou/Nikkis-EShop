import express, { Request, Response, Application } from 'express';
import "dotenv/config"
import cors from "cors"
import contactEmail from './nodemailer'
import db from "./models";

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
app.use(express.urlencoded({ extended: true }));

app.use("/", router);


db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err:Error) => {
    console.log("Failed to sync db: " + err.message);
  });


export default app;
