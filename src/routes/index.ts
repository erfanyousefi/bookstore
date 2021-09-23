import BookRouter from "./book/book.routes";
import { Router } from "express";
const router = Router();
router.use("/books", BookRouter);
export default router;