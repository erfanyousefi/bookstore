import { User } from "../../../../models/users";
import { Controller } from "../../controllers";

export class AuthService extends Controller {
    async register(user: any) {
        await User.create(user).catch(err => {
            if (err?.code === 11000) throw { status: 400, success: false, message: "نام کاربری قبلا استفاده شده نام کاربری دیگری را انتخاب کنید " }
            throw { status: 500, success: false, error: "InternalServerError", message: "ثبت نام انجام نشد لطفا مجددا تلاش بفرمائید" }
        })
        return true
    }
    async login(username: string, password: string) {
        const user = await User.findOne({ username });
        if (!user) throw { status: 404, success: false, message: "نام کاربری یا رمز عبور اشتباه میباشد" }
        if (!this.verifyHash(password, user.password)) throw { status: 404, success: false, message: "نام کاربری یا رمز عبور اشتباه میباشد" }
        const token = await this.createJwtToken({ username: user.username, id: user._id }, 6);
        user.token = token;
        await user.save().catch(err => {
            throw { status: 500, success: false, message: "ورود به حساب کاربری انجام نشد لطفا مجددا تلاش بفرمائید" }
        })
        return token

    }
}

export const authService = new AuthService()