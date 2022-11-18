import express, { Request, Response, Application } from 'express';
import "dotenv/config"
import cors from "cors"
import db from "./models";
import emailRouter from './routes/email'
import userRouter from './routes/user'


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contact", emailRouter);
app.use("/profile", userRouter);



db.sequelize.sync({ force: true })
  .then(() => console.log("Succeeded connecting to db."))
  .catch((err:Error) => console.log("Failed to sync db: " + err.message));

export default app;
