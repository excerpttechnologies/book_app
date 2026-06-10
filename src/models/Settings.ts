import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  tagline: string;
  logo?: string;
  favicon?: string;
  invoiceName: string;
  invoiceLogo?: string;
  invoiceTerms?: string;
  invoiceNote?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankIFSC?: string;
  bankBranch?: string;
  upiId?: string;
  paymentQR?: string;
  adminEmail: string;
  supportPhone?: string;
  address?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    whatsapp?: string;
  };
  sliders: { image: string; title?: string; subtitle?: string; link?: string; order: number }[];
  metaTitle?: string;
  metaDescription?: string;
  shippingPolicy?: string;
  returnPolicy?: string;
  privacyPolicy?: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: 'OM Spiritual' },
    tagline: { type: String, default: 'Your Divine Book Store' },
    logo: String,
    favicon: String,
    invoiceName: { type: String, default: 'OM Spiritual' },
    invoiceLogo: String,
    invoiceTerms: String,
    invoiceNote: String,
    bankName: String,
    bankAccountNumber: String,
    bankIFSC: String,
    bankBranch: String,
    upiId: String,
    paymentQR: String,
    adminEmail: { type: String, default: process.env.ADMIN_EMAIL || 'admin@saraswatibooks.com' },
    supportPhone: String,
    address: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      youtube: String,
      whatsapp: String,
    },
    sliders: [
      {
        image: String,
        title: String,
        subtitle: String,
        link: String,
        order: { type: Number, default: 0 },
      },
    ],
    metaTitle: String,
    metaDescription: String,
    shippingPolicy: String,
    returnPolicy: String,
    privacyPolicy: String,
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
