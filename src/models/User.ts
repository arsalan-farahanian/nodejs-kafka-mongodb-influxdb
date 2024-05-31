import { Schema, model } from "mongoose";

interface IUser {
  username: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
