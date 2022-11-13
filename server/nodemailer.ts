
import nodemailer from "nodemailer"

const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
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



export default contactEmail;
