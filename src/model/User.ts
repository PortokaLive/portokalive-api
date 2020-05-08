import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    requred: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  uuid: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    required: false,
  },
  activated: {
    type: Boolean,
    required: true,
    select: false,
    default: false,
  },
  location: {
    type: Object,
    required: false,
  },
});

export const User = model("model_users", userSchema);

export class IUser {
  id: string = "";
  email: string = "";
  password: string = "";
  role: number = 0;
  name: string = "";
  age: number = 18;
  gender: string = "";
  uuid: string = "";
  phone: string = "";
  location: object = {};
}
