import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Controller } from "../../controllers";
import { authService } from "./auth.service";
let errorList: any = {}
class AuthController extends Controller {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            errorList = {}
            const result: any = validationResult(req);
            if (result.isEmpty()) {
                const { username, password, name } = req.body;
                const hashPassword = await this.hashString(password)
                const user = { name, username, password: hashPassword }
                const state = await authService.register(user);
                if (state) {
                    return res.status(201).json({
                        status: 201,
                        success: true,
                        message: "ثبت نام شما با موفقیت انجام شد لطفا وارد حساب کاربری خود شوید"
                    })
                } else {
                    throw { status: 500, message: "ثبت نام انجام نشد لطفا مجددا تلاش بفرمائید" }
                }
            } else {
                this.errorHandler(result.errors, errorList)
                throw { status: 400, message: "لطفا تمامی فیلد هارا به درستی پر کنید", errors: errorList }
            }
        } catch (error: any) {
            next(error)
        }

    }
    public async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        if (!token) throw { status: 503, success: false, message: "سرویس در حال حاضر در دسترس نمیباشد" }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "ورود شما با موفقیت انجام شد",
            token
        })
    }
}
export const authController = new AuthController()