// schemas/mouse-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MouseLogDocument = HydratedDocument<MouseLog>;

@Schema({ timestamps: true })
export class MouseLog {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId; // Liên kết đến User

  @Prop()
  name: string;  // Tên người dùng

  @Prop()
  email: string; // Email người dùng

  @Prop()
  date: string;  // Ngày ghi lại log

  @Prop()
  time: string;  // Thời gian ghi lại log

  @Prop()
  duration: number;  // Thời gian người dùng tương tác (có thể tính theo sự kiện)

  @Prop()
  leftClick: boolean;  // Click trái chuột

  @Prop()
  rightClick: boolean;  // Click phải chuột

  @Prop()
  middleClick: boolean;  // Click giữa chuột

  @Prop()
  mouseX: number;  // Tọa độ X của chuột

  @Prop()
  mouseY: number;  // Tọa độ Y của chuột

  @Prop()
  scrollX: number;  // Vị trí cuộn X

  @Prop()
  scrollY: number;  // Vị trí cuộn Y

}

export const MouseLogSchema = SchemaFactory.createForClass(MouseLog);
