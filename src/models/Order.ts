import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  bookId: string;
  title: string;
  author: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  orderId: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: IOrderItem[];
  billingAddress: {
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
  };
  subtotal: number;
  shippingCharge: number;
  distanceCharge: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'razorpay' | 'pay_later';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  statusHistory: { status: string; date: Date; note?: string }[];
  adminNote?: string;
  invoiceEnabled: boolean;
  invoiceUrl?: string;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const AddressSchema = new Schema({
  firstName: String,
  lastName: String,
  company: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  phone: String,
  email: String,
  gstin: String,
});

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    items: [OrderItemSchema],
    billingAddress: AddressSchema,
    subtotal: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    distanceCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['razorpay', 'pay_later'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    orderStatus: {
      type: String,
      enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      default: 'placed',
    },
    statusHistory: [{ status: String, date: Date, note: String }],
    adminNote: String,
    invoiceEnabled: { type: Boolean, default: false },
    invoiceUrl: String,
    deliveredAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
