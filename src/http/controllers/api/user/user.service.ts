import { Controller } from "../../controllers";
import { User } from "../../../../models/users"
interface CreateUser {
    name: string;
    username: string;
    password: string;
}
class UserService extends Controller {
    public async create(users: Array<CreateUser>) {
        const usersExist = await User.find({ $or: [{ username: 'bookstore1' }, { username: 'bookstore2' }] })
        if (!usersExist.length) {
            await User.create(users).catch(err => {
                if (err?.code === 11000) throw { status: 400, success: false, message: "نام کاربری قبلا استفاده شده نام کاربری دیگری را انتخاب کنید " }
                throw { status: 500, success: false, error: "InternalServerError", message: "ثبت نام انجام نشد لطفا مجددا تلاش بفرمائید" }
            })
            return true
        }
        return false

    }
}

export const userService = new UserService()