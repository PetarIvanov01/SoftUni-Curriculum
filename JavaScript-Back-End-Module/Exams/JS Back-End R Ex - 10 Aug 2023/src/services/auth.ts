import bcrypt from "bcrypt";
import User, { User_Document } from "../models/User";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export interface SetSession {
    _id: Types.ObjectId,
    email: string
}

export const register = async ({ firstName, lastName, email, password }) => {

    try {
        const exsiting = await User.findOne({ email })

        if (exsiting) {
            throw new Error('Email is taken!');
        }

        const userPromise: User_Document = new User({
            email,
            firstName,
            lastName,
            password
        });

        const user = await userPromise.save();

        const payload: SetSession = {
            _id: user._id,
            email: user.email
        }

        const token = createSession(payload)
        
        return token;

    } catch (error) {
        throw error
    }
}

export const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Incorrect username or password');
        }

        const hasMatch = await bcrypt.compare(password, user.password);
        if (hasMatch == false) {
            throw new Error('Incorrect username or password');
        }

        const payload: SetSession = {
            _id: user._id,
            email: user.email
        }

        const token = createSession(payload)
        return token;

    } catch (error) {
        throw error
    }

}

function createSession(payload: SetSession) {

    const token: string = jwt.sign(payload, process.env.JWT_SECTER);
    return token;
}

export function verifyToken(token: string) {

    return jwt.verify(token, process.env.JWT_SECTER) as SetSession;
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}