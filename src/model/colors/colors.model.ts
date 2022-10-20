import * as mongoose from "mongoose";

export const ColorsSchema = new mongoose.Schema(
  {
    color_code: {
      type:     String,
      required: true,
      unique:   true,
    },
    color: {
      type:     String,
      required: true,
    },
  }
)

export interface Colors extends mongoose.Document {
  _id:      string;
  color_code: string;
  color: string;
}