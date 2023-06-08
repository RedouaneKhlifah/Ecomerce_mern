import User from "../models/UserModel.js";
import AsyncHandler from "express-async-handler";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// get //
// @route get /goals
const Get = AsyncHandler(async (req, res) => {
  console.log(req.user);
  const { id, email, name } = req.user;
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});


// register a new user 

const create = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please fill all fields" });
  } else {
    const existuser = await User.findOne({ email });

    if (existuser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hash,
      });

      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          Email: user.email,
          token: generateToken(user.id),
        });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        Email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json("invalid pasword");
    }
  } else {
    res.status(400).json("invalid Email");
  }
  res.json({ message: "login" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret, {
    expiresIn: "30d",
  });
};

export default { Get, create, login };
