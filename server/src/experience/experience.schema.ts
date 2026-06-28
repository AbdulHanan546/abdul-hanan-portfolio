import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Experience extends Document {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  duration: string;

  @Prop()
  location?: string;

  @Prop({ type: [String], default: [] })
  bulletPoints: string[];

  @Prop({ type: [String], default: [] })
  skillsUsed: string[];
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
