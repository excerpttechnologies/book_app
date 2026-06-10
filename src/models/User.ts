import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  googleId?: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked' | 'pending';
  phone?: string;
  addresses: IAddress[];
  cart: ICartItem[];
  wishlist: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  _id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  email: string;
  gstin?: string;
  isDefault: boolean;
}

export interface ICartItem {
  bookId: string;
  quantity: number;
  addedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: String,
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: 'India' },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  gstin: String,
  isDefault: { type: Boolean, default: false },
});

const CartItemSchema = new Schema<ICartItem>({
  bookId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    image: String,
    googleId: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'active' },
    phone: String,
    addresses: [AddressSchema],
    cart: [CartItemSchema],
    wishlist: [String],
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
