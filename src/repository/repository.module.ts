import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoalEntity, GoalSchema } from './goal/schemas/goal.schema';
import { GoalDAO } from './goal/goal.dao';
import { DayEntity, DaySchema } from './day/day.schema';

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
  providers: [GoalDAO],
  exports: [GoalDAO],
})
export class RepositoryModule {}
