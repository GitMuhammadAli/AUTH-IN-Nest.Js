import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Userschema extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;


  @Prop({ required: true, enum: ['student', 'instructor'] })
  role: string;
}

export const Myuserschema = SchemaFactory.createForClass(Userschema);
