import * as mongoose from "mongoose";

export const UsersSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type:     String,
      required: true,
      unique:   true,
    },
    brand: {
      type:     String,
    },
    model: {
      type:     String,
    },
    color:  {
      type:     String,
    },
    status: {
      type:     Boolean,
    },
    assigned: {
      type:     Boolean,
    }
  }
)

export interface Users extends mongoose.Document {
  _id:        string;
  vehicle_id: string;
  brand:      string;
  model:      string;
  color:      string;
  status:     boolean;
  assigned:   boolean;
}
