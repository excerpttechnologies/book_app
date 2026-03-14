// import { NextResponse } from "next/server";
// import User from "@/src/app/api/models/User";
// import  {connectDB}  from "@/src/app/lib/connectDB";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request) {
//   await connectDB();

//   try {
//     const { email, otp } = await req.json();

//     const user = await User.findOne({ 
//       email,
//       resetPasswordExpires: { $gt: new Date() }
//     });

//     if (!user) {
//       return NextResponse.json(
//         { message: "Invalid or expired OTP" },
//         { status: 400 }
//       );
//     }

//     if (user.resetPasswordOtp !== otp) {
//       return NextResponse.json(
//         { message: "Invalid OTP" },
//         { status: 400 }
//       );
//     }

//     // Create a JWT token for password reset
//     const resetToken = jwt.sign(
//       { 
//         userId: user._id,
//         email: user.email,
//         purpose: "password_reset" 
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "10m" }
//     );

//     return NextResponse.json({
//       message: "OTP verified successfully",
//       resetToken,
//     });
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     return NextResponse.json(
//       { message: "Error verifying OTP" },
//       { status: 500 }
//     );
//   }
// }











import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/api/models/User';
import { connectDB } from '@/app/lib/connectDB';

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ 
      email: email.toLowerCase(),
      resetOtp: otp,
      resetOtpExpires: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Mark OTP as verified (optional: you can add a verified flag)
    user.isOtpVerified = true;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      email: user.email
    });

  } catch (error: any) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { 
        message: 'Failed to verify OTP',
        error: error.message 
      },
      { status: 500 }
    );
  }
}