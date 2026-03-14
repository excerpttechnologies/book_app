// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// import {
//   ShoppingCart,
//   Search,
//   User,
//   LogOut,
//   Menu,
//   X,
//   BookOpen,
//   Home,
//   Phone,
//   Info,
//   FileText,
// } from "lucide-react";

// import Login from "../Login/login";

// interface CartItem {
//   _id: string;
//   bookName: string;
//   authorName: string;
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// export default function Header() {
//   const pathname = usePathname();

//   const [openLogin, setOpenLogin] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartCount, setCartCount] = useState(0);

//   // Inline CSS as objects
//   const styles = {
//     header: {
//       backgroundColor: "#ffffff",
//       boxShadow: "0 2px 15px rgba(0, 0, 0, 0.08)",
//       position: "sticky" as const,
//       top: 0,
//       zIndex: 1000,
//       borderBottom: "1px solid #eaeaea",
//     },
//     headerContainer: {
//       maxWidth: "1400px",
//       margin: "0 auto",
//       padding: "0 24px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       height: "72px",
//     },
//     mobileMenuBtn: {
//       display: "none",
//       background: "none",
//       border: "none",
//       cursor: "pointer",
//       padding: "8px",
//       borderRadius: "6px",
//       color: "#333",
//     },
//     logo: {
//       display: "flex",
//       alignItems: "center",
//     },
//     logoLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       textDecoration: "none",
//       color: "#333",
//     },
//     logoImage: {
//       width: "40px",
//       height: "40px",
//       borderRadius: "8px",
//       objectFit: "cover" as const,
//     },
//     logoText: {
//       fontSize: "24px",
//       fontWeight: 700,
//       background: "linear-gradient(135deg, #99bbcf 0%, #7aa6c2 100%)",
//       WebkitBackgroundClip: "text" as const,
//       WebkitTextFillColor: "transparent" as const,
//       letterSpacing: "-0.5px",
//     },
//     desktopNav: {
//       display: "flex",
//       gap: "32px",
//       alignItems: "center",
//     },
//     navLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//       textDecoration: "none",
//       color: "#555",
//       fontSize: "15px",
//       fontWeight: 500,
//       padding: "8px 12px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//       position: "relative" as const,
//     },
//     activeNavLink: {
//       color: "#99bbcf",
//       backgroundColor: "rgba(153, 187, 207, 0.1)",
//     },
//     navIcon: {
//       display: "flex",
//       alignItems: "center",
//     },
//     rightIcons: {
//       display: "flex",
//       alignItems: "center",
//       gap: "24px",
//     },
//     cartIcon: {
//       position: "relative" as const,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       textDecoration: "none",
//       color: "#333",
//       padding: "8px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//     },
//     cartCount: {
//       position: "absolute" as const,
//       top: "-4px",
//       right: "-4px",
//       backgroundColor: "#99bbcf",
//       color: "white",
//       fontSize: "12px",
//       fontWeight: "bold",
//       borderRadius: "50%",
//       minWidth: "20px",
//       height: "20px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "0 4px",
//     },
//     searchBtn: {
//       background: "none",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#333",
//       padding: "8px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//     },
//     loginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       background: "linear-gradient(135deg, #99bbcf 0%, #7aa6c2 100%)",
//       border: "none",
//       color: "white",
//       padding: "10px 20px",
//       borderRadius: "8px",
//       cursor: "pointer",
//       fontSize: "15px",
//       fontWeight: 600,
//       transition: "all 0.3s ease",
//       boxShadow: "0 4px 12px rgba(153, 187, 207, 0.3)",
//     },
//     userDropdown: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     userName: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       textDecoration: "none",
//       color: "#333",
//       fontSize: "14px",
//       fontWeight: 500,
//       padding: "8px 16px",
//       borderRadius: "8px",
//       backgroundColor: "rgba(153, 187, 207, 0.1)",
//       transition: "all 0.3s ease",
//     },
//     logoutBtn: {
//       background: "none",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#666",
//       padding: "8px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//     },
//     mobileNavOverlay: {
//       position: "fixed" as const,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: 9999,
//       display: "flex",
//       justifyContent: "flex-end",
//     },
//     mobileNav: {
//       width: "300px",
//       backgroundColor: "white",
//       height: "100%",
//       boxShadow: "-5px 0 25px rgba(0, 0, 0, 0.1)",
//       display: "flex",
//       flexDirection: "column" as const,
//     },
//     mobileNavHeader: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "20px 24px",
//       borderBottom: "1px solid #eee",
//     },
//     mobileCloseBtn: {
//       background: "none",
//       border: "none",
//       cursor: "pointer",
//       color: "#333",
//       padding: "4px",
//       borderRadius: "6px",
//     },
//     mobileNavMenu: {
//       flex: 1,
//       padding: "20px 0",
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "4px",
//       overflowY: "auto" as const,
//     },
//     mobileNavLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       textDecoration: "none",
//       color: "#555",
//       fontSize: "16px",
//       fontWeight: 500,
//       padding: "16px 24px",
//       transition: "all 0.3s ease",
//     },
//     activeMobileNavLink: {
//       color: "#99bbcf",
//       backgroundColor: "rgba(153, 187, 207, 0.1)",
//       borderRight: "3px solid #99bbcf",
//     },
//     mobileNavIcon: {
//       display: "flex",
//       alignItems: "center",
//       width: "24px",
//     },
//     mobileCartLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       textDecoration: "none",
//       color: "#333",
//       fontSize: "16px",
//       fontWeight: 500,
//       padding: "16px 24px",
//       marginTop: "16px",
//       borderTop: "1px solid #eee",
//       transition: "all 0.3s ease",
//     },
//     mobileAuthSection: {
//       marginTop: "auto",
//       padding: "20px 24px",
//       borderTop: "1px solid #eee",
//     },
//     mobileLoginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       background: "linear-gradient(135deg, #99bbcf 0%, #7aa6c2 100%)",
//       border: "none",
//       color: "white",
//       padding: "16px",
//       borderRadius: "10px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: 600,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//     },
//     mobileUserInfo: {
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "12px",
//     },
//     mobileUserGreeting: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       color: "#333",
//       fontSize: "16px",
//       fontWeight: 500,
//       padding: "12px 16px",
//       backgroundColor: "rgba(153, 187, 207, 0.1)",
//       borderRadius: "8px",
//     },
//     mobileLogoutBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       background: "none",
//       border: "1px solid #eee",
//       color: "#666",
//       padding: "14px",
//       borderRadius: "8px",
//       cursor: "pointer",
//       fontSize: "15px",
//       fontWeight: 500,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//     },
//     hoverEffects: {
//       navLinkHover: {
//         backgroundColor: "rgba(153, 187, 207, 0.1)",
//         color: "#99bbcf",
//         transform: "translateY(-1px)",
//       },
//       cartIconHover: {
//         backgroundColor: "rgba(153, 187, 207, 0.1)",
//         color: "#0f89cf",
//       },
//       searchBtnHover: {
//         backgroundColor: "rgba(153, 187, 207, 0.1)",
//         color: "#99bbcf",
//       },
//       loginBtnHover: {
//         transform: "translateY(-2px)",
//         boxShadow: "0 6px 20px rgba(153, 187, 207, 0.4)",
//       },
//       userNameHover: {
//         backgroundColor: "rgba(153, 187, 207, 0.2)",
//       },
//       logoutBtnHover: {
//         backgroundColor: "rgba(153, 187, 207, 0.1)",
//         color: "#3c9ad0",
//       },
//       mobileNavLinkHover: {
//         backgroundColor: "rgba(153, 187, 207, 0.1)",
//       },
//       mobileLoginBtnHover: {
//         transform: "translateY(-2px)",
//         boxShadow: "0 6px 20px rgba(153, 187, 207, 0.4)",
//       },
//       mobileLogoutBtnHover: {
//         backgroundColor: "rgba(153, 187, 207, 0.1)",
//         color: "#99bbcf",
//       },
//     },
//   };

//   // LOAD LOGIN DATA ON PAGE LOAD
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");

//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }

//     loadCartItems();
//   }, []);

//   // LOAD CART ITEMS
//   const loadCartItems = () => {
//     try {
//       const savedCart = localStorage.getItem("bookCart");
//       if (savedCart) {
//         const items = JSON.parse(savedCart);
//         setCartItems(items);
//         updateCartCount(items);
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   };

//   // UPDATE CART COUNT
//   const updateCartCount = (items: CartItem[]) => {
//     const totalItems = items.reduce((total, item) => total + item.quantity, 0);
//     setCartCount(totalItems);
//   };

//   // LISTEN FOR CART UPDATES
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadCartItems();
//     };

//     // Listen for storage events (from other tabs/windows)
//     window.addEventListener('storage', handleStorageChange);
    
//     // Listen for custom cart update events
//     window.addEventListener('cartUpdated', handleStorageChange);

//     // Poll for changes (fallback)
//     const interval = setInterval(loadCartItems, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('cartUpdated', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // LOGOUT FUNCTION
//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");

//     setIsLoggedIn(false);
//     setUserName("");
//     window.location.reload();
//   };

//   // NAV ITEMS WITH ICONS
//   const navItems = [
//     { label: "Home", path: "/", icon: <Home size={18} /> },
//     { label: "Books", path: "/books", icon: <BookOpen size={18} /> },
//     { label: "Blogs", path: "/blogs", icon: <FileText size={18} /> }, 
//     { label: "About", path: "/about", icon: <Info size={18} /> },
//     { label: "Contact", path: "/contact", icon: <Phone size={18} /> },
//   ];

//   const handleLoginSuccess = () => {
//     setOpenLogin(false);
//     // Reload user data after successful login
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");
//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <div style={styles.headerContainer}>
//           {/* MOBILE MENU BUTTON */}
//           <button
//             style={styles.mobileMenuBtn}
//             className="mobile-menu-btn"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle mobile menu"
//           >
//             <Menu size={24} />
//           </button>

//           {/* LOGO */}
//           <div style={styles.logo}>
//             <Link href="/" style={styles.logoLink}>
//               <Image
//                 src="/assets/images/booklogo.webp"
//                 alt="BookStore Logo"
//                 width={40}
//                 height={40}
//                 style={styles.logoImage}
//                 priority
//               />
//               <span style={styles.logoText} className="logo-text">OM <b>Spiritual</b></span>
//             </Link>
//           </div>

//           {/* DESKTOP NAV */}
//           <nav style={styles.desktopNav} className="desktop-nav">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 style={{
//                   ...styles.navLink,
//                   ...(pathname === item.path ? styles.activeNavLink : {}),
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = styles.hoverEffects.navLinkHover.backgroundColor;
//                   e.currentTarget.style.color = styles.hoverEffects.navLinkHover.color;
//                   e.currentTarget.style.transform = styles.hoverEffects.navLinkHover.transform;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = pathname === item.path 
//                     ? styles.activeNavLink.backgroundColor 
//                     : "transparent";
//                   e.currentTarget.style.color = pathname === item.path 
//                     ? styles.activeNavLink.color 
//                     : styles.navLink.color;
//                   e.currentTarget.style.transform = "none";
//                 }}
//               >
//                 <span style={styles.navIcon}>{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* RIGHT ICONS */}
//           <div style={styles.rightIcons} className="right-icons">
//             {/* CART ICON WITH COUNT */}
//             <Link 
//               href="/cart" 
//               style={styles.cartIcon}
//               className="cart-icon"
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.hoverEffects.cartIconHover.backgroundColor;
//                 e.currentTarget.style.color = styles.hoverEffects.cartIconHover.color;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = "transparent";
//                 e.currentTarget.style.color = styles.cartIcon.color;
//               }}
//               aria-label={`Shopping cart with ${cartCount} items`}
//             >
//               <ShoppingCart size={22} />
//               {cartCount > 0 && (
//                 <span style={styles.cartCount}>{cartCount > 99 ? '99+' : cartCount}</span>
//               )}
//             </Link>

//             {/* SEARCH BUTTON */}
//             <button 
//               style={styles.searchBtn}
//               className="search-btn"
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.hoverEffects.searchBtnHover.backgroundColor;
//                 e.currentTarget.style.color = styles.hoverEffects.searchBtnHover.color;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = "transparent";
//                 e.currentTarget.style.color = styles.searchBtn.color;
//               }}
//               aria-label="Search"
//             >
//               <Search size={22} />
//             </button>

//             {/* USER AUTH SECTION */}
//             {!isLoggedIn ? (
//               <button 
//                 style={styles.loginBtn}
//                 className="login-btn"
//                 onClick={() => setOpenLogin(true)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = styles.hoverEffects.loginBtnHover.transform;
//                   e.currentTarget.style.boxShadow = styles.hoverEffects.loginBtnHover.boxShadow;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "none";
//                   e.currentTarget.style.boxShadow = styles.loginBtn.boxShadow;
//                 }}
//                 aria-label="Login"
//               >
//                 <User size={22} />
//                 <span className="login-text">Login</span>
//               </button>     
//             ) : (
//               <div style={styles.userDropdown} className="user-dropdown">
//                 <Link 
//                   href="/profile" 
//                   style={styles.userName}
//                   className="user-name"
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.userNameHover.backgroundColor;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.userName.backgroundColor;
//                   }}
//                 >
//                   <User size={18} />
//                   <span className="user-name-text">Hi, {userName}</span>
//                 </Link>

//                 <button 
//                   style={styles.logoutBtn}
//                   className="logout-btn"
//                   onClick={logout}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.logoutBtnHover.backgroundColor;
//                     e.currentTarget.style.color = styles.hoverEffects.logoutBtnHover.color;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = "transparent";
//                     e.currentTarget.style.color = styles.logoutBtn.color;
//                   }}
//                   aria-label="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* MOBILE NAV OVERLAY */}
//       {mobileMenuOpen && (
//         <div style={styles.mobileNavOverlay} onClick={() => setMobileMenuOpen(false)}>
//           <div style={styles.mobileNav} className="mobile-nav" onClick={(e) => e.stopPropagation()}>
//             <div style={styles.mobileNavHeader}>
//               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                 <Image
//                   src="/assets/images/booklogo.webp"
//                   alt="BookStore"
//                   width={32}
//                   height={32}
//                   style={{ borderRadius: "6px" }}
//                 />
//                 <h3 style={{ margin: 0, color: "#333", fontSize: "18px", fontWeight: 600 }}>BookStore</h3>
//               </div>
//               <button 
//                 style={styles.mobileCloseBtn}
//                 onClick={() => setMobileMenuOpen(false)}
//                 aria-label="Close menu"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div style={styles.mobileNavMenu}>
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   style={{
//                     ...styles.mobileNavLink,
//                     ...(pathname === item.path ? styles.activeMobileNavLink : {}),
//                   }}
//                   onMouseEnter={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = styles.hoverEffects.mobileNavLinkHover.backgroundColor;
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = "transparent";
//                     }
//                   }}
//                 >
//                   <span style={styles.mobileNavIcon}>{item.icon}</span>
//                   {item.label}
//                 </Link>
//               ))}

//               {/* MOBILE CART */}
//               <Link 
//                 href="/cart" 
//                 style={styles.mobileCartLink}
//                 onClick={() => setMobileMenuOpen(false)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(153, 187, 207, 0.1)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = "transparent";
//                 }}
//               >
//                 <ShoppingCart size={20} />
//                 <span>Cart ({cartCount})</span>
//               </Link>
//             </div>

//             {/* MOBILE LOGIN / LOGOUT */}
//             <div style={styles.mobileAuthSection}>
//               {!isLoggedIn ? (
//                 <button
//                   onClick={() => {
//                     setOpenLogin(true);
//                     setMobileMenuOpen(false);
//                   }}
//                   style={styles.mobileLoginBtn}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = styles.hoverEffects.mobileLoginBtnHover.transform;
//                     e.currentTarget.style.boxShadow = styles.hoverEffects.mobileLoginBtnHover.boxShadow;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "none";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <User size={20} />
//                   Login / Signup
//                 </button>
//               ) : (
//                 <div style={styles.mobileUserInfo}>
//                   <div style={styles.mobileUserGreeting}>
//                     <User size={20} />
//                     <span>Hello, {userName}</span>
//                   </div>
//                   <button 
//                     style={styles.mobileLogoutBtn}
//                     onClick={logout}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = styles.hoverEffects.mobileLogoutBtnHover.backgroundColor;
//                       e.currentTarget.style.color = styles.hoverEffects.mobileLogoutBtnHover.color;
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "transparent";
//                       e.currentTarget.style.color = styles.mobileLogoutBtn.color;
//                     }}
//                   >
//                     <LogOut size={20} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <Login
//           close={() => setOpenLogin(false)}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}

//       {/* Responsive Media Queries - MOBILE ONLY */}
//       <style jsx global>{`
//         /* Tablet and below - Show hamburger, hide desktop nav */
//         @media (max-width: 1024px) {
//           .desktop-nav {
//             gap: 24px !important;
//           }
//         }
        
//         /* Mobile styles */
//         @media (max-width: 768px) {
//           /* Show hamburger menu button */
//           .mobile-menu-btn {
//             display: flex !important;
//             align-items: center;
//             justify-content: center;
//           }
          
//           /* Hide desktop navigation */
//           .desktop-nav {
//             display: none !important;
//           }
          
//           /* Adjust header container padding */
//           header > div {
//             padding: 0 16px !important;
//           }
          
//           /* Reduce right icons gap */
//           .right-icons {
//             gap: 12px !important;
//           }
          
//           /* Hide login button text on mobile */
//           .login-btn .login-text {
//             display: none;
//           }
          
//           /* Adjust login button padding */
//           .login-btn {
//             padding: 10px !important;
//             min-width: auto !important;
//           }
          
//           /* Hide username text on mobile */
//           .user-name .user-name-text {
//             display: none;
//           }
          
//           /* Adjust username link padding */
//           .user-name {
//             padding: 8px !important;
//             min-width: auto !important;
//           }
          
//           /* Reduce logo text size */
//           .logo-text {
//             font-size: 20px !important;
//           }
          
//           /* Adjust cart and search icon sizes */
//           .cart-icon,
//           .search-btn {
//             padding: 6px !important;
//           }
          
//           /* Mobile navigation slide-in animation */
//           .mobile-nav {
//             animation: slideIn 0.3s ease-out;
//           }
          
//           @keyframes slideIn {
//             from {
//               transform: translateX(100%);
//             }
//             to {
//               transform: translateX(0);
//             }
//           }
          
//           /* Prevent body scroll when mobile menu is open */
//           body:has(.mobile-nav) {
//             overflow: hidden;
//           }
//         }
        
//         /* Extra small mobile devices */
//         @media (max-width: 480px) {
//           /* Reduce header height */
//           header > div {
//             height: 64px !important;
//             padding: 0 12px !important;
//           }
          
//           /* Further reduce logo text size */
//           .logo-text {
//             font-size: 18px !important;
//           }
          
//           /* Reduce right icons gap even more */
//           .right-icons {
//             gap: 8px !important;
//           }
          
//           /* Smaller mobile menu width */
//           .mobile-nav {
//             width: 280px !important;
//             max-width: 85vw !important;
//           }
          
//           /* Adjust logout button on mobile */
//           .logout-btn {
//             padding: 6px !important;
//           }
//         }
        
//         /* Very small devices */
//         @media (max-width: 360px) {
//           .logo-text {
//             font-size: 16px !important;
//           }
          
//           .mobile-nav {
//             width: 260px !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }










// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// import {
//   ShoppingCart,
//   Search,
//   User,
//   LogOut,
//   Menu,
//   X,
//   BookOpen,
//   Home,
//   Phone,
//   Info,
//   FileText,
// } from "lucide-react";

// import Login from "../Login/login";

// interface CartItem {
//   _id: string;
//   bookName: string;
//   authorName: string;
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// export default function Header() {
//   const pathname = usePathname();

//   const [openLogin, setOpenLogin] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Inline CSS with unique color scheme
//   const styles = {
//     header: {
//       backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "#ffffff",
//       backdropFilter: isScrolled ? "blur(10px)" : "none",
//       boxShadow: isScrolled 
//         ? "0 8px 32px rgba(139, 92, 246, 0.1)" 
//         : "0 2px 20px rgba(139, 92, 246, 0.05)",
//       position: "sticky" as const,
//       top: 0,
//       zIndex: 1000,
//       transition: "all 0.3s ease",
//       borderBottom: isScrolled ? "1px solid rgba(139, 92, 246, 0.1)" : "1px solid rgba(139, 92, 246, 0.05)",
//     },
//     headerContainer: {
//       maxWidth: "1400px",
//       margin: "0 auto",
//       padding: "0 20px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       height: "80px",
//       transition: "height 0.3s ease",
//     },
//     mobileMenuBtn: {
//       display: "none",
//       background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//       border: "none",
//       cursor: "pointer",
//       padding: "10px",
//       borderRadius: "12px",
//       color: "white",
//       boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
//     },
//     logo: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     logoLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "15px",
//       textDecoration: "none",
//       color: "#333",
//     },
//     logoImage: {
//       width: "50px",
//       height: "50px",
//       borderRadius: "12px",
//       objectFit: "cover" as const,
//       border: "3px solid #8b5cf6",
//       padding: "2px",
//     },
//     logoTextContainer: {
//       display: "flex",
//       flexDirection: "column" as const,
//     },
//     logoMainText: {
//       fontSize: "28px",
//       fontWeight: 800,
//       background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//       WebkitBackgroundClip: "text" as const,
//       WebkitTextFillColor: "transparent" as const,
//       letterSpacing: "-0.5px",
//       lineHeight: 1.1,
//     },
//     logoSubText: {
//       fontSize: "12px",
//       color: "#8b5cf6",
//       fontWeight: 500,
//       letterSpacing: "1px",
//       textTransform: "uppercase" as const,
//       marginTop: "-2px",
//     },
//     desktopNav: {
//       display: "flex",
//       gap: "8px",
//       alignItems: "center",
//       background: "rgba(139, 92, 246, 0.03)",
//       padding: "8px",
//       borderRadius: "16px",
//       border: "1px solid rgba(139, 92, 246, 0.1)",
//     },
//     navLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       textDecoration: "none",
//       color: "#666",
//       fontSize: "15px",
//       fontWeight: 500,
//       padding: "12px 20px",
//       borderRadius: "12px",
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       position: "relative" as const,
//     },
//     activeNavLink: {
//       color: "#8b5cf6",
//       backgroundColor: "rgba(139, 92, 246, 0.1)",
//       fontWeight: 600,
//     },
//     navIcon: {
//       display: "flex",
//       alignItems: "center",
//     },
//     rightIcons: {
//       display: "flex",
//       alignItems: "center",
//       gap: "20px",
//     },
//     cartIcon: {
//       position: "relative" as const,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       textDecoration: "none",
//       color: "#666",
//       padding: "10px",
//       borderRadius: "12px",
//       transition: "all 0.3s ease",
//       background: "rgba(139, 92, 246, 0.05)",
//     },
//     cartCount: {
//       position: "absolute" as const,
//       top: "-5px",
//       right: "-5px",
//       background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//       color: "white",
//       fontSize: "12px",
//       fontWeight: "bold",
//       borderRadius: "50%",
//       minWidth: "22px",
//       height: "22px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "0 4px",
//       border: "2px solid white",
//     },
//     searchBtn: {
//       background: "rgba(139, 92, 246, 0.05)",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#666",
//       padding: "10px",
//       borderRadius: "12px",
//       transition: "all 0.3s ease",
//     },
//     loginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//       border: "none",
//       color: "white",
//       padding: "12px 24px",
//       borderRadius: "12px",
//       cursor: "pointer",
//       fontSize: "15px",
//       fontWeight: 600,
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
//     },
//     userDropdown: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     userName: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       textDecoration: "none",
//       color: "#333",
//       fontSize: "15px",
//       fontWeight: 500,
//       padding: "10px 18px",
//       borderRadius: "12px",
//       backgroundColor: "rgba(139, 92, 246, 0.1)",
//       transition: "all 0.3s ease",
//     },
//     logoutBtn: {
//       background: "rgba(139, 92, 246, 0.05)",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#666",
//       padding: "10px",
//       borderRadius: "12px",
//       transition: "all 0.3s ease",
//     },
//     mobileNavOverlay: {
//       position: "fixed" as const,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: 9999,
//       animation: "fadeIn 0.3s ease-out",
//     },
//     mobileNav: {
//       width: "320px",
//       backgroundColor: "white",
//       height: "100%",
//       boxShadow: "-10px 0 40px rgba(139, 92, 246, 0.1)",
//       display: "flex",
//       flexDirection: "column" as const,
//       animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     },
//     mobileNavHeader: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "24px",
//       background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//     },
//     mobileCloseBtn: {
//       background: "rgba(255, 255, 255, 0.2)",
//       border: "none",
//       cursor: "pointer",
//       color: "white",
//       padding: "8px",
//       borderRadius: "10px",
//       backdropFilter: "blur(10px)",
//     },
//     mobileNavMenu: {
//       flex: 1,
//       padding: "20px 0",
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "2px",
//       overflowY: "auto" as const,
//     },
//     mobileNavLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "16px",
//       textDecoration: "none",
//       color: "#555",
//       fontSize: "16px",
//       fontWeight: 500,
//       padding: "18px 24px",
//       transition: "all 0.3s ease",
//       margin: "0 8px",
//       borderRadius: "12px",
//     },
//     activeMobileNavLink: {
//       color: "#8b5cf6",
//       backgroundColor: "rgba(139, 92, 246, 0.1)",
//       fontWeight: 600,
//     },
//     mobileNavIcon: {
//       display: "flex",
//       alignItems: "center",
//       width: "24px",
//       color: "#8b5cf6",
//     },
//     mobileCartLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "16px",
//       textDecoration: "none",
//       color: "#333",
//       fontSize: "16px",
//       fontWeight: 500,
//       padding: "18px 24px",
//       margin: "16px 8px 8px",
//       borderRadius: "12px",
//       background: "rgba(139, 92, 246, 0.05)",
//       transition: "all 0.3s ease",
//     },
//     mobileAuthSection: {
//       marginTop: "auto",
//       padding: "20px",
//       background: "rgba(139, 92, 246, 0.03)",
//       borderTop: "1px solid rgba(139, 92, 246, 0.1)",
//     },
//     mobileLoginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//       border: "none",
//       color: "white",
//       padding: "18px",
//       borderRadius: "12px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: 600,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//       boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
//     },
//     mobileUserInfo: {
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "12px",
//     },
//     mobileUserGreeting: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       color: "#333",
//       fontSize: "16px",
//       fontWeight: 500,
//       padding: "16px",
//       backgroundColor: "rgba(139, 92, 246, 0.1)",
//       borderRadius: "12px",
//     },
//     mobileLogoutBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       background: "rgba(139, 92, 246, 0.05)",
//       border: "1px solid rgba(139, 92, 246, 0.1)",
//       color: "#8b5cf6",
//       padding: "16px",
//       borderRadius: "12px",
//       cursor: "pointer",
//       fontSize: "15px",
//       fontWeight: 500,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//     },
//     hoverEffects: {
//       navLinkHover: {
//         backgroundColor: "rgba(139, 92, 246, 0.1)",
//         color: "#8b5cf6",
//         transform: "translateY(-2px)",
//       },
//       cartIconHover: {
//         backgroundColor: "rgba(139, 92, 246, 0.1)",
//         color: "#8b5cf6",
//         transform: "translateY(-2px)",
//       },
//       searchBtnHover: {
//         backgroundColor: "rgba(139, 92, 246, 0.1)",
//         color: "#8b5cf6",
//         transform: "translateY(-2px)",
//       },
//       loginBtnHover: {
//         transform: "translateY(-2px)",
//         boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
//       },
//       userNameHover: {
//         backgroundColor: "rgba(139, 92, 246, 0.15)",
//         transform: "translateY(-2px)",
//       },
//       logoutBtnHover: {
//         backgroundColor: "rgba(139, 92, 246, 0.1)",
//         color: "#8b5cf6",
//         transform: "translateY(-2px)",
//       },
//     },
//   };

//   // LOAD LOGIN DATA ON PAGE LOAD
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");

//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }

//     loadCartItems();
//   }, []);

//   // LOAD CART ITEMS
//   const loadCartItems = () => {
//     try {
//       const savedCart = localStorage.getItem("bookCart");
//       if (savedCart) {
//         const items = JSON.parse(savedCart);
//         setCartItems(items);
//         updateCartCount(items);
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   };

//   // UPDATE CART COUNT
//   const updateCartCount = (items: CartItem[]) => {
//     const totalItems = items.reduce((total, item) => total + item.quantity, 0);
//     setCartCount(totalItems);
//   };

//   // LISTEN FOR CART UPDATES
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadCartItems();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('cartUpdated', handleStorageChange);

//     const interval = setInterval(loadCartItems, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('cartUpdated', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // LOGOUT FUNCTION
//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");

//     setIsLoggedIn(false);
//     setUserName("");
//     window.location.reload();
//   };

//   // NAV ITEMS WITH ICONS
//   const navItems = [
//     { label: "Home", path: "/", icon: <Home size={20} /> },
//     { label: "Books", path: "/books", icon: <BookOpen size={20} /> },
//     { label: "Blog", path: "/blogs", icon: <FileText size={20} /> }, 
//     { label: "About", path: "/about", icon: <Info size={20} /> },
//     { label: "Contact", path: "/contact", icon: <Phone size={20} /> },
//   ];

//   const handleLoginSuccess = () => {
//     setOpenLogin(false);
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");
//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <div style={styles.headerContainer}>
//           {/* MOBILE MENU BUTTON */}
//           <button
//             style={styles.mobileMenuBtn}
//             className="mobile-menu-btn"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle mobile menu"
//           >
//             <Menu size={24} />
//           </button>

//           {/* LOGO - Improved Design */}
//           <div style={styles.logo}>
//             <Link href="/" style={styles.logoLink}>
//               <Image
//                 src="/assets/images/booklogo.webp"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={styles.logoImage}
//                 priority
//               />
//               <div style={styles.logoTextContainer}>
//                 <span style={styles.logoMainText} className="logo-main-text">OM Spiritual</span>
//                 <span style={styles.logoSubText} className="logo-sub-text">Books & Wisdom</span>
//               </div>
//             </Link>
//           </div>

//           {/* DESKTOP NAV */}
//           <nav style={styles.desktopNav} className="desktop-nav">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 style={{
//                   ...styles.navLink,
//                   ...(pathname === item.path ? styles.activeNavLink : {}),
//                 }}
//                 onMouseEnter={(e) => {
//                   if (pathname !== item.path) {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.navLinkHover.backgroundColor;
//                     e.currentTarget.style.color = styles.hoverEffects.navLinkHover.color;
//                     e.currentTarget.style.transform = styles.hoverEffects.navLinkHover.transform;
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (pathname !== item.path) {
//                     e.currentTarget.style.backgroundColor = "transparent";
//                     e.currentTarget.style.color = styles.navLink.color;
//                     e.currentTarget.style.transform = "none";
//                   }
//                 }}
//               >
//                 <span style={styles.navIcon}>{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* RIGHT ICONS */}
//           <div style={styles.rightIcons} className="right-icons">
//             {/* CART ICON WITH COUNT */}
//             <Link 
//               href="/cart" 
//               style={styles.cartIcon}
//               className="cart-icon"
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.hoverEffects.cartIconHover.backgroundColor;
//                 e.currentTarget.style.color = styles.hoverEffects.cartIconHover.color;
//                 e.currentTarget.style.transform = styles.hoverEffects.cartIconHover.transform;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.cartIcon.backgroundColor;
//                 e.currentTarget.style.color = styles.cartIcon.color;
//                 e.currentTarget.style.transform = "none";
//               }}
//               aria-label={`Shopping cart with ${cartCount} items`}
//             >
//               <ShoppingCart size={24} />
//               {cartCount > 0 && (
//                 <span style={styles.cartCount}>{cartCount > 99 ? '99+' : cartCount}</span>
//               )}
//             </Link>

//             {/* SEARCH BUTTON */}
//             <button 
//               style={styles.searchBtn}
//               className="search-btn"
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.hoverEffects.searchBtnHover.backgroundColor;
//                 e.currentTarget.style.color = styles.hoverEffects.searchBtnHover.color;
//                 e.currentTarget.style.transform = styles.hoverEffects.searchBtnHover.transform;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.searchBtn.backgroundColor;
//                 e.currentTarget.style.color = styles.searchBtn.color;
//                 e.currentTarget.style.transform = "none";
//               }}
//               aria-label="Search"
//             >
//               <Search size={24} />
//             </button>

//             {/* USER AUTH SECTION */}
//             {!isLoggedIn ? (
//               <button 
//                 style={styles.loginBtn}
//                 className="login-btn"
//                 onClick={() => setOpenLogin(true)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = styles.hoverEffects.loginBtnHover.transform;
//                   e.currentTarget.style.boxShadow = styles.hoverEffects.loginBtnHover.boxShadow;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "none";
//                   e.currentTarget.style.boxShadow = styles.loginBtn.boxShadow;
//                 }}
//                 aria-label="Login"
//               >
//                 <User size={20} />
//                 <span className="login-text">Login</span>
//               </button>     
//             ) : (
//               <div style={styles.userDropdown} className="user-dropdown">
//                 <Link 
//                   href="/profile" 
//                   style={styles.userName}
//                   className="user-name"
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.userNameHover.backgroundColor;
//                     e.currentTarget.style.transform = styles.hoverEffects.userNameHover.transform;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.userName.backgroundColor;
//                     e.currentTarget.style.transform = "none";
//                   }}
//                 >
//                   <User size={18} />
//                   <span className="user-name-text">Hi, {userName}</span>
//                 </Link>

//                 <button 
//                   style={styles.logoutBtn}
//                   className="logout-btn"
//                   onClick={logout}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.logoutBtnHover.backgroundColor;
//                     e.currentTarget.style.color = styles.hoverEffects.logoutBtnHover.color;
//                     e.currentTarget.style.transform = styles.hoverEffects.logoutBtnHover.transform;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.logoutBtn.backgroundColor;
//                     e.currentTarget.style.color = styles.logoutBtn.color;
//                     e.currentTarget.style.transform = "none";
//                   }}
//                   aria-label="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* MOBILE NAV OVERLAY */}
//       {mobileMenuOpen && (
//         <div style={styles.mobileNavOverlay} onClick={() => setMobileMenuOpen(false)}>
//           <div style={styles.mobileNav} className="mobile-nav" onClick={(e) => e.stopPropagation()}>
//             <div style={styles.mobileNavHeader}>
//               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                 <Image
//                   src="/assets/images/booklogo.webp"
//                   alt="OM Spiritual"
//                   width={40}
//                   height={40}
//                   style={{ borderRadius: "10px", border: "2px solid white" }}
//                 />
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <h3 style={{ margin: 0, color: "white", fontSize: "20px", fontWeight: 700 }}>OM Spiritual</h3>
//                   <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>Book hop</p>
//                 </div>
//               </div>
//               <button 
//                 style={styles.mobileCloseBtn}
//                 onClick={() => setMobileMenuOpen(false)}
//                 aria-label="Close menu"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div style={styles.mobileNavMenu}>
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   style={{
//                     ...styles.mobileNavLink,
//                     ...(pathname === item.path ? styles.activeMobileNavLink : {}),
//                   }}
//                   onMouseEnter={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = "transparent";
//                     }
//                   }}
//                 >
//                   <span style={styles.mobileNavIcon}>{item.icon}</span>
//                   {item.label}
//                 </Link>
//               ))}

//               {/* MOBILE CART */}
//               <Link 
//                 href="/cart" 
//                 style={styles.mobileCartLink}
//                 onClick={() => setMobileMenuOpen(false)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.05)";
//                 }}
//               >
//                 <ShoppingCart size={20} />
//                 <span>Cart ({cartCount})</span>
//               </Link>
//             </div>

//             {/* MOBILE LOGIN / LOGOUT */}
//             <div style={styles.mobileAuthSection}>
//               {!isLoggedIn ? (
//                 <button
//                   onClick={() => {
//                     setOpenLogin(true);
//                     setMobileMenuOpen(false);
//                   }}
//                   style={styles.mobileLoginBtn}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.4)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "none";
//                     e.currentTarget.style.boxShadow = styles.mobileLoginBtn.boxShadow;
//                   }}
//                 >
//                   <User size={20} />
//                   Login / Signup
//                 </button>
//               ) : (
//                 <div style={styles.mobileUserInfo}>
//                   <div style={styles.mobileUserGreeting}>
//                     <User size={20} />
//                     <span>Hello, {userName}</span>
//                   </div>
//                   <button 
//                     style={styles.mobileLogoutBtn}
//                     onClick={logout}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.05)";
//                     }}
//                   >
//                     <LogOut size={20} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <Login
//           close={() => setOpenLogin(false)}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}

//       {/* Responsive Media Queries */}
//       <style jsx global>{`
//         /* Animations */
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
        
//         /* Tablet and below */
//         @media (max-width: 1024px) {
//           .desktop-nav {
//             gap: 4px !important;
//           }
          
//           .nav-link {
//             padding: 10px 16px !important;
//             font-size: 14px !important;
//           }
//         }
        
//         /* Mobile styles (768px and below) */
//         @media (max-width: 768px) {
//           /* Show hamburger menu button */
//           .mobile-menu-btn {
//             display: flex !important;
//             align-items: center;
//             justify-content: center;
//           }
          
//           /* Hide desktop navigation */
//           .desktop-nav {
//             display: none !important;
//           }
          
//           /* Adjust header container */
//           header > div {
//             padding: 0 16px !important;
//             height: 70px !important;
//           }
          
//           /* Reduce right icons gap */
//           .right-icons {
//             gap: 12px !important;
//           }
          
//           /* Hide login button text on mobile */
//           .login-btn .login-text {
//             display: none;
//           }
          
//           /* Adjust login button */
//           .login-btn {
//             padding: 12px !important;
//             min-width: auto !important;
//           }
          
//           /* Hide username text on mobile */
//           .user-name .user-name-text {
//             display: none;
//           }
          
//           /* Adjust username link */
//           .user-name {
//             padding: 10px !important;
//           }
          
//           /* Adjust logo */
//           .logo-main-text {
//             font-size: 22px !important;
//           }
          
//           .logo-sub-text {
//             font-size: 10px !important;
//           }
          
//           /* Mobile navigation styles */
//           body.menu-open {
//             overflow: hidden;
//           }
//         }
        
//         /* Small mobile devices */
//         @media (max-width: 640px) {
//           /* Adjust header height */
//           header > div {
//             height: 65px !important;
//             padding: 0 12px !important;
//           }
          
//           /* Further reduce logo size */
//           .logo-main-text {
//             font-size: 18px !important;
//           }
          
//           .logo-sub-text {
//             font-size: 9px !important;
//           }
          
//           /* Reduce icon sizes */
//           .cart-icon,
//           .search-btn,
//           .login-btn,
//           .user-name,
//           .logout-btn {
//             padding: 8px !important;
//           }
          
//           /* Reduce right icons gap */
//           .right-icons {
//             gap: 8px !important;
//           }
//         }
        
//         /* Extra small devices */
//         @media (max-width: 480px) {
//           /* Hide logo subtext on very small screens */
//           .logo-sub-text {
//             display: none !important;
//           }
          
//           .logo-main-text {
//             font-size: 16px !important;
//           }
          
//           /* Adjust mobile menu width */
//           .mobile-nav {
//             width: 85% !important;
//             max-width: 300px !important;
//           }
          
//           /* Reduce header padding */
//           header > div {
//             padding: 0 10px !important;
//           }
          
//           /* Hide cart count on very small screens when > 9 */
//           .cart-count {
//             font-size: 10px !important;
//             min-width: 18px !important;
//             height: 18px !important;
//           }
//         }
        
//         /* Very small devices */
//         @media (max-width: 360px) {
//           .logo-main-text {
//             font-size: 14px !important;
//           }
          
//           .mobile-nav {
//             width: 100% !important;
//             max-width: 100% !important;
//             border-radius: 0 !important;
//           }
          
//           .mobile-nav-header {
//             padding: 16px !important;
//           }
//         }
        
//         /* Desktop hover effects */
//         @media (hover: hover) and (pointer: fine) {
//           .nav-link:hover {
//             transform: translateY(-2px) !important;
//           }
          
//           .cart-icon:hover,
//           .search-btn:hover,
//           .logout-btn:hover {
//             transform: translateY(-2px) !important;
//           }
          
//           .login-btn:hover {
//             transform: translateY(-2px) !important;
//             box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4) !important;
//           }
          
//           .user-name:hover {
//             transform: translateY(-2px) !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }
















// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// import {
//   ShoppingCart,
//   Search,
//   User,
//   LogOut,
//   Menu,
//   X,
//   BookOpen,
//   Home,
//   Phone,
//   Info,
//   FileText,
// } from "lucide-react";

// import Login from "../Login/login";

// interface CartItem {
//   _id: string;
//   bookName: string;
//   authorName: string;
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// export default function Header() {
//   const pathname = usePathname();

//   const [openLogin, setOpenLogin] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // LOAD LOGIN DATA ON PAGE LOAD
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");

//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }

//     loadCartItems();
//   }, []);

//   // LOAD CART ITEMS
//   const loadCartItems = () => {
//     try {
//       const savedCart = localStorage.getItem("bookCart");
//       if (savedCart) {
//         const items = JSON.parse(savedCart);
//         setCartItems(items);
//         updateCartCount(items);
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   };

//   // UPDATE CART COUNT
//   const updateCartCount = (items: CartItem[]) => {
//     const totalItems = items.reduce((total, item) => total + item.quantity, 0);
//     setCartCount(totalItems);
//   };

//   // LISTEN FOR CART UPDATES
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadCartItems();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('cartUpdated', handleStorageChange);

//     const interval = setInterval(loadCartItems, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('cartUpdated', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // LOGOUT FUNCTION
//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");

//     setIsLoggedIn(false);
//     setUserName("");
//     window.location.reload();
//   };

//   // NAV ITEMS WITH ICONS
//   const navItems = [
//     { label: "Home", path: "/", icon: <Home size={20} /> },
//     { label: "Books", path: "/books", icon: <BookOpen size={20} /> },
//     { label: "Blog", path: "/blogs", icon: <FileText size={20} /> }, 
//     { label: "About", path: "/about", icon: <Info size={20} /> },
//     { label: "Contact", path: "/contact", icon: <Phone size={20} /> },
//   ];

//   const handleLoginSuccess = () => {
//     setOpenLogin(false);
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");
//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }
//   };

//   // Styles object defined inside component to access state
//   const styles = {
//     header: {
//       backgroundColor: isScrolled ? "rgba(255, 248, 240, 0.98)" : "#FFF8F0",
//       backdropFilter: isScrolled ? "blur(10px)" : "none",
//       boxShadow: isScrolled 
//         ? "0 8px 32px rgba(168, 85, 34, 0.12)" 
//         : "0 2px 20px rgba(168, 85, 34, 0.08)",
//       position: "sticky" as const,
//       top: 0,
//       zIndex: 1000,
//       transition: "all 0.3s ease",
//       borderBottom: isScrolled ? "1px solid rgba(168, 85, 34, 0.15)" : "1px solid rgba(168, 85, 34, 0.08)",
//     },
//     headerContainer: {
//       maxWidth: "1400px",
//       margin: "0 auto",
//       padding: "0 20px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       height: "80px",
//       transition: "height 0.3s ease",
//     },
//     mobileMenuBtn: {
//       display: "none",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       border: "none",
//       cursor: "pointer",
//       padding: "10px",
//       borderRadius: "12px",
//       color: "white",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.3)",
//     },
//     logo: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     logoLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "15px",
//       textDecoration: "none",
//       color: "#333",
//     },
//     logoImage: {
//       width: "50px",
//       height: "50px",
//       borderRadius: "12px",
//       objectFit: "cover" as const,
//       border: "3px solid #A85522",
//       padding: "2px",
//       backgroundColor: "white",
//     },
//     logoTextContainer: {
//       display: "flex",
//       flexDirection: "column" as const,
//     },
//     logoMainText: {
//       fontSize: "28px",
//       fontWeight: 800,
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       WebkitBackgroundClip: "text" as const,
//       WebkitTextFillColor: "transparent" as const,
//       letterSpacing: "-0.5px",
//       lineHeight: 1.1,
//       fontFamily: "'Playfair Display', serif",
//     },
//     logoSubText: {
//       fontSize: "12px",
//       color: "#A85522",
//       fontWeight: 500,
//       letterSpacing: "1px",
//       textTransform: "uppercase" as const,
//       marginTop: "-2px",
//     },
//     desktopNav: {
//       display: "flex",
//       gap: "6px",
//       alignItems: "center",
//       background: "rgba(255, 248, 240, 0.7)",
//       padding: "8px",
//       borderRadius: "20px",
//       border: "1px solid rgba(168, 85, 34, 0.15)",
//       boxShadow: "inset 0 2px 4px rgba(168, 85, 34, 0.05)",
//     },
//     navLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "16px",
//       fontWeight: 600,
//       padding: "14px 24px",
//       borderRadius: "16px",
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       position: "relative" as const,
//       fontFamily: "'Inter', sans-serif",
//       letterSpacing: "0.3px",
//       border: "1px solid transparent",
//     },
//     activeNavLink: {
//       color: "#A85522",
//       backgroundColor: "rgba(168, 85, 34, 0.12)",
//       fontWeight: 700,
//       border: "1px solid rgba(168, 85, 34, 0.2)",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//     },
//     navIcon: {
//       display: "flex",
//       alignItems: "center",
//       color: "#A85522",
//     },
//     rightIcons: {
//       display: "flex",
//       alignItems: "center",
//       gap: "20px",
//     },
//     cartIcon: {
//       position: "relative" as const,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       padding: "12px",
//       borderRadius: "14px",
//       transition: "all 0.3s ease",
//       background: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     cartCount: {
//       position: "absolute" as const,
//       top: "-5px",
//       right: "-5px",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       color: "white",
//       fontSize: "12px",
//       fontWeight: "bold",
//       borderRadius: "50%",
//       minWidth: "24px",
//       height: "24px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "0 4px",
//       border: "2px solid #FFF8F0",
//     },
//     searchBtn: {
//       background: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#5A3E2B",
//       padding: "12px",
//       borderRadius: "14px",
//       transition: "all 0.3s ease",
//     },
//     loginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       border: "none",
//       color: "white",
//       padding: "14px 28px",
//       borderRadius: "14px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: 600,
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       boxShadow: "0 4px 15px rgba(168, 85, 34, 0.25)",
//       fontFamily: "'Inter', sans-serif",
//     },
//     userDropdown: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     userName: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "15px",
//       fontWeight: 600,
//       padding: "12px 20px",
//       borderRadius: "14px",
//       backgroundColor: "rgba(168, 85, 34, 0.1)",
//       transition: "all 0.3s ease",
//       border: "1px solid rgba(168, 85, 34, 0.15)",
//     },
//     logoutBtn: {
//       background: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#5A3E2B",
//       padding: "12px",
//       borderRadius: "14px",
//       transition: "all 0.3s ease",
//     },
//     mobileNavOverlay: {
//       position: "fixed" as const,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(90, 62, 43, 0.7)",
//       zIndex: 9999,
//       animation: "fadeIn 0.3s ease-out",
//       backdropFilter: "blur(4px)",
//     },
//     mobileNav: {
//       width: "320px",
//       backgroundColor: "#FFF8F0",
//       height: "100%",
//       boxShadow: "-10px 0 40px rgba(168, 85, 34, 0.15)",
//       display: "flex",
//       flexDirection: "column" as const,
//       animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       borderLeft: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     mobileNavHeader: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "24px",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//     },
//     mobileCloseBtn: {
//       background: "rgba(255, 255, 255, 0.2)",
//       border: "none",
//       cursor: "pointer",
//       color: "white",
//       padding: "8px",
//       borderRadius: "10px",
//       backdropFilter: "blur(10px)",
//     },
//     mobileNavMenu: {
//       flex: 1,
//       padding: "20px 0",
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "4px",
//       overflowY: "auto" as const,
//     },
//     mobileNavLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "16px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "17px",
//       fontWeight: 600,
//       padding: "20px 24px",
//       transition: "all 0.3s ease",
//       margin: "0 8px",
//       borderRadius: "14px",
//       fontFamily: "'Inter', sans-serif",
//     },
//     activeMobileNavLink: {
//       color: "#A85522",
//       backgroundColor: "rgba(168, 85, 34, 0.12)",
//       fontWeight: 700,
//       border: "1px solid rgba(168, 85, 34, 0.2)",
//     },
//     mobileNavIcon: {
//       display: "flex",
//       alignItems: "center",
//       width: "24px",
//       color: "#A85522",
//     },
//     mobileCartLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "16px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "17px",
//       fontWeight: 600,
//       padding: "20px 24px",
//       margin: "20px 8px 8px",
//       borderRadius: "14px",
//       background: "rgba(168, 85, 34, 0.08)",
//       transition: "all 0.3s ease",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     mobileAuthSection: {
//       marginTop: "auto",
//       padding: "20px",
//       background: "rgba(168, 85, 34, 0.05)",
//       borderTop: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     mobileLoginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       border: "none",
//       color: "white",
//       padding: "20px",
//       borderRadius: "14px",
//       cursor: "pointer",
//       fontSize: "17px",
//       fontWeight: 600,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//       boxShadow: "0 4px 15px rgba(168, 85, 34, 0.25)",
//       fontFamily: "'Inter', sans-serif",
//     },
//     mobileUserInfo: {
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "12px",
//     },
//     mobileUserGreeting: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       color: "#5A3E2B",
//       fontSize: "16px",
//       fontWeight: 600,
//       padding: "18px",
//       backgroundColor: "rgba(168, 85, 34, 0.1)",
//       borderRadius: "14px",
//       border: "1px solid rgba(168, 85, 34, 0.15)",
//     },
//     mobileLogoutBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       background: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//       color: "#A85522",
//       padding: "18px",
//       borderRadius: "14px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: 600,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//     },
//     hoverEffects: {
//       navLinkHover: {
//         backgroundColor: "rgba(168, 85, 34, 0.12)",
//         color: "#A85522",
//         transform: "translateY(-2px)",
//         boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//         border: "1px solid rgba(168, 85, 34, 0.2)",
//       },
//       cartIconHover: {
//         backgroundColor: "rgba(168, 85, 34, 0.15)",
//         color: "#A85522",
//         transform: "translateY(-2px)",
//         boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//       },
//       searchBtnHover: {
//         backgroundColor: "rgba(168, 85, 34, 0.15)",
//         color: "#A85522",
//         transform: "translateY(-2px)",
//         boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//       },
//       loginBtnHover: {
//         transform: "translateY(-2px)",
//         boxShadow: "0 6px 20px rgba(168, 85, 34, 0.35)",
//       },
//       userNameHover: {
//         backgroundColor: "rgba(168, 85, 34, 0.15)",
//         transform: "translateY(-2px)",
//         boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//       },
//       logoutBtnHover: {
//         backgroundColor: "rgba(168, 85, 34, 0.15)",
//         color: "#A85522",
//         transform: "translateY(-2px)",
//         boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//       },
//     },
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <div style={styles.headerContainer}>
//           {/* MOBILE MENU BUTTON */}
//           <button
//             style={styles.mobileMenuBtn}
//             className="mobile-menu-btn"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle mobile menu"
//           >
//             <Menu size={24} />
//           </button>

//           {/* LOGO - Improved Design */}
//           <div style={styles.logo}>
//             <Link href="/" style={styles.logoLink}>
//               <Image
//                 src="/assets/images/booklogo.webp"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={styles.logoImage}
//                 priority
//               />
//               <div style={styles.logoTextContainer}>
//                 <span style={styles.logoMainText} className="logo-main-text">OM Spiritual</span>
//                 <span style={styles.logoSubText} className="logo-sub-text">Books & Wisdom</span>
//               </div>
//             </Link>
//           </div>

//           {/* DESKTOP NAV */}
//           <nav style={styles.desktopNav} className="desktop-nav">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 style={{
//                   ...styles.navLink,
//                   ...(pathname === item.path ? styles.activeNavLink : {}),
//                 }}
//                 onMouseEnter={(e) => {
//                   if (pathname !== item.path) {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.navLinkHover.backgroundColor;
//                     e.currentTarget.style.color = styles.hoverEffects.navLinkHover.color;
//                     e.currentTarget.style.transform = styles.hoverEffects.navLinkHover.transform;
//                     e.currentTarget.style.boxShadow = styles.hoverEffects.navLinkHover.boxShadow;
//                     e.currentTarget.style.border = styles.hoverEffects.navLinkHover.border;
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (pathname !== item.path) {
//                     e.currentTarget.style.backgroundColor = "transparent";
//                     e.currentTarget.style.color = styles.navLink.color;
//                     e.currentTarget.style.transform = "none";
//                     e.currentTarget.style.boxShadow = "none";
//                     e.currentTarget.style.border = "1px solid transparent";
//                   }
//                 }}
//               >
//                 <span style={styles.navIcon}>{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* RIGHT ICONS */}
//           <div style={styles.rightIcons} className="right-icons">
//             {/* CART ICON WITH COUNT */}
//             <Link 
//               href="/cart" 
//               style={styles.cartIcon}
//               className="cart-icon"
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.hoverEffects.cartIconHover.backgroundColor;
//                 e.currentTarget.style.color = styles.hoverEffects.cartIconHover.color;
//                 e.currentTarget.style.transform = styles.hoverEffects.cartIconHover.transform;
//                 e.currentTarget.style.boxShadow = styles.hoverEffects.cartIconHover.boxShadow;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.cartIcon.backgroundColor;
//                 e.currentTarget.style.color = styles.cartIcon.color;
//                 e.currentTarget.style.transform = "none";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//               aria-label={`Shopping cart with ${cartCount} items`}
//             >
//               <ShoppingCart size={24} />
//               {cartCount > 0 && (
//                 <span style={styles.cartCount}>{cartCount > 99 ? '99+' : cartCount}</span>
//               )}
//             </Link>

//             {/* SEARCH BUTTON */}
//             {/* <button 
//               style={styles.searchBtn}
//               className="search-btn"
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.hoverEffects.searchBtnHover.backgroundColor;
//                 e.currentTarget.style.color = styles.hoverEffects.searchBtnHover.color;
//                 e.currentTarget.style.transform = styles.hoverEffects.searchBtnHover.transform;
//                 e.currentTarget.style.boxShadow = styles.hoverEffects.searchBtnHover.boxShadow;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = styles.searchBtn.backgroundColor;
//                 e.currentTarget.style.color = styles.searchBtn.color;
//                 e.currentTarget.style.transform = "none";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//               aria-label="Search"
//             >
//               <Search size={24} />
//             </button> */}

//             {/* USER AUTH SECTION */}
//             {!isLoggedIn ? (
//               <button 
//                 style={styles.loginBtn}
//                 className="login-btn"
//                 onClick={() => setOpenLogin(true)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = styles.hoverEffects.loginBtnHover.transform;
//                   e.currentTarget.style.boxShadow = styles.hoverEffects.loginBtnHover.boxShadow;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "none";
//                   e.currentTarget.style.boxShadow = styles.loginBtn.boxShadow;
//                 }}
//                 aria-label="Login"
//               >
//                 <User size={20} />
//                 <span className="login-text">Login</span>
//               </button>     
//             ) : (
//               <div style={styles.userDropdown} className="user-dropdown">
//                 <Link 
//                   href="/profile" 
//                   style={styles.userName}
//                   className="user-name"
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.userNameHover.backgroundColor;
//                     e.currentTarget.style.transform = styles.hoverEffects.userNameHover.transform;
//                     e.currentTarget.style.boxShadow = styles.hoverEffects.userNameHover.boxShadow;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.userName.backgroundColor;
//                     e.currentTarget.style.transform = "none";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <User size={18} />
//                   <span className="user-name-text">Hi, {userName}</span>
//                 </Link>

//                 <button 
//                   style={styles.logoutBtn}
//                   className="logout-btn"
//                   onClick={logout}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.hoverEffects.logoutBtnHover.backgroundColor;
//                     e.currentTarget.style.color = styles.hoverEffects.logoutBtnHover.color;
//                     e.currentTarget.style.transform = styles.hoverEffects.logoutBtnHover.transform;
//                     e.currentTarget.style.boxShadow = styles.hoverEffects.logoutBtnHover.boxShadow;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = styles.logoutBtn.backgroundColor;
//                     e.currentTarget.style.color = styles.logoutBtn.color;
//                     e.currentTarget.style.transform = "none";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                   aria-label="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* MOBILE NAV OVERLAY */}
//       {mobileMenuOpen && (
//         <div style={styles.mobileNavOverlay} onClick={() => setMobileMenuOpen(false)}>
//           <div style={styles.mobileNav} className="mobile-nav" onClick={(e) => e.stopPropagation()}>
//             <div style={styles.mobileNavHeader}>
//               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                 <Image
//                   src="/assets/images/booklogo.webp"
//                   alt="OM Spiritual"
//                   width={40}
//                   height={40}
//                   style={{ borderRadius: "10px", border: "2px solid white", backgroundColor: "white" }}
//                 />
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <h3 style={{ margin: 0, color: "white", fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>OM Spiritual</h3>
//                   <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>Books & Wisdom</p>
//                 </div>
//               </div>
//               <button 
//                 style={styles.mobileCloseBtn}
//                 onClick={() => setMobileMenuOpen(false)}
//                 aria-label="Close menu"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div style={styles.mobileNavMenu}>
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   style={{
//                     ...styles.mobileNavLink,
//                     ...(pathname === item.path ? styles.activeMobileNavLink : {}),
//                   }}
//                   onMouseEnter={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.1)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = "transparent";
//                     }
//                   }}
//                 >
//                   <span style={styles.mobileNavIcon}>{item.icon}</span>
//                   {item.label}
//                 </Link>
//               ))}

//               {/* MOBILE CART */}
//               <Link 
//                 href="/cart" 
//                 style={styles.mobileCartLink}
//                 onClick={() => setMobileMenuOpen(false)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.1)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.08)";
//                 }}
//               >
//                 <ShoppingCart size={20} />
//                 <span>Cart ({cartCount})</span>
//               </Link>
//             </div>

//             {/* MOBILE LOGIN / LOGOUT */}
//             <div style={styles.mobileAuthSection}>
//               {!isLoggedIn ? (
//                 <button
//                   onClick={() => {
//                     setOpenLogin(true);
//                     setMobileMenuOpen(false);
//                   }}
//                   style={styles.mobileLoginBtn}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow = "0 6px 20px rgba(168, 85, 34, 0.4)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "none";
//                     e.currentTarget.style.boxShadow = styles.mobileLoginBtn.boxShadow;
//                   }}
//                 >
//                   <User size={20} />
//                   Login / Signup
//                 </button>
//               ) : (
//                 <div style={styles.mobileUserInfo}>
//                   <div style={styles.mobileUserGreeting}>
//                     <User size={20} />
//                     <span>Hello, {userName}</span>
//                   </div>
//                   <button 
//                     style={styles.mobileLogoutBtn}
//                     onClick={logout}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.1)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.08)";
//                     }}
//                   >
//                     <LogOut size={20} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <Login
//           close={() => setOpenLogin(false)}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}

//       {/* Responsive Media Queries */}
//       <style jsx global>{`
//         /* Animations */
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
        
//         /* Tablet and below */
//         @media (max-width: 1024px) {
//           .desktop-nav {
//             gap: 4px !important;
//           }
          
//           .nav-link {
//             padding: 10px 16px !important;
//             font-size: 14px !important;
//           }
//         }
        
//         /* Mobile styles (768px and below) */
//         @media (max-width: 768px) {
//           /* Show hamburger menu button */
//           .mobile-menu-btn {
//             display: flex !important;
//             align-items: center;
//             justify-content: center;
//           }
          
//           /* Hide desktop navigation */
//           .desktop-nav {
//             display: none !important;
//           }
          
//           /* Adjust header container */
//           header > div {
//             padding: 0 16px !important;
//             height: 70px !important;
//           }
          
//           /* Reduce right icons gap */
//           .right-icons {
//             gap: 12px !important;
//           }
          
//           /* Hide login button text on mobile */
//           .login-btn .login-text {
//             display: none;
//           }
          
//           /* Adjust login button */
//           .login-btn {
//             padding: 12px !important;
//             min-width: auto !important;
//           }
          
//           /* Hide username text on mobile */
//           .user-name .user-name-text {
//             display: none;
//           }
          
//           /* Adjust username link */
//           .user-name {
//             padding: 10px !important;
//           }
          
//           /* Adjust logo */
//           .logo-main-text {
//             font-size: 22px !important;
//           }
          
//           .logo-sub-text {
//             font-size: 10px !important;
//           }
          
//           /* Mobile navigation styles */
//           body.menu-open {
//             overflow: hidden;
//           }
//         }
        
//         /* Small mobile devices */
//         @media (max-width: 640px) {
//           /* Adjust header height */
//           header > div {
//             height: 65px !important;
//             padding: 0 12px !important;
//           }
          
//           /* Further reduce logo size */
//           .logo-main-text {
//             font-size: 18px !important;
//           }
          
//           .logo-sub-text {
//             font-size: 9px !important;
//           }
          
//           /* Reduce icon sizes */
//           .cart-icon,
//           .search-btn,
//           .login-btn,
//           .user-name,
//           .logout-btn {
//             padding: 8px !important;
//           }
          
//           /* Reduce right icons gap */
//           .right-icons {
//             gap: 8px !important;
//           }
//         }
        
//         /* Extra small devices */
//         @media (max-width: 480px) {
//           /* Hide logo subtext on very small screens */
//           .logo-sub-text {
//             display: none !important;
//           }
          
//           .logo-main-text {
//             font-size: 16px !important;
//           }
          
//           /* Adjust mobile menu width */
//           .mobile-nav {
//             width: 85% !important;
//             max-width: 300px !important;
//           }
          
//           /* Reduce header padding */
//           header > div {
//             padding: 0 10px !important;
//           }
          
//           /* Hide cart count on very small screens when > 9 */
//           .cart-count {
//             font-size: 10px !important;
//             min-width: 18px !important;
//             height: 18px !important;
//           }
//         }
        
//         /* Very small devices */
//         @media (max-width: 360px) {
//           .logo-main-text {
//             font-size: 14px !important;
//           }
          
//           .mobile-nav {
//             width: 100% !important;
//             max-width: 100% !important;
//             border-radius: 0 !important;
//           }
          
//           .mobile-nav-header {
//             padding: 16px !important;
//           }
//         }
        
//         /* Desktop hover effects */
//         @media (hover: hover) and (pointer: fine) {
//           .nav-link:hover {
//             transform: translateY(-2px) !important;
//           }
          
//           .cart-icon:hover,
//           .search-btn:hover,
//           .logout-btn:hover {
//             transform: translateY(-2px) !important;
//           }
          
//           .login-btn:hover {
//             transform: translateY(-2px) !important;
//             box-shadow: 0 6px 20px rgba(168, 85, 34, 0.35) !important;
//           }
          
//           .user-name:hover {
//             transform: translateY(-2px) !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }








// "use client";

// import { useState, useEffect, CSSProperties } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// import {
//   ShoppingCart,
//   Search,
//   User,
//   LogOut,
//   Menu,
//   X,
//   BookOpen,
//   Home,
//   Phone,
//   Info,
//   FileText,
// } from "lucide-react";

// import Login from "../Login/login";

// interface CartItem {
//   _id: string;
//   bookName: string;
//   authorName: string;
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// interface HoverStyles {
//   backgroundColor?: string;
//   color?: string;
//   transform?: string;
//   boxShadow?: string;
//   border?: string;
// }

// export default function Header() {
//   const pathname = usePathname();

//   const [openLogin, setOpenLogin] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // LOAD LOGIN DATA ON PAGE LOAD
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");

//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }

//     loadCartItems();
//   }, []);

//   // LOAD CART ITEMS
//   const loadCartItems = () => {
//     try {
//       const savedCart = localStorage.getItem("bookCart");
//       if (savedCart) {
//         const items = JSON.parse(savedCart);
//         setCartItems(items);
//         updateCartCount(items);
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   };

//   // UPDATE CART COUNT
//   const updateCartCount = (items: CartItem[]) => {
//     const totalItems = items.reduce((total, item) => total + item.quantity, 0);
//     setCartCount(totalItems);
//   };

//   // LISTEN FOR CART UPDATES
//   useEffect(() => {
//     const handleStorageChange = () => {
//       loadCartItems();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('cartUpdated', handleStorageChange);

//     const interval = setInterval(loadCartItems, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('cartUpdated', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   // LOGOUT FUNCTION
//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");

//     setIsLoggedIn(false);
//     setUserName("");
//     window.location.reload();
//   };

//   // NAV ITEMS WITH ICONS
//   const navItems = [
//     { label: "Home", path: "/", icon: <Home size={20} /> },
//     { label: "Books", path: "/books", icon: <BookOpen size={20} /> },
//     { label: "Blog", path: "/blogs", icon: <FileText size={20} /> }, 
//     { label: "About", path: "/about", icon: <Info size={20} /> },
//     // { label: "Contact", path: "/contact", icon: <Phone size={20} /> },
//   ];

//   const handleLoginSuccess = () => {
//     setOpenLogin(false);
//     const token = localStorage.getItem("authToken");
//     const name = localStorage.getItem("userName");
//     if (token) {
//       setIsLoggedIn(true);
//       setUserName(name || "");
//     }
//   };

//   // Helper function to apply hover styles
//   const applyHoverStyle = (element: HTMLElement, styles: HoverStyles) => {
//     if (styles.backgroundColor) element.style.backgroundColor = styles.backgroundColor;
//     if (styles.color) element.style.color = styles.color;
//     if (styles.transform) element.style.transform = styles.transform;
//     if (styles.boxShadow) element.style.boxShadow = styles.boxShadow;
//     if (styles.border) element.style.border = styles.border;
//   };

//   // Helper function to reset hover styles
//   const resetHoverStyle = (element: HTMLElement, defaultStyles: CSSProperties) => {
//     element.style.backgroundColor = defaultStyles.backgroundColor as string || "";
//     element.style.color = defaultStyles.color as string || "";
//     element.style.transform = "";
//     element.style.boxShadow = defaultStyles.boxShadow as string || "";
//     element.style.border = defaultStyles.border as string || "";
//   };

//   // Styles object defined inside component to access state
//   const styles: { [key: string]: CSSProperties } = {
//     header: {
//       backgroundColor: isScrolled ? "rgba(255, 248, 240, 0.98)" : "#FFF8F0",
//       backdropFilter: isScrolled ? "blur(10px)" : "none",
//       boxShadow: isScrolled 
//         ? "0 8px 32px rgba(168, 85, 34, 0.12)" 
//         : "0 2px 20px rgba(168, 85, 34, 0.08)",
//       position: "sticky",
//       top: 0,
//       zIndex: 1000,
//       transition: "all 0.3s ease",
//       borderBottom: isScrolled ? "1px solid rgba(168, 85, 34, 0.15)" : "1px solid rgba(168, 85, 34, 0.08)",
//     },
//     headerContainer: {
//       maxWidth: "1400px",
//       margin: "0 auto",
//       padding: "0 20px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       height: "60px",
//       transition: "height 0.3s ease",
//     },
//     mobileMenuBtn: {
//       display: "none",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       border: "none",
//       cursor: "pointer",
//       padding: "10px",
//       borderRadius: "12px",
//       color: "white",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.3)",
//     },
//     logo: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     logoImage: {
//       width: "50px",
//       // height: "50px",
//       borderRadius: "12px",
//       objectFit: "cover",
//       border: "3px solid #A85522",
//       // padding: "2px",
//       backgroundColor: "white",
//     },
//     logoTextContainer: {
//       display: "flex",
//       flexDirection: "column",
//     },
//     logoMainText: {
//       fontSize: "28px",
//       fontWeight: 800,
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       letterSpacing: "-0.5px",
//       lineHeight: 1.1,
//       fontFamily: "'Playfair Display', serif",
//     },
//     logoSubText: {
//       fontSize: "12px",
//       color: "#A85522",
//       fontWeight: 500,
//       letterSpacing: "1px",
//       textTransform: "uppercase",
//       marginTop: "-2px",
//     },
//     desktopNav: {
//       display: "flex",
//       gap: "6px",
//       alignItems: "center",
//       background: "rgba(255, 248, 240, 0.7)",
//       // padding: "8px",
//       borderRadius: "20px",
//       border: "1px solid rgba(168, 85, 34, 0.15)",
//       boxShadow: "inset 0 2px 4px rgba(168, 85, 34, 0.05)",
//     },
//     navLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "16px",
//       fontWeight: 600,
//       padding: "14px 24px",
//       borderRadius: "16px",
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       position: "relative",
//       fontFamily: "'Inter', sans-serif",
//       letterSpacing: "0.3px",
//       border: "1px solid transparent",
//     },
//     activeNavLink: {
//       color: "#A85522",
//       backgroundColor: "rgba(168, 85, 34, 0.12)",
//       fontWeight: 700,
//       border: "1px solid rgba(168, 85, 34, 0.2)",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//     },
//     navIcon: {
//       display: "flex",
//       alignItems: "center",
//       color: "#A85522",
//     },
//     rightIcons: {
//       display: "flex",
//       alignItems: "center",
//       gap: "20px",
//     },
//     cartIcon: {
//       position: "relative",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       padding: "10px",
//       borderRadius: "14px",
//       transition: "all 0.3s ease",
//       // backgroundColor: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     cartCount: {
//       position: "absolute",
//       top: "-5px",
//       right: "-5px",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       color: "white",
//       fontSize: "12px",
//       fontWeight: "bold",
//       borderRadius: "30%",
//       minWidth: "24px",
//       height: "24px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "0 3px",
//       border: "2px solid #FFF8F0",
//     },
//     searchBtn: {
//       backgroundColor: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#5A3E2B",
//       padding: "12px",
//       borderRadius: "14px",
//       transition: "all 0.3s ease",
//     },
//     loginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       border: "none",
//       color: "white",
//       padding: "10px 23px",
//       borderRadius: "14px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: 600,
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       boxShadow: "0 4px 15px rgba(168, 85, 34, 0.25)",
//       fontFamily: "'Inter', sans-serif",
//     },
//     userDropdown: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     userName: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "15px",
//       fontWeight: 600,
//       padding: "12px 20px",
//       borderRadius: "14px",
//       backgroundColor: "rgba(168, 85, 34, 0.1)",
//       transition: "all 0.3s ease",
//       border: "1px solid rgba(168, 85, 34, 0.15)",
//     },
//     logoutBtn: {
//       backgroundColor: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#5A3E2B",
//       padding: "12px",
//       borderRadius: "14px",
//       transition: "all 0.3s ease",
//     },
//     mobileNavOverlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(90, 62, 43, 0.7)",
//       zIndex: 9999,
//       animation: "fadeIn 0.3s ease-out",
//       backdropFilter: "blur(4px)",
//     },
//     mobileNav: {
//       width: "320px",
//       backgroundColor: "#FFF8F0",
//       height: "100%",
//       boxShadow: "-10px 0 40px rgba(168, 85, 34, 0.15)",
//       display: "flex",
//       flexDirection: "column",
//       animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       borderLeft: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     mobileNavHeader: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "24px",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//     },
//     mobileCloseBtn: {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//       border: "none",
//       cursor: "pointer",
//       color: "white",
//       padding: "8px",
//       borderRadius: "10px",
//       backdropFilter: "blur(10px)",
//     },
//     mobileNavMenu: {
//       flex: 1,
//       padding: "20px 0",
//       display: "flex",
//       flexDirection: "column",
//       gap: "4px",
//       overflowY: "auto",
//     },
//     mobileNavLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "16px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "17px",
//       fontWeight: 600,
//       padding: "20px 24px",
//       transition: "all 0.3s ease",
//       margin: "0 8px",
//       borderRadius: "14px",
//       fontFamily: "'Inter', sans-serif",
//     },
//     activeMobileNavLink: {
//       color: "#A85522",
//       backgroundColor: "rgba(168, 85, 34, 0.12)",
//       fontWeight: 700,
//       border: "1px solid rgba(168, 85, 34, 0.2)",
//     },
//     mobileNavIcon: {
//       display: "flex",
//       alignItems: "center",
//       width: "24px",
//       color: "#A85522",
//     },
//     mobileCartLink: {
//       display: "flex",
//       alignItems: "center",
//       gap: "16px",
//       textDecoration: "none",
//       color: "#5A3E2B",
//       fontSize: "17px",
//       fontWeight: 600,
//       padding: "20px 24px",
//       margin: "20px 8px 8px",
//       borderRadius: "14px",
//       backgroundColor: "rgba(168, 85, 34, 0.08)",
//       transition: "all 0.3s ease",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     mobileAuthSection: {
//       marginTop: "auto",
//       padding: "20px",
//       backgroundColor: "rgba(168, 85, 34, 0.05)",
//       borderTop: "1px solid rgba(168, 85, 34, 0.1)",
//     },
//     mobileLoginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       background: "linear-gradient(135deg, #A85522 0%, #C56A33 100%)",
//       border: "none",
//       color: "white",
//       padding: "20px",
//       borderRadius: "14px",
//       cursor: "pointer",
//       fontSize: "17px",
//       fontWeight: 600,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//       boxShadow: "0 4px 15px rgba(168, 85, 34, 0.25)",
//       fontFamily: "'Inter', sans-serif",
//     },
//     mobileUserInfo: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "12px",
//     },
//     mobileUserGreeting: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       color: "#5A3E2B",
//       fontSize: "16px",
//       fontWeight: 600,
//       padding: "18px",
//       backgroundColor: "rgba(168, 85, 34, 0.1)",
//       borderRadius: "14px",
//       border: "1px solid rgba(168, 85, 34, 0.15)",
//     },
//     mobileLogoutBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       width: "100%",
//       backgroundColor: "rgba(168, 85, 34, 0.08)",
//       border: "1px solid rgba(168, 85, 34, 0.1)",
//       color: "#A85522",
//       padding: "18px",
//       borderRadius: "14px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: 600,
//       justifyContent: "center",
//       transition: "all 0.3s ease",
//     },
//   };

//   // Hover effect styles
//   const hoverStyles = {
//     navLinkHover: {
//       backgroundColor: "rgba(168, 85, 34, 0.12)",
//       color: "#A85522",
//       transform: "translateY(-2px)",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//       border: "1px solid rgba(168, 85, 34, 0.2)",
//     },
//     cartIconHover: {
//       backgroundColor: "rgba(168, 85, 34, 0.15)",
//       color: "#A85522",
//       transform: "translateY(-2px)",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//     },
//     searchBtnHover: {
//       backgroundColor: "rgba(168, 85, 34, 0.15)",
//       color: "#A85522",
//       transform: "translateY(-2px)",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//     },
//     loginBtnHover: {
//       transform: "translateY(-2px)",
//       boxShadow: "0 6px 20px rgba(168, 85, 34, 0.35)",
//     },
//     userNameHover: {
//       backgroundColor: "rgba(168, 85, 34, 0.15)",
//       transform: "translateY(-2px)",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//     },
//     logoutBtnHover: {
//       backgroundColor: "rgba(168, 85, 34, 0.15)",
//       color: "#A85522",
//       transform: "translateY(-2px)",
//       boxShadow: "0 4px 12px rgba(168, 85, 34, 0.1)",
//     },
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <div style={styles.headerContainer}>
//           {/* MOBILE MENU BUTTON */}
//           <button
//             style={styles.mobileMenuBtn}
//             className="mobile-menu-btn"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle mobile menu"
//           >
//             <Menu size={24} />
//           </button>

//           {/* LOGO - Improved Design */}
//           <div style={styles.logo}>
//             <Link href="/" style={{ display: "flex", alignItems: "center", gap: "15px", textDecoration: "none", color: "#333" }}>
//               <Image
//                 src="/assets/images/booklogo.webp"
//                 alt="OM Spiritual Logo"
//                 width={50}
//                 height={50}
//                 style={styles.logoImage}
//                 priority
//               />
//               <div style={styles.logoTextContainer}>
//                 <span style={styles.logoMainText} className="logo-main-text">OM Spiritual</span>
//                 <span style={styles.logoSubText} className="logo-sub-text">Books & Wisdom</span>
//               </div>
//             </Link>
//           </div>

//           {/* DESKTOP NAV */}
//           <nav style={styles.desktopNav} className="desktop-nav">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 style={{
//                   ...styles.navLink,
//                   ...(pathname === item.path ? styles.activeNavLink : {}),
//                 }}
//                 onMouseEnter={(e) => {
//                   if (pathname !== item.path) {
//                     applyHoverStyle(e.currentTarget, hoverStyles.navLinkHover);
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (pathname !== item.path) {
//                     resetHoverStyle(e.currentTarget, styles.navLink);
//                   }
//                 }}
//               >
//                 <span style={styles.navIcon}>{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* RIGHT ICONS */}
//           <div style={styles.rightIcons} className="right-icons">
//             {/* CART ICON WITH COUNT */}
//             <Link 
//               href="/cart" 
//               style={styles.cartIcon}
//               className="cart-icon"
//               onMouseEnter={(e) => {
//                 applyHoverStyle(e.currentTarget, hoverStyles.cartIconHover);
//               }}
//               onMouseLeave={(e) => {
//                 resetHoverStyle(e.currentTarget, styles.cartIcon);
//               }}
//               aria-label={`Shopping cart with ${cartCount} items`}
//             >
//               <ShoppingCart size={24} />
//               {cartCount > 0 && (
//                 <span style={styles.cartCount}>{cartCount > 99 ? '99+' : cartCount}</span>
//               )}
//             </Link>

//             {/* USER AUTH SECTION */}
//             {!isLoggedIn ? (
//               <button 
//                 style={styles.loginBtn}
//                 className="login-btn"
//                 onClick={() => setOpenLogin(true)}
//                 onMouseEnter={(e) => {
//                   applyHoverStyle(e.currentTarget, hoverStyles.loginBtnHover);
//                 }}
//                 onMouseLeave={(e) => {
//                   resetHoverStyle(e.currentTarget, styles.loginBtn);
//                 }}
//                 aria-label="Login"
//               >
//                 <User size={20} />
//                 <span className="login-text">Login</span>
//               </button>     
//             ) : (
//               <div style={styles.userDropdown} className="user-dropdown">
//                 <Link 
//                   href="/profile" 
//                   style={styles.userName}
//                   className="user-name"
//                   onMouseEnter={(e) => {
//                     applyHoverStyle(e.currentTarget, hoverStyles.userNameHover);
//                   }}
//                   onMouseLeave={(e) => {
//                     resetHoverStyle(e.currentTarget, styles.userName);
//                   }}
//                 >
//                   <User size={18} />
//                   <span className="user-name-text">Hi, {userName}</span>
//                 </Link>

//                 <button 
//                   style={styles.logoutBtn}
//                   className="logout-btn"
//                   onClick={logout}
//                   onMouseEnter={(e) => {
//                     applyHoverStyle(e.currentTarget, hoverStyles.logoutBtnHover);
//                   }}
//                   onMouseLeave={(e) => {
//                     resetHoverStyle(e.currentTarget, styles.logoutBtn);
//                   }}
//                   aria-label="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* MOBILE NAV OVERLAY */}
//       {mobileMenuOpen && (
//         <div style={styles.mobileNavOverlay} onClick={() => setMobileMenuOpen(false)}>
//           <div style={styles.mobileNav} className="mobile-nav" onClick={(e) => e.stopPropagation()}>
//             <div style={styles.mobileNavHeader}>
//               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                 <Image
//                   src="/assets/images/booklogo.webp"
//                   alt="OM Spiritual"
//                   width={40}
//                   height={40}
//                   style={{ borderRadius: "10px", border: "2px solid white", backgroundColor: "white" }}
//                 />
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <h3 style={{ margin: 0, color: "white", fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>OM Spiritual</h3>
//                   <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>Books & Wisdom</p>
//                 </div>
//               </div>
//               <button 
//                 style={styles.mobileCloseBtn}
//                 onClick={() => setMobileMenuOpen(false)}
//                 aria-label="Close menu"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div style={styles.mobileNavMenu}>
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   style={{
//                     ...styles.mobileNavLink,
//                     ...(pathname === item.path ? styles.activeMobileNavLink : {}),
//                   }}
//                   onMouseEnter={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.1)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (pathname !== item.path) {
//                       e.currentTarget.style.backgroundColor = "transparent";
//                     }
//                   }}
//                 >
//                   <span style={styles.mobileNavIcon}>{item.icon}</span>
//                   {item.label}
//                 </Link>
//               ))}

//               {/* MOBILE CART */}
//               <Link 
//                 href="/cart" 
//                 style={styles.mobileCartLink}
//                 onClick={() => setMobileMenuOpen(false)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.1)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.08)";
//                 }}
//               >
//                 <ShoppingCart size={20} />
//                 <span>Cart ({cartCount})</span>
//               </Link>
//             </div>

//             {/* MOBILE LOGIN / LOGOUT */}
//             <div style={styles.mobileAuthSection}>
//               {!isLoggedIn ? (
//                 <button
//                   onClick={() => {
//                     setOpenLogin(true);
//                     setMobileMenuOpen(false);
//                   }}
//                   style={styles.mobileLoginBtn}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow = "0 6px 20px rgba(168, 85, 34, 0.4)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "none";
//                     e.currentTarget.style.boxShadow = "0 4px 15px rgba(168, 85, 34, 0.25)";
//                   }}
//                 >
//                   <User size={20} />
//                   Login / Signup
//                 </button>
//               ) : (
//                 <div style={styles.mobileUserInfo}>
//                   <div style={styles.mobileUserGreeting}>
//                     <User size={20} />
//                     <span>Hello, {userName}</span>
//                   </div>
//                   <button 
//                     style={styles.mobileLogoutBtn}
//                     onClick={logout}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.1)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "rgba(168, 85, 34, 0.08)";
//                     }}
//                   >
//                     <LogOut size={20} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <Login
//           close={() => setOpenLogin(false)}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}

//       {/* Responsive Media Queries */}
//       <style jsx global>{`
//         /* Animations */
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
        
//         /* Tablet and below */
//         @media (max-width: 1024px) {
//           .desktop-nav {
//             gap: 4px !important;
//           }
          
//           .nav-link {
//             padding: 10px 16px !important;
//             font-size: 14px !important;
//           }
//         }
        
//         /* Mobile styles (768px and below) */
//         @media (max-width: 768px) {
//           /* Show hamburger menu button */
//           .mobile-menu-btn {
//             display: flex !important;
//             align-items: center;
//             justify-content: center;
//           }
          
//           /* Hide desktop navigation */
//           .desktop-nav {
//             display: none !important;
//           }
          
//           /* Adjust header container */
//           header > div {
//             padding: 0 16px !important;
//             height: 70px !important;
//           }
          
//           /* Reduce right icons gap */
//           .right-icons {
//             gap: 12px !important;
//           }
          
//           /* Hide login button text on mobile */
//           .login-btn .login-text {
//             display: none;
//           }
          
//           /* Adjust login button */
//           .login-btn {
//             padding: 12px !important;
//             min-width: auto !important;
//           }
          
//           /* Hide username text on mobile */
//           .user-name .user-name-text {
//             display: none;
//           }
          
//           /* Adjust username link */
//           .user-name {
//             padding: 10px !important;
//           }
          
//           /* Adjust logo */
//           .logo-main-text {
//             font-size: 22px !important;
//           }
          
//           .logo-sub-text {
//             font-size: 10px !important;
//           }
          
//           /* Mobile navigation styles */
//           body.menu-open {
//             overflow: hidden;
//           }
//         }
        
//         /* Small mobile devices */
//         @media (max-width: 640px) {
//           /* Adjust header height */
//           header > div {
//             height: 65px !important;
//             padding: 0 12px !important;
//           }
          
//           /* Further reduce logo size */
//           .logo-main-text {
//             font-size: 18px !important;
//           }
          
//           .logo-sub-text {
//             font-size: 9px !important;
//           }
          
//           /* Reduce icon sizes */
//           .cart-icon,
//           .search-btn,
//           .login-btn,
//           .user-name,
//           .logout-btn {
//             padding: 8px !important;
//           }
          
//           /* Reduce right icons gap */
//           .right-icons {
//             gap: 8px !important;
//           }
//         }
        
//         /* Extra small devices */
//         @media (max-width: 480px) {
//           /* Hide logo subtext on very small screens */
//           .logo-sub-text {
//             display: none !important;
//           }
          
//           .logo-main-text {
//             font-size: 16px !important;
//           }
          
//           /* Adjust mobile menu width */
//           .mobile-nav {
//             width: 85% !important;
//             max-width: 300px !important;
//           }
          
//           /* Reduce header padding */
//           header > div {
//             padding: 0 10px !important;
//           }
          
//           /* Hide cart count on very small screens when > 9 */
//           .cart-count {
//             font-size: 10px !important;
//             min-width: 18px !important;
//             height: 18px !important;
//           }
//         }
        
//         /* Very small devices */
//         @media (max-width: 360px) {
//           .logo-main-text {
//             font-size: 14px !important;
//           }
          
//           .mobile-nav {
//             width: 100% !important;
//             max-width: 100% !important;
//             border-radius: 0 !important;
//           }
          
//           .mobile-nav-header {
//             padding: 16px !important;
//           }
//         }
        
//         /* Desktop hover effects */
//         @media (hover: hover) and (pointer: fine) {
//           .nav-link:hover {
//             transform: translateY(-2px) !important;
//           }
          
//           .cart-icon:hover,
//           .search-btn:hover,
//           .logout-btn:hover {
//             transform: translateY(-2px) !important;
//           }
          
//           .login-btn:hover {
//             transform: translateY(-2px) !important;
//             box-shadow: 0 6px 20px rgba(168, 85, 34, 0.35) !important;
//           }
          
//           .user-name:hover {
//             transform: translateY(-2px) !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }






"use client";

import { useState, useEffect, CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  ShoppingCart,
  Search,
  User,
  LogOut,
  Menu,
  X,
  BookOpen,
  Home,
  Info,
  FileText,
} from "lucide-react";

import Login from "../Login/login";

interface CartItem {
  _id: string;
  bookName: string;
  authorName: string;
  salePrice: number;
  mrpPrice: number;
  image1: string;
  quantity: number;
}

interface HoverStyles {
  backgroundColor?: string;
  color?: string;
  transform?: string;
  boxShadow?: string;
  border?: string;
}

export default function Header() {
  const pathname = usePathname();

  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOAD LOGIN DATA ON PAGE LOAD
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("userName");

    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "");
    }

    loadCartItems();
  }, []);

  // LOAD CART ITEMS
  const loadCartItems = () => {
    try {
      const savedCart = localStorage.getItem("bookCart");
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        updateCartCount(items);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // UPDATE CART COUNT
  const updateCartCount = (items: CartItem[]) => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  };

  // LISTEN FOR CART UPDATES
  useEffect(() => {
    const handleStorageChange = () => {
      loadCartItems();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);

    const interval = setInterval(loadCartItems, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setUserName("");
    window.location.reload();
  };

  // NAV ITEMS WITH ICONS
  const navItems = [
    { label: "Home", path: "/", icon: <Home size={20} /> },
    { label: "Books", path: "/books", icon: <BookOpen size={20} /> },
    { label: "Blog", path: "/blogs", icon: <FileText size={20} /> }, 
    { label: "About", path: "/about", icon: <Info size={20} /> },
    // { label: "Contact", path: "/contact", icon: <Phone size={20} /> },
  ];

  const handleLoginSuccess = () => {
    setOpenLogin(false);
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "");
    }
  };

  // Helper function to apply hover styles
  const applyHoverStyle = (element: HTMLElement, styles: HoverStyles) => {
    if (styles.backgroundColor) element.style.backgroundColor = styles.backgroundColor;
    if (styles.color) element.style.color = styles.color;
    if (styles.transform) element.style.transform = styles.transform;
    if (styles.boxShadow) element.style.boxShadow = styles.boxShadow;
    if (styles.border) element.style.border = styles.border;
  };

  // Helper function to reset hover styles
  const resetHoverStyle = (element: HTMLElement, defaultStyles: CSSProperties) => {
    element.style.backgroundColor = defaultStyles.backgroundColor as string || "";
    element.style.color = defaultStyles.color as string || "";
    element.style.transform = "";
    element.style.boxShadow = defaultStyles.boxShadow as string || "";
    element.style.border = defaultStyles.border as string || "";
  };

  // Styles object defined inside component to access state
  const styles: { [key: string]: CSSProperties } = {
    header: {
      background: "linear-gradient(135deg, #006994 0%, #003153 100%)", // Ocean blue gradient
      backdropFilter: isScrolled ? "blur(10px)" : "none",
      boxShadow: isScrolled 
        ? "0 8px 32px rgba(0, 105, 148, 0.3)" 
        : "0 2px 20px rgba(0, 105, 148, 0.2)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease",
      borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)",
    },
    headerContainer: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "60px",
      transition: "height 0.3s ease",
    },
    mobileMenuBtn: {
      display: "none",
      background: "rgba(255, 255, 255, 0.15)",
      border: "none",
      cursor: "pointer",
      padding: "10px",
      borderRadius: "12px",
      color: "white",
      backdropFilter: "blur(10px)",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    logoImage: {
      width: "50px",
      borderRadius: "12px",
      objectFit: "cover",
      border: "3px solid white",
      backgroundColor: "white",
    },
    logoTextContainer: {
      display: "flex",
      flexDirection: "column",
    },
    logoMainText: {
      fontSize: "28px",
      fontWeight: 800,
      color: "white",
      letterSpacing: "-0.5px",
      lineHeight: 1.1,
      fontFamily: "'Playfair Display', serif",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    logoSubText: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.9)",
      fontWeight: 500,
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginTop: "-2px",
    },
    desktopNav: {
      display: "flex",
      gap: "6px",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
      color: "white",
      fontSize: "16px",
      fontWeight: 600,
      padding: "14px 24px",
      borderRadius: "16px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      fontFamily: "'Inter', sans-serif",
      letterSpacing: "0.3px",
      border: "1px solid transparent",
    },
    activeNavLink: {
      color: "white",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      fontWeight: 700,
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    navIcon: {
      display: "flex",
      alignItems: "center",
      color: "white",
    },
    rightIcons: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    cartIcon: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      color: "white",
      padding: "10px",
      borderRadius: "14px",
      transition: "all 0.3s ease",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    cartCount: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
      borderRadius: "30%",
      minWidth: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 3px",
      border: "2px solid white",
    },
    searchBtn: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      padding: "12px",
      borderRadius: "14px",
      transition: "all 0.3s ease",
    },
    loginBtn: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "white",
      border: "none",
      color: "#006994", // Ocean blue text color
      padding: "10px 23px",
      borderRadius: "14px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: 600,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Inter', sans-serif",
    },
    userDropdown: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    userName: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
      color: "white",
      fontSize: "15px",
      fontWeight: 600,
      padding: "12px 20px",
      borderRadius: "14px",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transition: "all 0.3s ease",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    logoutBtn: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      padding: "12px",
      borderRadius: "14px",
      transition: "all 0.3s ease",
    },
    mobileNavOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 105, 148, 0.5)", // Ocean blue overlay
      zIndex: 9999,
      animation: "fadeIn 0.3s ease-out",
      backdropFilter: "blur(4px)",
    },
    mobileNav: {
      width: "320px",
      backgroundColor: "white",
      height: "100%",
      boxShadow: "-10px 0 40px rgba(0, 105, 148, 0.2)",
      display: "flex",
      flexDirection: "column",
      animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      borderLeft: "1px solid rgba(0, 105, 148, 0.1)",
    },
    mobileNavHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "24px",
      background: "linear-gradient(135deg, #006994 0%, #003153 100%)", // Ocean blue gradient
    },
    mobileCloseBtn: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "none",
      cursor: "pointer",
      color: "white",
      padding: "8px",
      borderRadius: "10px",
      backdropFilter: "blur(10px)",
    },
    mobileNavMenu: {
      flex: 1,
      padding: "20px 0",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      overflowY: "auto",
    },
    mobileNavLink: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      textDecoration: "none",
      color: "#4a5568",
      fontSize: "17px",
      fontWeight: 600,
      padding: "20px 24px",
      transition: "all 0.3s ease",
      margin: "0 8px",
      borderRadius: "14px",
      fontFamily: "'Inter', sans-serif",
    },
    activeMobileNavLink: {
      color: "#006994", // Ocean blue for active link
      backgroundColor: "rgba(0, 105, 148, 0.1)",
      fontWeight: 700,
      border: "1px solid rgba(0, 105, 148, 0.2)",
    },
    mobileNavIcon: {
      display: "flex",
      alignItems: "center",
      width: "24px",
      color: "#006994", // Ocean blue icon color
    },
    mobileCartLink: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      textDecoration: "none",
      color: "#4a5568",
      fontSize: "17px",
      fontWeight: 600,
      padding: "20px 24px",
      margin: "20px 8px 8px",
      borderRadius: "14px",
      backgroundColor: "rgba(0, 105, 148, 0.05)",
      transition: "all 0.3s ease",
      border: "1px solid rgba(0, 105, 148, 0.1)",
    },
    mobileAuthSection: {
      marginTop: "auto",
      padding: "20px",
      backgroundColor: "rgba(0, 105, 148, 0.02)",
      borderTop: "1px solid rgba(0, 105, 148, 0.1)",
    },
    mobileLoginBtn: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "100%",
      background: "linear-gradient(135deg, #006994 0%, #003153 100%)", // Ocean blue gradient
      border: "none",
      color: "white",
      padding: "20px",
      borderRadius: "14px",
      cursor: "pointer",
      fontSize: "17px",
      fontWeight: 600,
      justifyContent: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 105, 148, 0.25)",
      fontFamily: "'Inter', sans-serif",
    },
    mobileUserInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    mobileUserGreeting: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "#4a5568",
      fontSize: "16px",
      fontWeight: 600,
      padding: "18px",
      backgroundColor: "rgba(0, 105, 148, 0.05)",
      borderRadius: "14px",
      border: "1px solid rgba(0, 105, 148, 0.1)",
    },
    mobileLogoutBtn: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "100%",
      backgroundColor: "rgba(0, 105, 148, 0.05)",
      border: "1px solid rgba(0, 105, 148, 0.1)",
      color: "#006994", // Ocean blue text
      padding: "18px",
      borderRadius: "14px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: 600,
      justifyContent: "center",
      transition: "all 0.3s ease",
    },
  };

  // Hover effect styles
  const hoverStyles = {
    navLinkHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    cartIconHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    searchBtnHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    loginBtnHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    },
    userNameHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    logoutBtnHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          {/* MOBILE MENU BUTTON */}
          <button
            style={styles.mobileMenuBtn}
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} />
          </button>

          {/* LOGO - Improved Design */}
          <div style={styles.logo}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "15px", textDecoration: "none", color: "#333" }}>
              <Image
                src="/assets/images/OM.png"
                alt="OM Spiritual Logo"
                width={50}
                height={50}
                style={styles.logoImage}
                priority
              />
              <div style={styles.logoTextContainer}>
                <span style={styles.logoMainText} className="logo-main-text">OM Spiritual</span>
                <span style={styles.logoSubText} className="logo-sub-text">Books & Wisdom</span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav style={styles.desktopNav} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  ...styles.navLink,
                  ...(pathname === item.path ? styles.activeNavLink : {}),
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.path) {
                    applyHoverStyle(e.currentTarget, hoverStyles.navLinkHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.path) {
                    resetHoverStyle(e.currentTarget, styles.navLink);
                  }
                }}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT ICONS */}
          <div style={styles.rightIcons} className="right-icons">
            {/* CART ICON WITH COUNT */}
            <Link 
              href="/cart" 
              style={styles.cartIcon}
              className="cart-icon"
              onMouseEnter={(e) => {
                applyHoverStyle(e.currentTarget, hoverStyles.cartIconHover);
              }}
              onMouseLeave={(e) => {
                resetHoverStyle(e.currentTarget, styles.cartIcon);
              }}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span style={styles.cartCount}>{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </Link>

            {/* USER AUTH SECTION */}
            {!isLoggedIn ? (
              <button 
                style={styles.loginBtn}
                className="login-btn"
                onClick={() => setOpenLogin(true)}
                onMouseEnter={(e) => {
                  applyHoverStyle(e.currentTarget, hoverStyles.loginBtnHover);
                }}
                onMouseLeave={(e) => {
                  resetHoverStyle(e.currentTarget, styles.loginBtn);
                }}
                aria-label="Login"
              >
                <User size={20} />
                <span className="login-text">Login</span>
              </button>     
            ) : (
              <div style={styles.userDropdown} className="user-dropdown">
                <Link 
                  href="/profile" 
                  style={styles.userName}
                  className="user-name"
                  onMouseEnter={(e) => {
                    applyHoverStyle(e.currentTarget, hoverStyles.userNameHover);
                  }}
                  onMouseLeave={(e) => {
                    resetHoverStyle(e.currentTarget, styles.userName);
                  }}
                >
                  <User size={18} />
                  <span className="user-name-text">Hi, {userName}</span>
                </Link>

                <button 
                  style={styles.logoutBtn}
                  className="logout-btn"
                  onClick={logout}
                  onMouseEnter={(e) => {
                    applyHoverStyle(e.currentTarget, hoverStyles.logoutBtnHover);
                  }}
                  onMouseLeave={(e) => {
                    resetHoverStyle(e.currentTarget, styles.logoutBtn);
                  }}
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      {mobileMenuOpen && (
        <div style={styles.mobileNavOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div style={styles.mobileNav} className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <div style={styles.mobileNavHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Image
                  src="/assets/images/booklogo.webp"
                  alt="OM Spiritual"
                  width={40}
                  height={40}
                  style={{ borderRadius: "10px", border: "2px solid white", backgroundColor: "white" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3 style={{ margin: 0, color: "white", fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>OM Spiritual</h3>
                  <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>Books & Wisdom</p>
                </div>
              </div>
              <button 
                style={styles.mobileCloseBtn}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div style={styles.mobileNavMenu}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    ...styles.mobileNavLink,
                    ...(pathname === item.path ? styles.activeMobileNavLink : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = "rgba(0, 105, 148, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span style={styles.mobileNavIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              {/* MOBILE CART */}
              <Link 
                href="/cart" 
                style={styles.mobileCartLink}
                onClick={() => setMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 105, 148, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 105, 148, 0.05)";
                }}
              >
                <ShoppingCart size={20} />
                <span>Cart ({cartCount})</span>
              </Link>
            </div>

            {/* MOBILE LOGIN / LOGOUT */}
            <div style={styles.mobileAuthSection}>
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    setOpenLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  style={styles.mobileLoginBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 105, 148, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 105, 148, 0.25)";
                  }}
                >
                  <User size={20} />
                  Login / Signup
                </button>
              ) : (
                <div style={styles.mobileUserInfo}>
                  <div style={styles.mobileUserGreeting}>
                    <User size={20} />
                    <span>Hello, {userName}</span>
                  </div>
                  <button 
                    style={styles.mobileLogoutBtn}
                    onClick={logout}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0, 105, 148, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0, 105, 148, 0.05)";
                    }}
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {openLogin && (
        <Login
          close={() => setOpenLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Responsive Media Queries */}
      <style jsx global>{`
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        /* Tablet and below */
        @media (max-width: 1024px) {
          .desktop-nav {
            gap: 4px !important;
          }
          
          .nav-link {
            padding: 10px 16px !important;
            font-size: 14px !important;
          }
        }
        
        /* Mobile styles (768px and below) */
        @media (max-width: 768px) {
          /* Show hamburger menu button */
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          
          /* Hide desktop navigation */
          .desktop-nav {
            display: none !important;
          }
          
          /* Adjust header container */
          header > div {
            padding: 0 16px !important;
            height: 70px !important;
          }
          
          /* Reduce right icons gap */
          .right-icons {
            gap: 12px !important;
          }
          
          /* Hide login button text on mobile */
          .login-btn .login-text {
            display: none;
          }
          
          /* Adjust login button */
          .login-btn {
            padding: 12px !important;
            min-width: auto !important;
          }
          
          /* Hide username text on mobile */
          .user-name .user-name-text {
            display: none;
          }
          
          /* Adjust username link */
          .user-name {
            padding: 10px !important;
          }
          
          /* Adjust logo */
          .logo-main-text {
            font-size: 22px !important;
          }
          
          .logo-sub-text {
            font-size: 10px !important;
          }
          
          /* Mobile navigation styles */
          body.menu-open {
            overflow: hidden;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 640px) {
          /* Adjust header height */
          header > div {
            height: 65px !important;
            padding: 0 12px !important;
          }
          
          /* Further reduce logo size */
          .logo-main-text {
            font-size: 18px !important;
          }
          
          .logo-sub-text {
            font-size: 9px !important;
          }
          
          /* Reduce icon sizes */
          .cart-icon,
          .search-btn,
          .login-btn,
          .user-name,
          .logout-btn {
            padding: 8px !important;
          }
          
          /* Reduce right icons gap */
          .right-icons {
            gap: 8px !important;
          }
        }
        
        /* Extra small devices */
        @media (max-width: 480px) {
          /* Hide logo subtext on very small screens */
          .logo-sub-text {
            display: none !important;
          }
          
          .logo-main-text {
            font-size: 16px !important;
          }
          
          /* Adjust mobile menu width */
          .mobile-nav {
            width: 85% !important;
            max-width: 300px !important;
          }
          
          /* Reduce header padding */
          header > div {
            padding: 0 10px !important;
          }
          
          /* Hide cart count on very small screens when > 9 */
          .cart-count {
            font-size: 10px !important;
            min-width: 18px !important;
            height: 18px !important;
          }
        }
        
        /* Very small devices */
        @media (max-width: 360px) {
          .logo-main-text {
            font-size: 14px !important;
          }
          
          .mobile-nav {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
          }
          
          .mobile-nav-header {
            padding: 16px !important;
          }
        }
        
        /* Desktop hover effects */
        @media (hover: hover) and (pointer: fine) {
          .nav-link:hover {
            transform: translateY(-2px) !important;
          }
          
          .cart-icon:hover,
          .search-btn:hover,
          .logout-btn:hover {
            transform: translateY(-2px) !important;
          }
          
          .login-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
          }
          
          .user-name:hover {
            transform: translateY(-2px) !important;
          }
        }
      `}</style>
    </>
  );
}