import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  userId?: string;
  userName: string;
  userEmail: string;
  phone?: string;
  type: 'query' | 'complaint' | 'spam' | 'report' | 'feedback' | 'other';
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  adminReply?: string;
  repliedAt?: Date;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    userId: String,
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phone: String,
    type: {
      type: String,
      enum: ['query', 'complaint', 'spam', 'report', 'feedback', 'other'],
      default: 'query',
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
    adminReply: String,
    repliedAt: Date,
    orderId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
