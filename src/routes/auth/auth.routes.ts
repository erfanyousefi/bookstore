import { Router } from "express";
import { authController } from "../../http/controllers/api/auth/auth.controller";
import { registerValidator, loginValidator } from "../../http/validators/authValidator";
import { validatorHandler } from "../../helpers/functions"
const router = Router();

router.post("/register", registerValidator(), validatorHandler, authController.register)
router.post("/login", loginValidator(), validatorHandler, authController.login)
export default router;