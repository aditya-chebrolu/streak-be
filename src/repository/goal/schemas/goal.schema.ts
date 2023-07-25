import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Goal } from '../dtos/goal.dto';
import { differenceInCalendarDays } from 'date-fns';
// import { DayEntity } from 'src/repository/day/day.schema';
import { Day } from 'src/repository/day/dtos/day.dto';

@Schema({
  collection: 'goals',
  versionKey: false,
  toJSON: { virtuals: true },
  id: false,
})
export class GoalEntity implements Goal {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true }) startDate: Date;
  @Prop({ required: true }) endDate: Date;
  @Prop({ ref: 'days', localField: '_id', foreignField: 'goalId' })
  days: Day[];
}

export type GoalDocument = HydratedDocument<Goal>;
export const GoalSchema = SchemaFactory.createForClass(GoalEntity);

GoalSchema.virtual('totalDays').get(function () {
  return differenceInCalendarDays(
    new Date(this.endDate),
    new Date(this.startDate),
  );
});
