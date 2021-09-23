import { Schema, model, Types, Document } from "mongoose";
interface BookType extends Document {
    name: string;
    author: string;
    publisher: string;
    publishDate: Date;
    version: number
    image: string;
    user: any;
    price : string;
    pages : number;
}
const BookSchema = new Schema<BookType>({
    name: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publishDate: { type: Date, required: true },
    version: { type: Number, required: true },
    image: { type: String, required: true },
    price : {type : String, required : false, default : undefined},
    pages : {type : Number, required : true},
    user: { type: Types.ObjectId, ref: 'user', required: [true, "کاربراجباری میباشد"] }
}, {
    timestamps: true
})
export const Book = model<BookType>('book', BookSchema);
