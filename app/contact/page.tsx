// "use client";

// import React, { useState } from "react";
// import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare, FiGlobe } from "react-icons/fi";
// import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// }

// export default function Contact() {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const validateForm = () => {
//     const newErrors: Partial<FormData> = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = "Invalid phone number (10 digits required)";
//     }
//     if (!formData.message.trim()) newErrors.message = "Message is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;

//     if (name === 'phone') {
//       // Format phone number as user types
//       const numbers = value.replace(/\D/g, '');
//       let formatted = numbers;
//       if (numbers.length > 3 && numbers.length <= 6) {
//         formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
//       } else if (numbers.length > 6) {
//         formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
//       }
//       setFormData({ ...formData, [name]: formatted });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }

//     // Clear error when user starts typing
//     if (errors[name as keyof FormData]) {
//       setErrors({ ...errors, [name]: undefined });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     setIsSubmitted(true);
//     setFormData({ name: "", email: "", phone: "", message: "" });
//     setErrors({});

//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(false);
//     }, 3000);
//   };

//   const socialLinks = [
//     { icon: <FaFacebook />, label: "Facebook", color: "#1877F2", url: "#" },
//     { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", url: "#" },
//     { icon: <FaYoutube />, label: "YouTube", color: "#FF0000", url: "#" },
//     { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25D366", url: "#" },
//     { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", url: "#" },
//     { icon: <FaLinkedin />, label: "LinkedIn", color: "#0A66C2", url: "#" },
//   ];

//   const contactInfo = [
//     { icon: <FiMapPin />, label: "Address", info: "123 Book Street, San Francisco, CA 94107" },
//     { icon: <FiPhone />, label: "Phone", info: "+1 (555) 123-4567" },
//     { icon: <FiMail />, label: "Email", info: "support@bookhub.com" },
//     { icon: <FiGlobe />, label: "Website", info: "www.bookhub.com" },
//   ];

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       padding: '2rem 1rem',
//       fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto'
//       }}>
//         {/* Header */}
//         <div style={{
//           textAlign: 'center',
//           marginBottom: '3rem'
//         }}>
//           <h1 style={{
//             fontSize: 'clamp(2rem, 4vw, 2.8rem)',
//             fontWeight: '800',
//             color: '#2c3e50',
//             marginBottom: '0.5rem'
//           }}>
//             Contact Us
//           </h1>
//           <p style={{
//             fontSize: '1.1rem',
//             color: '#4a5568',
//             maxWidth: '600px',
//             margin: '0 auto'
//           }}>
//             Get in touch with us. We're here to help!
//           </p>
//         </div>

//         {/* Main Content Grid */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: '2rem',
//           alignItems: 'start'
//         }}>
//           {/* Left Side - Contact Form */}
//           <div style={{
//             backgroundColor: '#ffffff',
//             borderRadius: '15px',
//             padding: '2rem',
//             boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
//             border: '1px solid #e2e8f0'
//           }}>
//             <h2 style={{
//               fontSize: '1.5rem',
//               fontWeight: '700',
//               color: '#2c3e50',
//               marginBottom: '1.5rem',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px'
//             }}>
//               <FiSend style={{ color: '#99bbcf' }} />
//               Send us a Message
//             </h2>

//             {isSubmitted ? (
//               <div style={{
//                 textAlign: 'center',
//                 padding: '2rem',
//                 backgroundColor: '#f0f9f4',
//                 borderRadius: '10px',
//                 border: '1px solid #c6f6d5'
//               }}>
//                 <div style={{
//                   width: '50px',
//                   height: '50px',
//                   borderRadius: '50%',
//                   backgroundColor: '#48bb78',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 1rem',
//                   color: 'white'
//                 }}>
//                   ✓
//                 </div>
//                 <h3 style={{ color: '#22543d', marginBottom: '0.5rem' }}>
//                   Message Sent Successfully!
//                 </h3>
//                 <p style={{ color: '#4a5568' }}>
//                   We'll get back to you within 24 hours.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
//                 {/* Name Field */}
//                 <div>
//                   <label
//                     style={{
//                       display: 'flex',
//                       fontSize: '0.95rem',
//                       fontWeight: '600',
//                       color: '#2c3e50',
//                       marginBottom: '0.4rem',
//                       alignItems: 'center',
//                       gap: '6px'
//                     }}
//                   >
//                     <FiUser style={{ fontSize: '0.9rem', color: '#99bbcf' }} />
//                     Full Name *
//                   </label>

//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 14px',
//                       fontSize: '1rem',
//                       border: `2px solid ${errors.name ? '#fc8181' : '#e2e8f0'}`,
//                       borderRadius: '8px',
//                       outline: 'none',
//                       transition: 'all 0.3s ease',
//                       backgroundColor: '#f8fafc'
//                     }}
//                     placeholder="Enter your full name"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#99bbcf';
//                       e.target.style.backgroundColor = '#ffffff';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = errors.name ? '#fc8181' : '#e2e8f0';
//                       e.target.style.backgroundColor = '#f8fafc';
//                     }}
//                   />
//                   {errors.name && (
//                     <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '0.3rem' }}>
//                       {errors.name}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label
//                     style={{
//                       display: 'flex',
//                       fontSize: '0.95rem',
//                       fontWeight: '600',
//                       color: '#2c3e50',
//                       marginBottom: '0.4rem',
//                       alignItems: 'center',
//                       gap: '6px'
//                     }}
//                   >
//                     <FiMail style={{ fontSize: '0.9rem', color: '#99bbcf' }} />
//                     Email Address *
//                   </label>

//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 14px',
//                       fontSize: '1rem',
//                       border: `2px solid ${errors.email ? '#fc8181' : '#e2e8f0'}`,
//                       borderRadius: '8px',
//                       outline: 'none',
//                       transition: 'all 0.3s ease',
//                       backgroundColor: '#f8fafc'
//                     }}
//                     placeholder="your@email.com"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#99bbcf';
//                       e.target.style.backgroundColor = '#ffffff';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = errors.email ? '#fc8181' : '#e2e8f0';
//                       e.target.style.backgroundColor = '#f8fafc';
//                     }}
//                   />
//                   {errors.email && (
//                     <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '0.3rem' }}>
//                       {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Phone Field */}
//                 <div>
//                   <label
//                     style={{
//                       display: 'flex',
//                       fontSize: '0.95rem',
//                       fontWeight: '600',
//                       color: '#2c3e50',
//                       marginBottom: '0.4rem',
//                       alignItems: 'center',
//                       gap: '6px'
//                     }}
//                   >
//                     <FiPhone style={{ fontSize: '0.9rem', color: '#99bbcf' }} />
//                     Phone Number *
//                   </label>

//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 14px',
//                       fontSize: '1rem',
//                       border: `2px solid ${errors.phone ? '#fc8181' : '#e2e8f0'}`,
//                       borderRadius: '8px',
//                       outline: 'none',
//                       transition: 'all 0.3s ease',
//                       backgroundColor: '#f8fafc'
//                     }}
//                     placeholder="123-456-7890"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#99bbcf';
//                       e.target.style.backgroundColor = '#ffffff';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = errors.phone ? '#fc8181' : '#e2e8f0';
//                       e.target.style.backgroundColor = '#f8fafc';
//                     }}
//                   />
//                   {errors.phone && (
//                     <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '0.3rem' }}>
//                       {errors.phone}
//                     </p>
//                   )}
//                 </div>

//                 {/* Message Field */}
//                 <div>
//                   <label
//                     style={{
//                       display: 'flex',
//                       fontSize: '0.95rem',
//                       fontWeight: '600',
//                       color: '#2c3e50',
//                       marginBottom: '0.4rem',
//                       alignItems: 'center',
//                       gap: '6px'
//                     }}
//                   >
//                     <FiMessageSquare style={{ fontSize: '0.9rem', color: '#99bbcf' }} />
//                     Message *
//                   </label>

//                   <textarea
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 14px',
//                       fontSize: '1rem',
//                       border: `2px solid ${errors.message ? '#fc8181' : '#e2e8f0'}`,
//                       borderRadius: '8px',
//                       outline: 'none',
//                       transition: 'all 0.3s ease',
//                       backgroundColor: '#f8fafc',
//                       resize: 'vertical',
//                       minHeight: '120px'
//                     }}
//                     placeholder="How can we help you?"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#99bbcf';
//                       e.target.style.backgroundColor = '#ffffff';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = errors.message ? '#fc8181' : '#e2e8f0';
//                       e.target.style.backgroundColor = '#f8fafc';
//                     }}
//                   />
//                   {errors.message && (
//                     <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '0.3rem' }}>
//                       {errors.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   style={{
//                     marginTop: '0.5rem',
//                     padding: '14px 24px',
//                     fontSize: '1rem',
//                     fontWeight: '600',
//                     color: 'white',
//                     backgroundColor: isSubmitting ? '#a0aec0' : '#2c3e50',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: isSubmitting ? 'not-allowed' : 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '8px',
//                     transition: 'all 0.3s ease',
//                     width: '100%'
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isSubmitting) {
//                       e.currentTarget.style.backgroundColor = '#1a202c';
//                       e.currentTarget.style.transform = 'translateY(-1px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isSubmitting) {
//                       e.currentTarget.style.backgroundColor = '#2c3e50';
//                       e.currentTarget.style.transform = 'translateY(0)';
//                     }
//                   }}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div style={{
//                         width: '18px',
//                         height: '18px',
//                         border: '2px solid rgba(255,255,255,0.3)',
//                         borderTop: '2px solid white',
//                         borderRadius: '50%',
//                         animation: 'spin 1s linear infinite'
//                       }} />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <FiSend style={{ fontSize: '1.1rem' }} />
//                       Send Message
//                     </>
//                   )}
//                 </button>
//               </form>
//             )}
//           </div>

//           {/* Right Side - Google Map & Contact Info */}
//           <div>
//             {/* Google Map */}
//             <div style={{
//               backgroundColor: '#ffffff',
//               borderRadius: '15px',
//               padding: '1.5rem',
//               boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
//               border: '1px solid #e2e8f0',
//               marginBottom: '1.5rem'
//             }}>
//               <h2 style={{
//                 fontSize: '1.5rem',
//                 fontWeight: '700',
//                 color: '#2c3e50',
//                 marginBottom: '1rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <FiMapPin style={{ color: '#99bbcf' }} />
//                 Our Location
//               </h2>

//               {/* Google Maps Embed */}
//               <div style={{
//                 height: '250px',
//                 borderRadius: '10px',
//                 overflow: 'hidden',
//                 border: '1px solid #e2e8f0'
//               }}>
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0353875248135!2d-122.419416684682!3d37.774929779759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c0b9f2c3f%3A0x5e7c2a5a5a5a5a5a!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="Google Maps Location"
//                 />
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div style={{
//               backgroundColor: '#ffffff',
//               borderRadius: '15px',
//               padding: '1.5rem',
//               boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
//               border: '1px solid #e2e8f0'
//             }}>
//               <h2 style={{
//                 fontSize: '1.5rem',
//                 fontWeight: '700',
//                 color: '#2c3e50',
//                 marginBottom: '1rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 Contact Information
//               </h2>

//               {/* Contact Details */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
//                 {contactInfo.map((item, index) => (
//                   <div key={index} style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '12px'
//                   }}>
//                     <div style={{
//                       width: '36px',
//                       height: '36px',
//                       borderRadius: '8px',
//                       backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0,
//                       border: '1px solid rgba(153, 187, 207, 0.3)'
//                     }}>
//                       <div style={{ color: '#99bbcf', fontSize: '1rem' }}>
//                         {item.icon}
//                       </div>
//                     </div>
//                     <div>
//                       <p style={{
//                         fontSize: '0.9rem',
//                         fontWeight: '600',
//                         color: '#2c3e50',
//                         marginBottom: '0.2rem'
//                       }}>
//                         {item.label}
//                       </p>
//                       <p style={{ fontSize: '0.95rem', color: '#4a5568' }}>
//                         {item.info}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Social Media Links */}
//               <div>
//                 <h3 style={{
//                   fontSize: '1.1rem',
//                   fontWeight: '600',
//                   color: '#2c3e50',
//                   marginBottom: '0.8rem'
//                 }}>
//                   Connect With Us
//                 </h3>
//                 <div style={{
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   gap: '0.8rem'
//                 }}>
//                   {socialLinks.map((social, index) => (
//                     <a
//                       key={index}
//                       href={social.url}
//                       style={{
//                         width: '40px',
//                         height: '40px',
//                         borderRadius: '8px',
//                         backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         textDecoration: 'none',
//                         transition: 'all 0.3s ease',
//                         color: social.color,
//                         border: '1px solid rgba(153, 187, 207, 0.3)'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = social.color;
//                         e.currentTarget.style.transform = 'translateY(-2px)';
//                         e.currentTarget.style.color = 'white';
//                         e.currentTarget.style.borderColor = social.color;
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = 'rgba(153, 187, 207, 0.15)';
//                         e.currentTarget.style.transform = 'translateY(0)';
//                         e.currentTarget.style.color = social.color;
//                         e.currentTarget.style.borderColor = 'rgba(153, 187, 207, 0.3)';
//                       }}
//                       aria-label={social.label}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <div style={{ fontSize: '1.2rem' }}>
//                         {social.icon}
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div style={{
//           textAlign: 'center',
//           marginTop: '3rem',
//           padding: '1.5rem',
//           color: '#718096',
//           fontSize: '0.9rem',
//           borderTop: '1px solid #e2e8f0'
//         }}>
//           <p>
//             We typically respond within 24 hours on business days.
//           </p>
//         </div>

//         {/* Animation Styles */}
//         <style jsx>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
          
//           @media (max-width: 768px) {
//             div[style*="gridTemplateColumns: 1fr 1fr"] {
//               grid-template-columns: 1fr;
//               gap: 1.5rem;
//             }
            
//             div[style*="padding: 2rem"] {
//               padding: 1.5rem;
//             }
            
//             h1[style*="fontSize: clamp(2rem"] {
//               font-size: 1.8rem !important;
//             }
            
//             div[style*="height: 250px"] {
//               height: 200px;
//             }
//           }
          
//           @media (max-width: 480px) {
//             div[style*="padding: 2rem 1rem"] {
//               padding: 1rem 0.5rem;
//             }
            
//             div[style*="padding: 1.5rem"] {
//               padding: 1rem;
//             }
            
//             input[style*="padding: 12px 14px"],
//             textarea[style*="padding: 12px 14px"] {
//               padding: 10px 12px;
//             }
            
//             button[style*="padding: 14px 24px"] {
//               padding: 12px 20px;
//             }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

































"use client";

import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare, FiClock, FiCheck } from "react-icons/fi";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "10 digits required";
    }
    if (!formData.message.trim()) newErrors.message = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const numbers = value.replace(/\D/g, '');
      let formatted = numbers;
      if (numbers.length > 3 && numbers.length <= 6) {
        formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else if (numbers.length > 6) {
        formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
      }
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-wrapper">
          
          {/* Header */}
          <div className="contact-header">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">Get in touch with our team</p>
          </div>

          {/* Main Content Grid */}
          <div className="contact-grid">
            
            {/* Send Message Section */}
            <div className="contact-section message-section">
              <div className="section-header">
                <div className="section-icon">
                  <FiSend />
                </div>
                <h2 className="section-title">Send Message</h2>
              </div>

              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <FiCheck />
                  </div>
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-text">We&apos;ll respond within 24 hours</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-grid">
                    
                    {/* Name Field */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? "input-error" : ""}`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="error-text">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? "input-error" : ""}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="error-text">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? "input-error" : ""}`}
                        placeholder="123-456-7890"
                      />
                      {errors.phone && (
                        <p className="error-text">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="message">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-textarea ${errors.message ? "input-error" : ""}`}
                        placeholder="Your message..."
                      />
                      {errors.message && (
                        <p className="error-text">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group full-width">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                      >
                        {isSubmitting ? (
                          <span className="btn-content">
                            <span className="spinner"></span>
                            Sending...
                          </span>
                        ) : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Our Location Section */}
            <div className="contact-section location-section">
              <div className="section-header">
                <div className="section-icon">
                  <FiMapPin />
                </div>
                <h2 className="section-title">Our Location</h2>
              </div>

              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0353875248135!2d-122.419416684682!3d37.774929779759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c0b9f2c3f%3A0x5e7c2a5a5a5a5a5a!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Our Location"
                />
              </div>
              
              <div className="address-box">
                <p className="address-title">
                  📍 Address
                </p>
                <p className="address-text">
                  123 Book Street<br />
                  San Francisco, CA 94107<br />
                  United States
                </p>
              </div>

              <div className="info-box parking-info">
                <FiMapPin className="info-icon" />
                <p>Free parking available</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="contact-footer">
            <p className="copyright">
              © 2026 BookHub. All rights reserved.
            </p>
            <p className="footer-note">
              Need immediate assistance? Call our 24/7 support line.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* === RESET AND BASE STYLES === */
        .contact-page {
          min-height: 100vh;
          background-color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        * {
          box-sizing: border-box;
        }

        /* === MOBILE-FIRST STYLES === */
        
        .contact-container {
          width: 100%;
          padding: 16px;
          overflow-x: hidden;
        }

        .contact-wrapper {
          max-width: 100%;
          margin: 0 auto;
          overflow-x: hidden;
        }

        /* Header */
        .contact-header {
          text-align: center;
          margin-bottom: 24px;
          padding: 0 8px;
          width: 100%;
          overflow: hidden;
        }

        .contact-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 8px;
          line-height: 1.2;
          word-wrap: break-word;
        }

        .contact-subtitle {
          font-size: 16px;
          color: #718096;
          line-height: 1.5;
          font-weight: 500;
          word-wrap: break-word;
        }

        /* Grid Layout - Mobile: Stacked */
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Sections */
        .contact-section {
          background: white;
          border-radius: 16px;
          padding: 24px 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          width: 100%;
        }

        .section-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-icon svg {
          color: white;
          font-size: 20px;
          stroke-width: 2.5;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
          line-height: 1.3;
          word-wrap: break-word;
        }

        /* Success Message */
        .success-message {
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #10b9810d 0%, #34d3990d 100%);
          border-radius: 12px;
          border: 1px solid #bbf7d0;
          width: 100%;
          overflow: hidden;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          font-size: 24px;
        }

        .success-title {
          color: #065f46;
          margin-bottom: 8px;
          font-size: 20px;
          font-weight: 700;
          word-wrap: break-word;
        }

        .success-text {
          color: #047857;
          font-size: 15px;
          font-weight: 500;
          word-wrap: break-word;
        }

        /* Form Styles */
        .contact-form {
          width: 100%;
          overflow: hidden;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 4px;
          word-wrap: break-word;
          width: 100%;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          outline: none;
          background-color: #f8fafc;
          font-family: inherit;
          transition: all 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
          max-width: 100%;
          box-sizing: border-box;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: #4f46e5;
          background-color: white;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .form-input.input-error,
        .form-textarea.input-error {
          border-color: #ef4444;
          background-color: #fef2f2;
        }

        .error-text {
          color: #dc2626;
          font-size: 13px;
          margin-top: 4px;
          font-weight: 500;
          padding-left: 4px;
          word-wrap: break-word;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 18px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          height: 56px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          max-width: 100%;
          box-sizing: border-box;
        }

        .submit-btn:not(.submitting):active {
          transform: scale(0.98);
        }

        .submit-btn.submitting {
          background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
          cursor: not-allowed;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Map Section */
        .map-container {
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e2e8f0;
          margin-bottom: 20px;
          position: relative;
          width: 100%;
        }

        .map-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .address-box {
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          margin-bottom: 16px;
          border: 1px solid #e2e8f0;
          width: 100%;
        }

        .address-title {
          font-size: 14px;
          color: #4f46e5;
          margin: 0 0 8px 0;
          font-weight: 700;
          word-wrap: break-word;
        }

        .address-text {
          font-size: 15px;
          color: #4a5568;
          margin: 0;
          line-height: 1.6;
          font-weight: 500;
          word-wrap: break-word;
        }

        /* Info Boxes */
        .info-box {
          padding: 16px;
          border-radius: 12px;
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 100%;
        }

        .parking-info {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-left: 4px solid #3b82f6;
        }

        .info-icon {
          color: #3b82f6;
          font-size: 18px;
          stroke-width: 2.5;
          flex-shrink: 0;
        }

        .parking-info p {
          font-size: 15px;
          color: #1e40af;
          margin: 0;
          font-weight: 600;
          line-height: 1.4;
          word-wrap: break-word;
          flex: 1;
        }

        /* Footer */
        .contact-footer {
          text-align: center;
          margin-top: 48px;
          padding-top: 28px;
          border-top: 1px solid #e5e7eb;
          padding: 0 8px;
          width: 100%;
        }

        .copyright {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 8px 0;
          font-weight: 500;
          word-wrap: break-word;
        }

        .footer-note {
          font-size: 13px;
          color: #9ca3af;
          margin: 0;
          font-weight: 500;
          line-height: 1.4;
          word-wrap: break-word;
        }

        /* === RESPONSIVE BREAKPOINTS === */
        
        /* Tablet (min-width: 640px) */
        @media (min-width: 640px) {
          .contact-container {
            padding: 24px;
          }

          .contact-title {
            font-size: 32px;
          }

          .contact-subtitle {
            font-size: 18px;
          }

          .contact-section {
            padding: 28px 24px;
          }

          .section-title {
            font-size: 22px;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .form-group.full-width {
            grid-column: 1 / -1;
          }

          .map-container {
            height: 220px;
          }
        }

        /* Large Tablet (min-width: 768px) */
        @media (min-width: 768px) {
          .contact-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .message-section {
            grid-column: 1;
          }

          .location-section {
            grid-column: 2;
          }

          .contact-section {
            padding: 32px 28px;
          }

          .section-title {
            font-size: 24px;
          }

          .contact-title {
            font-size: 36px;
          }
        }

        /* Desktop (min-width: 1024px) */
        @media (min-width: 1024px) {
          .contact-container {
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .contact-wrapper {
            width: 100%;
            max-width: 1200px;
          }

          .contact-header {
            margin-bottom: 48px;
          }

          .contact-title {
            font-size: 40px;
          }

          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }

          .message-section {
            grid-column: 1;
          }

          .location-section {
            grid-column: 2;
          }

          .contact-section {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 36px 32px;
          }

          .form-grid {
            flex: 1;
          }

          .submit-btn {
            margin-top: auto;
          }

          .map-container {
            height: 180px;
            flex-shrink: 0;
          }

          .address-box,
          .info-box {
            flex-shrink: 0;
          }
        }

        /* Large Desktop (min-width: 1280px) */
        @media (min-width: 1280px) {
          .contact-container {
            padding: 40px;
          }

          .contact-grid {
            gap: 40px;
          }

          .contact-section {
            padding: 40px 36px;
          }

          .map-container {
            height: 200px;
          }
        }

        /* === TOUCH DEVICE OPTIMIZATIONS === */
        @media (hover: none) and (pointer: coarse) {
          .form-input,
          .form-textarea,
          .submit-btn {
            font-size: 16px !important;
            min-height: 56px;
          }

          .submit-btn {
            min-height: 56px;
          }

          .contact-section {
            border: 2px solid #e2e8f0;
          }
        }

        /* === FIX FOR IOS ZOOM ON INPUT FOCUS === */
        @media screen and (max-width: 768px) {
          input.form-input,
          textarea.form-textarea,
          select.form-input {
            font-size: 16px !important;
          }
        }

        /* === DARK MODE SUPPORT === */
        @media (prefers-color-scheme: dark) {
          .contact-page {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          }

          .contact-section {
            background: #1e293b;
            border-color: #334155;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          }

          .contact-title,
          .section-title {
            color: #f8fafc;
          }

          .contact-subtitle {
            color: #cbd5e1;
          }

          .form-label {
            color: #cbd5e1;
          }

          .form-input,
          .form-textarea {
            background-color: #334155;
            border-color: #475569;
            color: #f8fafc;
          }

          .form-input:focus,
          .form-textarea:focus {
            background-color: #1e293b;
            border-color: #6366f1;
          }

          .address-box {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            border-color: #475569;
          }

          .address-text {
            color: #cbd5e1;
          }

          .parking-info {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
            border-color: #3b82f6;
          }

          .parking-info p {
            color: #dbeafe;
          }
        }
      `}</style>
    </div>
  );
}