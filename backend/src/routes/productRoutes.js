import express from "express";
import * as productController from "../controllers/productController.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);

router.post("/products", verifyToken, verifyAdmin, productController.createProduct);
router.put("/products/:id", verifyToken, verifyAdmin, productController.updateProduct);
router.delete("/products/:id", verifyToken, verifyAdmin, productController.deleteProduct);



export default router;
