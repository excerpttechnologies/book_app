import mongoose, { Schema, Document } from 'mongoose';

export interface IAd extends Document {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  buttonText?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center_popup' | 'sidebar';
  displayPages: string[];
  status: 'active' | 'draft' | 'archived';
  isSkippable: boolean;
  skipAfterSeconds?: number;
  startDate?: Date;
  endDate?: Date;
  priority: number;
  clickCount: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const AdSchema = new Schema<IAd>(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    link: String,
    buttonText: String,
    position: {
      type: String,
      enum: ['top', 'bottom', 'left', 'right', 'center_popup', 'sidebar'],
      required: true,
    },
    displayPages: [String],
    status: { type: String, enum: ['active', 'draft', 'archived'], default: 'draft' },
    isSkippable: { type: Boolean, default: true },
    skipAfterSeconds: Number,
    startDate: Date,
    endDate: Date,
    priority: { type: Number, default: 0 },
    clickCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Ad || mongoose.model<IAd>('Ad', AdSchema);
