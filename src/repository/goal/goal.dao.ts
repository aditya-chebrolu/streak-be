import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoalDocument, GoalEntity } from './schemas/goal.schema';
import {
  CheckInRequestBody,
  CreateGoalRequestBody,
  Goal,
} from './dtos/goal.dto';
import { differenceInDays } from 'date-fns';

@Injectable()
export class GoalDAO {
  constructor(
    @InjectModel(GoalEntity.name) private goalModel: Model<GoalDocument>, // @InjectModel(GoalEntity.name) private dayModel: Model<GoalDocument>,
  ) {}

  async createGoal(data: CreateGoalRequestBody): Promise<Goal> {
    const createdGoal = new this.goalModel(data);
    return createdGoal.save();
  }

  async getAllGoals(): Promise<Goal[]> {
    return this.goalModel.find().populate('days');
    // const
  }

  async updateGoalStreak(data: CheckInRequestBody) {
    const goalDocument = await this.goalModel.findById(data.goalId);
    const streakDay = differenceInDays(
      new Date(data.currentDate),
      goalDocument.startDate,
    );
    // if (goalDocument.streak.at(-1)?.streakDay === streakDay)
    //   throw 'Already Checked In';
    // const streakObj = {
    //   streakDay,
    //   completedTaskIds: data.completedTaskIds || [],
    // };
    // goalDocument.streak.push(streakObj);
    return goalDocument.save();
  }
}
