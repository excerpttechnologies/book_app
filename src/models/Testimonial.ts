import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  designation?: string;
  image?: string;
  rating: number;
  review: string;
  status: 'active' | 'draft';
  featured: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    designation: String,
    image: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    status: { type: String, enum: ['active', 'draft'], default: 'draft' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
