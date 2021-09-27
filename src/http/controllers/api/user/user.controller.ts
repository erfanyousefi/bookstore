import { Controller } from "../../controllers";
import { userService } from "./user.service";
class UserController extends Controller {
    public async createAutoUsers() {
        try {
            const users = [
                { name: "admin1", username: "bookstore1", password: await this.hashString("A1234567") },
                { name: "admin2", username: "bookstore2", password: await this.hashString("B1234567") },
            ]
            const state = await userService.create(users);
            if (state) {
                console.log("users Created");
            } else {
                console.log("can not create users....");
            }
        } catch (error: any) {
        }

    }
}

export const userController = new UserController()