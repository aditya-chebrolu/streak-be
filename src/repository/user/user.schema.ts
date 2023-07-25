import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Goal } from '../goal/dtos/goal.dto';
import { User } from './dtos/user.dto';

@Schema({ collection: 'goals', versionKey: false })
export class UserEntity implements User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  goals: Goal[];
}

export type GoalDocument = HydratedDocument<User>;
export const GoalSchema = SchemaFactory.createForClass(UserEntity);
