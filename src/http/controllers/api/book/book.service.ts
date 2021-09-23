
import { Types } from "mongoose";
import { Book } from "../../../../models/books";
import { Controller } from "../../controllers";
import { CreateBookDTO } from "./dto/create-book.dto";
export class BookService extends Controller {
    async create(bookDto: CreateBookDTO) {
        const result = await Book.create({ ...bookDto }).then(doc => doc)
            .catch(error => {
                throw { status: 500, message: "InternalServerError", error }
            })
        return result
    }
    async findAll(query: any) {
        const pageOptions: any = {
            page: parseInt(query.page, 10) || 0,
            limit: parseInt(query.limit, 10) || 10
        }
        delete query.page;
        delete query.limit
        let searchQuery = this.removeEmptyField(query)
        searchQuery = this.convertFieldToRegExp(query)
        const books = await Book.find({ ...searchQuery })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit).exec().catch(err => {
                throw { status: 500, message: "InternalServer" }
            })
        return books
    }
    async findById(id: string) {
        const book = await Book.findById(id);
        if (!book) throw { status: 404, message: "کتابی یافت نشد" }
        return book;
    }

    async deleteById(id: string) {
        const book = await this.findById(id);
        const result = await Book.deleteOne({ _id: book._id });
        if (result.deletedCount > 0) return true
        throw { status: 500, message: "حذف کتاب انجام نشد" }
    }
}