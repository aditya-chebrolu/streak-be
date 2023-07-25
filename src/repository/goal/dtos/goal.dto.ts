import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export interface Goal {
  name: string;
  startDate: Date;
  endDate: Date;
  // totalDays: number;
  tasks?: { id: number; title: string }[];
}

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
  currentDate!: Date;
  @IsNotEmpty()
  @IsString()
  goalId!: string;
  @IsArray()
  @IsNumber()
  @IsOptional()
  completedTaskIds?: number[];
}
