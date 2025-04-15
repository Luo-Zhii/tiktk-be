
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MouseLogDocument = HydratedDocument<MouseLog>;

@Schema({ timestamps: true })
export class MouseLog {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId; 

  @Prop()
  name: string;  

  @Prop()
  email: string; 

  @Prop()
  date: string;  

  @Prop()
  time: string;  

  @Prop()
  duration: number;  

  @Prop()
  leftClick: boolean;  

  @Prop()
  rightClick: boolean;  

  @Prop()
  middleClick: boolean;  

  @Prop()
  mouseX: number;  

  @Prop()
  mouseY: number;  

  @Prop()
  scrollX: number;  

  @Prop()
  scrollY: number;  

}

export const MouseLogSchema = SchemaFactory.createForClass(MouseLog);
