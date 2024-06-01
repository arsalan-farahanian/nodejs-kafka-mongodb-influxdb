import { Schema, model, Model, Types } from "mongoose";

interface IUser {
  username: string;
}

interface UserModel extends Model<IUser> {
  userExists(userId: Types.ObjectId): Promise<boolean>;
}

const userSchema = new Schema<IUser, UserModel>(
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

userSchema.statics.userExists = async function (userId: Types.ObjectId) {
  const user = await this.findById(userId);
  if (!user) {
    return false;
  }
  return true;
};
export default model<IUser, UserModel>("User", userSchema);
