import { RequestHandler } from "express";
import mongoose, { Types } from "mongoose";
import Product from "../models/Product";

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.log(err);
  }
};
export const getProduct: RequestHandler = async (req, res) => {
  const valid = Types.ObjectId.isValid(req.params.id);

  if (!valid) {
    return res.status(204).json({ message: "no es un id valido" });
  }
  const productFound = await Product.findById(req.params.id);
  console.log(productFound);
  if (!productFound) {
    return res.status(204).json();
  }
  return res.json(productFound);
};

export const createProduct: RequestHandler = async (req, res) => {
  const productFound = await Product.findOne({ email: req.body.email });
  if (productFound) {
    return res.status(301).json({ message: "user with email already exists" });
  }
  const product = new Product(req.body);
  const savedProduct = await product.save();
  console.log(product);
  res.json(savedProduct);
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const valid = Types.ObjectId.isValid(req.params.id);
  if (!valid) return res.status(204).json({ message: "no es un id valido" });
  const productFound = await Product.findByIdAndDelete(req.params.id);
  if (!productFound) return res.status(204).json();
  return res.json({ message: "deleted" });
};
