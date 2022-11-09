import express from "express"
import "dotenv/config"
import cors from "cors"
import nodemailer from "nodemailer"
const router = express.Router();


const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure:false,
  auth: {
    user: process.env.ADDRESS,
    pass: process.env.PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const {name,email,message} = req.body;
  
  const mail = {
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
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(port, () => console.log("Server Running"));
