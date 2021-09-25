import { body } from "express-validator"
export const registerValidator = () => {
    return [
        body('name')
            .notEmpty()
            .isLength({ min: 5 })
            .withMessage("نام و نام خانوادگی را به طور صحیح وارد کنید حداقل 5 کاراکتر"),
        body('username')
            .notEmpty()
            .isAlphanumeric()
            .isLength({ min: 5, max: 20 })
            .withMessage("نام کاربری  را با حروف اعداد لاتین و حداقل 5 و حداکثر 20 کاراکتر قرار دهدید"),
        body('password')
            .notEmpty()
            .isLength({ min: 6, max: 20 })
            .withMessage("رمز عبور نمیتواند خالی باشد و حداقل 6 و حداکثر 20 کاراکتر باشد")
    ]
}
export const loginValidator = () => {
    return [
        body('username')
            .notEmpty()
            .isAlphanumeric()
            .isLength({ min: 5, max: 20 })
            .withMessage("نام کاربری  را با حروف اعداد لاتین و حداقل 5 و حداکثر 20 کاراکتر قرار دهدید"),
        body('password')
            .notEmpty()
            .isLength({ min: 6, max: 20 })
            .withMessage("رمز عبور نمیتواند خالی باشد و حداقل 6 و حداکثر 20 کاراکتر باشد")
    ]
}