import { Document, Schema, Model, model } from "mongoose";
import { User } from "../models/user";

export interface IUserModel extends User, Document { }

export var UserSchema: Schema = new Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    displayname: String,
    password: String,
    created: Date
}, { timestamps: true });

export const Users: Model<IUserModel> = model<IUserModel>("User", UserSchema);