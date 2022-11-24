import { RequestHandler } from "express";
import mongoose, { Types } from "mongoose";
import User from "../models/User";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const valid = Types.ObjectId.isValid(req.params.id);

  if (!valid) {
    return res.status(204).json({ message: "no es un id valido" });
  }
  const userFound = await User.findById(req.params.id);
  console.log(userFound);
  if (!userFound) {
    return res.status(204).json();
  }
  return res.json(userFound)
};

export const createUser: RequestHandler = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound) {
    return res.status(301).json({ message: "user with email already exists" });
  }
  const user = new User(req.body);
  const savedUser = await user.save();
  console.log(user);
  res.json(savedUser);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const valid = Types.ObjectId.isValid(req.params.id);
  if (!valid) return res.status(204).json({ message: "no es un id valido" });
  const userFound = await User.findByIdAndDelete(req.params.id);
  if (!userFound) return res.status(204).json();
  return res.json({ message: "deleted" });
};
