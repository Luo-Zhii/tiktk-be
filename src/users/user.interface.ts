import mongoose from "mongoose";

export class IUser {
    _id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    refreshToken?: string;
}