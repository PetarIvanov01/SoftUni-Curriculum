import { Schema, model, Document } from "mongoose";
import { hashPassword } from "../services/auth";

export interface User_Document extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const schema = new Schema<User_Document>({
    firstName: {
        type: String,
        minlength: [1, 'Invalid firstName'],
        required: true
    },
    lastName: {
        type: String,
        min: [1, 'Invalid lastName'],
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: (v: string) => {
                const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                return emailPattern.test(v);
            },
            message: v => `${v.value} is not valid email`
        },
        required: true

    },
    password: {
        type: String,
        required: true
    }
})

schema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hashPassword(user.password);
    }
    next();
})

schema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const UserSchema = model<User_Document>('User', schema);
export default UserSchema
