import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export type Goal = {
  name: string;
  startDate: Date;
  endDate: Date;
};

export type Day = {
  date: Date;
};

export type GoalResponse = Goal & { days: Day[] };

export class CreateGoalRequestBody {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsDate()
  startDate!: Date;
  @IsNotEmpty()
  @IsDate()
  endDate!: Date;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tasks?: string[];
}

export class CheckInRequestBody {
  @IsNotEmpty()
  @IsDate()
  date!: Date;
  @IsNotEmpty()
  @IsString()
  goalId!: string;
  // @IsArray()
  // @IsNumber()
  // @IsOptional()
  // completedTaskIds?: number[];
}
