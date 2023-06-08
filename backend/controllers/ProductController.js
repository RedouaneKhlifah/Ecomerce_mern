import Product from "../models/ProductModel.js";
import asynchandler from "express-async-handler";
import User from "../models/UserModel.js";

// get all product
const Get = asynchandler(async function (req, res) {
  const product = await Product.find().exec();
  console.log(product);
  res.json(product);
});

// get product by user id
const GetByUserId = asynchandler(async function (req, res) {
  const product = await Product.find({ user: req.user.id }).exec();
  console.log(product);
  res.json(product);
});

// get product by id
const GETById = asynchandler(async function (req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.json("no product found");
  }
  res.json(product);
  console.log("re");
});

// create a new product
const Post = asynchandler(async function (req, res) {
  // console.log(req.body.name);
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add text field" + req.body.name);
  }

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    user: req.user.id,
  });

  res.json(product);
});

// update product by Id

const Put = asynchandler(async function (req, res) {
  // find the product
  const product = await Product.findById(req.params.id);

  // If product not found, send a 400 error response
  if (!product) {
    res.status(400);
    throw new Error("product not found");
  }

  // find the user
  const user = await User.findById(req.user.id);

  // If user not found, send a 400 error response
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // If the product's user ID does not match the authenticated user ID, send a 401 error response
  if (product.user.toString() !== user.id) {
    console.log("good");
    res.status(401);
    throw new Error("user not auth");
  }

  // Update the product with the request body
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(updatedProduct);
});

// delete by id

const Destroy = asynchandler(async function (req, res) {
  // find the product
  const product = await Product.findById(req.params.id);
  console.log(req.params.id);
  // If product not found, send a 400 error response
  if (!product) {
    res.status(400);
    throw new Error("0 product found ");
  }

  // find the user
  const user = await User.findById(req.user.id);

  // If user not found, send a 400 error response
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // If the product's user ID does not match the authenticated user ID, send a 401 error response
  if (product.user.toString() !== user.id) {
    console.log("good");
    res.status(401);
    throw new Error("user not auth");
  }

  // delete the product with the request body

  const destroyed = await Product.findByIdAndDelete(req.params.id);
  res.json(`Product : ${destroyed.text} , got deleted succufuly`);
});

export default { Get, Post, Put, Destroy, GETById };
