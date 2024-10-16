import express from "express";
import userController from "../controllers/user.controller.js";
const router = express();

router.get('/', userController.courses)

router.get('/active', userController.coursesActive)

router.get('/pending', userController.coursesPending)

export default router;