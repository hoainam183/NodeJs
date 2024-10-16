import express from "express";
import coursesRouter from "./courses.js";
import authMiddleware from "../middlewares/auth.Middleware.js";
import userController from "../controllers/user.controller.js";

const router = express();
router.use("/courses", coursesRouter);

router.use(authMiddleware);
router.get("/",userController.index )

router.get("/add", userController.add);

router.get("/active/:id", userController.active);

// users/courses

export default router;
