import multer,{ diskStorage } from "multer"
import mkdir from "mkdirp"
import fs from "fs"
function getPath() {
    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `./public/uploads/books/${year}/${month}/${day}`;
}
const storage = diskStorage({
    destination: (req, file, cb) => {
        const path = getPath()
        mkdir(path).then(() => {
            cb(null, path)
        }).catch(err => {
            cb(err, "./public/uploads/books")
        })
    },
    filename: (req, file, cb) => {
        const fileLocation = `${getPath()}/${file.originalname}`
        const fileName = file.originalname.replace(/[\s(){}#%@]/gi, "")
        if (fs.existsSync(fileLocation)) {
            cb(null, Date.now() + fileName);
        } else {
            cb(null, fileName)
        }
    }
})

if (!storage) throw { status: 400, error: "Bad Request", message: 'Not Found File in Your Directory' }
const upload = multer({ storage });
export default upload