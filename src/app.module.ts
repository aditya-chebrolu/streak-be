import { Module } from '@nestjs/common';
import GoalModule from './modules/goal.module';

@Module({
  imports: [GoalModule],
})
export class AppModule {}
