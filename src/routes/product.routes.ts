import { Router } from "express";
import * as productCtrl from "../controllers/product.controller";

const router = Router()

router.get('/products',productCtrl.getProducts)

router.get('/products/:id',productCtrl.getProduct)

router.post('/products',productCtrl.createProduct)

router.delete('/products/:id',productCtrl.deleteProduct)


export default router