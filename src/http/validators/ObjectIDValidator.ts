import { check, param } from "express-validator"
import { isValidObjectId } from "mongoose"
export function ObjectId(field : string = "id") {
    return [
        check(field).custom(value => {
            if (!isValidObjectId(value)) throw "شناسه ی ارسال شده صحیح نمیباشد"
            return true;
        })
    ]
}