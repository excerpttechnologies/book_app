// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function ForgotPasswordPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: '', type: '' });

//     // Validate email
//     if (!email) {
//       setMessage({ text: 'Email is required', type: 'error' });
//       setLoading(false);
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setMessage({ text: 'Please enter a valid email address', type: 'error' });
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       // Check if response is JSON
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const text = await response.text();
//         console.error('Non-JSON response:', text.substring(0, 200));
//         throw new Error('Server returned non-JSON response');
//       }

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setMessage({
//           text: data.message || 'If this email exists in our system, you will receive a reset link shortly.',
//           type: 'success'
//         });
//         setEmail(''); // Clear email field
//       } else {
//         setMessage({
//           text: data.message || 'Failed to send reset email',
//           type: 'error'
//         });
//       }
//     } catch (error: any) {
//       console.error('Forgot password error:', error);
//       setMessage({
//         text: error.message || 'Something went wrong. Please try again.',
//         type: 'error'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//             Forgot Your Password?
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter your email address and we&apos;ll send you a link to reset your password.
//           </p>
//         </div>

//         {message.text && (
//           <div className={`rounded-md p-4 ${
//             message.type === 'error' ? 'bg-red-50 border border-red-200' :
//             message.type === 'success' ? 'bg-green-50 border border-green-200' :
//             'bg-blue-50 border border-blue-200'
//           }`}>
//             <div className={`text-sm ${
//               message.type === 'error' ? 'text-red-800' :
//               message.type === 'success' ? 'text-green-800' :
//               'text-blue-800'
//             }`}>
//               {message.text}
//             </div>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Sending Reset Link...
//                 </span>
//               ) : (
//                 'Send Reset Link'
//               )}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               href="/login"
//               className="font-medium text-green-600 hover:text-green-500"
//             >
//               Back to Login
//             </Link>
//           </div>
//         </form>

//         <div className="text-center text-sm text-gray-500 mt-4">
//           <p>Note: For security reasons, you won&apos;t see if an email exists in our system.</p>
//           <p className="mt-1">If you don&apos;t receive an email, please check your spam folder.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

















// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
//   const [resetLink, setResetLink] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);
//     setResetLink(null);

//     if (!email || !email.includes('@')) {
//       setMessage({ type: 'error', text: 'Please enter a valid email address' });
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage({ 
//           type: 'success', 
//           text: data.message || 'Reset link has been sent to your email'
//         });
//         setEmail('');
        
//         // For development, show the reset link
//         if (data.resetLink) {
//           setResetLink(data.resetLink);
//           console.log('🔗 Reset Link:', data.resetLink);
//         }
//       } else {
//         setMessage({ 
//           type: 'error', 
//           text: data.message || 'Something went wrong. Please try again.' 
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage({ 
//         type: 'error', 
//         text: 'Network error. Please check your connection.' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-blue-600 p-8 text-center text-white">
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-bold">Forgot Password</h1>
//             <p className="mt-2 opacity-90">Enter your email to reset your password</p>
//           </div>

//           <div className="p-8">
//             {message && (
//               <div className={`mb-6 p-4 rounded-lg ${
//                 message.type === 'success' 
//                   ? 'bg-green-50 text-green-800 border border-green-200' 
//                   : 'bg-red-50 text-red-800 border border-red-200'
//               }`}>
//                 <div className="flex items-center">
//                   {message.type === 'success' ? (
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                   )}
//                   <span>{message.text}</span>
//                 </div>
//               </div>
//             )}

//             {resetLink && (
//               <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                 <div className="flex items-center text-blue-700 mb-2">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                   <span className="font-medium">Development Mode</span>
//                 </div>
//                 <p className="text-sm text-blue-600 break-all">Reset Link: {resetLink}</p>
//                 <button
//                   onClick={() => navigator.clipboard.writeText(resetLink)}
//                   className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Copy to clipboard
//                 </button>
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-6">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   placeholder="you@example.com"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Sending...
//                   </span>
//                 ) : (
//                   'Send Reset Link'
//                 )}
//               </button>
//             </form>

//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <p className="text-sm text-gray-600 text-center">
//                 Remember your password?{' '}
//                 <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
//                   Sign in
//                 </Link>
//               </p>
//             </div>

//             <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-start">
//                 <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <div>
//                   <p className="text-xs text-gray-600">
//                     <strong>Note:</strong> In development mode, reset links are shown here instead of being emailed.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

















// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage('');

//     try {
//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         setEmail('');
        
//         // Optional: Show timer before redirect
//         setTimeout(() => {
//           router.push('/auth/login');
//         }, 3000);
//       } else {
//         setError(data.message || 'Something went wrong');
//       }
//     } catch (err) {
//       setError('Failed to send reset email. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Forgot Your Password?
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter your email address and we'll send you a link to reset your password.
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:z-10 sm:text-sm"
//               placeholder="Enter your email"
//             />
//           </div>

//           {message && (
//             <div className="rounded-md bg-green-50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-green-800">{message}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="rounded-md bg-red-50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-red-800">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Sending...
//                 </>
//               ) : 'Send Reset Link'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               href="/auth/login"
//               className="font-medium text-purple-600 hover:text-purple-500"
//             >
//               Back to login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }















// app/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // OTP input handling
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Step 1: Send OTP to email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP has been sent to your email');
        setStep('otp');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP verified successfully');
        setStep('reset');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const otpString = otp.join('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successfully! Redirecting to login...');
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('New OTP sent to your email');
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {step === 'email' && (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
              {step === 'otp' && (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
              {step === 'reset' && (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )}
            </div>
            <h1 className="text-2xl font-bold">
              {step === 'email' && 'Forgot Password'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'reset' && 'Reset Password'}
            </h1>
            <p className="mt-2 opacity-90">
              {step === 'email' && 'Enter your email to receive OTP'}
              {step === 'otp' && 'Enter the 6-digit OTP sent to your email'}
              {step === 'reset' && 'Enter your new password'}
            </p>
          </div>

          <div className="p-8">
            {message && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{message}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Step 1: Email Input */}
            {step === 'email' && (
              <form onSubmit={handleSendOtp}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending OTP...
                    </span>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP Input */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Enter 6-digit OTP sent to: <br />
                    <span className="font-bold text-purple-600">{email}</span>
                  </label>
                  
                  <div className="flex justify-center space-x-3 mb-4">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                        disabled={loading}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    'Verify OTP'
                  )}
                </button>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setOtp(['', '', '', '', '', '']);
                      setError('');
                      setMessage('');
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Change Email
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Reset Password */}
            {step === 'reset' && (
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Enter new password"
                      required
                      minLength={6}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <button
                onClick={() => router.push('/login')}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Back to Login
              </button>
            </div>

            {/* Progress indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-center">
                {['email', 'otp', 'reset'].map((s, index) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === s ? 'bg-purple-600 text-white' :
                      index < ['email', 'otp', 'reset'].indexOf(step) ? 'bg-green-500 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    {index < 2 && (
                      <div className={`w-12 h-1 ${
                        index < ['email', 'otp', 'reset'].indexOf(step) ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Email</span>
                <span>OTP</span>
                <span>Reset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}