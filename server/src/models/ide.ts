import mongoose, { Document, Schema, Model } from 'mongoose';

interface IIde extends Document {
  id: string;
  content: string;
}

export type IdeModel = Model<IIde>;

const IdeSchema: Schema = new mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true },
);

const Ide: IdeModel = mongoose.model<IIde>('Ide', IdeSchema);

export default Ide;
