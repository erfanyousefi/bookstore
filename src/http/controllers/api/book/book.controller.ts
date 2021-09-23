import { NextFunction, Request, Response } from "express";
import { Controller } from "../../controllers";
import { BookService } from "./book.service"
import { CreateBookDTO } from "./dto/create-book.dto";
import { SearchBookDTO } from "./dto/search-book.dto";
const bookService = new BookService();
class BookController extends Controller {
    async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            let image = this.getFileName(req.file)
            req.body.image = image
            req.body.user =  "507f1f77bcf86cd799439011"
            const bookData: CreateBookDTO = new CreateBookDTO(req.body);
            console.log({...bookData});
            const book = await bookService.create({ ...bookData })
            return res.status(201).json({
                status: 201,
                message: "افزودن کتاب با موفقیت انجام شد",
                result: {
                    book
                }
            })
        } catch (error: any) {
            console.log(error);
            
            next(error);
        }
    }
    async getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const query: SearchBookDTO = req.query;
            const books = await bookService.findAll(query)
            return res.json({
                status: 200,
                success: true,
                result: {
                    books
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await bookService.deleteById(id);
            if(!result) throw {status : 500, message : "حذف کتاب انجام نشد"}
            return res.status(202).json({
                status : 202,
                success : true,
                message : "حذف کتاب با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async findBook(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const book = await bookService.findById(id);
            return res.status(202).json({
                status : 200,
                success : true,
                result : {
                    book
                }
            })
        } catch (error) {
            next(error)
        }
    }

}
export const bookController = new BookController()