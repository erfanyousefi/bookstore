export class CreateBookDTO {
    name!: string
    author!: string
    publisher!: string
    publishDate!: Date
    version!: number
    image!: string
    user!: string
    pages!: number
    price!: string
    constructor(body : any){
        this.name = body.name;
        this.author = body.author;
        this.publisher = body.publisher;
        this.publishDate = new Date(body.publishDate);
        this.version = body.version;
        this.image = body.image;
        this.user = body.user;
        this.price = body.price;
        this.pages = body.pages;
    }
}