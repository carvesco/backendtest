import { RequestHandler } from "express";
import mongoose, { Types } from "mongoose";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
  }
};

export const logIn: RequestHandler = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (userFound) {
    const auth = bcrypt.compareSync(req.body.password, userFound.password);
    if (auth) {
      const token = jwt.sign(
        { id: userFound.id, name: userFound.name },
        config.SECRET,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).json({ token });
    } else {
      return res.status(204).json({ message: "Contraseña incorrecta" });
    }
  } else {
    return res.status(204).json();
  }
};

export const createUser: RequestHandler = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound) {
    return res.status(301).json({ message: "user with email already exists" });
  } else {
    const user = new User(req.body);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;
    const savedUser = await user.save();
    //console.log(user.password);
    const token = jwt.sign(
      { id: savedUser.id, name: savedUser.name },
      config.SECRET,
      {
        expiresIn: 86400,
      }
    );
    return res.status(200).json({ token });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const valid = Types.ObjectId.isValid(req.params.id);
  if (!valid) return res.status(204).json({ message: "no es un id valido" });
  const userFound = await User.findByIdAndDelete(req.params.id);
  if (!userFound) return res.status(204).json();
  return res.json({ message: "deleted" });
};
