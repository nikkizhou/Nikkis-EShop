import db from "../models";
import { Request, Response } from 'express';
const User = db.user;
const Op = db.Sequelize.Op;

export const addUser = async (req: Request, res: Response) => {
  if (req.body) {
    const { name, email, address, phone} = req.body
    const user = { name, email, address,phone };

    User.create(user)
      .then((data: any) => { res.status(201).json({ success: "User created" })})
      .catch((err: Error) => { res.status(500).send({ message: err.message || "Failed to add user to database" })});
    
    return user;
  }

  res.status(400).json({ error: "Failed to add. Please provide request body" });
};


export const findAll = (req: Request, res: Response) => {
  User.findAll()
    .then(data => res.send(data))
    .catch(err => {res.status(500).send({message:err.message || "Some error occurred while retrieving tutorials."}) });
};

export const findOne = (req: Request, res: Response) => {

};

export const update = (req: Request, res: Response) => {

};


export const deleteUser = (req: Request, res: Response) => {

};

export const deleteAll = (req: Request, res: Response) => {

};

export const findAllPublished = (req: Request, res: Response) => {

};
