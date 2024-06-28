import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "./controller.js";

const router = express.Router();

router.get('/kucing', getProducts);
router.get('/kucing/:id', getProductById);
router.post('/kucing', createProduct);
router.patch('/kucing/:id', updateProduct);
router.delete('/kucing/:id', deleteProduct);



export default router;