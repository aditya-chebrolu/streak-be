import { Body, Controller, Get, Post } from '@nestjs/common';
import { DayDAO } from 'src/repository/day/day.dao';
import {
  CheckInRequestBody,
  CreateGoalRequestBody,
} from 'src/repository/goal/goal.dto';
import { GoalDAO } from 'src/repository/goal/goal.dao';
import { isSameDay } from 'date-fns';

@Controller('goals')
export class GoalController {
  constructor(
    private readonly goalDAO: GoalDAO,
    private readonly dayDAO: DayDAO,
  ) {}

  @Get()
  async getGoals() {
    try {
      const goals = await this.goalDAO.getAllGoals();
      return goals;
    } catch (e) {
      console.log('>', e);
      return e.message;
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
      if (!isSameDay(new Date(), new Date(data.date))) throw 'Invalid Date';
      return await this.goalDAO.updateGoalStreak(data);
    } catch (e) {
      return e || e.message || false;
    }
  }

  @Post('day')
  async addDay(@Body() data: { goalId: string; date: Date }) {
    try {
      return this.dayDAO.createDay(data);
    } catch (e) {
      return e.message;
    }
  }
}
