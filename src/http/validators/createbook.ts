import {body} from "express-validator"
import path from "path"
export function createBookValidator() {
    return [
        body("name")
            .notEmpty()
            .isLength({ min: 3, max: 25 })
            .withMessage("لطفا نام کتاب را با حداقل 5 و حداکثر 25 نویسه وارد کنید"),
        body("author")
            .notEmpty()
            .isLength({ min: 3, max: 25 })
            .withMessage("لطفا نام نویسنده را با حداقل 5 و حداکثر 25 نویسه وارد کنید"),
        body("publisher")
            .notEmpty()
            .isLength({ min: 3, max: 25 })
            .withMessage("لطفا نام ناشر را با حداقل 5 و حداکثر 25 نویسه وارد کنید"),
            body("publishDate")
            .isDate()
            .withMessage("لطفا فرمت تاریخ انتشار را به درستی وارد کنید"),
            body("price")
            .notEmpty()
            .isNumeric()
            .withMessage("لطفا قیمت کتاب را به واحد تومان وارد کنید"),
        body("pages")
            .notEmpty()
            .isNumeric()
            .withMessage("لطفا تعداد صفحات را به صورت عددی وارد کنید"),
        body("image").custom((value, { req }) => {
            if (req.file) {
                let size = req.file.size;
                const ext = path.extname(req.file.originalname)
                const fileTypes = [".png", ".jpg", ".jpeg", ".webp", ".gif"]
                if (fileTypes.includes(ext)) {
                    if (size > 255000) {
                        throw new Error('تصویر انتخاب شده نمیتواند بیشتر از 255 کیلو بایت باشد')
                    } else {
                        return true;
                    }
                } else {
                    throw `فرمت وارد شده ی تصویر باید یکی از فرمت های '.png', '.jpg', '.jpeg', '.webp', '.gif' باشد`;
                }
            } else {
                throw "لطفا یک فایل را انتخاب کنید"
            }
        }),
        body("version")
            .notEmpty()
            .withMessage("لطفا نسخه چاپ کتاب را وارد کنید")
    ]
}