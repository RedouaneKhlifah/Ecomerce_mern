import { Router } from "express";
import UserController from "../controllers/UserController.js";
import Auth from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/login", UserController.login);

router.post("/register", UserController.create);

router.get("/me", Auth, UserController.Get);

// router.delete("/:id", UserController.destroy);

export { router as UserRouter };
