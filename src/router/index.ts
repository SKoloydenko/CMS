import { Router } from "express";
import authRouter from "./routes/auth";
import courseRouter from "./routes/course";

const router = Router();

router.use("/auth", authRouter);
router.use("/courses", courseRouter);

export default router;
