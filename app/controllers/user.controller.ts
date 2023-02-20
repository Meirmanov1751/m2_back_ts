import {NextFunction, Request, Response} from 'express';
import RequestWithUserInterface from "../interfaces/requestWithUser.interface";
const {User} = require( "../models/user.model");

exports.allAccess = (req: Request, res: Response) => {
  res.status(200).send("Public Content.");
};

exports.getMe = async (req: RequestWithUserInterface, res: Response) => {
  let user = await User.findById(req.userId).exec();
  return res.status(200).send(user);
};

exports.userBoard = (req: Request, res: Response) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req: Request, res: Response) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req: Request, res: Response) => {
  res.status(200).send("Moderator Content.");
};
