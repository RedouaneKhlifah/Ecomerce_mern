import Express, { urlencoded } from "express";
import Dotenv from "dotenv";
import Cors from "cors";
import ConnectDB from "./config/db.js";
import { ProductRouter } from "./routes/ProductRoute.js";
import { UserRouter } from "./routes/UserRoutes.js";
import Errorhandler from "./middleware/ErrorHandler.js";

Dotenv.config();

const app = Express();
const Port = process.env.Port || 3009;

app.use(Express.json());
app.use(urlencoded({ extended: false }));
app.use(Cors());

ConnectDB();
app.use("/products", ProductRouter);
app.use("/user", UserRouter);

app.use(Errorhandler);

app.listen(Port, () => {
  console.log(`server is listening to http://localhost:${Port}`);
});
