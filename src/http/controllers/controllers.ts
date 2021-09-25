import fs from "fs";
import autoBind from "auto-bind"
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken"
export class Controller {
    constructor() {
        autoBind(this)
    }
    removeFileIFAnError(Req_File: any) {
        if (Req_File) {
            let path = `${Req_File.destination}/${Req_File.filename}`
            if (fs.existsSync(path)) {
                fs.unlinkSync(path)
            } else {
                return true;
            }
        }
    }
    removeImage(imageField: any) {
        if (imageField) {
            let indexOf = imageField.indexOf(`${process.env.BaseURL}`)
            let length = `${process.env.BaseURL}`.length;
            let path = "./public" + imageField.substr(length);
            if (fs.existsSync(path)) {
                fs.unlinkSync(path)
            } else {
                return true;
            }
        }

    }
    getFileName(Req_File: any) {
        console.log(Req_File);
        if (Req_File) {

            let filePath = `${Req_File.destination}/${Req_File.filename}`.substring(8);
            let host = `${process.env.BaseURL}${filePath}`
            return host
        }
        return undefined
    }
    removeEmptyField(object: any): any {
        Object.keys(object).forEach(key => {
            if (!object[key]) delete object[key]
        })
        return object
    }
    convertFieldToRegExp(object: any): any {
        Object.keys(object).forEach(key => {
            if (!object[key]) delete object[key]
            if (isNaN(object[key])) object[key] = new RegExp(object[key], "ig")
        })
        console.log(object);
        return object
    }
    errorHandler(errors: any, errorList: any) {
        Object.keys(errors).forEach(key => {
            errorList[key] = errors[key]
        })
    }
    hashString(string: string) {
        const salt = genSaltSync(15);
        const hash = hashSync(string, salt)
        return hash
    }
    verifyHash(data: string, hash: string) {
        return compareSync(data, hash)
    }
    async createJwtToken(payload: any, dayExpire: number) {
        const expiresIn = (1000 * 60 * 60 * 24 * (dayExpire || 3)) + Date.now();
        const keyOrSecret = process.env.keySecret || "secretKey"
        const token = await jwt.sign(payload, keyOrSecret, {expiresIn, algorithm : "HS256"});
        return token
    }
}