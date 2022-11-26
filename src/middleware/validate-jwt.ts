import jwt from "jsonwebtoken";
import { Express, Request, Response, NextFunction } from "express";
import config from "../config";

const verifytoken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "acceso denegado" });
  try {
    const verified = jwt.verify(token, config.SECRET);
    //req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "token no es valido" });
  }
};

export default verifytoken;
