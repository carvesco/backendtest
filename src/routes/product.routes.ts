import { Router } from "express";
import * as productCtrl from "../controllers/product.controller";

const router = Router()

router.get('/products',productCtrl.getProducts)

router.get('/products/:id',productCtrl.getProduct)

router.post('/products',productCtrl.createProduct)

router.put('/products/:id',productCtrl.updateProduct)

router.delete('/products/:id',productCtrl.deleteProduct)


export default router