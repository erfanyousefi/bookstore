import { Router } from "express";
import authPassport from "./../../passport/passport"
import { bookController } from "../../http/controllers/api/book/book.controller";
import { createBookValidator } from "../../http/validators/createbook";
import { validatorHandler } from "../../helpers/functions"
import uploadImage from "../../helpers/uploadImage"
import { ObjectId } from "../../http/validators/ObjectIDValidator";
const router = Router()
const passportJwt = authPassport()

router.get("/", bookController.getAllBooks)
router.post("/", passportJwt.authenticate(), uploadImage.single("image"), createBookValidator(), validatorHandler, bookController.createBook)
router.get("/:id", ObjectId(), validatorHandler, bookController.findBook);
router.delete("/:id", passportJwt.authenticate(), ObjectId(), validatorHandler, bookController.deleteBook);
router.patch("/:id",ObjectId(), uploadImage.single("image"), passportJwt.authenticate(), ObjectId(), validatorHandler, bookController.editBook);
export default router;