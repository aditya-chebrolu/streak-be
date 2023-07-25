import { Module } from '@nestjs/common';
import { GoalController } from 'src/controllers/goal.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [GoalController],
})
export default class GoalModule {}
