import express from "express";
import homeController from "../controllers/home.controller.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();

router.get('/', homeController.index)

router.get('/san-pham', homeController.showProducts )

router.get("/dang-nhap", authController.login)
router.post("/dang-nhap", authController.handleLogin)
 
export default router;