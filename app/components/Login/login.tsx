// "use client";

// import React, { useState } from "react";
// import { useAdmin } from "../../AdminContext"; // Add this import
// import "./login.css";

// interface LoginProps {
//   close?: () => void;
//   onLoginSuccess?: () => void;
// }

// export default function Login({ close, onLoginSuccess }: LoginProps) {
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Add this line to get the admin context
//   const { setIsAdmin } = useAdmin();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   // =============================
//   //   ADMIN PANEL NAVIGATION
//   // =============================
//   const navigateToAdminPanel = () => {
//     window.location.href = "/admin/dashboard";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // --------------------
//     // VALIDATION
//     // --------------------
//     if (isSignup) {
//       if (formData.password !== formData.confirmPassword) {
//         setError("Passwords do not match");
//         setIsLoading(false);
//         return;
//       }
//       if (formData.password.length < 6) {
//         setError("Password must be at least 6 characters");
//         setIsLoading(false);
//         return;
//       }
//     }

//     // --------------------
//     // ADMIN LOGIN - REDIRECT TO ADMIN PANEL
//     // --------------------
//     if (!isSignup && formData.email === "admin@gmail.com" && formData.password === "123456") {
//       const history = {
//         email: formData.email,
//         name: "Admin",
//         timestamp: new Date().toISOString(),
//         type: "login",
//       };

//       const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
//       localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

//       localStorage.setItem("authToken", "adminToken");
//       localStorage.setItem("userRole", "admin");
//       localStorage.setItem("userEmail", formData.email);
//       localStorage.setItem("userName", "Admin");
      
//       // Update admin context - this will hide Header/Footer
//       setIsAdmin(true);

//       alert("Admin Login Successful! Redirecting to Admin Panel...");
//       setIsLoading(false);
//       navigateToAdminPanel();
//       return;
//     }

//     try {
//       // --------------------
//       // YOUR REAL BACKEND URL
//       // --------------------
//       const url = isSignup
//         ? "/api/auth/signup"
//         : "/api/auth/login";

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Something went wrong");
//         setIsLoading(false);
//         return;
//       }

//       // --------------------
//       // SAVE LOGIN HISTORY
//       // --------------------
//       const history = {
//         email: formData.email,
//         name: data.name || formData.name,
//         timestamp: new Date().toISOString(),
//         type: isSignup ? "signup" : "login",
//       };

//       const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
//       localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

//       // --------------------
//       // STORE USER DETAILS
//       // --------------------
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("userRole", data.role || "user");
//       localStorage.setItem("userEmail", formData.email);
//       localStorage.setItem("userName", data.name || formData.name);

//       // If it's a regular user login, ensure admin context is false
//       setIsAdmin(false);

//       alert(isSignup ? "Signup Successful!" : "Login Successful!");
//       close?.();
//       onLoginSuccess?.();
//       window.location.reload();

//     } catch (err) {
//       setError("Network error. Backend may be OFF. Start your server!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearForm = () =>
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });

//   const handleToggleMode = () => {
//     setIsSignup(!isSignup);
//     clearForm();
//     setError("");
//   };

//   return (
//     <div className="login-overlay">
//       <div className="login-box">
//         <button className="close-btn" onClick={() => close?.()}>×</button>

//         <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
//         <p className="login-subtitle">
//           {isSignup ? "Sign up to get started" : "Sign in to your account"}
//         </p>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>

//           {isSignup && (
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="form-input"
//             />
//           </div>

//           {isSignup && (
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className={`submit-btn ${isLoading ? "loading" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner"></div>
//                 {isSignup ? "Creating Account..." : "Signing In..."}
//               </>
//             ) : isSignup ? (
//               "Create Account"
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         <p className="toggle-text">
//           {isSignup ? "Already have an account?" : "Don't have an account?"}
//           <span onClick={handleToggleMode} className="toggle-link">
//             {isSignup ? " Sign In" : " Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }









// "use client";

// import React, { useState } from "react";
// import { useAdmin } from "../../AdminContext";
// import ForgotPassword from "../../components/ForgotPassword";
// import "./login.css";

// interface LoginProps {
//   close?: () => void;
//   onLoginSuccess?: () => void;
// }

// export default function Login({ close, onLoginSuccess }: LoginProps) {
//   const [isSignup, setIsSignup] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { setIsAdmin } = useAdmin();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const navigateToAdminPanel = () => {
//     window.location.href = "/admin/dashboard";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (isSignup) {
//       if (formData.password !== formData.confirmPassword) {
//         setError("Passwords do not match");
//         setIsLoading(false);
//         return;
//       }
//       if (formData.password.length < 6) {
//         setError("Password must be at least 6 characters");
//         setIsLoading(false);
//         return;
//       }
//     }

//     // Admin login logic
//     if (!isSignup && formData.email === "admin@gmail.com" && formData.password === "123456") {
//       const history = {
//         email: formData.email,
//         name: "Admin",
//         timestamp: new Date().toISOString(),
//         type: "login",
//       };

//       const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
//       localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

//       localStorage.setItem("authToken", "adminToken");
//       localStorage.setItem("userRole", "admin");
//       localStorage.setItem("userEmail", formData.email);
//       localStorage.setItem("userName", "Admin");
      
//       setIsAdmin(true);

//       alert("Admin Login Successful! Redirecting to Admin Panel...");
//       setIsLoading(false);
//       navigateToAdminPanel();
//       return;
//     }

//     try {
//       const url = isSignup
//         ? "/api/auth/signup"
//         : "/api/auth/login";

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Something went wrong");
//         setIsLoading(false);
//         return;
//       }

//       const history = {
//         email: formData.email,
//         name: data.name || formData.name,
//         timestamp: new Date().toISOString(),
//         type: isSignup ? "signup" : "login",
//       };

//       const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
//       localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("userRole", data.role || "user");
//       localStorage.setItem("userEmail", formData.email);
//       localStorage.setItem("userName", data.name || formData.name);

//       setIsAdmin(false);

//       alert(isSignup ? "Signup Successful!" : "Login Successful!");
//       close?.();
//       onLoginSuccess?.();
//       window.location.reload();

//     } catch (err) {
//       setError("Network error. Backend may be OFF. Start your server!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearForm = () =>
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });

//   const handleToggleMode = () => {
//     setIsSignup(!isSignup);
//     clearForm();
//     setError("");
//   };

//   // Show ForgotPassword component if state is true
//   if (showForgotPassword) {
//     return (
//       <ForgotPassword 
//         onBackToLogin={() => setShowForgotPassword(false)}
//         onClose={close}
//       />
//     );
//   }

//   return (
//     <div className="login-overlay">
//       <div className="login-box">
//         <button className="close-btn" onClick={() => close?.()}>×</button>

//         <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
//         <p className="login-subtitle">
//           {isSignup ? "Sign up to get started" : "Sign in to your account"}
//         </p>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           {isSignup && (
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="form-input"
//             />
//           </div>

//           {isSignup && (
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className={`submit-btn ${isLoading ? "loading" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner"></div>
//                 {isSignup ? "Creating Account..." : "Signing In..."}
//               </>
//             ) : isSignup ? (
//               "Create Account"
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         {/* Forgot Password Link - Only show in login mode */}
//         {!isSignup && (
//           <p className="forgot-password-link">
//             <span 
//               onClick={() => setShowForgotPassword(true)} 
//               className="toggle-link"
//               style={{ cursor: 'pointer', fontSize: '14px' }}
//             >
//               Forgot Password?
//             </span>
//           </p>
//         )}

//         <p className="toggle-text">
//           {isSignup ? "Already have an account?" : "Don't have an account?"}
//           <span onClick={handleToggleMode} className="toggle-link">
//             {isSignup ? " Sign In" : " Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }















// // app/login/page.tsx
// 'use client';

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import bcrypt from "bcryptjs";

// export default function LoginPage() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//     setMessage("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setIsLoading(true);

//     if (isSignup) {
//       if (formData.password !== formData.confirmPassword) {
//         setError("Passwords do not match");
//         setIsLoading(false);
//         return;
//       }
//       if (formData.password.length < 6) {
//         setError("Password must be at least 6 characters");
//         setIsLoading(false);
//         return;
//       }
//     }

//     try {
//       const url = isSignup
//         ? "/api/auth/signup"
//         : "/api/auth/login";

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Something went wrong");
//         setIsLoading(false);
//         return;
//       }

//       // Store token and user info
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("userEmail", formData.email);
//       localStorage.setItem("userName", data.name || formData.name);

//       setMessage(isSignup ? "Signup Successful! Redirecting..." : "Login Successful! Redirecting...");
      
//       // Redirect to home page
//       setTimeout(() => {
//         router.push("/");
//       }, 1500);

//     } catch (err) {
//       setError("Network error. Please check your connection.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   const handleToggleMode = () => {
//     setIsSignup(!isSignup);
//     clearForm();
//     setError("");
//     setMessage("");
//   };

//   // Show Forgot Password page
//   if (showForgotPassword) {
//     // Redirect to forgot-password page
//     router.push("/forgot-password");
//     return <div>Redirecting to forgot password...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isSignup ? "Create Account" : "Welcome Back"}
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             {isSignup ? "Sign up to get started" : "Sign in to your account"}
//           </p>
//         </div>

//         {error && (
//           <div className="rounded-md bg-red-50 p-4">
//             <div className="flex">
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-red-800">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {message && (
//           <div className="rounded-md bg-green-50 p-4">
//             <div className="flex">
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-green-800">{message}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             {isSignup && (
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required={isSignup}
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
//                   placeholder="Full Name"
//                 />
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
//                 placeholder="Email Address"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
//                 placeholder="Password"
//                 minLength={6}
//               />
//             </div>

//             {isSignup && (
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required={isSignup}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
//                   placeholder="Confirm Password"
//                   minLength={6}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Forgot Password Link - Only show in login mode */}
//           {!isSignup && (
//             <div className="text-right">
//               <button
//                 type="button"
//                 onClick={() => router.push("/forgot-password")}
//                 className="text-sm font-medium text-purple-600 hover:text-purple-500"
//               >
//                 Forgot your password?
//               </button>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   {isSignup ? "Creating Account..." : "Signing In..."}
//                 </>
//               ) : isSignup ? (
//                 "Create Account"
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </div>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={handleToggleMode}
//               className="font-medium text-purple-600 hover:text-purple-500"
//             >
//               {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }











// // components/Login.tsx (updated)
// "use client";

// import React, { useState } from "react";
// import { useAdmin } from "../../AdminContext";
// import ForgotPassword from "@/src/app/components/ForgotPassword"; // We'll create this
// import "./login.css";

// interface LoginProps {
//   close?: () => void;
//   onLoginSuccess?: () => void;
// }

// export default function Login({ close, onLoginSuccess }: LoginProps) {
//   const [isSignup, setIsSignup] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { setIsAdmin } = useAdmin();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const navigateToAdminPanel = () => {
//     window.location.href = "/admin/dashboard";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (isSignup) {
//       if (formData.password !== formData.confirmPassword) {
//         setError("Passwords do not match");
//         setIsLoading(false);
//         return;
//       }
//       if (formData.password.length < 6) {
//         setError("Password must be at least 6 characters");
//         setIsLoading(false);
//         return;
//       }
//     }

//     // Admin login logic
//     if (!isSignup && formData.email === "admin@gmail.com" && formData.password === "123456") {
//       const history = {
//         email: formData.email,
//         name: "Admin",
//         timestamp: new Date().toISOString(),
//         type: "login",
//       };

//       const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
//       localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

//       localStorage.setItem("authToken", "adminToken");
//       localStorage.setItem("userRole", "admin");
//       localStorage.setItem("userEmail", formData.email);
//       localStorage.setItem("userName", "Admin");
      
//       setIsAdmin(true);

//       alert("Admin Login Successful! Redirecting to Admin Panel...");
//       setIsLoading(false);
//       navigateToAdminPanel();
//       return;
//     }

//     try {
//       const url = isSignup
//         ? "/api/auth/signup"
//         : "/api/auth/login";

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Something went wrong");
//         setIsLoading(false);
//         return;
//       }

//       const history = {
//         email: formData.email,
//         name: data.name || formData.name,
//         timestamp: new Date().toISOString(),
//         type: isSignup ? "signup" : "login",
//       };

//       const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
//       localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("userRole", data.role || "user");
//       localStorage.setItem("userEmail", formData.email);
//       localStorage.setItem("userName", data.name || formData.name);

//       setIsAdmin(false);

//       alert(isSignup ? "Signup Successful!" : "Login Successful!");
//       close?.();
//       onLoginSuccess?.();
//       window.location.reload();

//     } catch (err) {
//       setError("Network error. Backend may be OFF. Start your server!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearForm = () =>
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });

//   const handleToggleMode = () => {
//     setIsSignup(!isSignup);
//     clearForm();
//     setError("");
//   };

//   // Show ForgotPasswordOTP component if state is true
//   if (showForgotPassword) {
//     return (
//       <ForgotPassword 
//         onBackToLogin={() => setShowForgotPassword(false)}
//         onClose={close}
//       />
//     );
//   }

//   return (
//     <div className="login-overlay">
//       <div className="login-box">
//         <button className="close-btn" onClick={() => close?.()}>×</button>

//         <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
//         <p className="login-subtitle">
//           {isSignup ? "Sign up to get started" : "Sign in to your account"}
//         </p>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           {isSignup && (
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="form-input"
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="form-input"
//             />
//           </div>

//           {isSignup && (
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className={`submit-btn ${isLoading ? "loading" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner"></div>
//                 {isSignup ? "Creating Account..." : "Signing In..."}
//               </>
//             ) : isSignup ? (
//               "Create Account"
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         {/* Forgot Password Link - Only show in login mode */}
//         {!isSignup && (
//           <p className="forgot-password-link">
//             <span 
//               onClick={() => setShowForgotPassword(true)} 
//               className="toggle-link"
//               style={{ cursor: 'pointer', fontSize: '14px' }}
//             >
//               Forgot Password?
//             </span>
//           </p>
//         )}

//         <p className="toggle-text">
//           {isSignup ? "Already have an account?" : "Don't have an account?"}
//           <span onClick={handleToggleMode} className="toggle-link">
//             {isSignup ? " Sign In" : " Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

















// components/Login.tsx (updated)
"use client";

import React, { useState } from "react";
import { useAdmin } from "../../AdminContext";
import ForgotPassword from "@/app/components/ForgotPassword"; // We'll create this
import "./login.css";

interface LoginProps {
  close?: () => void;
  onLoginSuccess?: () => void;
}

export default function Login({ close, onLoginSuccess }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { setIsAdmin } = useAdmin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const navigateToAdminPanel = () => {
    window.location.href = "/admin/dashboard";
  };

  const showCustomAlert = (message: string, type: "success" | "error" = "success") => {
    // Create custom alert element
    const alertDiv = document.createElement("div");
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.innerHTML = `
      <div class="custom-alert-content">
        <span>${message}</span>
        <button class="custom-alert-close">×</button>
      </div>
    `;
    
    // Add styles
    alertDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#4CAF50" : "#f44336"};
      color: white;
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      min-width: 300px;
      max-width: 400px;
    `;
    
    const content = alertDiv.querySelector('.custom-alert-content') as HTMLElement;
    if (content) {
      content.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      `;
    }
    
    const closeBtn = alertDiv.querySelector('.custom-alert-close') as HTMLElement;
    if (closeBtn) {
      closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      `;
      closeBtn.onclick = () => {
        alertDiv.style.animation = "slideOut 0.3s ease-out forwards";
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 300);
      };
    }
    
    // Add keyframes for animation
    if (!document.querySelector('#custom-alert-styles')) {
      const style = document.createElement('style');
      style.id = 'custom-alert-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.style.animation = "slideOut 0.3s ease-out forwards";
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 300);
      }
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }
    }

    // Admin login logic
    if (!isSignup && formData.email === "omspiritual2025@gmail.com" && formData.password === "omikamari@78") {
      const history = {
        email: formData.email,




        
        name: "Admin",
        timestamp: new Date().toISOString(),
        type: "login",
      };

      const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
      localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

      localStorage.setItem("authToken", "adminToken");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", "Admin");
      
      setIsAdmin(true);

      showCustomAlert("Admin Login Successful! Redirecting to Admin Panel...");
      setIsLoading(false);
      navigateToAdminPanel();
      return;
    }

    try {
      const url = isSignup
        ? "/api/auth/signup"
        : "/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setIsLoading(false);
        return;
      }

      const history = {
        email: formData.email,
        name: data.name || formData.name,
        timestamp: new Date().toISOString(),
        type: isSignup ? "signup" : "login",
      };

      const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
      localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role || "user");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", data.name || formData.name);

      setIsAdmin(false);

      showCustomAlert(isSignup ? "Signup Successful!" : "Login Successful!");
      close?.();
      onLoginSuccess?.();
      window.location.reload();

    } catch (err) {
      setError("Connection error. Please try again later.");
      showCustomAlert("Unable to connect to server. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () =>
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleToggleMode = () => {
    setIsSignup(!isSignup);
    clearForm();
    setError("");
  };

  // Show ForgotPasswordOTP component if state is true
  if (showForgotPassword) {
    return (
      <ForgotPassword 
        onBackToLogin={() => setShowForgotPassword(false)}
        onClose={close}
      />
    );
  }

  return (
    <div className="login-overlay">
      <div className="login-box">
        <button className="close-btn" onClick={() => close?.()}>×</button>

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p className="login-subtitle">
          {isSignup ? "Sign up to get started" : "Sign in to your account"}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          )}

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                {isSignup ? "Creating Account..." : "Signing In..."}
              </>
            ) : isSignup ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Forgot Password Link - Only show in login mode */}
        {!isSignup && (
          <p className="forgot-password-link">
            <span 
              onClick={() => setShowForgotPassword(true)} 
              className="toggle-link"
              style={{ cursor: 'pointer', fontSize: '14px' }}
            >
              Forgot Password?
            </span>
          </p>
        )}

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span onClick={handleToggleMode} className="toggle-link">
            {isSignup ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}