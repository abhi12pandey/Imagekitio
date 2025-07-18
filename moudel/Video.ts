import { timeStamp } from "console";
import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSION = {
  height: 1920,
  width: 1080,
} as const;

export interface Ivideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality: number;
  };
}

const videoSchema = new Schema<Ivideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSION.height },
      width: { type: Number, default: VIDEO_DIMENSION.width },
      qulaity: { type: Number, min: 1, max: 100 },
    },
  },
  {
    timestamps: true,
  }
);
const Video = models?.Video || model<Ivideo>("Video", videoSchema);
export default Video;
