// import nodemailer from 'nodemailer';

// // Configure transporter with real SMTP settings
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD, // Use App Password
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Test connection
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log("❌ SMTP Connection Error:", error);
//   } else {
//     console.log("✅ SMTP Server is ready to send messages");
//   }
// });

// export async function sendPasswordResetEmail(to: string, resetLink: string, userName?: string) {
//   console.log("📧 Attempting to send email to:", to);
//   console.log("🔗 Reset link:", resetLink);
  
//   const mailOptions = {
//     from: `"OM-Spiritual Book Shop" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: 'Reset Your Password',
//     html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Password Reset</title>
//       </head>
//       <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
//               <h1 style="color: white; margin: 0; font-size: 24px;">OM-Spiritual Book Shop</h1>
//           </div>
          
//           <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #eaeaea;">
//               <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
              
//               <p>Hello ${userName || 'User'},</p>
              
//               <p>We received a request to reset your password for your OM-Spiritual Book Shop account.</p>
              
//               <div style="text-align: center; margin: 30px 0;">
//                   <a href="${resetLink}" 
//                      style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
//                             color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
//                       Reset Your Password
//                   </a>
//               </div>
              
//               <p style="color: #666; font-size: 14px;">This link will expire in <strong>1 hour</strong> for security reasons.</p>
              
//               <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
//                   <p style="margin: 0; color: #856404;">
//                       <strong>Important:</strong> If you didn't request this password reset, please ignore this email. 
//                       Your password will remain unchanged.
//                   </p>
//               </div>
              
//               <p>For security reasons, never share this link with anyone.</p>
              
//               <p>Best regards,<br>The OM-Spiritual Book Shop Team</p>
//           </div>
          
//           <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea; color: #999; font-size: 12px;">
//               <p>&copy; ${new Date().getFullYear()} OM-Spiritual Book Shop. All rights reserved.</p>
//               <p>This is an automated message, please do not reply to this email.</p>
//           </div>
//       </body>
//       </html>
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('✅ Email sent successfully:', info.messageId);
//     console.log('📨 Preview URL:', nodemailer.getTestMessageUrl(info));
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('❌ Error sending email:', error);
//     throw error;
//   }
// }















import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function sendOtpEmail(to: string, otp: string, userName?: string) {
  console.log("📧 Sending OTP email to:", to);
  console.log("🔢 OTP:", otp);
  
  const mailOptions = {
    from: `"OM-Spiritual Book Shop" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset OTP',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset OTP</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">OM-Spiritual Book Shop</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #eaeaea;">
              <h2 style="color: #333; margin-top: 0;">Password Reset OTP</h2>
              
              <p>Hello ${userName || 'User'},</p>
              
              <p>You requested to reset your password. Use the OTP below to verify your identity:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                  <div style="display: inline-block; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; border-radius: 10px; font-weight: bold; font-size: 32px; letter-spacing: 10px;">
                      ${otp}
                  </div>
              </div>
              
              <p style="color: #666; font-size: 14px;">This OTP will expire in <strong>10 minutes</strong> for security reasons.</p>
              
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <p style="margin: 0; color: #856404;">
                      <strong>Important:</strong> Do not share this OTP with anyone. Our team will never ask for your OTP.
                  </p>
              </div>
              
              <p>If you didn't request this password reset, please ignore this email.</p>
              
              <p>Best regards,<br>The OM-Spiritual Book Shop Team</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea; color: #999; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} OM-Spiritual Book Shop. All rights reserved.</p>
              <p>This is an automated message, please do not reply to this email.</p>
          </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw error;
  }
}