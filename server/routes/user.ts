import express, { Request, Response, Application } from 'express';
import {addUser} from '../controllers/user.controller'

const router = express.Router();

router.post("/", addUser)
router.get("/all", addUser)


export default router
