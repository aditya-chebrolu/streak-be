import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CheckInRequestBody,
  CreateGoalRequestBody,
} from 'src/repository/goal/dtos/goal.dto';
import { GoalDAO } from 'src/repository/goal/goal.dao';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalDAO: GoalDAO) {}

  @Get()
  async getGoals() {
    try {
      const goals = await this.goalDAO.getAllGoals();
      return goals;
    } catch (e) {
      console.log('>', e);
      return e;
    }
  }

  @Get('date')
  getDateFxn(@Body() { date }: { date: Date }) {
    const serverDate = new Date().getDate();
    const clientDate = new Date(date).getDate();
    return { serverDate, clientDate };
  }

  @Post()
  createGoal(@Body() data: CreateGoalRequestBody) {
    try {
      return this.goalDAO.createGoal(data);
    } catch (e) {
      return { err: e.message };
    }
  }

  @Post('check-in')
  async checkIn(@Body() data: CheckInRequestBody) {
    try {
      const serverCurrentDate = new Date().getDate();
      const clientCurrentDate = new Date(data.currentDate).getDate();
      if (serverCurrentDate !== clientCurrentDate)
        throw 'Invalid check in date';
      return await this.goalDAO.updateGoalStreak(data);
    } catch (e) {
      console.log(e);
      return e || e.message || false;
    }
  }
}
