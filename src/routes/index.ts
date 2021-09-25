import BookRouter from "./book/book.routes";
import AuthRouter from "./auth/auth.routes";
import { Router } from "express";
const router = Router();
router.use("/books", BookRouter);
router.use("/auth", AuthRouter);
export default router;