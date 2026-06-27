import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username : string,
    email : string
    password : string
}


const userSchema = new mongoose.Schema<IUser>({
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    }
}, {
    timestamps: true,
})

const User = mongoose.model<IUser>("User", userSchema)

export default User