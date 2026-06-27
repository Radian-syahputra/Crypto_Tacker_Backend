import User from "../user/model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { IUser } from "../user/model";

export const registerService = async (username : string, email: string, password: string) => {
    const existingUser = await User.findOne({email})
    if(existingUser) {
        throw new Error("Email sudah terdaftar")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        email,
        password : hashedPassword
    })

    return user
}

export const loginService = async (email : string, password : string) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error("User tidak ditemukan")
    }

    const isPassword = await bcrypt.compare(password, user.password)
    if(!isPassword) {
        throw new Error("Password Salah!")
    }

    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET as string, {
        expiresIn : '7d'
    })

    return {user, token}
}

export const getMeService = async (userId : string) : Promise<IUser | null>=> {
    const user = await User.findById(userId).select("-password")
    return user
}