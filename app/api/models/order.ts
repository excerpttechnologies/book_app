// import mongoose, { Schema, Document } from 'mongoose';

// export interface IOrderItem {
//   bookId: string;
//   bookName: string;
//   authorName: string;
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
//   totalPrice?: number;
// }

// export interface IBillingAddress {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// export interface IOrder extends Document {
//   userId?: string;
//   orderNumber: string;
//   razorpayOrderId: string;
//   razorpayPaymentId: string;
//   razorpaySignature?: string;
//   userName: string;
//   userEmail: string;
//   userPhone: string;
//   items: IOrderItem[];
//   billingAddress: IBillingAddress;
//   shippingAddress: IBillingAddress;
//   priceDetails: {
//     subtotal: number;
//     gst: number;
//     shipping: number;
//     total: number;
//   };
//   status: string;
//   paymentStatus: string;
//   createdAt: Date;
//   updatedAt: Date;
//   paymentDate?: Date;
// }

// const OrderItemSchema = new Schema<IOrderItem>({
//   bookId: { type: String, required: true },
//   bookName: { type: String, default: 'Unknown Book' },
//   authorName: { type: String, default: 'Unknown Author' },
//   salePrice: { type: Number, required: true },
//   mrpPrice: { type: Number, default: 0 },
//   image1: { type: String, default: '/default-book.jpg' },
//   quantity: { type: Number, required: true, min: 1 },
//   totalPrice: { type: Number }
// });

// const BillingAddressSchema = new Schema<IBillingAddress>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   pincode: { type: String, required: true }
// });

// const OrderSchema = new Schema<IOrder>({
//   userId: { type: String },
//   orderNumber: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     default: () => `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//   },
//   razorpayOrderId: { 
//     type: String, 
//     required: true,
//     unique: true // Ensure this is unique to prevent duplicate orders
//   },
//   razorpayPaymentId: { type: String, required: true },
//   razorpaySignature: { type: String },
//   userName: { type: String, required: true },
//   userEmail: { type: String, required: true },
//   userPhone: { type: String, required: true },
//   items: [OrderItemSchema],
//   billingAddress: BillingAddressSchema,
//   shippingAddress: BillingAddressSchema,
//   priceDetails: {
//     subtotal: { type: Number, required: true },
//     gst: { type: Number, required: true },
//     shipping: { type: Number, required: true },
//     total: { type: Number, required: true }
//   },
//   status: { 
//     type: String, 
//     default: 'confirmed'
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed'],
//     default: 'paid'
//   }
// }, {
//   timestamps: true
// });

// // Add this to automatically drop the old orderId index if it exists
// OrderSchema.post('init', async function() {
//   try {
//     const collection = this.collection;
//     const indexes = await collection.indexes();
    
//     // Check if orderId_1 index exists and drop it
//     const hasOrderIdIndex = indexes.some((index: any) => index.name === 'orderId_1');
//     if (hasOrderIdIndex) {
//       await collection.dropIndex('orderId_1');
//       console.log('✅ Dropped old orderId_1 index');
//     }
//   } catch (error) {
//     // Index might not exist, which is fine
//     console.log('No orderId index to drop');
//   }
// });

// // Clear the model cache to prevent mongoose model overwrite errors
// delete mongoose.models.Order;

// const Order = mongoose.model<IOrder>('Order', OrderSchema);
// export default Order;




//before build


import mongoose, { Schema, Document } from "mongoose";

// ==========================
// Order Item Interface
// ==========================
export interface IOrderItem {
  bookId: string;
  bookName: string;
  authorName: string;
  salePrice: number;
  mrpPrice: number;
  image1: string;
  quantity: number;
  totalPrice?: number;
}

// ==========================
// Billing / Shipping Address
// ==========================
export interface IBillingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// ==========================
// Order Interface
// ==========================
export interface IOrder extends Document {
  userId?: string;

  // 🔥 IMPORTANT FIX
  orderId: string;        // used by API
  orderNumber: string;    // shown to users

  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string;

  userName: string;
  userEmail: string;
  userPhone: string;

  items: IOrderItem[];
  billingAddress: IBillingAddress;
  shippingAddress: IBillingAddress;

  priceDetails: {
    subtotal: number;
    gst: number;
    shipping: number;
    total: number;
  };

  status: string;
  paymentStatus: string;

  createdAt: Date;
  updatedAt: Date;
  paymentDate?: Date;
}

// ==========================
// Order Item Schema
// ==========================
const OrderItemSchema = new Schema<IOrderItem>({
  bookId: { type: String, required: true },
  bookName: { type: String, default: "Unknown Book" },
  authorName: { type: String, default: "Unknown Author" },
  salePrice: { type: Number, required: true },
  mrpPrice: { type: Number, default: 0 },
  image1: { type: String, default: "/default-book.jpg" },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number },
});

// ==========================
// Address Schema
// ==========================
const BillingAddressSchema = new Schema<IBillingAddress>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

// ==========================
// Order Schema
// ==========================
const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String },

    // 🔥 REQUIRED BY API
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Human readable order number
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    },

    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
    },

    razorpaySignature: {
      type: String,
    },

    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },

    items: {
      type: [OrderItemSchema],
      required: true,
    },

    billingAddress: {
      type: BillingAddressSchema,
      required: true,
    },

    shippingAddress: {
      type: BillingAddressSchema,
      required: true,
    },

    priceDetails: {
      subtotal: { type: Number, required: true },
      gst: { type: Number, required: true },
      shipping: { type: Number, required: true },
      total: { type: Number, required: true },
    },

    status: {
      type: String,
      default: "confirmed",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "paid",
    },

    paymentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Drop old wrong index safely
// ==========================
OrderSchema.post("init", async function () {
  try {
    const indexes = await this.collection.indexes();
    const hasOldIndex = indexes.some(
      (index: any) => index.name === "orderId_1"
    );

    if (hasOldIndex) {
      await this.collection.dropIndex("orderId_1");
      console.log("✅ Dropped old orderId_1 index");
    }
  } catch {
    // safe ignore
  }
});

// ==========================
// Prevent model overwrite
// ==========================
const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
