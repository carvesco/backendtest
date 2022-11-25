import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";

const router = Router()

router.get('/users',userCtrl.getUsers)

router.post('/users/login',userCtrl.logIn)

router.post('/users',userCtrl.createUser)

router.delete('/users/:id',userCtrl.deleteUser)

export default router