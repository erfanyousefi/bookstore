import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config({ path: __dirname + '/.env' })
import http from "http"
import AllRoutes from "./routes";
import mongoose from "mongoose";
const app = express();
class Application {
    constructor() {
        this.configApplication()
        this.configRoutes()
        this.errorHandler()
        this.createServer()
        this.configDatabase()
    }
    private configDatabase() {
        mongoose.connect("mongodb://localhost:27017/book-store").then(() => {
            console.log("DataBase > connected");
        }).catch(() => {
            console.log("DataBase > Faild");

        })
    }
    private configApplication() {
        app.use(cors())
        app.use(express.static("public"))
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
    }
    private createServer() {
        const server = http.createServer(app);
        server.listen(process.env.PORT, () => {
            console.log(`Run Server > http://localhost:${process.env.PORT}`);
        })
    }
    private configRoutes() {
        app.use(AllRoutes)
        app.get("/", (req, res, next) => {
            res.send("Hello World")
        })
    }
    private errorHandler() {
        app.use("*", (req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: "NotFoudPage",
            })
        })
        app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            if (error.status) {
                return res.status(error.status).json({
                    status: error.status,
                    message: error.message
                })
            } else {
                return res.status(503).json({
                    status: 503,
                    message: "UnavailableService"
                })

            }
        })
    }
}
new Application()