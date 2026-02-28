// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';

// // Client component wrapper for useSearchParams
// function ResetPasswordContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [token, setToken] = useState<string | null>(null);
//   const [isTokenValid, setIsTokenValid] = useState(false);
//   const [isTokenChecked, setIsTokenChecked] = useState(false);

//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: '',
//   });

//   useEffect(() => {
//     // Get token from URL
//     const tokenFromUrl = searchParams.get('token');
//     setToken(tokenFromUrl);
    
//     if (tokenFromUrl) {
//       // Validate token (check with your backend)
//       validateToken(tokenFromUrl);
//     } else {
//       setIsTokenChecked(true);
//       setMessage({
//         text: 'Invalid or missing reset token. Please request a new password reset link.',
//         type: 'error'
//       });
//     }
//   }, [searchParams]);

//   const validateToken = async (token: string) => {
//     try {
//       // Call your API to validate the token
//       const response = await fetch('/api/validate-reset-token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//       });

// console.log(`response is: ${response}`);

//       console.log(`response is: ${response}`);
//       const data = await response.json();
      
//       if (response.ok && data.valid) {
//         setIsTokenValid(true);
//         setMessage({
//           text: 'Please enter your new password below.',
//           type: 'info'
//         });
//       } else {
//         setIsTokenValid(false);
//         setMessage({
//           text: data.message || 'This reset link is invalid or has expired. Please request a new one.',
//           type: 'error'
//         });
//       }
//     } catch (error) {
//       console.error('Token validation error:', error);
//       setIsTokenValid(false);
//       setMessage({
//         text: 'Error validating reset token. Please try again.',
//         type: 'error'
//       });
//     } finally {
//       setIsTokenChecked(true);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: '', type: '' });

//     // Validate passwords
//     if (formData.password !== formData.confirmPassword) {
//       setMessage({ text: 'Passwords do not match', type: 'error' });
//       setLoading(false);
//       return;
//     }

//     if (formData.password.length < 8) {
//       setMessage({ text: 'Password must be at least 8 characters long', type: 'error' });
//       setLoading(false);
//       return;
//     }

//     if (!token) {
//       setMessage({ text: 'Invalid reset token', type: 'error' });
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage({
//           text: 'Password reset successfully! Redirecting to login...',
//           type: 'success'
//         });
        
//         // Redirect to login after 3 seconds
//         setTimeout(() => {
//           router.push('/login');
//         }, 3000);
//       } else {
//         setMessage({
//           text: data.message || 'Failed to reset password',
//           type: 'error'
//         });
//       }
//     } catch (error) {
//       console.error('Reset password error:', error);
//       setMessage({
//         text: 'Something went wrong. Please try again.',
//         type: 'error'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   if (!isTokenChecked) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
//           <div className="text-center">
//             <h2 className="mt-6 text-3xl font-bold text-gray-900">Validating Reset Link</h2>
//             <p className="mt-2 text-gray-600">Please wait while we validate your reset link...</p>
//           </div>
//           <div className="flex justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//             Reset Your Password
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             {isTokenValid 
//               ? 'Enter your new password below' 
//               : 'Need to reset your password?'}
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

//         {isTokenValid ? (
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   New Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                   placeholder="New Password (min. 8 characters)"
//                   value={formData.password}
//                   onChange={handleChange}
//                   minLength={8}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="confirmPassword" className="sr-only">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                   placeholder="Confirm New Password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   minLength={8}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Resetting Password...
//                   </span>
//                 ) : (
//                   'Reset Password'
//                 )}
//               </button>
//             </div>

//             <div className="text-center">
//               <Link
//                 href="/login"
//                 className="font-medium text-green-600 hover:text-green-500"
//               >
//                 Back to Login
//               </Link>
//             </div>
//           </form>
//         ) : (
//           <div className="text-center space-y-4">
//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//               <p className="text-yellow-800">
//                 {message.text || 'This reset link is invalid or has expired.'}
//               </p>
//             </div>
//             <Link
//               href="/forgot-password"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               Request New Reset Link
//             </Link>
//             <div className="pt-4">
//               <Link
//                 href="/login"
//                 className="font-medium text-green-600 hover:text-green-500"
//               >
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Main page component with Suspense
// export default function ResetPasswordPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading reset page...</p>
//         </div>
//       </div>
//     }>
//       <ResetPasswordContent />
//     </Suspense>
//   );
// }













// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
//   const [validToken, setValidToken] = useState<boolean | null>(null);

//   // Verify token on page load
//   useEffect(() => {
//     if (token) {
//       verifyToken();
//     }
//   }, [token]);

//   const verifyToken = async () => {
//     try {
//       const response = await fetch(`/api/auth/forgot-password?token=${token}`);
//       const data = await response.json();
      
//       if (data.valid) {
//         setValidToken(true);
//       } else {
//         setValidToken(false);
//         setMessage({ 
//           type: 'error', 
//           text: 'Invalid or expired reset link. Please request a new one.' 
//         });
//       }
//     } catch (error) {
//       console.error('Token verification error:', error);
//       setValidToken(false);
//     }
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setMessage(null);

//   //   if (!password || password.length < 6) {
//   //     setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   if (password !== confirmPassword) {
//   //     setMessage({ type: 'error', text: 'Passwords do not match' });
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   try {
//   //     // In a real app, you would make an API call to reset the password
//   //     // For this example, we'll simulate it
//   //     console.log('Resetting password for token:', token);
//   //     console.log('New password:', password);

//   //     // Simulate API call
//   //     await new Promise(resolve => setTimeout(resolve, 1000));

//   //     setMessage({ 
//   //       type: 'success', 
//   //       text: 'Password has been reset successfully! You can now login with your new password.' 
//   //     });

//   //     // Clear form
//   //     setPassword('');
//   //     setConfirmPassword('');

//   //     // Redirect to login after 3 seconds
//   //     setTimeout(() => {
//   //       router.push('/login');
//   //     }, 3000);

//   //   } catch (error) {
//   //     console.error('Reset password error:', error);
//   //     setMessage({ 
//   //       type: 'error', 
//   //       text: 'Failed to reset password. Please try again.' 
//   //     });
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };





//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   setMessage(null);

//   if (!password || password.length < 6) {
//     setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
//     setLoading(false);
//     return;
//   }

//   if (password !== confirmPassword) {
//     setMessage({ type: 'error', text: 'Passwords do not match' });
//     setLoading(false);
//     return;
//   }

//   if (!token) {
//     setMessage({ type: 'error', text: 'No reset token found' });
//     setLoading(false);
//     return;
//   }

//   try {
//     const response = await fetch('/api/auth/reset-password', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         token: token,
//         password: password 
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to reset password');
//     }

//     setMessage({ 
//       type: 'success', 
//       text: data.message || 'Password reset successful!' 
//     });
    
//     // Clear form
//     setPassword('');
//     setConfirmPassword('');

//     // Redirect to login after 3 seconds
//     setTimeout(() => {
//       router.push('/login');
//     }, 3000);
    
//   } catch (error: any) {
//     console.error('Reset password error:', error);
//     setMessage({ 
//       type: 'error', 
//       text: error.message || 'Failed to reset password. Please try again.' 
//     });
//   } finally {
//     setLoading(false);
//   }
// };


//   if (validToken === false) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full">
//           <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
//             <p className="text-gray-600 mb-6">
//               This password reset link is invalid or has expired. Please request a new one.
//             </p>
//             <Link
//               href="/forgot-password"
//               className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
//             >
//               Request New Reset Link
//             </Link>
//             <div className="mt-6">
//               <Link href="/login" className="text-blue-600 hover:text-blue-800">
//                 ← Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-green-600 p-8 text-center text-white">
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-bold">Reset Password</h1>
//             <p className="mt-2 opacity-90">Enter your new password</p>
//           </div>

//           <div className="p-8">
//             {validToken === null && token ? (
//               <div className="text-center py-8">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
//                 <p className="mt-4 text-gray-600">Verifying reset link...</p>
//               </div>
//             ) : (
//               <>
//                 {message && (
//                   <div className={`mb-6 p-4 rounded-lg ${
//                     message.type === 'success' 
//                       ? 'bg-green-50 text-green-800 border border-green-200' 
//                       : 'bg-red-50 text-red-800 border border-red-200'
//                   }`}>
//                     <div className="flex items-center">
//                       {message.type === 'success' ? (
//                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                       <span>{message.text}</span>
//                     </div>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-6">
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                       placeholder="Enter new password"
//                       required
//                       minLength={6}
//                       disabled={loading}
//                     />
//                     <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
//                   </div>

//                   <div className="mb-6">
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                     </label>
//                     <input
//                       type="password"
//                       id="confirmPassword"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                       placeholder="Confirm new password"
//                       required
//                       minLength={6}
//                       disabled={loading}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Resetting...
//                       </span>
//                     ) : (
//                       'Reset Password'
//                     )}
//                   </button>
//                 </form>

//                 <div className="mt-6 pt-6 border-t border-gray-200 text-center">
//                   <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
//                     ← Back to Login
//                   </Link>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// export default function ResetPasswordPage() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [tokenValid, setTokenValid] = useState(false);
//   const [tokenLoading, setTokenLoading] = useState(true);
//   const [userEmail, setUserEmail] = useState('');
  
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');

//   useEffect(() => {
//     if (!token) {
//       setTokenValid(false);
//       setTokenLoading(false);
//       setError('Invalid reset link. Please request a new password reset.');
//       return;
//     }

//     const verifyToken = async () => {
//       try {
//         const response = await fetch(`/api/auth/forgot-password?token=${token}`);
//         const data = await response.json();
        
//         if (data.valid) {
//           setTokenValid(true);
//           setUserEmail(data.email);
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         setError('Failed to verify reset link.');
//       } finally {
//         setTokenLoading(false);
//       }
//     };

//     verifyToken();
//   }, [token]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('/api/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         setPassword('');
//         setConfirmPassword('');
        
//         // Redirect to login after 3 seconds
//         setTimeout(() => {
//           router.push('/login');
//         }, 3000);
//       } else {
//         setError(data.message || 'Failed to reset password');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (tokenLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Verifying reset link...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!tokenValid) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
//           <div className="text-red-500 mb-4">
//             <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Link
//             href="/forgot-password"
//             className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300"
//           >
//             Request New Reset Link
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Reset Your Password
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Setting new password for: <span className="font-medium text-purple-600">{userEmail}</span>
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:z-10 sm:text-sm"
//                 placeholder="Enter new password (min. 6 characters)"
//                 minLength={6}
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:z-10 sm:text-sm"
//                 placeholder="Confirm new password"
//                 minLength={6}
//               />
//             </div>
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
//                   Resetting...
//                 </>
//               ) : 'Reset Password'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               href="/login"
//               className="font-medium text-purple-600 hover:text-purple-500"
//             >
//               Back to login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//     </Suspense>
//   );
// }









// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// export default function ResetPasswordPage() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [tokenValid, setTokenValid] = useState(false);
//   const [tokenLoading, setTokenLoading] = useState(true);
//   const [userEmail, setUserEmail] = useState('');
  
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   // Check if searchParams is available
//   if (!searchParams) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }
  
//   const token = searchParams.get('token');

//   useEffect(() => {
//     if (!token) {
//       setTokenValid(false);
//       setTokenLoading(false);
//       setError('Invalid reset link. Please request a new password reset.');
//       return;
//     }

//     const verifyToken = async () => {
//       try {
//         const response = await fetch(`/api/auth/forgot-password?token=${token}`);
//         const data = await response.json();
        
//         if (data.valid) {
//           setTokenValid(true);
//           setUserEmail(data.email);
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         setError('Failed to verify reset link.');
//       } finally {
//         setTokenLoading(false);
//       }
//     };

//     verifyToken();
//   }, [token]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('/api/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         setPassword('');
//         setConfirmPassword('');
        
//         // Redirect to login after 3 seconds
//         setTimeout(() => {
//           router.push('/login');
//         }, 3000);
//       } else {
//         setError(data.message || 'Failed to reset password');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (tokenLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Verifying reset link...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!tokenValid) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
//           <div className="text-red-500 mb-4">
//             <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Link
//             href="/forgot-password"
//             className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300"
//           >
//             Request New Reset Link
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Reset Your Password
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Setting new password for: <span className="font-medium text-purple-600">{userEmail}</span>
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:z-10 sm:text-sm"
//                 placeholder="Enter new password (min. 6 characters)"
//                 minLength={6}
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:z-10 sm:text-sm"
//                 placeholder="Confirm new password"
//                 minLength={6}
//               />
//             </div>
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
//                   Resetting...
//                 </>
//               ) : 'Reset Password'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               href="/login"
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









import { Suspense } from 'react';
import ResetPasswordForm from '@/app/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}