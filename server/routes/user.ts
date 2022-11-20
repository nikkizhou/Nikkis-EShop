import express, { Request, Response, Application } from 'express';
import { addUser, findAll } from '../controllers/user.controller'

const router = express.Router();

router.post("/", addUser)
router.get("/all", findAll)


export default router
