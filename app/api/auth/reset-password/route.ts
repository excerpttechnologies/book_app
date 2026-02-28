// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';

// // In-memory storage (same as in forgot-password)
// const resetTokens = new Map<string, { email: string; expiry: Date }>();

// // Mock user database (replace with real database)
// const mockUsers = [
//   { id: 1, email: 'user@example.com', password: '$2a$12$...' } // Hashed password
// ];

// export async function POST(request: NextRequest) {
//   try {
//     const { token, password } = await request.json();

//     // Validation
//     if (!token) {
//       return NextResponse.json(
//         { message: 'Reset token is required' },
//         { status: 400 }
//       );
//     }

//     if (!password || password.length < 6) {
//       return NextResponse.json(
//         { message: 'Password must be at least 6 characters long' },
//         { status: 400 }
//       );
//     }

//     // Check token from memory storage
//     const tokenData = resetTokens.get(token);
    
//     if (!tokenData) {
//       return NextResponse.json(
//         { message: 'Invalid reset token' },
//         { status: 400 }
//       );
//     }

//     // Check if token is expired
//     if (new Date() > tokenData.expiry) {
//       resetTokens.delete(token); // Clean up expired token
//       return NextResponse.json(
//         { message: 'Reset token has expired' },
//         { status: 400 }
//       );
//     }

//     // Hash the new password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
    
//     // In a real app, update password in database
//     console.log('🔑 Password would be updated for:', tokenData.email);
//     console.log('🔐 New hashed password:', hashedPassword);

//     // Remove used token
//     resetTokens.delete(token);

//     // In a real app, you would:
//     // 1. Find user by email (tokenData.email)
//     // 2. Update password in database
//     // 3. Invalidate any existing sessions

//     return NextResponse.json({
//       success: true,
//       message: 'Password has been reset successfully! You can now login with your new password.',
//     });

//   } catch (error: any) {
//     console.error('Reset password error:', error);
//     return NextResponse.json(
//       { 
//         message: 'Failed to reset password. Please try again.',
//         error: error.message 
//       },
//       { status: 500 }
//     );
//   }
// }

// // Helper function to clean up expired tokens
// function cleanupExpiredTokens() {
//   const now = new Date();
//   for (const [token, data] of resetTokens.entries()) {
//     if (now > data.expiry) {
//       resetTokens.delete(token);
//     }
//   }
// }
















// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import User from '@/src/app/api/models/User';
// import { connectDB } from '@/src/app/lib/connectDB';

// export async function POST(request: NextRequest) {
//   await connectDB();

//   try {
//     const { token, password } = await request.json();

//     // Validation
//     if (!token) {
//       return NextResponse.json(
//         { message: 'Reset token is required' },
//         { status: 400 }
//       );
//     }

//     if (!password || password.length < 6) {
//       return NextResponse.json(
//         { message: 'Password must be at least 6 characters long' },
//         { status: 400 }
//       );
//     }

//     // Find user by valid reset token
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: new Date() }
//     });

//     if (!user) {
//       return NextResponse.json(
//         { message: 'Invalid or expired reset token. Please request a new password reset.' },
//         { status: 400 }
//       );
//     }

//     // Hash the new password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Update user password and clear reset token
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     console.log(`✅ Password reset successful for user: ${user.email}`);

//     return NextResponse.json({
//       success: true,
//       message: 'Password has been reset successfully! You can now login with your new password.',
//     });

//   } catch (error: any) {
//     console.error('Reset password error:', error);
//     return NextResponse.json(
//       { 
//         message: 'Failed to reset password. Please try again.',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined,
//         success: false
//       },
//       { status: 500 }
//     );
//   }
// }















import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/api/models/User';
import { connectDB } from '@/app/lib/connectDB';

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, otp, password } = await request.json();

    // Validation
    if (!email || !otp || !password) {
      return NextResponse.json(
        { message: 'Email, OTP and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Find user with valid OTP
    const user = await User.findOne({
      email: email.toLowerCase(),
      resetOtp: otp,
      resetOtpExpires: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Hash the new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    user.isOtpVerified = false;
    await user.save();

    console.log(`✅ Password reset successful for user: ${user.email}`);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully! You can now login with your new password.',
    });

  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { 
        message: 'Failed to reset password. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        success: false
      },
      { status: 500 }
    );
  }
}