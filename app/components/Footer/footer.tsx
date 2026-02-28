// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
// import { FiMapPin, FiPhone, FiMail, FiGlobe } from "react-icons/fi";

// export default function Footer() {
//   const socialLinks = [
//     { icon: <FaFacebookF />, label: "Facebook", color: "#1877F2", url: "#" },
//     { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", url: "#" },
//     { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", url: "#" },
//     { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25D366", url: "#" },
//     { icon: <FaLinkedinIn />, label: "LinkedIn", color: "#0A66C2", url: "#" },
//   ];

//   const companyLinks = [
//     { text: "About Us", url: "/about" },
//     { text: "Our Team", url: "/our-team" },
//     { text: "Careers", url: "/careers" },
//     { text: "Blog", url: "/blogs" },
//   ];

//   const supportLinks = [
//     { text: "Help Center", url: "/help Center" },
//     { text: "Contact Us", url: "/contact" },
//     { text: "Privacy Policy", url: "/Privacy Policy" },
//     { text: "Terms of Service", url: "/Terms of Service" },
//   ];

//   const contactInfo = [
//     { icon: <FiMapPin />, text: "B133/1, 2nd Floor, KSSIDC ITI Estate, Whitefield Main Rd, Bengaluru, Karnataka 560048" },
//     { icon: <FiPhone />, text: "+91 98765 43210" },
//     { icon: <FiMail />, text: "info@bookhub.com" },
//     { icon: <FiGlobe />, text: "www.bookhub.com" },
//   ];

//   return (
//     <footer style={{
//       backgroundColor: '#2c3e50',
//       color: '#ffffff',
//       padding: '3rem 1rem 1rem',
//       fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
//     }}>
//       <div style={{
//         maxWidth: '1400px',
//         margin: '0 auto'
//       }}>
//         {/* Main Footer Content */}
//         <div className="footer-grid" style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '3rem',
//           marginBottom: '2rem'
//         }}>
//           {/* Left Section - Brand & Social */}
//           <div className="footer-brand" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem'
//           }}>
//             {/* Logo */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '1rem',
//               marginBottom: '0.5rem'
//             }}>
//               <Image
//                 src="/assets/images/booklogo.webp"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={{
//                   borderRadius: '50%',
//                   boxShadow: '0 4px 15px rgba(153, 187, 207, 0.3)',
//                   objectFit: 'cover'
//                 }}
//               />
//               <div>
//                 <h2 style={{
//                   fontSize: '1.8rem',
//                   fontWeight: '700',
//                   color: '#ffffff',
//                   margin: 0
//                 }}>
//                   OM Spiritual 
//                 </h2>
//                 <p style={{
//                   fontSize: '0.9rem',
//                   color: '#99bbcf',
//                   margin: 0,
//                   opacity: 0.9
//                 }}>
//                   Books & Wisdom
//                 </p>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="footer-description" style={{
//               color: '#cbd5e0',
//               lineHeight: '1.6',
//               fontSize: '0.95rem',
//               margin: 0
//             }}>
//               We are dedicated to providing the best service and quality products 
//               to our customers worldwide. Join us on our journey to excellence.
//             </p>

//             {/* Social Icons */}
//             <div>
//               <h3 style={{
//                 fontSize: '1.1rem',
//                 fontWeight: '600',
//                 color: '#ffffff',
//                 marginBottom: '1rem'
//               }}>
//                 Follow Us
//               </h3>
//               <div className="social-icons" style={{
//                 display: 'flex',
//                 gap: '0.8rem',
//                 flexWrap: 'wrap'
//               }}>
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{
//                       width: '40px',
//                       height: '40px',
//                       borderRadius: '8px',
//                       backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       textDecoration: 'none',
//                       transition: 'all 0.3s ease',
//                       color: '#ffffff',
//                       border: '1px solid rgba(255, 255, 255, 0.2)'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = social.color;
//                       e.currentTarget.style.transform = 'translateY(-3px)';
//                       e.currentTarget.style.boxShadow = `0 6px 15px ${social.color}40`;
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
//                       e.currentTarget.style.transform = 'translateY(0)';
//                       e.currentTarget.style.boxShadow = 'none';
//                     }}
//                     aria-label={social.label}
//                   >
//                     <div style={{ fontSize: '1.1rem' }}>
//                       {social.icon}
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Center Section - Quick Links */}
//           <div className="footer-links-wrapper" style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             flexWrap: 'wrap',
//             gap: '2rem'
//           }}>
//             {/* Company Links */}
//             <div className="footer-links-column" style={{ flex: 1, minWidth: '150px' }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Company
//               </h3>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0.7rem'
//               }}>
//                 {companyLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       style={{
//                         color: '#cbd5e0',
//                         textDecoration: 'none',
//                         fontSize: '0.95rem',
//                         transition: 'all 0.3s ease',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.color = '#99bbcf';
//                         e.currentTarget.style.transform = 'translateX(5px)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.color = '#cbd5e0';
//                         e.currentTarget.style.transform = 'translateX(0)';
//                       }}
//                     >
//                       <span style={{
//                         width: '4px',
//                         height: '4px',
//                         backgroundColor: '#99bbcf',
//                         borderRadius: '50%',
//                         opacity: 0.7
//                       }} />
//                       {link.text}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support Links */}
//             <div className="footer-links-column" style={{ flex: 1, minWidth: '150px' }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Support
//               </h3>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0.7rem'
//               }}>
//                 {supportLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       style={{
//                         color: '#cbd5e0',
//                         textDecoration: 'none',
//                         fontSize: '0.95rem',
//                         transition: 'all 0.3s ease',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.color = '#99bbcf';
//                         e.currentTarget.style.transform = 'translateX(5px)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.color = '#cbd5e0';
//                         e.currentTarget.style.transform = 'translateX(0)';
//                       }}
//                     >
//                       <span style={{
//                         width: '4px',
//                         height: '4px',
//                         backgroundColor: '#99bbcf',
//                         borderRadius: '50%',
//                         opacity: 0.7
//                       }} />
//                       {link.text}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Right Section - Contact Info */}
//           <div className="footer-contact">
//             <div style={{
//               marginBottom: '1.5rem'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Contact Info
//               </h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '1rem'
//               }}>
//                 {contactInfo.map((info, index) => (
//                   <div key={index} style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '12px'
//                   }}>
//                     <div style={{
//                       width: '32px',
//                       height: '32px',
//                       borderRadius: '6px',
//                       backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0,
//                       border: '1px solid rgba(153, 187, 207, 0.3)'
//                     }}>
//                       <div style={{ color: '#99bbcf', fontSize: '0.9rem' }}>
//                         {info.icon}
//                       </div>
//                     </div>
//                     <span style={{
//                       fontSize: '0.9rem',
//                       color: '#cbd5e0',
//                       lineHeight: '1.4'
//                     }}>
//                       {info.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div style={{
//           height: '1px',
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           margin: '2rem 0'
//         }} />

//         {/* Footer Bottom */}
//         <div className="footer-bottom" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '1rem',
//           padding: '1rem 0'
//         }}>
//           <p style={{
//             color: '#cbd5e0',
//             fontSize: '0.9rem',
//             margin: 0
//           }}>
//             © {new Date().getFullYear()}{' '}
//             <a
//               href="#"
//               style={{
//                 color: '#99bbcf',
//                 textDecoration: 'none',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#ffffff';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//             >
//               BookHub
//             </a>
//             . All rights reserved.
//           </p>

//           <div className="footer-bottom-links" style={{
//             display: 'flex',
//             gap: '1.5rem',
//             fontSize: '0.9rem',
//             flexWrap: 'wrap'
//           }}>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Privacy Policy
//             </a>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Terms of Service
//             </a>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Cookie Policy
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Responsive Styles */}
//       <style jsx>{`
//         /* Tablet View - 2 Columns */
//         @media (max-width: 1024px) {
//           .footer-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//             gap: 2.5rem !important;
//           }
          
//           .footer-contact {
//             grid-column: span 2;
//           }
          
//           .footer-links-wrapper {
//             gap: 3rem !important;
//           }
//         }
        
//         /* Mobile View - Single Column */
//         @media (max-width: 768px) {
//           footer {
//             padding: 2.5rem 1.5rem 1.5rem !important;
//           }
          
//           .footer-grid {
//             grid-template-columns: 1fr !important;
//             gap: 2.5rem !important;
//           }
          
//           .footer-brand,
//           .footer-contact {
//             text-align: center;
//             align-items: center;
//           }
          
//           .footer-brand > div:first-child {
//             justify-content: center;
//           }
          
//           .footer-description {
//             text-align: center;
//           }
          
//           .social-icons {
//             justify-content: center !important;
//           }
          
//           .footer-links-wrapper {
//             justify-content: center !important;
//             text-align: center;
//             gap: 2rem !important;
//           }
          
//           .footer-links-column {
//             min-width: 120px !important;
//           }
          
//           .footer-links-column h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-links-column ul {
//             align-items: center;
//           }
          
//           .footer-links-column a {
//             justify-content: center !important;
//           }
          
//           .footer-contact {
//             grid-column: span 1 !important;
//           }
          
//           .footer-contact h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-contact > div > div {
//             align-items: center;
//           }
          
//           .footer-contact span {
//             text-align: center;
//           }
          
//           .footer-bottom {
//             flex-direction: column;
//             text-align: center;
//             gap: 1.5rem !important;
//           }
          
//           .footer-bottom p {
//             text-align: center;
//           }
          
//           .footer-bottom-links {
//             justify-content: center;
//             gap: 1rem !important;
//           }
//         }
        
//         /* Small Mobile View */
//         @media (max-width: 480px) {
//           footer {
//             padding: 2rem 1rem 1rem !important;
//           }
          
//           .footer-grid {
//             gap: 2rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.5rem !important;
//           }
          
//           .footer-brand p {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-description {
//             font-size: 0.9rem !important;
//           }
          
//           .social-icons {
//             gap: 0.6rem !important;
//           }
          
//           .social-icons a {
//             width: 36px !important;
//             height: 36px !important;
//           }
          
//           .footer-links-wrapper {
//             flex-direction: column;
//             gap: 2rem !important;
//           }
          
//           .footer-links-column {
//             width: 100%;
//           }
          
//           .footer-links-column h3,
//           .footer-contact h3 {
//             font-size: 1.1rem !important;
//           }
          
//           .footer-bottom-links {
//             flex-direction: column;
//             gap: 0.8rem !important;
//           }
          
//           .footer-bottom p {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-bottom-links a {
//             font-size: 0.85rem !important;
//           }
//         }
        
//         /* Extra Small Mobile View */
//         @media (max-width: 360px) {
//           footer {
//             padding: 1.5rem 0.8rem 1rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.3rem !important;
//           }
          
//           .footer-grid {
//             gap: 1.8rem !important;
//           }
          
//           .social-icons a {
//             width: 34px !important;
//             height: 34px !important;
//             font-size: 0.95rem !important;
//           }
//         }
//       `}</style>
//     </footer>
//   );
// }










// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
// import { FiMapPin, FiPhone, FiMail, FiGlobe } from "react-icons/fi";

// export default function Footer() {
//   const socialLinks = [
//     { icon: <FaFacebookF />, label: "Facebook", color: "#1877F2", url: "#" },
//     { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", url: "#" },
//     { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", url: "#" },
//     { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25D366", url: "#" },
//     { icon: <FaLinkedinIn />, label: "LinkedIn", color: "#0A66C2", url: "#" },
//   ];

//   const contactInfo = [
//     { icon: <FiMapPin />, text: "722P+35J Athiyandal, Tamil Nadu" },
//     { icon: <FiPhone />, text: "+91 7871721995" },
//     { icon: <FiMail />, text: "omspiritual2025@gmail.com" },
//     { icon: <FiGlobe />, text: "www.bookhub.com" },
//   ];

//   return (
//     <footer style={{
//       backgroundColor: '#2c3e50',
//       color: '#ffffff',
//       padding: '3rem 1rem 0.5rem',
//       fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
//     }}>
//       <div style={{
//         maxWidth: '1400px',
//         margin: '0 auto'
//       }}>
//         {/* Main Footer Content */}
//         <div className="footer-grid" style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '3rem',
//           marginBottom: '1.5rem'
//         }}>
//           {/* Left Section - Brand & Social */}
//           <div className="footer-brand" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem'
//           }}>
//             {/* Logo */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '1rem',
//               marginBottom: '0.5rem'
//             }}>
//               <Image
//                 src="/assets/images/OM.png"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={{
//                   borderRadius: '50%',
//                   boxShadow: '0 4px 15px rgba(153, 187, 207, 0.3)',
//                   objectFit: 'cover'
//                 }}
//               />
//               <div>
//                 <h2 style={{
//                   fontSize: '1.8rem',
//                   fontWeight: '700',
//                   color: '#ffffff',
//                   margin: 0
//                 }}>
//                   OM Spiritual 
//                 </h2>
//                 <p style={{
//                   fontSize: '0.9rem',
//                   color: '#99bbcf',
//                   margin: 0,
//                   opacity: 0.9
//                 }}>
//                   Books & Wisdom
//                 </p>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="footer-description" style={{
//               color: '#cbd5e0',
//               lineHeight: '1.6',
//               fontSize: '0.95rem',
//               margin: 0
//             }}>
//               We are dedicated to providing the best service and quality products 
//               to our customers worldwide. Join us on our journey to excellence.
//             </p>
//           </div>

//           {/* Center Section - Contact Info */}
//           <div className="footer-contact">
//             <div>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Contact Info
//               </h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '1rem'
//               }}>
//                 {contactInfo.map((info, index) => (
//                   <div key={index} style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '12px'
//                   }}>
//                     <div style={{
//                       width: '32px',
//                       height: '32px',
//                       borderRadius: '6px',
//                       backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0,
//                       border: '1px solid rgba(153, 187, 207, 0.3)'
//                     }}>
//                       <div style={{ color: '#99bbcf', fontSize: '0.9rem' }}>
//                         {info.icon}
//                       </div>
//                     </div>
//                     <span style={{
//                       fontSize: '0.9rem',
//                       color: '#cbd5e0',
//                       lineHeight: '1.4'
//                     }}>
//                       {info.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Map Location */}
//           <div className="footer-map" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem'
//           }}>
//             <h3 style={{
//               fontSize: '1.2rem',
//               fontWeight: '700',
//               color: '#ffffff',
//               marginBottom: '0.5rem',
//               paddingBottom: '0.5rem',
//               borderBottom: '2px solid #99bbcf',
//               display: 'inline-block'
//             }}>
//               Our Location
//             </h3>
//             <div style={{
//               width: '100%',
//               height: '180px',
//               borderRadius: '8px',
//               overflow: 'hidden',
//               border: '1px solid rgba(255, 255, 255, 0.1)'
//             }}>
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3898.971513481956!2d79.03282027506438!3d12.250206988002791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDE1JzAwLjgiTiA3OcKwMDInMDcuNCJF!5e0!3m2!1sen!2sin!4v1772000702567!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Office Location"
//               />
//             </div>
//             <p style={{
//               color: '#cbd5e0',
//               fontSize: '0.9rem',
//               margin: 0,
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem'
//             }}>
//               <FiMapPin style={{ color: '#99bbcf', flexShrink: 0 }} />
//               {/* <span>B133/1, Whitefield Main Rd, Bengaluru</span> */}
//             </p>
//           </div>
//         </div>

//         {/* Divider - Reduced top margin */}
//         <div style={{
//           height: '1px',
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           margin: '1rem 0 0.5rem'
//         }} />

//         {/* Footer Bottom - Reduced padding */}
//         <div className="footer-bottom" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '0.5rem',
//           padding: '0.5rem 0'
//         }}>
//           <p style={{
//             color: '#cbd5e0',
//             fontSize: '0.85rem',
//             margin: 0
//           }}>
//             © 2026{' '}
//             <a
//               href="#"
//               style={{
//                 color: '#99bbcf',
//                 textDecoration: 'none',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#ffffff';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//             >
//               BookHub
//             </a>
//             . All rights reserved.
//           </p>

//           <div className="footer-bottom-links" style={{
//             display: 'flex',
//             gap: '1.2rem',
//             fontSize: '0.85rem',
//             flexWrap: 'wrap'
//           }}>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Privacy Policy
//             </a>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Terms of Service
//             </a>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Help Center
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Responsive Styles */}
//       <style jsx>{`
//         /* Tablet View - 2 Columns */
//         @media (max-width: 1024px) {
//           .footer-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//             gap: 2.5rem !important;
//           }
          
//           .footer-map {
//             grid-column: span 2;
//           }
//         }
        
//         /* Mobile View - Single Column */
//         @media (max-width: 768px) {
//           footer {
//             padding: 2.5rem 1.5rem 0.5rem !important;
//           }
          
//           .footer-grid {
//             grid-template-columns: 1fr !important;
//             gap: 2rem !important;
//             margin-bottom: 1rem !important;
//           }
          
//           .footer-brand {
//             text-align: center;
//             align-items: center;
//           }
          
//           .footer-brand > div:first-child {
//             justify-content: center;
//           }
          
//           .footer-description {
//             text-align: center;
//           }
          
//           .footer-contact {
//             text-align: center;
//           }
          
//           .footer-contact h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-contact > div > div {
//             justify-content: center;
//           }
          
//           .footer-contact span {
//             text-align: left;
//           }
          
//           .footer-map {
//             text-align: center;
//           }
          
//           .footer-map h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-map p {
//             justify-content: center;
//           }
          
//           .footer-bottom {
//             flex-direction: column;
//             text-align: center;
//             gap: 0.8rem !important;
//           }
          
//           .footer-bottom p {
//             text-align: center;
//           }
          
//           .footer-bottom-links {
//             justify-content: center;
//             gap: 0.8rem !important;
//           }
//         }
        
//         /* Small Mobile View */
//         @media (max-width: 480px) {
//           footer {
//             padding: 2rem 1rem 0.5rem !important;
//           }
          
//           .footer-grid {
//             gap: 1.8rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.5rem !important;
//           }
          
//           .footer-brand p {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-description {
//             font-size: 0.9rem !important;
//           }
          
//           .footer-contact h3,
//           .footer-map h3 {
//             font-size: 1.1rem !important;
//           }
          
//           .footer-map > div:first-of-type {
//             height: 160px !important;
//           }
          
//           .footer-contact span {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-bottom-links {
//             gap: 0.6rem !important;
//           }
//         }
        
//         /* Extra Small Mobile View */
//         @media (max-width: 360px) {
//           footer {
//             padding: 1.5rem 0.8rem 0.5rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.3rem !important;
//           }
          
//           .footer-grid {
//             gap: 1.5rem !important;
//           }
          
//           .footer-map > div:first-of-type {
//             height: 140px !important;
//           }
//         }
//       `}</style>
//     </footer>
//   );
// }







// "use client";

// import React from "react";
// import Image from "next/image";
// import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
// import { FiMapPin, FiPhone, FiMail, FiGlobe } from "react-icons/fi";

// export default function Footer() {
//   const socialLinks = [
//     { icon: <FaFacebookF />, label: "Facebook", color: "#1877F2", url: "#" },
//     { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", url: "#" },
//     { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", url: "#" },
//     { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25D366", url: "#" },
//     { icon: <FaLinkedinIn />, label: "LinkedIn", color: "#0A66C2", url: "#" },
//   ];

//   const contactInfo = [
//     { icon: <FiMapPin />, text: "722P+35J Athiyandal, Tamil Nadu" },
//     { icon: <FiPhone />, text: "+91 7871721995" },
//     { icon: <FiMail />, text: "omspiritual2025@gmail.com" },
//     { icon: <FiGlobe />, text: "www.bookhub.com" },
//   ];

//   return (
//     <footer style={{
//       backgroundColor: '#2c3e50',
//       color: '#ffffff',
//       padding: '3rem 1rem 0.5rem',
//       fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
//       width: '100%',
//       overflowX: 'hidden'
//     }}>
//       <div style={{
//         maxWidth: '1400px',
//         margin: '0 auto',
//         width: '100%'
//       }}>
//         {/* Main Footer Content */}
//         <div className="footer-grid" style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '3rem',
//           marginBottom: '1.5rem'
//         }}>
//           {/* Left Section - Brand & Social */}
//           <div className="footer-brand" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem'
//           }}>
//             {/* Logo */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '1rem',
//               marginBottom: '0.5rem'
//             }}>
//               <Image
//                 src="/assets/images/OM.png"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={{
//                   borderRadius: '50%',
//                   boxShadow: '0 4px 15px rgba(153, 187, 207, 0.3)',
//                   objectFit: 'cover'
//                 }}
//               />
//               <div>
//                 <h2 style={{
//                   fontSize: '1.8rem',
//                   fontWeight: '700',
//                   color: '#ffffff',
//                   margin: 0,
//                   lineHeight: 1.2
//                 }}>
//                   OM Spiritual 
//                 </h2>
//                 <p style={{
//                   fontSize: '0.9rem',
//                   color: '#99bbcf',
//                   margin: 0,
//                   opacity: 0.9
//                 }}>
//                   Books & Wisdom
//                 </p>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="footer-description" style={{
//               color: '#cbd5e0',
//               lineHeight: '1.6',
//               fontSize: '0.95rem',
//               margin: 0
//             }}>
//               We are dedicated to providing the best service and quality products 
//               to our customers worldwide. Join us on our journey to excellence.
//             </p>

//             {/* Social Links - Added for mobile visibility */}
//             <div className="social-links-mobile" style={{
//               display: 'flex',
//               gap: '1rem',
//               marginTop: '0.5rem'
//             }}>
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.url}
//                   style={{
//                     width: '36px',
//                     height: '36px',
//                     borderRadius: '50%',
//                     backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: social.color,
//                     fontSize: '1rem',
//                     transition: 'all 0.3s ease',
//                     border: '1px solid rgba(153, 187, 207, 0.3)'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = social.color;
//                     e.currentTarget.style.color = '#ffffff';
//                     e.currentTarget.style.transform = 'translateY(-3px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = 'rgba(153, 187, 207, 0.15)';
//                     e.currentTarget.style.color = social.color;
//                     e.currentTarget.style.transform = 'translateY(0)';
//                   }}
//                   aria-label={social.label}
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Center Section - Contact Info */}
//           <div className="footer-contact">
//             <div>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Contact Info
//               </h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '1rem'
//               }}>
//                 {contactInfo.map((info, index) => (
//                   <div key={index} style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '12px'
//                   }}>
//                     <div style={{
//                       width: '32px',
//                       height: '32px',
//                       borderRadius: '6px',
//                       backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0,
//                       border: '1px solid rgba(153, 187, 207, 0.3)'
//                     }}>
//                       <div style={{ color: '#99bbcf', fontSize: '0.9rem' }}>
//                         {info.icon}
//                       </div>
//                     </div>
//                     <span style={{
//                       fontSize: '0.9rem',
//                       color: '#cbd5e0',
//                       lineHeight: '1.4',
//                       wordBreak: 'break-word'
//                     }}>
//                       {info.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Map Location */}
//           <div className="footer-map" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem'
//           }}>
//             <h3 style={{
//               fontSize: '1.2rem',
//               fontWeight: '700',
//               color: '#ffffff',
//               marginBottom: '0.5rem',
//               paddingBottom: '0.5rem',
//               borderBottom: '2px solid #99bbcf',
//               display: 'inline-block'
//             }}>
//               Our Location
//             </h3>
//             <div style={{
//               width: '100%',
//               height: '180px',
//               borderRadius: '8px',
//               overflow: 'hidden',
//               border: '1px solid rgba(255, 255, 255, 0.1)'
//             }}>
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3898.971513481956!2d79.03282027506438!3d12.250206988002791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDE1JzAwLjgiTiA3OcKwMDInMDcuNCJF!5e0!3m2!1sen!2sin!4v1772000702567!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Office Location"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div style={{
//           height: '1px',
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           margin: '1rem 0 0.5rem'
//         }} />

//         {/* Footer Bottom */}
//         <div className="footer-bottom" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '0.5rem',
//           padding: '0.5rem 0'
//         }}>
//           <p style={{
//             color: '#cbd5e0',
//             fontSize: '0.85rem',
//             margin: 0
//           }}>
//             © 2026{' '}
//             <a
//               href="#"
//               style={{
//                 color: '#99bbcf',
//                 textDecoration: 'none',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#ffffff';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//             >
//               BookHub
//             </a>
//             . All rights reserved.
//           </p>

//           <div className="footer-bottom-links" style={{
//             display: 'flex',
//             gap: '1.2rem',
//             fontSize: '0.85rem',
//             flexWrap: 'wrap'
//           }}>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Privacy Policy
//             </a>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Terms of Service
//             </a>
//             <a
//               href="#"
//               style={{
//                 color: '#cbd5e0',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#99bbcf';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#cbd5e0';
//               }}
//             >
//               Help Center
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Responsive Styles */}
//       <style jsx>{`
//         /* Tablet View - 2 Columns */
//         @media (max-width: 1024px) {
//           .footer-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//             gap: 2rem !important;
//           }
          
//           .footer-map {
//             grid-column: span 2;
//           }
//         }
        
//         /* Mobile View - Single Column */
//         @media (max-width: 768px) {
//           footer {
//             padding: 2rem 1rem 0.5rem !important;
//           }
          
//           .footer-grid {
//             grid-template-columns: 1fr !important;
//             gap: 2rem !important;
//           }
          
//           .footer-brand {
//             text-align: center;
//           }
          
//           .footer-brand > div:first-child {
//             flex-direction: column;
//             text-align: center;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.6rem !important;
//           }
          
//           .footer-description {
//             text-align: center;
//             max-width: 500px;
//             margin-left: auto !important;
//             margin-right: auto !important;
//           }
          
//           .social-links-mobile {
//             justify-content: center;
//           }
          
//           .footer-contact {
//             text-align: left;
//           }
          
//           .footer-contact h3 {
//             width: 100%;
//             text-align: left;
//           }
          
//           .footer-contact > div > div {
//             justify-content: flex-start;
//           }
          
//           .footer-contact span {
//             text-align: left;
//             font-size: 0.9rem;
//           }
          
//           .footer-map {
//             text-align: left;
//           }
          
//           .footer-map h3 {
//             text-align: left;
//           }
          
//           .footer-map > div:first-of-type {
//             height: 200px;
//           }
          
//           .footer-bottom {
//             flex-direction: column;
//             text-align: center;
//             gap: 1rem !important;
//           }
          
//           .footer-bottom p {
//             text-align: center;
//           }
          
//           .footer-bottom-links {
//             justify-content: center;
//             gap: 1rem !important;
//           }
//         }
        
//         /* Small Mobile View */
//         @media (max-width: 480px) {
//           footer {
//             padding: 1.5rem 1rem 0.5rem !important;
//           }
          
//           .footer-grid {
//             gap: 1.8rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.4rem !important;
//           }
          
//           .footer-brand p {
//             font-size: 0.8rem !important;
//           }
          
//           .footer-description {
//             font-size: 0.85rem !important;
//             line-height: 1.5 !important;
//           }
          
//           .footer-contact h3,
//           .footer-map h3 {
//             font-size: 1rem !important;
//             margin-bottom: 0.8rem !important;
//           }
          
//           .footer-contact > div > div {
//             gap: 0.8rem !important;
//           }
          
//           .footer-contact span {
//             font-size: 0.8rem !important;
//           }
          
//           .footer-map > div:first-of-type {
//             height: 160px !important;
//           }
          
//           .social-links-mobile {
//             gap: 0.8rem !important;
//           }
          
//           .social-links-mobile a {
//             width: 32px !important;
//             height: 32px !important;
//             font-size: 0.9rem !important;
//           }
          
//           .footer-bottom-links {
//             gap: 0.8rem !important;
//             font-size: 0.75rem !important;
//           }
//         }
        
//         /* Extra Small Mobile View */
//         @media (max-width: 360px) {
//           footer {
//             padding: 1.2rem 0.8rem 0.5rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.2rem !important;
//           }
          
//           .footer-grid {
//             gap: 1.5rem !important;
//           }
          
//           .footer-contact > div > div {
//             flex-direction: column;
//             align-items: center !important;
//             text-align: center !important;
//           }
          
//           .footer-contact span {
//             text-align: center !important;
//           }
          
//           .footer-contact h3,
//           .footer-map h3 {
//             text-align: center !important;
//             width: 100% !important;
//           }
          
//           .footer-map > div:first-of-type {
//             height: 140px !important;
//           }
          
//           .footer-bottom-links {
//             flex-direction: column;
//             gap: 0.5rem !important;
//           }
//         }
//       `}</style>
//     </footer>
//   );
// }



"use client";

import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiGlobe } from "react-icons/fi";

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", color: "#1877F2", url: "#" },
    { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", url: "#" },
    { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", url: "#" },
    { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25D366", url: "#" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", color: "#0A66C2", url: "#" },
  ];

  const contactInfo = [
    { icon: <FiMapPin />, text: "722P+35J Athiyandal, Tamil Nadu" },
    { icon: <FiPhone />, text: "+91 7871721995" },
    { icon: <FiMail />, text: "omspiritual2025@gmail.com" },
    { icon: <FiGlobe />, text: "www.bookhub.com" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-header">
              <div className="logo-wrapper">
                <Image
                  src="/assets/images/OM.png"
                  alt="OM Spiritual Logo"
                  width={60}
                  height={60}
                  className="logo"
                />
              </div>
              <div className="brand-text">
                <h2>OM Spiritual</h2>
                <p>Books & Wisdom</p>
              </div>
            </div>

            <p className="brand-description">
              We are dedicated to providing the best service and quality products 
              to our customers worldwide. Join us on our journey to excellence.
            </p>

            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  style={{ '--social-color': social.color } as React.CSSProperties}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact Info</h3>
            <div className="contact-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <span className="contact-icon">{info.icon}</span>
                  <span className="contact-text">{info.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Location - FIXED STRUCTURE */}
          <div className="footer-map" style={{marginRight:"2rem",display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center",justifyContent:"center"}}>
            <h3>Our Location</h3>
            <div className="map-wrapper" >
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3898.971513481956!2d79.03282027506438!3d12.250206988002791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDE1JzAwLjgiTiA3OcKwMDInMDcuNCJF!5e0!3m2!1sen!2sin!4v1772000702567!5m2!1sen!2sin"
                  title="Office Location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-iframe"
                  style={{marginRight:"2rem"}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()}{' '}
            <a href="#" className="brand-link">BookHub</a>
            . All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #1a2634;
          color: #ffffff;
          padding: 4rem 1rem 1rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Desktop Grid - 3 Columns */
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin-bottom: 3rem;
        }

        /* Brand Section */
        .brand-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .logo-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .logo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand-text h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-text p {
          font-size: 0.9rem;
          color: #a0aec0;
          margin: 0;
        }

        .brand-description {
          color: #cbd5e0;
          line-height: 1.6;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        /* Social Links */
        .social-links {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .social-link {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background-color: var(--social-color);
          transform: translateY(-3px);
        }

        /* Section Headers */
        h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        h3::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        /* Contact Info */
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
          font-size: 1rem;
          flex-shrink: 0;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .contact-text {
          color: #cbd5e0;
          font-size: 0.95rem;
          word-break: break-word;
        }

        /* Map Location - FIXED STYLES */
        .footer-map {
          display: flex;
          flex-direction: column;
        
        }

        .map-wrapper {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
        }

        .map-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }

        .map-container {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          position: absolute;
          top: 0;
          left: 0;
        }

        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright {
          color: #a0aec0;
          font-size: 0.9rem;
          margin: 0;
        }

        .brand-link {
          color: #5f7af4;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .brand-link:hover {
          color: #764ba2;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-bottom-links a {
          color: #a0aec0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
          margin: 20px  ;
        }

        .footer-bottom-links a:hover {
          color: #667eea;
        }

        /* Tablet View */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }

          .footer-map {
            grid-column: span 2;
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
          }

          .map-container {
            height: 220px;
          }
        }

        /* Mobile View */
        @media (max-width: 768px) {
          .footer {
            padding: 3rem 1rem 1rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .footer-map {
            grid-column: span 1;
            max-width: 100%;
          }

          .brand-header {
            justify-content: center;
          }

          .brand-description {
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }

          h3 {
            text-align: center;
          }

          h3::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .contact-item {
            justify-content: center;
          }

          .contact-text {
            text-align: left;
          }

          .map-container {
            height: 250px;
          }
        }

        /* Small Mobile View */
        @media (max-width: 480px) {
          .footer {
            padding: 2rem 0.8rem 1rem;
          }

          .brand-text h2 {
            font-size: 1.5rem;
          }

          .map-container {
            height: 200px;
          }

          .contact-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .contact-text {
            text-align: center;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            justify-content: center;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 360px) {
          .map-container {
            height: 160px;
          }

          .brand-header {
            flex-direction: column;
            text-align: center;
          }
        }

        /* Landscape Mode */
        @media (max-height: 600px) and (orientation: landscape) {
          .map-container {
            height: 180px;
          }
        }
      `}</style>
    </footer>
  );
}
// "use client";

// import React from "react";
// import Image from "next/image";
// import { 
//   FaFacebookF, 
//   FaTwitter, 
//   FaInstagram, 
//   FaWhatsapp, 
//   FaLinkedinIn 
// } from "react-icons/fa";
// import { 
//   FiMapPin, 
//   FiPhone, 
//   FiMail, 
//   FiGlobe 
// } from "react-icons/fi";

// interface SocialLink {
//   icon: React.ReactNode;
//   label: string;
//   color: string;
//   url: string;
// }

// interface FooterLink {
//   text: string;
//   url: string;
// }

// interface ContactInfo {
//   icon: React.ReactNode;
//   text: string;
// }

// export default function Footer() {
//   const socialLinks: SocialLink[] = [
//     { icon: <FaFacebookF />, label: "Facebook", color: "#1877F2", url: "#" },
//     { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", url: "#" },
//     { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", url: "#" },
//     { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25D366", url: "#" },
//     { icon: <FaLinkedinIn />, label: "LinkedIn", color: "#0A66C2", url: "#" },
//   ];

//   const companyLinks: FooterLink[] = [
//     { text: "About Us", url: "/about" },
//     { text: "Books", url: "/books" },
//     // { text: "", url: "/careers" },
//     { text: "Blog", url: "/blogs" },
//   ];

//   const supportLinks: FooterLink[] = [
//     { text: "Help Center", url: "/help-center" },
//     // { text: "Contact Us", url: "/contact" },
//     { text: "Privacy Policy", url: "/privacy-policy" },
//     { text: "Terms of Service", url: "/terms-of-service" },
//   ];

//   const contactInfo: ContactInfo[] = [
//     { icon: <FiMapPin />, text: "B133/1, 2nd Floor, KSSIDC ITI Estate, Whitefield Main Rd, Bengaluru, Karnataka 560048" },
//     { icon: <FiPhone />, text: "+91 98765 43210" },
//     { icon: <FiMail />, text: "omspiritual2025@gmail.com.com" },
//     { icon: <FiGlobe />, text: "www.omspiritual2025.com" },
//   ];

//   const policyLinks: FooterLink[] = [
//     { text: "", url: "#privacy-policy" },
//     { text: "", url: "#terms-of-service" },
//     { text: "", url: "#cookie-policy" },
//   ];

//   const handleMouseEnter = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     color?: string
//   ) => {
//     const target = e.currentTarget;
//     if (color) {
//       target.style.backgroundColor = color;
//       target.style.boxShadow = `0 6px 15px ${color}40`;
//     }
//     target.style.transform = 'translateY(-3px)';
//   };

//   const handleMouseLeave = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     color?: string
//   ) => {
//     const target = e.currentTarget;
//     if (color) {
//       target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
//     }
//     target.style.transform = 'translateY(0)';
//     target.style.boxShadow = 'none';
//   };

//   const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const target = e.currentTarget;
//     target.style.color = '#99bbcf';
//     target.style.transform = 'translateX(5px)';
//   };

//   const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const target = e.currentTarget;
//     target.style.color = '#cbd5e0';
//     target.style.transform = 'translateX(0)';
//   };

//   const handlePolicyMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.currentTarget.style.color = '#99bbcf';
//   };

//   const handlePolicyMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.currentTarget.style.color = '#cbd5e0';
//   };

//   return (
//     <footer style={{
//       backgroundColor: '#2c3e50',
//       color: '#ffffff',
//       padding: '3rem 0 1rem',
//       fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
//       width: '100%',
//       marginTop: 'auto'
//     }}>
//       <div style={{
//         maxWidth: '1400px',
//         margin: '0 auto',
//         padding: '0 2rem'
//       }}>
//         {/* Main Footer Content */}
//         <div className="footer-grid" style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '3rem',
//           marginBottom: '2rem'
//         }}>
//           {/* Left Section - Brand & Social */}
//           <div className="footer-brand" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem'
//           }}>
//             {/* Logo */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '1rem',
//               marginBottom: '0.5rem'
//             }}>
//               <Image
//                 src="/assets/images/OM.png"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={{
//                   borderRadius: '50%',
//                   boxShadow: '0 4px 15px rgba(153, 187, 207, 0.3)',
//                   objectFit: 'cover'
//                 }}
//               />
//               <div>
//                 <h2 style={{
//                   fontSize: '1.8rem',
//                   fontWeight: '700',
//                   color: '#ffffff',
//                   margin: 0,
//                   lineHeight: '1.2'
//                 }}>
//                   OM Spiritual 
//                 </h2>
//                 <p style={{
//                   fontSize: '0.9rem',
//                   color: '#99bbcf',
//                   margin: '0.2rem 0 0 0',
//                   opacity: 0.9
//                 }}>
//                   Books & Wisdom
//                 </p>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="footer-description" style={{
//               color: '#cbd5e0',
//               lineHeight: '1.6',
//               fontSize: '0.95rem',
//               margin: 0
//             }}>
//               We are dedicated to providing the best service and quality products 
//               to our customers worldwide. Join us on our journey to excellence.
//             </p>

//             {/* Social Icons */}
//             <div>
//               <h3 style={{
//                 fontSize: '1.1rem',
//                 fontWeight: '600',
//                 color: '#ffffff',
//                 marginBottom: '1rem'
//               }}>
              
//               </h3>
              
//             </div>
//           </div>

//           {/* Center Section - Quick Links */}
//           <div className="footer-links-wrapper" style={{
//             display: 'flex',
//             justifyContent: 'space-around',
//             flexWrap: 'wrap',
//             gap: '2rem'
//           }}>
//             {/* Company Links */}
//             <div className="footer-links-column" style={{ 
//               flex: 1, 
//               minWidth: '150px'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Company
//               </h3>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: '0',
//                 margin: '0',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0.7rem'
//               }}>
//                 {companyLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       style={{
//                         color: '#cbd5e0',
//                         textDecoration: 'none',
//                         fontSize: '0.95rem',
//                         transition: 'all 0.3s ease',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         padding: '2px 0'
//                       }}
//                       onMouseEnter={handleLinkMouseEnter}
//                       onMouseLeave={handleLinkMouseLeave}
//                     >
//                       <span style={{
//                         width: '4px',
//                         height: '4px',
//                         backgroundColor: '#99bbcf',
//                         borderRadius: '50%',
//                         opacity: 0.7,
//                         flexShrink: 0
//                       }} />
//                       {link.text}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support Links */}
//             <div className="footer-links-column" style={{ 
//               flex: 1, 
//               minWidth: '150px'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Support
//               </h3>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: '0',
//                 margin: '0',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0.7rem'
//               }}>
//                 {supportLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       style={{
//                         color: '#cbd5e0',
//                         textDecoration: 'none',
//                         fontSize: '0.95rem',
//                         transition: 'all 0.3s ease',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         padding: '2px 0'
//                       }}
//                       onMouseEnter={handleLinkMouseEnter}
//                       onMouseLeave={handleLinkMouseLeave}
//                     >
//                       <span style={{
//                         width: '4px',
//                         height: '4px',
//                         backgroundColor: '#99bbcf',
//                         borderRadius: '50%',
//                         opacity: 0.7,
//                         flexShrink: 0
//                       }} />
//                       {link.text}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Right Section - Contact Info */}
//           <div className="footer-contact">
//             <div style={{
//               marginBottom: '1.5rem'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Contact Info
//               </h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '1rem'
//               }}>
//                 {contactInfo.map((info, index) => (
//                   <div key={index} style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '12px'
//                   }}>
//                     <div style={{
//                       width: '32px',
//                       height: '32px',
//                       borderRadius: '6px',
//                       backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0,
//                       border: '1px solid rgba(153, 187, 207, 0.3)'
//                     }}>
//                       <div style={{ color: '#99bbcf', fontSize: '0.9rem' }}>
//                         {info.icon}
//                       </div>
//                     </div>
//                     <span style={{
//                       fontSize: '0.9rem',
//                       color: '#cbd5e0',
//                       lineHeight: '1.4',
//                       flex: 1
//                     }}>
//                       {info.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div style={{
//           height: '1px',
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           margin: '2rem 0 1.5rem',
//           width: '100%'
//         }} />

//         {/* Footer Bottom */}
//         <div className="footer-bottom" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           width: '100%'
//         }}>
//           <p style={{
//             color: '#cbd5e0',
//             fontSize: '0.9rem',
//             margin: 0
//           }}>
//             © {new Date().getFullYear()}{' '}
//             <a
//               href="#"
//               style={{
//                 color: '#99bbcf',
//                 textDecoration: 'none',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={handlePolicyMouseEnter}
//               onMouseLeave={handlePolicyMouseLeave}
//             >
//               BookHub
//             </a>
//             . All rights reserved.
//           </p>

//           <div className="footer-bottom-links" style={{
//             display: 'center',
//             gap: '1.5rem',
//             fontSize: '0.9rem',
//             flexWrap: 'wrap'
//           }}>
//             {policyLinks.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.url}
//                 style={{
//                   color: '#cbd5e0',
//                   textDecoration: 'none',
//                   transition: 'all 0.3s ease',
//                   whiteSpace: 'nowrap'
//                 }}
//                 onMouseEnter={handlePolicyMouseEnter}
//                 onMouseLeave={handlePolicyMouseLeave}
//               >
//                 {link.text}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Responsive Styles */}
//       <style jsx>{`
//         /* Tablet View - 2 Columns */
//         @media (max-width: 1024px) {
//           .footer-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//             gap: 2.5rem !important;
//           }
          
//           .footer-contact {
//             grid-column: span 2;
//           }
          
//           .footer-links-wrapper {
//             gap: 3rem !important;
//           }
//         }
        
//         /* Mobile View - Single Column */
//         @media (max-width: 768px) {
//           footer {
//             padding: 2rem 1rem 1rem !important;
//           }
          
//           .footer-grid {
//             grid-template-columns: 1fr !important;
//             gap: 2.5rem !important;
//             margin-bottom: 1.5rem !important;
//           }
          
//           .footer-brand,
//           .footer-contact {
//             text-align: center;
//             align-items: center;
//           }
          
//           .footer-brand > div:first-child {
//             justify-content: center;
//           }
          
//           .footer-description {
//             text-align: center;
//           }
          
//           .social-icons {
//             justify-content: center !important;
//           }
          
//           .footer-links-wrapper {
//             justify-content: center !important;
//             text-align: center;
//             gap: 2rem !important;
//           }
          
//           .footer-links-column {
//             min-width: 120px !important;
//           }
          
//           .footer-links-column h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-links-column ul {
//             align-items: center;
//           }
          
//           .footer-links-column a {
//             justify-content: center !important;
//           }
          
//           .footer-contact {
//             grid-column: span 1 !important;
//           }
          
//           .footer-contact h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-contact > div > div {
//             align-items: center;
//           }
          
//           .footer-contact span {
//             text-align: center;
//           }
          
//           .footer-bottom {
//             flex-direction: column;
//             text-align: center;
//             gap: 1rem !important;
//             padding-top: 1rem !important;
//           }
          
//           .footer-bottom p {
//             text-align: center;
//             margin: 0 !important;
//           }
          
//           .footer-bottom-links {
//             justify-content: center;
//             gap: 1rem !important;
//           }
//         }
        
//         /* Small Mobile View */
//         @media (max-width: 480px) {
//           footer {
//             padding: 1.5rem 0.8rem 0.8rem !important;
//           }
          
//           .footer-grid {
//             gap: 2rem !important;
//             margin-bottom: 1rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.5rem !important;
//           }
          
//           .footer-brand p {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-description {
//             font-size: 0.9rem !important;
//           }
          
//           .social-icons {
//             gap: 0.6rem !important;
//           }
          
//           .social-icons a {
//             width: 36px !important;
//             height: 36px !important;
//           }
          
//           .footer-links-wrapper {
//             flex-direction: column;
//             gap: 2rem !important;
//           }
          
//           .footer-links-column {
//             width: 100%;
//           }
          
//           .footer-links-column h3,
//           .footer-contact h3 {
//             font-size: 1.1rem !important;
//           }
          
//           .footer-bottom {
//             gap: 0.8rem !important;
//           }
          
//           .footer-bottom p {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-bottom-links {
//             flex-direction: row;
//             gap: 0.8rem !important;
//           }
          
//           .footer-bottom-links a {
//             font-size: 0.85rem !important;
//           }
//         }
        
//         /* Extra Small Mobile View */
//         @media (max-width: 360px) {
//           footer {
//             padding: 1.2rem 0.6rem 0.6rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.3rem !important;
//           }
          
//           .footer-grid {
//             gap: 1.5rem !important;
//           }
          
//           .social-icons a {
//             width: 34px !important;
//             height: 34px !important;
//             font-size: 0.95rem !important;
//           }
          
//           .footer-bottom-links {
//             flex-wrap: wrap;
//             justify-content: center;
//             gap: 0.6rem 1rem !important;
//           }
          
//           .footer-bottom-links a {
//             font-size: 0.8rem !important;
//           }
//         }
//       `}</style>
//     </footer>
//   );
// }











// "use client";

// import React from "react";
// import Image from "next/image";
// import { 
//   FaFacebookF, 
//   FaTwitter, 
//   FaInstagram, 
//   FaWhatsapp, 
//   FaLinkedinIn 
// } from "react-icons/fa";
// import { 
//   FiMapPin, 
//   FiPhone, 
//   FiMail, 
//   FiGlobe 
// } from "react-icons/fi";

// interface SocialLink {
//   icon: React.ReactNode;
//   label: string;
//   color: string;
//   url: string;
// }

// interface FooterLink {
//   text: string;
//   url: string;
// }

// interface ContactInfo {
//   icon: React.ReactNode;
//   text: string;
// }

// export default function Footer() {
//   const socialLinks: SocialLink[] = [
//     { icon: <FaFacebookF />, label: "Facebook", color: "#1877F2", url: "#" },
//     { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", url: "#" },
//     { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", url: "#" },
//     { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25D366", url: "#" },
//     { icon: <FaLinkedinIn />, label: "LinkedIn", color: "#0A66C2", url: "#" },
//   ];

//   const companyLinks: FooterLink[] = [
//     { text: "About Us", url: "/about" },
//     { text: "Books", url: "/books" },
//     { text: "Blog", url: "/blogs" },
//   ];

//   const supportLinks: FooterLink[] = [
//     { text: "Help Center", url: "/help-center" },
//     { text: "Privacy Policy", url: "/privacy-policy" },
//     { text: "Terms of Service", url: "/terms-of-service" },
//   ];

//   const contactInfo: ContactInfo[] = [
//     { icon: <FiMapPin />, text: "B133/1, 2nd Floor, KSSIDC ITI Estate, Whitefield Main Rd, Bengaluru, Karnataka 560048" },
//     { icon: <FiPhone />, text: "+91 98765 43210" },
//     { icon: <FiMail />, text: "omspiritual2025@gmail.com" },
//     { icon: <FiGlobe />, text: "www.omspiritual2025.com" },
//   ];

//   const policyLinks: FooterLink[] = [
//     { text: "", url: "#privacy-policy" },
//     { text: "", url: "#terms-of-service" },
//     { text: "", url: "#cookie-policy" },
//   ];

//   const handleMouseEnter = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     color?: string
//   ) => {
//     const target = e.currentTarget;
//     if (color) {
//       target.style.backgroundColor = color;
//       target.style.boxShadow = `0 6px 15px ${color}40`;
//     }
//     target.style.transform = 'translateY(-3px)';
//   };

//   const handleMouseLeave = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     color?: string
//   ) => {
//     const target = e.currentTarget;
//     if (color) {
//       target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
//     }
//     target.style.transform = 'translateY(0)';
//     target.style.boxShadow = 'none';
//   };

//   const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const target = e.currentTarget;
//     target.style.color = '#99bbcf';
//     target.style.transform = 'translateX(5px)';
//   };

//   const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const target = e.currentTarget;
//     target.style.color = '#cbd5e0';
//     target.style.transform = 'translateX(0)';
//   };

//   const handlePolicyMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.currentTarget.style.color = '#99bbcf';
//   };

//   const handlePolicyMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.currentTarget.style.color = '#cbd5e0';
//   };

//   return (
//     <footer style={{
//       backgroundColor: '#2c3e50',
//       color: '#ffffff',
//       padding: '3rem 0 1rem',
//       fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
//       width: '100%',
//       marginTop: 'auto'
//     }}>
//       <div style={{
//         maxWidth: '1400px',
//         margin: '0 auto',
//         padding: '0 2rem'
//       }}>
//         {/* Main Footer Content */}
//         <div className="footer-grid" style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '3rem',
//           marginBottom: '2rem'
//         }}>
//           {/* Left Section - Brand & Social */}
//           <div className="footer-brand" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem'
//           }}>
//             {/* Logo */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '1rem',
//               marginBottom: '0.5rem'
//             }}>
//               <Image
//                 src="/assets/images/OM.png"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={{
//                   borderRadius: '50%',
//                   boxShadow: '0 4px 15px rgba(153, 187, 207, 0.3)',
//                   objectFit: 'cover'
//                 }}
//               />
//               <div>
//                 <h2 style={{
//                   fontSize: '1.8rem',
//                   fontWeight: '700',
//                   color: '#ffffff',
//                   margin: 0,
//                   lineHeight: '1.2'
//                 }}>
//                   OM Spiritual 
//                 </h2>
//                 <p style={{
//                   fontSize: '0.9rem',
//                   color: '#99bbcf',
//                   margin: '0.2rem 0 0 0',
//                   opacity: 0.9
//                 }}>
//                   Books & Wisdom
//                 </p>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="footer-description" style={{
//               color: '#cbd5e0',
//               lineHeight: '1.6',
//               fontSize: '0.95rem',
//               margin: 0
//             }}>
//               We are dedicated to providing the best service and quality products 
//               to our customers worldwide. Join us on our journey to excellence.
//             </p>

//             {/* Social Icons - Uncommented and added */}
//             <div>
//               <h3 style={{
//                 fontSize: '1.1rem',
//                 fontWeight: '600',
//                 color: '#ffffff',
//                 marginBottom: '1rem'
//               }}>
//                 {/* Follow Us */}
//               </h3>
//               {/* <div className="social-icons" style={{
//                 display: 'flex',
//                 gap: '0.8rem',
//                 flexWrap: 'wrap'
//               }}>
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.url}
//                     aria-label={social.label}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       width: '40px',
//                       height: '40px',
//                       borderRadius: '50%',
//                       backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                       color: '#ffffff',
//                       fontSize: '1.1rem',
//                       transition: 'all 0.3s ease',
//                       textDecoration: 'none'
//                     }}
//                     onMouseEnter={(e) => handleMouseEnter(e, social.color)}
//                     onMouseLeave={(e) => handleMouseLeave(e, social.color)}
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div> */}
//             </div>
//           </div>

//           {/* Center Section - Quick Links */}
//           <div className="footer-links-wrapper" style={{
//             display: 'flex',
//             justifyContent: 'space-around',
//             flexWrap: 'wrap',
//             gap: '2rem'
//           }}>
//             {/* Company Links */}
//             <div className="footer-links-column" style={{ 
//               flex: 1, 
//               minWidth: '150px'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Company
//               </h3>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: '0',
//                 margin: '0',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0.7rem'
//               }}>
//                 {companyLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       style={{
//                         color: '#cbd5e0',
//                         textDecoration: 'none',
//                         fontSize: '0.95rem',
//                         transition: 'all 0.3s ease',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         padding: '2px 0'
//                       }}
//                       onMouseEnter={handleLinkMouseEnter}
//                       onMouseLeave={handleLinkMouseLeave}
//                     >
//                       <span style={{
//                         width: '4px',
//                         height: '4px',
//                         backgroundColor: '#99bbcf',
//                         borderRadius: '50%',
//                         opacity: 0.7,
//                         flexShrink: 0
//                       }} />
//                       {link.text}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support Links */}
//             <div className="footer-links-column" style={{ 
//               flex: 1, 
//               minWidth: '150px'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Support
//               </h3>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: '0',
//                 margin: '0',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0.7rem'
//               }}>
//                 {supportLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       style={{
//                         color: '#cbd5e0',
//                         textDecoration: 'none',
//                         fontSize: '0.95rem',
//                         transition: 'all 0.3s ease',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         padding: '2px 0'
//                       }}
//                       onMouseEnter={handleLinkMouseEnter}
//                       onMouseLeave={handleLinkMouseLeave}
//                     >
//                       <span style={{
//                         width: '4px',
//                         height: '4px',
//                         backgroundColor: '#99bbcf',
//                         borderRadius: '50%',
//                         opacity: 0.7,
//                         flexShrink: 0
//                       }} />
//                       {link.text}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Right Section - Contact Info with Map */}
//           <div className="footer-contact">
//             <div style={{
//               marginBottom: '.5rem'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '700',
//                 color: '#ffffff',
//                 marginBottom: '1.2rem',
//                 paddingBottom: '0.5rem',
//                 borderBottom: '2px solid #99bbcf',
//                 display: 'inline-block'
//               }}>
//                 Location
//               </h3>
              
//               {/* Map Container - Added without increasing padding */}
//               <div style={{
//                 width: '100%',
//                 height: '160px',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 marginBottom: '1rem',
//                 border: '1px solid rgba(153, 187, 207, 0.3)',
//                 boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
//               }}>
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985677180237!2d77.7077!3d12.9698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1398b3b9c7b9%3A0x7e8c7b7f7b7f7b7f!2sWhitefield%2C%20Bengaluru%2C%20Karnataka%20560048!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="Office Location"
//                 />
//               </div>

//               {/* Contact Info - Below Map */}
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0.8rem'
//               }}>
//                 {contactInfo.map((info, index) => (
//                   <div key={index} style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '12px'
//                   }}>
//                     <div style={{
//                       width: '32px',
//                       height: '32px',
//                       borderRadius: '6px',
//                       backgroundColor: 'rgba(153, 187, 207, 0.15)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0,
//                       border: '1px solid rgba(153, 187, 207, 0.3)'
//                     }}>
//                       <div style={{ color: '#99bbcf', fontSize: '0.9rem' }}>
//                         {info.icon}
//                       </div>
//                     </div>
//                     <span style={{
//                       fontSize: '0.9rem',
//                       color: '#cbd5e0',
//                       lineHeight: '1.4',
//                       flex: 1
//                     }}>
//                       {info.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div style={{
//           height: '1px',
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           margin: '2rem 0 1.5rem',
//           width: '100%'
//         }} />

//         {/* Footer Bottom */}
//         <div className="footer-bottom" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           width: '100%'
//         }}>
//           <p style={{
//             color: '#cbd5e0',
//             fontSize: '0.9rem',
//             margin: 0
//           }}>
//             © {new Date().getFullYear()}{' '}
//             <a
//               href="#"
//               style={{
//                 color: '#99bbcf',
//                 textDecoration: 'none',
//                 fontWeight: '600',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={handlePolicyMouseEnter}
//               onMouseLeave={handlePolicyMouseLeave}
//             >
//               BookHub
//             </a>
//             . All rights reserved.
//           </p>

//           <div className="footer-bottom-links" style={{
//             display: 'flex',
//             gap: '1.5rem',
//             fontSize: '0.9rem',
//             flexWrap: 'wrap'
//           }}>
//             {policyLinks.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.url}
//                 style={{
//                   color: '#cbd5e0',
//                   textDecoration: 'none',
//                   transition: 'all 0.3s ease',
//                   whiteSpace: 'nowrap'
//                 }}
//                 onMouseEnter={handlePolicyMouseEnter}
//                 onMouseLeave={handlePolicyMouseLeave}
//               >
//                 {link.text}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Responsive Styles */}
//       <style jsx>{`
//         /* Tablet View - 2 Columns */
//         @media (max-width: 1024px) {
//           .footer-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//             gap: 2.5rem !important;
//           }
          
//           .footer-contact {
//             grid-column: span 2;
//           }
          
//           .footer-links-wrapper {
//             gap: 3rem !important;
//           }
//         }
        
//         /* Mobile View - Single Column */
//         @media (max-width: 768px) {
//           footer {
//             padding: 2rem 1rem 1rem !important;
//           }
          
//           .footer-grid {
//             grid-template-columns: 1fr !important;
//             gap: 2.5rem !important;
//             margin-bottom: 1.5rem !important;
//           }
          
//           .footer-brand,
//           .footer-contact {
//             text-align: center;
//             align-items: center;
//           }
          
//           .footer-brand > div:first-child {
//             justify-content: center;
//           }
          
//           .footer-description {
//             text-align: center;
//           }
          
//           .social-icons {
//             justify-content: center !important;
//           }
          
//           .footer-links-wrapper {
//             justify-content: center !important;
//             text-align: center;
//             gap: 2rem !important;
//           }
          
//           .footer-links-column {
//             min-width: 120px !important;
//           }
          
//           .footer-links-column h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-links-column ul {
//             align-items: center;
//           }
          
//           .footer-links-column a {
//             justify-content: center !important;
//           }
          
//           .footer-contact {
//             grid-column: span 1 !important;
//           }
          
//           .footer-contact h3 {
//             width: 100%;
//             text-align: center;
//           }
          
//           .footer-contact > div > div {
//             align-items: center;
//           }
          
//           .footer-contact span {
//             text-align: center;
//           }
          
//           .footer-bottom {
//             flex-direction: column;
//             text-align: center;
//             gap: 1rem !important;
//             padding-top: 1rem !important;
//           }
          
//           .footer-bottom p {
//             text-align: center;
//             margin: 0 !important;
//           }
          
//           .footer-bottom-links {
//             justify-content: center;
//             gap: 1rem !important;
//           }
//         }
        
//         /* Small Mobile View */
//         @media (max-width: 480px) {
//           footer {
//             padding: 1.5rem 0.8rem 0.8rem !important;
//           }
          
//           .footer-grid {
//             gap: 2rem !important;
//             margin-bottom: 1rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.5rem !important;
//           }
          
//           .footer-brand p {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-description {
//             font-size: 0.9rem !important;
//           }
          
//           .social-icons {
//             gap: 0.6rem !important;
//           }
          
//           .social-icons a {
//             width: 36px !important;
//             height: 36px !important;
//           }
          
//           .footer-links-wrapper {
//             flex-direction: column;
//             gap: 2rem !important;
//           }
          
//           .footer-links-column {
//             width: 100%;
//           }
          
//           .footer-links-column h3,
//           .footer-contact h3 {
//             font-size: 1.1rem !important;
//           }
          
//           .footer-bottom {
//             gap: 0.8rem !important;
//           }
          
//           .footer-bottom p {
//             font-size: 0.85rem !important;
//           }
          
//           .footer-bottom-links {
//             flex-direction: row;
//             gap: 0.8rem !important;
//           }
          
//           .footer-bottom-links a {
//             font-size: 0.85rem !important;
//           }
//         }
        
//         /* Extra Small Mobile View */
//         @media (max-width: 360px) {
//           footer {
//             padding: 1.2rem 0.6rem 0.6rem !important;
//           }
          
//           .footer-brand h2 {
//             font-size: 1.3rem !important;
//           }
          
//           .footer-grid {
//             gap: 1.5rem !important;
//           }
          
//           .social-icons a {
//             width: 34px !important;
//             height: 34px !important;
//             font-size: 0.95rem !important;
//           }
          
//           .footer-bottom-links {
//             flex-wrap: wrap;
//             justify-content: center;
//             gap: 0.6rem 1rem !important;
//           }
          
//           .footer-bottom-links a {
//             font-size: 0.8rem !important;
//           }
//         }
//       `}</style>
//     </footer>
//   );
// }