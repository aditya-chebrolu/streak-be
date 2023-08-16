import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DayDocument, DayEntity } from './day.schema';
import { Day } from './day.dto';

@Injectable()
export class DayDAO {
  constructor(
    @InjectModel(DayEntity.name) private goalModel: Model<DayDocument>, // @InjectModel(GoalEntity.name) private dayModel: Model<GoalDocument>,
  ) {}

  async createDay(data: { goalId: string; date: Date }): Promise<Day> {
    const createdDay = new this.goalModel(data);
    return createdDay.save();
  }
}
