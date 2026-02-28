// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });

// export default mongoose.models.User || mongoose.model("User", UserSchema);




// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" },
//   resetPasswordToken: { type: String },
//   resetPasswordExpires: { type: Date },
//   resetPasswordOtp: { type: String },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.User || mongoose.model("User", UserSchema);




















// // models/User.ts - Add these fields to your User model
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   // OTP fields for password reset
//   resetOtp: String,
//   resetOtpExpires: Date,
//   isOtpVerified: { type: Boolean, default: false },
//   // Keep existing fields
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
// }, {
//   timestamps: true
// });

// export default mongoose.models.User || mongoose.model('User', userSchema);










// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  
  // OTP fields for password reset
  resetOtp: String,
  resetOtpExpires: Date,
  isOtpVerified: { type: Boolean, default: false },
  
  // Old fields (keep for compatibility)
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);