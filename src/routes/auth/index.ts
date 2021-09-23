import { Router } from "express";
import {bookController} from "../../http/controllers/api/book/book.controller";
import { createBookValidator } from "../../http/validators/createbook";
import { validatorHandler } from "./../../helpers/functions"
const router = Router();
router.get("/register", (req, res, next) => {
    res.send("Register Section");
})

router.post("/register", createBookValidator(), validatorHandler, PhotographerController.register)

router.get("/login", (req, res, next) => {
    res.send("Login Section");
})
export default router;