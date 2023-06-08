import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
// import dotenv from "dotenv";
// dotenv.config();

const Auth = AsyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const id = jwt.verify(token, process.env.jwt_secret).id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, invalid token");
  }
});

export default Auth;
