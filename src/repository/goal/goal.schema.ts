import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Goal } from './goal.dto';
import { differenceInCalendarDays } from 'date-fns';

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
}
export type GoalDocument = HydratedDocument<Goal>;
export const GoalSchema = SchemaFactory.createForClass(GoalEntity);
