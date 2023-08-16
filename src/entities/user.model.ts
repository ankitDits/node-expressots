import mongoose, { Model } from "mongoose";
export interface IUSER extends Document {
    _id: string
    name: string;
    email: string;
    password: string;
}
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const UserModel: Model<IUSER> = mongoose.model<IUSER>('user', userSchema);
export default UserModel;