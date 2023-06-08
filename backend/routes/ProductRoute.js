import ProductController from "../controllers/ProductController.js";
import { Router } from "express";
import Auth from "../middleware/AuthMiddleware.js";

const router = Router();

// get routes
router.get("/", ProductController.Get);

router.get("/:id", ProductController.GETById);

// post routes
router.post("/", Auth, ProductController.Post);

// put route
router.put("/:id", Auth, ProductController.Put);

// delete route
router.delete("/:id", Auth, ProductController.Destroy);

export { router as ProductRouter };
