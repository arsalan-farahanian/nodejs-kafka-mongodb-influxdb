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
  getConnections(userId: Types.ObjectId): Promise<{
    connections: HydratedDocument<IConnection>[];
  }>;
  newConnection(userId: Types.ObjectId): Promise<HydratedDocument<IConnection>>;
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

connectionSchema.statics.getConnections = async function (
  userId: Types.ObjectId
) {
  const connections = await this.find({ user: userId })
    .populate("user", "id username")
    .exec();
  return { connections };
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

export default model<IConnection, ConnectionModel>(
  "Connection",
  connectionSchema
);
