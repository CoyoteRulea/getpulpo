import * as mongoose from "mongoose";

export const BrandsSchema = new mongoose.Schema(
  {
    brand_code: {
      type:     String,
      required: true,
      unique:   true,
    },
    brand: {
      type:     String,
      required: true,
    },
  }
)

export interface Brands extends mongoose.Document {
  _id:      string;
  brand_code: string;
  brand: string;
}