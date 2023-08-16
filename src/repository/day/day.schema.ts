import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Day } from './day.dto';

@Schema({
  collection: 'days',
  versionKey: false,
  id: false,
})
export class DayEntity implements Day {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  goalId: string;
  @Prop({ required: true })
  date: Date;
}
export type DayDocument = HydratedDocument<Day>;
export const DaySchema = SchemaFactory.createForClass(DayEntity);
