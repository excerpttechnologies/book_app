// import mongoose, { Schema, Document } from 'mongoose';

// export interface IBook extends Document {
//   title: string;
//   author: string;
//   description: string;
//   shortDescription?: string;
//   isbn?: string;
//   publisher?: string;
//   publicationYear?: number;
//   pages?: number;
//   bookLanguage: string;
//   category: string;
//   subCategory?: string;
//   tags: string[];
//   images: string[];
//   price: number;
//   originalPrice?: number;
//   discount?: number;
//   stock: number;
//   sku?: string;
//   weight?: number;
//   dimensions?: { length: number; width: number; height: number };
//   status: 'published' | 'draft' | 'archived';
//   featured: boolean;
//   bestSeller: boolean;
//   newArrival: boolean;
//   rating: number;
//   reviewCount: number;
//   soldCount: number;
//   shippingCharge?: number;
//   expressShipping: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const BookSchema = new Schema<IBook>(
//   {
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     description: { type: String, default: '' },
//     shortDescription: String,
//     isbn: String,
//     publisher: String,
//     publicationYear: Number,
//     pages: Number,
//     bookLanguage: {
//       type: String,
//       required: true,
//       enum: ['Tamil', 'Telugu', 'English', 'Hindi', 'Sanskrit', 'Other'],
//     },
//     category: {
//       type: String,
//       required: true,
//       enum: ['Books', 'God Photos', 'Framed Calendar', 'Wall Hanging', 'Musical Box', 'Other Items'],
//     },
//     subCategory: String,
//     tags: [String],
//     images: [String],
//     price: { type: Number, required: true },
//     originalPrice: Number,
//     discount: Number,
//     stock: { type: Number, default: 0 },
//     sku: String,
//     weight: Number,
//     dimensions: {
//       length: Number,
//       width: Number,
//       height: Number,
//     },
//     status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
//     featured: { type: Boolean, default: false },
//     bestSeller: { type: Boolean, default: false },
//     newArrival: { type: Boolean, default: false },
//     rating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//     soldCount: { type: Number, default: 0 },
//     shippingCharge: Number,
//     expressShipping: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// BookSchema.index(
//   {
//     title: 'text',
//     author: 'text',
//     description: 'text',
//     tags: 'text',
//   },
//   {
//     default_language: 'none',  // ← default_language, not language_override
//   }

// );

// export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);








import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title?: string;
  author?: string;
  description?: string;
  shortDescription?: string;
  isbn?: string;
  publisher?: string;
  publicationYear?: number;
  pages?: number;
  bookLanguage?: string;
  category?: string;
  subCategory?: string;
  tags: string[];
  images: string[];
  price?: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  sku?: string;
  weight?: number;
  dimensions?: { length: number; width: number; height: number };
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  rating: number;
  reviewCount: number;
  soldCount: number;
  shippingCharge?: number;
  expressShipping: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String },
    author: { type: String },
    description: { type: String, default: '' },
    shortDescription: String,
    isbn: String,
    publisher: String,
    publicationYear: Number,
    pages: Number,
    bookLanguage: {
      type: String,
      enum: ['Tamil', 'Telugu', 'English', 'Hindi', 'Sanskrit', 'Other'],
    },
    category: {
      type: String,
      enum: ['Books', 'God Photos', 'Framed Calendar', 'Wall Hanging', 'Musical Box', 'Other Items'],
    },
    subCategory: String,
    tags: [String],
    images: [String],
    price: { type: Number },
    originalPrice: Number,
    discount: Number,
    stock: { type: Number, default: 0 },
    sku: String,
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
    shippingCharge: Number,
    expressShipping: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BookSchema.index(
  {
    title: 'text',
    author: 'text',
    description: 'text',
    tags: 'text',
  },
  {
    default_language: 'none',  // ← default_language, not language_override
  }
);

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);