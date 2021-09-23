import { Document, model, Schema } from "mongoose"
interface UserType extends Document {
    name: string;
    username: string;
    email?: string;
    password: string;
    phone: string;
    token: string;
    avatar?: string;
}
const UserSchema = new Schema<UserType>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    token: { type: String, default: undefined },
    password: { type: String, required: true },
    avatar: { type: String, default: undefined }
}, {
    timestamps: true
})

export const User = model<UserType>('user', UserSchema);