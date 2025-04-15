import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MouseLog, MouseLogDocument } from './schema/mouse-log.schema';
import { Model } from 'mongoose';

@Injectable()
export class MouseLogService {
    constructor(
        @InjectModel(MouseLog.name) 
        private mouseLogModel: Model<MouseLogDocument>
    ) {}
    async create(data: Partial<MouseLog>) {
        return this.mouseLogModel.create(data);
    }

    async logToMongo(data: any) {
        const logData = data.map((event: any) => {
          return {
            userId: event.userId,  
            name: event.name,      
            email: event.email,    
            date: event.date,      
            time: event.time,      
            duration: event.duration,  
            leftClick: event.leftClick,  
            rightClick: event.rightClick,  
            middleClick: event.middleClick,  
            mouseX: event.mouseX,  
            mouseY: event.mouseY,  
            scrollX: event.scrollX,  
            scrollY: event.scrollY,  
          };
        });
    
        try {
          await this.mouseLogModel.insertMany(logData);
          console.log('Log data inserted into MongoDB');
        } catch (error) {
          console.error('Failed to insert log data into MongoDB:', error);
        }
      }
}
