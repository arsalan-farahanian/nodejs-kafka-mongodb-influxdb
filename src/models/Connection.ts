import {
  Schema,
  Types,
  Model,
  model,
  HydratedDocument,
  ObjectId,
} from "mongoose";
import { v4 } from "uuid";
import { Buffer } from "buffer";

interface IConnection {
  connectionName: string;
  isActive: boolean;
  user: Types.ObjectId;
}

interface ConnectionModel extends Model<IConnection> {
  getConnections(
    userId: Types.ObjectId,
    page: number,
    limit: number
  ): Promise<{
    connections: HydratedDocument<IConnection>[];
    totalConnections: number;
  }>;
  newConnection(userId: Types.ObjectId): Promise<HydratedDocument<IConnection>>;
  deleteConnection(
    connectionName: string
  ): Promise<HydratedDocument<IConnection>>;
  updateConnection(
    connectionName: string,
    updateFields: { [key: string]: string | number | boolean }
  ): Promise<HydratedDocument<IConnection>>;
}

const connectionSchema = new Schema<IConnection, ConnectionModel>(
  {
    connectionName: {
      type: String,
      required: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//retreiving all connections of a user
connectionSchema.statics.getConnections = async function (
  userId: Types.ObjectId,
  page: number,
  limit: number
) {
  const connections = await this.find({ user: userId })
    .populate("user", "id username")
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 }) // sort descending by date
    .exec();

  const totalConnections = await this.countDocuments();
  return { connections, totalConnections };
};

connectionSchema.statics.newConnection = async function (
  userId: Types.ObjectId
) {
  //generating a random uuid
  const uuid = v4();

  // removing all hyphens from the generated uuid
  // otherwise the produced base64 string will be shorter than expected
  const uuidUndecorated = uuid.replace(/-/g, "");

  //making it shorter and suitable for urls by converting to base64url
  const base64Uuid = Buffer.from(uuidUndecorated, "hex").toString("base64url");
  const connectionName = `connection_${base64Uuid}`;

  return this.create({ user: userId, connectionName });
};

connectionSchema.statics.deleteConnection = async function (
  connectionName: string
) {
  return await this.deleteOne({ connectionName }).exec();
};

connectionSchema.statics.updateConnection = async function (
  connectionName: string,
  updateFields: { [key: string]: string | number | boolean }
) {
  return await this.findOneAndUpdate({ connectionName }, updateFields, {
    new: true, // this returns the document after update was applied
  });
};

export default model<IConnection, ConnectionModel>(
  "Connection",
  connectionSchema
);
