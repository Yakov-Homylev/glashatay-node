import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, Roles, TUserModel } from '@/types/user.types';

const UserSchema = new Schema<IUser>(
    {
        login: {
            type: String,
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9_-]{3,20}$/, 'Недопустимый логин'],
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: { type: String },
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
        about: { type: String },
        role: {
            type: String,
            enum: Object.values(Roles),
            default: Roles.User,
        },
    },
    {
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: { virtuals: true },
    },
);

UserSchema.methods.setPassword = async function (password: string) {
    this.password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = model<IUser, TUserModel>('Users', UserSchema);
