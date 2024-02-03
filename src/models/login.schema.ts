import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';


@Schema()
export class Loginschema extends Document {
  @Prop({ type: Object })
  tree?: any;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'manager'] })
  role: string;
}

export const MyLoginschema = SchemaFactory.createForClass(Loginschema);
