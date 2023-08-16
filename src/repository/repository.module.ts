import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoalEntity, GoalSchema } from './goal/goal.schema';
import { GoalDAO } from './goal/goal.dao';
import { DayEntity, DaySchema } from './day/day.schema';
import { DayDAO } from './day/day.dao';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.local',
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: GoalEntity.name, schema: GoalSchema },
      { name: DayEntity.name, schema: DaySchema },
    ]),
  ],
  providers: [GoalDAO, DayDAO],
  exports: [GoalDAO, DayDAO],
})
export class RepositoryModule {}
