import Dotenv from "dotenv";

Dotenv.config();

function Errorhandler(err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "Production" ? null : err.stack,
  });
}

export default Errorhandler;
