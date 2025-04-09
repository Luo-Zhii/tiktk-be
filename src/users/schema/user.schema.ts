
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop()
    refreshToken: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop({type: Object})
    createdBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    } 

    @Prop({type: Object})
    updatedBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    } 

    @Prop({type: Object})
    deletedBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    } 
}

export const UserSchema = SchemaFactory.createForClass(User);
