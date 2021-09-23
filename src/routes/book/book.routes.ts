import { Router } from "express";
import { bookController } from "../../http/controllers/api/book/book.controller";
import { createBookValidator } from "../../http/validators/createbook";
import { validatorHandler } from "../../helpers/functions"
import uploadImage from "../../helpers/uploadImage"
import { ObjectId } from "../../http/validators/ObjectIDValidator";
const router = Router()
router.get("/", bookController.getAllBooks)
router.post("/", uploadImage.single("image"), createBookValidator(), validatorHandler, bookController.createBook)
router.get("/:id", ObjectId(), validatorHandler, bookController.findBook);
router.delete("/:id", ObjectId(), validatorHandler, bookController.deleteBook);
export default router;