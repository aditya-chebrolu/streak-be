import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoalDocument, GoalEntity } from './goal.schema';
import {
  CheckInRequestBody,
  CreateGoalRequestBody,
  Goal,
  GoalResponse,
} from './goal.dto';
import { eachDayOfInterval, isSameDay, startOfDay } from 'date-fns';
import { DayDocument, DayEntity } from '../day/day.schema';

@Injectable()
export class GoalDAO {
  constructor(
    @InjectModel(GoalEntity.name) private model: Model<GoalDocument>, // @InjectModel(GoalEntity.name) private dayModel: Model<GoalDocument>,
    @InjectModel(DayEntity.name) private dayModel: Model<DayDocument>, // @InjectModel(GoalEntity.name) private dayModel: Model<GoalDocument>,
  ) {}

  async createGoal(data: CreateGoalRequestBody): Promise<Goal> {
    data.startDate = startOfDay(new Date(data.startDate));
    data.endDate = startOfDay(new Date(data.endDate));
    const goal = new this.model(data);
    return goal.save();
  }

  async getAllGoals(): Promise<any> {
    const goals = await this.model.aggregate<GoalResponse>([
      {
        $lookup: {
          from: 'days',
          localField: '_id',
          foreignField: 'goalId',
          as: 'days',
        },
      },
      {
        $project: {
          name: 1,
          startDate: 1,
          endDate: 1,
          days: {
            date: 1,
          },
        },
      },
      {
        $unwind: '$days', // Unwind the 'days' array
      },
      {
        $sort: {
          'days.date': 1, // Sort by the 'date' property within the 'days' array
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          startDate: { $first: '$startDate' },
          endDate: { $first: '$endDate' },
          days: { $push: '$days' },
        },
      },
    ]);

    for (const goal of goals) {
      const checkedInDays = goal.days;
      const checkedInDaysCount = checkedInDays.length;
      let dayIdx = 0;
      const daysRange = eachDayOfInterval({
        start: goal.startDate,
        end: new Date(),
      });
      const temp = [];
      for (const currentDay of daysRange) {
        if (
          dayIdx < checkedInDaysCount &&
          isSameDay(currentDay, checkedInDays[dayIdx].date)
        ) {
          dayIdx++;
          temp.push({
            checked: true,
            currentDay,
          });
        } else if (!isSameDay(currentDay, new Date())) {
          temp.push({
            checked: false,
            currentDay,
          });
        }
      }
      goal.days = temp;
    }

    return goals;
  }

  async updateGoalStreak(data: CheckInRequestBody) {
    const dayDocument = await this.dayModel.findOne(data);
    if (dayDocument) throw 'already checked in';
    const createdDayDocument = new this.dayModel(data);
    return await createdDayDocument.save();
  }
}
