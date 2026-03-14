// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';

// // In-memory storage for development (replace with database in production)
// const resetTokens = new Map<string, { email: string; expiry: Date }>();

// export async function POST(request: NextRequest) {
//   try {
//     const { email } = await request.json();

//     if (!email || !email.includes('@')) {
//       return NextResponse.json(
//         { message: 'Please provide a valid email address' },
//         { status: 400 }
//       );
//     }

//     // In a real app, check if user exists in database
//     // For demo, we'll assume user exists
//     const userExists = true; // Replace with actual DB check

//     if (!userExists) {
//       // For security, don't reveal if user doesn't exist
//       return NextResponse.json({
//         message: 'If an account exists, a reset link will be sent to your email',
//       });
//     }

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

//     // Store token in memory (for development)
//     resetTokens.set(resetToken, {
//       email: email.toLowerCase(),
//       expiry: resetTokenExpiry
//     });

//     // Create reset URL
//     const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
//     const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

//     // In production, send email here
//     // For now, we'll log it and return in response
//     console.log('📧 Reset email would be sent to:', email);
//     console.log('🔗 Reset URL:', resetUrl);

//     return NextResponse.json({
//       message: 'Reset link has been generated',
//       resetLink: resetUrl,
//       token: resetToken, // For development/testing
//       note: 'In development mode, the reset link is shown here'
//     });

//   } catch (error: any) {
//     console.error('Forgot password error:', error);
//     return NextResponse.json(
//       { 
//         message: 'An error occurred. Please try again.',
//         error: error.message 
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET endpoint to verify token
// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const token = searchParams.get('token');

//     if (!token) {
//       return NextResponse.json(
//         { valid: false, message: 'Token is required' },
//         { status: 400 }
//       );
//     }

//     // Check token from memory storage
//     const tokenData = resetTokens.get(token);
    
//     if (!tokenData) {
//       return NextResponse.json(
//         { valid: false, message: 'Invalid reset link' },
//         { status: 400 }
//       );
//     }

//     // Check if token is expired
//     if (new Date() > tokenData.expiry) {
//       resetTokens.delete(token); // Clean up expired token
//       return NextResponse.json(
//         { valid: false, message: 'Reset link has expired' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ 
//       valid: true,
//       email: tokenData.email 
//     });

//   } catch (error: any) {
//     console.error('Token verification error:', error);
//     return NextResponse.json(
//       { valid: false, message: 'Error verifying token' },
//       { status: 500 }
//     );
//   }
// }

// // Optional: Clean up expired tokens periodically
// function cleanupExpiredTokens() {
//   const now = new Date();
//   for (const [token, data] of resetTokens.entries()) {
//     if (now > data.expiry) {
//       resetTokens.delete(token);
//     }
//   }
// }

// // Run cleanup every 10 minutes
// setInterval(cleanupExpiredTokens, 10 * 60 * 1000);

















// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';
// import User from '@/src/app/api/models/User';
// import { connectDB } from '@/src/app/lib/connectDB';
// import { sendPasswordResetEmail } from '@/src/app/lib/email';

// export async function POST(request: NextRequest) {
//   await connectDB();

//   try {
//     const { email } = await request.json();

//     // Validation
//     if (!email || !email.includes('@')) {
//       return NextResponse.json(
//         { message: 'Please provide a valid email address' },
//         { status: 400 }
//       );
//     }

//     // Check if user exists
//     const user = await User.findOne({ email: email.toLowerCase() });

//     // For security, send success even if user doesn't exist
//     if (!user) {
//       console.log(`⚠️ No user found with email: ${email}`);
//       return NextResponse.json({
//         message: 'If an account exists with this email, you will receive a password reset link shortly.',
//         success: true // Don't reveal if user exists
//       });
//     }

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

//     // Save reset token to user in database
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = resetTokenExpiry;
//     await user.save();

//     // Create reset URL
//     const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
//     const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

//     // Send email
//     await sendPasswordResetEmail(user.email, resetUrl, user.name);

//     return NextResponse.json({
//       message: 'Password reset link has been sent to your email!',
//       success: true,
//       note: 'Please check your inbox (and spam folder) for the reset link.'
//     });

//   } catch (error: any) {
//     console.error('Forgot password error:', error);
//     return NextResponse.json(
//       { 
//         message: 'An error occurred. Please try again.',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined,
//         success: false
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   await connectDB();
  
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const token = searchParams.get('token');

//     if (!token) {
//       return NextResponse.json(
//         { valid: false, message: 'Token is required' },
//         { status: 400 }
//       );
//     }

//     // Find user by reset token
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: new Date() }
//     });

//     if (!user) {
//       return NextResponse.json(
//         { 
//           valid: false, 
//           message: 'Invalid or expired reset link. Please request a new password reset.' 
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ 
//       valid: true,
//       email: user.email,
//       name: user.name
//     });

//   } catch (error: any) {
//     console.error('Token verification error:', error);
//     return NextResponse.json(
//       { valid: false, message: 'Error verifying token' },
//       { status: 500 }
//     );
//   }
// }












import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '@/app/api/models/User';
import { connectDB } from '@/app/lib/connectDB';
import { sendOtpEmail } from '@/app/lib/email';

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // For security, don't reveal if user doesn't exist
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists, an OTP will be sent to your email',
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to user
    user.resetOtp = otp;
    user.resetOtpExpires = otpExpiry;
    await user.save();

    // Send OTP email
    try {
      await sendOtpEmail(email, otp, user.name);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue anyway for development
    }

    return NextResponse.json({
      message: 'OTP has been sent to your email',
      email: email,
      // For development, show OTP
      ...(process.env.NODE_ENV === 'development' && { otp: otp })
    });

  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { 
        message: 'An error occurred. Please try again.',
        error: error.message 
      },
      { status: 500 }
    );
  }
}