import { Goal } from 'src/repository/goal/dtos/goal.dto';

export interface User {
  name: string;
  goals: Goal[];
}
