import { ValidationError, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import fs from "fs"
function removeFileIFAnError(Req_File: any) {
    if (Req_File) {
        let path = `${Req_File.destination}/${Req_File.filename}`
        if (fs.existsSync(path)) {
            fs.unlinkSync(path)
        } else {
            return true;
        }
    }
}
export function errorValidationHandler(errors: ValidationError) {
    let data: any = {}
    Object.values(errors).forEach(err => {
        data[err.param] = err.msg
    })
    return data
}
export const validatorHandler = (req: Request, res: Response, next: NextFunction) => {
    const result: any = validationResult(req);
    if (result.isEmpty()) {
        next()
    } else {
        const errors = errorValidationHandler(result.errors)
        if (req.file) {
            removeFileIFAnError(req.file)
        }
        return res.status(400).json({
            status: 400,
            success: false,
            errors
        })
    }
}