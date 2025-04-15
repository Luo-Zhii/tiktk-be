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
}
