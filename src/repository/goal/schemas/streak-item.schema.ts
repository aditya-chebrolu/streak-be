// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
// import { Goal } from '../dtos/goal.dto';

// @Schema({ collection: 'goals', versionKey: false })
// export class GoalEntity implements Goal {
//   @Prop({ required: true }) name: string;
//   @Prop({ required: true }) startDate: Date;
//   @Prop({ required: true }) endDate: Date;
//   //   @Prop() streak: StreakItemEntity[];
// }

// export type GoalDocument = HydratedDocument<Goal>;
// export const GoalSchema = SchemaFactory.createForClass(GoalEntity);
