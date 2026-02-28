// "use client";

// import React, { useState } from "react";



// interface ForgotPasswordProps {
//   onBackToLogin: () => void;
//   onClose?: () => void;
// }

// export default function ForgotPassword({ onBackToLogin, onClose }: ForgotPasswordProps) {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [step, setStep] = useState(1); // 1: Email input, 2: OTP input, 3: New password
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [resetToken, setResetToken] = useState("");

//   const handleSubmitEmail = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setIsLoading(true);

//     if (!email || !email.includes('@')) {
//       setError("Please enter your email address");
//       setIsLoading(false);
//       return;
//     }
//     setTimeout(() => {
//     setMessage(`Password reset link has been sent to ${email}. 
//     Check your email inbox. (This is a demo - no email will be sent)`);
//     setIsLoading(false);
//   }, 1500);

//     try {
//       const res = await fetch("/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Something went wrong");
//         setIsLoading(false);
//         return;
//       }

//       setMessage(data.message || "OTP sent to your email");
//       setStep(2); // Move to OTP verification step
//     } catch (err) {
//       setError("Failed to send reset email. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Invalid OTP");
//         setIsLoading(false);
//         return;
//       }

//       setResetToken(data.resetToken);
//       setMessage("OTP verified! Please set your new password");
//       setStep(3); // Move to password reset step
//     } catch (err) {
//       setError("Failed to verify OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/auth/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           email, 
//           newPassword, 
//           resetToken 
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Failed to reset password");
//         setIsLoading(false);
//         return;
//       }

//       setMessage("Password reset successful! You can now login with your new password");
//       setTimeout(() => {
//         onBackToLogin();
//       }, 2000);
//     } catch (err) {
//       setError("Failed to reset password. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-overlay">
//       <div className="login-box">
//         <button className="close-btn" onClick={() => onClose?.() || onBackToLogin()}>×</button>

//         <h2>Forgot Password</h2>
//         <p className="login-subtitle">
//           {step === 1 && "Enter your email to reset password"}
//           {step === 2 && "Enter OTP sent to your email"}
//           {step === 3 && "Set your new password"}
//         </p>

//         {message && <div className="success-message">{message}</div>}
//         {error && <div className="error-message">{error}</div>}

//         {step === 1 && (
//           <form onSubmit={handleSubmitEmail}>
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your registered email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <button
//               type="submit"
//               className={`submit-btn ${isLoading ? "loading" : ""}`}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="spinner"></div>
//                   Sending OTP...
//                 </>
//               ) : (
//                 "Send Reset Link"
//               )}
//             </button>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleVerifyOtp}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter 6-digit OTP"
//                 required
//                 maxLength={6}
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                 className="form-input"
//               />
//               <small className="otp-hint">
//                 Check your email for the OTP (check spam folder too)
//               </small>
//             </div>

//             <div className="form-group">
//               <button
//                 type="button"
//                 className="secondary-btn"
//                 onClick={() => {
//                   setStep(1);
//                   setMessage("");
//                   setError("");
//                 }}
//               >
//                 Back to Email
//               </button>
              
//               <button
//                 type="submit"
//                 className={`submit-btn ${isLoading ? "loading" : ""}`}
//                 disabled={isLoading || otp.length !== 6}
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="spinner"></div>
//                     Verifying...
//                   </>
//                 ) : (
//                   "Verify OTP"
//                 )}
//               </button>
//             </div>
//           </form>
//         )}

//         {step === 3 && (
//           <form onSubmit={handleResetPassword}>
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="newPassword"
//                 placeholder="New Password"
//                 required
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm New Password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <button
//                 type="button"
//                 className="secondary-btn"
//                 onClick={() => setStep(2)}
//               >
//                 Back to OTP
//               </button>
              
//               <button
//                 type="submit"
//                 className={`submit-btn ${isLoading ? "loading" : ""}`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="spinner"></div>
//                     Resetting...
//                   </>
//                 ) : (
//                   "Reset Password"
//                 )}
//               </button>
//             </div>
//           </form>
//         )}

//         <p className="toggle-text">
//           Remember your password?{" "}
//           <span onClick={onBackToLogin} className="toggle-link">
//             Back to Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }











// "use client";

// import React, { useState } from 'react';


// interface ForgotPasswordProps {
//   onBackToLogin: () => void;
//   onClose?: () => void;
// }

// export default function ForgotPassword({ onBackToLogin, onClose }: ForgotPasswordProps) {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     setIsLoading(true);

//     // Basic email validation
//     if (!email || !email.includes('@')) {
//       setError('Please enter a valid email address');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Option 1: Call your API
//       const res = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         // If the API returns an error message, use it
//         setError(data.message || 'Failed to send reset link');
//         return;
//       }

//       // Success response
//       setMessage(data.message || 'Reset link sent successfully! Check your email.');
      
//       // Store in localStorage for demo (client-side only)
//       const resetToken = data.demoToken || `demo_${Date.now()}`;
//       const resetRequests = JSON.parse(localStorage.getItem('resetRequests') || '{}');
//       resetRequests[resetToken] = {
//         email,
//         expires: Date.now() + 3600000, // 1 hour
//         createdAt: new Date().toISOString()
//       };
//       localStorage.setItem('resetRequests', JSON.stringify(resetRequests));
      
//       // For demo: log the token to console
//       console.log('Demo Reset Token (for testing):', resetToken);

//     } catch (err) {
//       console.error('Network error:', err);
//       // If API call fails, show a demo message
//       setMessage(`📧 Demo: A password reset link would be sent to ${email} if this were a real system.`);
      
//       // For demo purposes, simulate a token
//       const demoToken = `demo_fallback_${Date.now()}`;
//       console.log('Demo token (fallback):', demoToken);
      
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-overlay">
//       <div className="login-box">
//         <button className="close-btn" onClick={() => onClose?.()}>×</button>
        
//         <h2>Reset Password</h2>
//         <p className="login-subtitle">
//           Enter your email address and we'll send you a link to reset your password.
//         </p>
        
//         {error && (
//           <div className="error-message" style={{ 
//             backgroundColor: '#f8d7da', 
//             color: '#721c24',
//             padding: '12px',
//             borderRadius: '6px',
//             marginBottom: '20px',
//             border: '1px solid #f5c6cb'
//           }}>
//             {error}
//           </div>
//         )}
        
//         {message && (
//           <div className="success-message" style={{ 
//             backgroundColor: '#d4edda', 
//             color: '#155724',
//             padding: '12px',
//             borderRadius: '6px',
//             marginBottom: '20px',
//             border: '1px solid #c3e6cb'
//           }}>
//             {message}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-input"
//               style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
//             />
//           </div>
          
//           <button 
//             type="submit" 
//             className={`submit-btn ${isLoading ? 'loading' : ''}`}
//             disabled={isLoading}
//             style={{
//               width: '100%',
//               padding: '12px',
//               backgroundColor: '#3498db',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               fontWeight: 'bold'
//             }}
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner" style={{
//                   display: 'inline-block',
//                   width: '16px',
//                   height: '16px',
//                   marginRight: '8px',
//                   border: '2px solid #f3f3f3',
//                   borderTop: '2px solid #3498db',
//                   borderRadius: '50%',
//                   animation: 'spin 1s linear infinite'
//                 }}></div>
//                 Sending Reset Link...
//               </>
//             ) : (
//               'Send Reset Link'
//             )}
//           </button>
//         </form>
        
//         <p className="toggle-text" style={{ 
//           textAlign: 'center', 
//           marginTop: '20px',
//           fontSize: '14px',
//           color: '#666'
//         }}>
//           Remember your password?
//           <span 
//             onClick={onBackToLogin} 
//             className="toggle-link" 
//             style={{ 
//               cursor: 'pointer',
//               color: '#3498db',
//               fontWeight: 'bold',
//               marginLeft: '5px'
//             }}
//           >
//             Back to Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }











// // components/ForgotPasswordOTP.tsx
// "use client";

// import React, { useState, useEffect } from 'react';

// interface ForgotPasswordOTPProps {
//   onBackToLogin: () => void;
//   onClose?: () => void;
// }

// export default function ForgotPasswordOTP({ onBackToLogin, onClose }: ForgotPasswordOTPProps) {
//   const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // OTP input handling
//   const handleOtpChange = (index: number, value: string) => {
//     if (value.length > 1) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 5) {
//       setTimeout(() => {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         nextInput?.focus();
//       }, 10);
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       prevInput?.focus();
//     }
//   };

//   // Auto-focus first OTP input when step changes
//   useEffect(() => {
//     if (step === 'otp') {
//       setTimeout(() => {
//         const firstInput = document.getElementById('otp-0');
//         firstInput?.focus();
//       }, 100);
//     }
//   }, [step]);

//   // Step 1: Send OTP to email
//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     setIsLoading(true);

//     if (!email || !email.includes('@')) {
//       setError('Please enter a valid email address');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to send OTP');
//       } else {
//         setMessage('OTP has been sent to your email');
//         setStep('otp');
        
//         // For development, show OTP in console
//         if (data.otp) {
//           console.log('🔢 OTP for development:', data.otp);
//           // Auto-fill OTP for demo (remove in production)
//           if (process.env.NODE_ENV === 'development') {
//             setOtp(data.otp.split(''));
//           }
//         }
//       }
//     } catch (err) {
//       console.error('Network error:', err);
//       setError('Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       setError('Please enter the 6-digit OTP');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp: otpString }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Invalid OTP');
//       } else {
//         setMessage('OTP verified successfully');
//         setStep('reset');
//       }
//     } catch (err) {
//       setError('Failed to verify OTP');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Step 3: Reset password
//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!password || password.length < 6) {
//       setError('Password must be at least 6 characters');
//       setIsLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }

//     const otpString = otp.join('');

//     try {
//       const res = await fetch('/api/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp: otpString, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to reset password');
//       } else {
//         setMessage('Password reset successfully! You can now login.');
        
//         // Close modal after 2 seconds
//         setTimeout(() => {
//           onBackToLogin();
//         }, 2000);
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Resend OTP
//   const handleResendOtp = async () => {
//     setError('');
//     setMessage('');
//     setIsLoading(true);

//     try {
//       const res = await fetch('/api/auth/resend-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to resend OTP');
//       } else {
//         setMessage('New OTP sent to your email');
        
//         // For development, show OTP in console
//         if (data.otp) {
//           console.log('🔢 New OTP for development:', data.otp);
//         }
//       }
//     } catch (err) {
//       setError('Failed to resend OTP');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Go back to email step
//   const handleBackToEmail = () => {
//     setStep('email');
//     setOtp(['', '', '', '', '', '']);
//     setError('');
//     setMessage('');
//   };

//   return (
//     <div className="login-overlay">
//       <div className="login-box" style={{ maxWidth: '500px' }}>
//         <button className="close-btn" onClick={() => onClose?.()}>×</button>
        
//         <h2>
//           {step === 'email' && 'Forgot Password'}
//           {step === 'otp' && 'Verify OTP'}
//           {step === 'reset' && 'Reset Password'}
//         </h2>
        
//         <p className="login-subtitle">
//           {step === 'email' && 'Enter your email to receive OTP'}
//           {step === 'otp' && `Enter 6-digit OTP sent to ${email}`}
//           {step === 'reset' && 'Enter your new password'}
//         </p>
        
//         {error && (
//           <div className="error-message" style={{ 
//             backgroundColor: '#f8d7da', 
//             color: '#721c24',
//             padding: '12px',
//             borderRadius: '6px',
//             marginBottom: '20px',
//             border: '1px solid #f5c6cb'
//           }}>
//             {error}
//           </div>
//         )}
        
//         {message && (
//           <div className="success-message" style={{ 
//             backgroundColor: '#d4edda', 
//             color: '#155724',
//             padding: '12px',
//             borderRadius: '6px',
//             marginBottom: '20px',
//             border: '1px solid #c3e6cb'
//           }}>
//             {message}
//           </div>
//         )}
        
//         {/* Step 1: Email Input */}
//         {step === 'email' && (
//           <form onSubmit={handleSendOtp}>
//             <div className="form-group">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-input"
//                 style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
//                 disabled={isLoading}
//               />
//             </div>
            
//             <button 
//               type="submit" 
//               className={`submit-btn ${isLoading ? 'loading' : ''}`}
//               disabled={isLoading}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 backgroundColor: '#3498db',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold'
//               }}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="spinner" style={{
//                     display: 'inline-block',
//                     width: '16px',
//                     height: '16px',
//                     marginRight: '8px',
//                     border: '2px solid #f3f3f3',
//                     borderTop: '2px solid #3498db',
//                     borderRadius: '50%',
//                     animation: 'spin 1s linear infinite'
//                   }}></div>
//                   Sending OTP...
//                 </>
//               ) : (
//                 'Send OTP'
//               )}
//             </button>
//           </form>
//         )}
        
//         {/* Step 2: OTP Input */}
//         {step === 'otp' && (
//           <form onSubmit={handleVerifyOtp}>
//             <div style={{ marginBottom: '20px' }}>
//               <div style={{ 
//                 display: 'flex', 
//                 justifyContent: 'center',
//                 gap: '10px',
//                 marginBottom: '20px'
//               }}>
//                 {[0, 1, 2, 3, 4, 5].map((index) => (
//                   <input
//                     key={index}
//                     id={`otp-${index}`}
//                     type="text"
//                     maxLength={1}
//                     value={otp[index]}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                     onKeyDown={(e) => handleKeyDown(index, e)}
//                     style={{
//                       width: '40px',
//                       height: '50px',
//                       textAlign: 'center',
//                       fontSize: '24px',
//                       fontWeight: 'bold',
//                       border: '2px solid #ddd',
//                       borderRadius: '8px',
//                       outline: 'none'
//                     }}
//                     disabled={isLoading}
//                   />
//                 ))}
//               </div>
              
//               <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={isLoading}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: '#3498db',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     textDecoration: 'underline'
//                   }}
//                 >
//                   Resend OTP
//                 </button>
//               </div>
//             </div>
            
//             <button 
//               type="submit" 
//               className={`submit-btn ${isLoading ? 'loading' : ''}`}
//               disabled={isLoading || otp.join('').length !== 6}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 backgroundColor: '#2ecc71',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 opacity: otp.join('').length !== 6 ? 0.5 : 1
//               }}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="spinner" style={{
//                     display: 'inline-block',
//                     width: '16px',
//                     height: '16px',
//                     marginRight: '8px',
//                     border: '2px solid #f3f3f3',
//                     borderTop: '2px solid #2ecc71',
//                     borderRadius: '50%',
//                     animation: 'spin 1s linear infinite'
//                   }}></div>
//                   Verifying...
//                 </>
//               ) : (
//                 'Verify OTP'
//               )}
//             </button>
            
//             <div style={{ textAlign: 'center', marginTop: '15px' }}>
//               <button
//                 type="button"
//                 onClick={handleBackToEmail}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   color: '#666',
//                   cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 Change Email
//               </button>
//             </div>
//           </form>
//         )}
        
//         {/* Step 3: Reset Password */}
//         {step === 'reset' && (
//           <form onSubmit={handleResetPassword}>
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="New Password (min. 6 characters)"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-input"
//                 style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
//                 minLength={6}
//                 disabled={isLoading}
//               />
//             </div>
            
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="form-input"
//                 style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
//                 minLength={6}
//                 disabled={isLoading}
//               />
//             </div>
            
//             <button 
//               type="submit" 
//               className={`submit-btn ${isLoading ? 'loading' : ''}`}
//               disabled={isLoading}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 backgroundColor: '#2ecc71',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold'
//               }}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="spinner" style={{
//                     display: 'inline-block',
//                     width: '16px',
//                     height: '16px',
//                     marginRight: '8px',
//                     border: '2px solid #f3f3f3',
//                     borderTop: '2px solid #2ecc71',
//                     borderRadius: '50%',
//                     animation: 'spin 1s linear infinite'
//                   }}></div>
//                   Resetting...
//                 </>
//               ) : (
//                 'Reset Password'
//               )}
//             </button>
//           </form>
//         )}
        
//         {/* Progress indicator */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center',
//           alignItems: 'center',
//           margin: '20px 0',
//           gap: '5px'
//         }}>
//           <div style={{ 
//             width: '30px', 
//             height: '30px', 
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: step === 'email' ? '#3498db' : '#2ecc71',
//             color: 'white',
//             fontWeight: 'bold'
//           }}>
//             1
//           </div>
//           <div style={{ 
//             width: '30px', 
//             height: '2px',
//             backgroundColor: step === 'otp' || step === 'reset' ? '#2ecc71' : '#ddd'
//           }}></div>
//           <div style={{ 
//             width: '30px', 
//             height: '30px', 
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: step === 'otp' ? '#3498db' : 
//                            step === 'reset' ? '#2ecc71' : '#ddd',
//             color: step === 'otp' || step === 'reset' ? 'white' : '#666',
//             fontWeight: 'bold'
//           }}>
//             2
//           </div>
//           <div style={{ 
//             width: '30px', 
//             height: '2px',
//             backgroundColor: step === 'reset' ? '#2ecc71' : '#ddd'
//           }}></div>
//           <div style={{ 
//             width: '30px', 
//             height: '30px', 
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: step === 'reset' ? '#3498db' : '#ddd',
//             color: step === 'reset' ? 'white' : '#666',
//             fontWeight: 'bold'
//           }}>
//             3
//           </div>
//         </div>
        
//         <p className="toggle-text" style={{ 
//           textAlign: 'center', 
//           marginTop: '20px',
//           fontSize: '14px',
//           color: '#666'
//         }}>
//           Remember your password?
//           <span 
//             onClick={onBackToLogin} 
//             className="toggle-link" 
//             style={{ 
//               cursor: 'pointer',
//               color: '#3498db',
//               fontWeight: 'bold',
//               marginLeft: '5px'
//             }}
//           >
//             Back to Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }










// components/ForgotPasswordOTP.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ForgotPasswordOTPProps {
  onBackToLogin: () => void;
  onClose?: () => void;
}

export default function ForgotPasswordOTP({ onBackToLogin, onClose }: ForgotPasswordOTPProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP input handling
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (numericValue && index < 5) {
      setTimeout(() => {
        otpInputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    
    // Allow pasting OTP
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      return;
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    
    if (pastedData.length === 6) {
      const otpArray = pastedData.split('');
      setOtp(otpArray);
      
      // Focus on the last input
      setTimeout(() => {
        otpInputRefs.current[5]?.focus();
      }, 10);
    }
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus first OTP input when step changes
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
      setCountdown(60); // Start 60-second countdown
    }
  }, [step]);

  // Step 1: Send OTP to email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to send OTP');
      } else {
        setMessage(`OTP has been sent to ${email}`);
        setStep('otp');
        
        // DO NOT show OTP in UI - this is for security
        // Remove any console.log that shows OTP
        // The OTP should ONLY be in the user's email
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the 6-digit OTP');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid OTP');
      } else {
        setMessage('OTP verified successfully');
        setStep('reset');
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const otpString = otp.join('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to reset password');
      } else {
        setMessage('Password reset successfully! You can now login.');
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onBackToLogin();
        }, 2000);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setError('');
    setMessage('');
    setIsLoading(true);
    setOtp(['', '', '', '', '', '']); // Clear previous OTP

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to resend OTP');
      } else {
        setMessage('New OTP sent to your email');
        setCountdown(60); // Restart countdown
        
        // Focus back to first OTP input
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
        
        // DO NOT show OTP in UI - this is for security
        // Remove any console.log that shows OTP
      }
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to email step
  const handleBackToEmail = () => {
    setStep('email');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setMessage('');
    setCountdown(0);
  };

  return (
    <div className="login-overlay">
      <div className="login-box" style={{ maxWidth: '500px' }}>
        <button className="close-btn" onClick={() => onClose?.()}>×</button>
        
        <h2>
          {step === 'email' && 'Forgot Password'}
          {step === 'otp' && 'Verify OTP'}
          {step === 'reset' && 'Reset Password'}
        </h2>
        
        <p className="login-subtitle">
          {step === 'email' && 'Enter your email to receive OTP'}
          {step === 'otp' && `Enter 6-digit OTP sent to ${email}`}
          {step === 'reset' && 'Enter your new password'}
        </p>
        
        {error && (
          <div className="error-message" style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
        
        {message && (
          <div className="success-message" style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb'
          }}>
            {message}
          </div>
        )}
        
        {/* Step 1: Email Input */}
        {step === 'email' && (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner" style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    marginRight: '8px',
                    border: '2px solid #f3f3f3',
                    borderTop: '2px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        )}
        
        {/* Step 2: OTP Input - DO NOT show OTP numbers! */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '20px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '15px'
                }}
                onPaste={handlePaste}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) otpInputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                      width: '45px',
                      height: '55px',
                      textAlign: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    disabled={isLoading}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3498db';
                      e.target.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#ddd';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                ))}
              </div>
              
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                fontSize: '14px',
                color: '#666'
              }}>
                <p>Enter the 6-digit code sent to your email</p>
                
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading || countdown > 0}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: countdown > 0 ? '#999' : '#3498db',
                    cursor: countdown > 0 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    textDecoration: 'underline',
                    marginTop: '10px'
                  }}
                >
                  {countdown > 0 ? (
                    `Resend OTP in ${countdown}s`
                  ) : (
                    'Resend OTP'
                  )}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || otp.join('').length !== 6}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: otp.join('').length === 6 ? '#2ecc71' : '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: otp.join('').length === 6 ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                fontWeight: 'bold',
                opacity: otp.join('').length !== 6 ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner" style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    marginRight: '8px',
                    border: '2px solid #f3f3f3',
                    borderTop: '2px solid #2ecc71',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button
                type="button"
                onClick={handleBackToEmail}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3498db',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                ← Change Email
              </button>
            </div>
          </form>
        )}
        
        {/* Step 3: Reset Password */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <input
                type="password"
                placeholder="New Password (min. 6 characters)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  marginBottom: '15px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  outline: 'none'
                }}
                minLength={6}
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  marginBottom: '15px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  outline: 'none'
                }}
                minLength={6}
                disabled={isLoading}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '10px',
              marginBottom: '15px'
            }}>
              <div style={{
                flex: 1,
                padding: '10px',
                backgroundColor: password.length >= 6 ? '#2ecc71' : '#e74c3c',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {password.length >= 6 ? '✓ Strong' : '6+ chars'}
              </div>
              
              <div style={{
                flex: 1,
                padding: '10px',
                backgroundColor: password === confirmPassword && password.length >= 6 ? '#2ecc71' : '#e74c3c',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {password === confirmPassword && password.length >= 6 ? '✓ Match' : 'Match?'}
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || password.length < 6 || password !== confirmPassword}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: password.length >= 6 && password === confirmPassword ? '#2ecc71' : '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: password.length >= 6 && password === confirmPassword ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner" style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    marginRight: '8px',
                    border: '2px solid #f3f3f3',
                    borderTop: '2px solid #2ecc71',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}
        
        {/* Progress indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0',
          gap: '5px'
        }}>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: step === 'email' ? '#3498db' : '#2ecc71',
            color: 'white',
            fontWeight: 'bold'
          }}>
            1
          </div>
          <div style={{ 
            width: '30px', 
            height: '2px',
            backgroundColor: step === 'otp' || step === 'reset' ? '#2ecc71' : '#ddd'
          }}></div>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: step === 'otp' ? '#3498db' : 
                           step === 'reset' ? '#2ecc71' : '#ddd',
            color: step === 'otp' || step === 'reset' ? 'white' : '#666',
            fontWeight: 'bold'
          }}>
            2
          </div>
          <div style={{ 
            width: '30px', 
            height: '2px',
            backgroundColor: step === 'reset' ? '#2ecc71' : '#ddd'
          }}></div>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: step === 'reset' ? '#3498db' : '#ddd',
            color: step === 'reset' ? 'white' : '#666',
            fontWeight: 'bold'
          }}>
            3
          </div>
        </div>
        
        <p className="toggle-text" style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          fontSize: '14px',
          color: '#666'
        }}>
          Remember your password?
          <span 
            onClick={onBackToLogin} 
            className="toggle-link" 
            style={{ 
              cursor: 'pointer',
              color: '#3498db',
              fontWeight: 'bold',
              marginLeft: '5px'
            }}
          >
            Back to Login
          </span>
        </p>
      </div>
      
      {/* Add CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .login-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .login-box {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        
        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }
        
        .close-btn:hover {
          color: #333;
        }
      `}</style>
    </div>
  );
}