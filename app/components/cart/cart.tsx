// "use client";

// import React, { useState, useEffect } from "react";
// import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import "./cart.css";

// interface CartItem {
//   _id: string;
//   bookName: string;
//   authorName: string;
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// interface PriceDetails {
//   subtotal: number;
//   gst: number;
//   shipping: number;
//   total: number;
// }

// export default function Cart() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadCartItems();
//   }, []);

//   const loadCartItems = () => {
//     try {
//       const savedCart = localStorage.getItem("bookCart");
//       if (savedCart) {
//         setCartItems(JSON.parse(savedCart));
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveCartToStorage = (items: CartItem[]) => {
//     localStorage.setItem("bookCart", JSON.stringify(items));
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;

//     const updatedCart = cartItems.map(item =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     saveCartToStorage(updatedCart);
//   };

//   const removeItem = (id: string) => {
//     const updatedCart = cartItems.filter(item => item._id !== id);
//     setCartItems(updatedCart);
//     saveCartToStorage(updatedCart);
//   };

//   const calculatePriceDetails = (): PriceDetails => {
//     const subtotal = cartItems.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
//     const gst = subtotal * 0.18; // 18% GST
//     const shipping = subtotal > 500 ? 0 : 40; // Free shipping above ₹500
//     const total = subtotal + gst + shipping;

//     return { subtotal, gst, shipping, total };
//   };

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }
//     // Navigate to checkout page
//     window.location.href = "/checkout";
//   };

//   const continueShopping = () => {
//     window.location.href = "/books";
//   };

//   const priceDetails = calculatePriceDetails();

//   if (loading) {
//     return (
//       <div className="cart-container">
//         <div className="cart-loading">
//           <div className="loading-spinner"></div>
//           <p>Loading your cart...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <div className="cart-page">
//         {/* Header */}
//         <div className="cart-header">
//           <div className="header-content">
//             <h1><FaShoppingBag className="header-icon" /> Shopping Cart</h1>
//             <p>Review and manage your items</p>
//           </div>
//           <div className="cart-stats">
//             <span className="items-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
//           </div>
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="empty-cart">
//             <div className="empty-cart-content">
//               <div className="empty-cart-icon">🛒</div>
//               <h3>Your Cart is Empty</h3>
//               <p>Looks like you haven't added any books to your cart yet.</p>
//               <button onClick={continueShopping} className="continue-shopping-btn">
//                 <FaArrowLeft className="btn-icon" />
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="cart-content">
//             {/* Cart Items */}
//             <div className="cart-items-section">
//               <div className="section-header">
//                 <h2>Cart Items</h2>
//                 <span className="items-count">({cartItems.length} items)</span>
//               </div>

//               <div className="cart-items">
//                 {cartItems.map((item) => (
//                   <div key={item._id} className="cart-item">
//                     <div className="item-image">
//                       <img src={item.image1} alt={item.bookName} />
//                     </div>

//                     <div className="item-details">
//                       <h3 className="item-title">{item.bookName}</h3>
//                       <p className="item-author">by {item.authorName}</p>
                      
//                       <div className="price-info">
//                         <span className="current-price">₹{item.salePrice.toLocaleString()}</span>
//                         {item.salePrice < item.mrpPrice && (
//                           <span className="original-price">₹{item.mrpPrice.toLocaleString()}</span>
//                         )}
//                       </div>

//                       <div className="quantity-controls">
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                           className="quantity-btn"
//                           disabled={item.quantity <= 1}
//                         >
//                           <FaMinus />
//                         </button>
//                         <span className="quantity-display">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                           className="quantity-btn"
//                         >
//                           <FaPlus />
//                         </button>
//                       </div>

//                       <div className="item-total">
//                         ₹{(item.salePrice * item.quantity).toLocaleString()}
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => removeItem(item._id)}
//                       className="remove-btn"
//                       aria-label="Remove item"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="order-summary">
//               <div className="summary-card">
//                 <h3>Order Summary</h3>

//                 <div className="summary-details">
//                   <div className="summary-row">
//                     <span>Subtotal ({cartItems.length} items)</span>
//                     <span>₹{priceDetails.subtotal.toLocaleString()}</span>
//                   </div>

//                   <div className="summary-row">
//                     <span>Shipping</span>
//                     <span className={priceDetails.shipping === 0 ? "free-shipping" : ""}>
//                       {priceDetails.shipping === 0 ? "FREE" : `₹${priceDetails.shipping}`}
//                     </span>
//                   </div>

//                   <div className="summary-row">
//                     <span>GST (18%)</span>
//                     <span>₹{priceDetails.gst.toFixed(2)}</span>
//                   </div>

//                   <div className="summary-divider"></div>

//                   <div className="summary-row total-row">
//                     <span>Total Amount</span>
//                     <span className="total-amount">₹{priceDetails.total.toFixed(2)}</span>
//                   </div>

//                   {priceDetails.subtotal < 500 && (
//                     <div className="shipping-notice">
//                       Add ₹{(500 - priceDetails.subtotal).toFixed(2)} more for FREE shipping!
//                     </div>
//                   )}
//                 </div>

//                 <button onClick={handleCheckout} className="checkout-btn">
//                   Proceed to Checkout
//                   <FaArrowRight className="btn-icon" />
//                 </button>

//                 <button onClick={continueShopping} className="continue-btn">
//                   <FaArrowLeft className="btn-icon" />
//                   Continue Shopping
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }















// "use client";

// import React, { useState, useEffect } from "react";
// import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import "./cart.css";

// interface CartItem {
//   _id: string;
//   bookName: string;
//   authorName?: string; // Made optional with ?
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// interface PriceDetails {
//   subtotal: number;
//   gst: number;
//   shipping: number;
//   total: number;
// }

// export default function Cart() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadCartItems();
//   }, []);

//   const loadCartItems = () => {
//     try {
//       const savedCart = localStorage.getItem("bookCart");
//       if (savedCart) {
//         const parsedCart = JSON.parse(savedCart);
//         // Ensure all items have required fields with defaults
//         const validatedCart = parsedCart.map((item: any) => ({
//           ...item,
//           authorName: item.authorName || "Unknown Author", // Default value
//           salePrice: item.salePrice || item.mrpPrice, // Default to mrpPrice if salePrice missing
//           mrpPrice: item.mrpPrice || 0,
//           quantity: item.quantity || 1,
//           image1: item.image1 || item.frontImage || "/default-book.jpg" // Handle different image field names
//         }));
//         setCartItems(validatedCart);
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveCartToStorage = (items: CartItem[]) => {
//     localStorage.setItem("bookCart", JSON.stringify(items));
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;

//     const updatedCart = cartItems.map(item =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     saveCartToStorage(updatedCart);
//   };

//   const removeItem = (id: string) => {
//     const updatedCart = cartItems.filter(item => item._id !== id);
//     setCartItems(updatedCart);
//     saveCartToStorage(updatedCart);
//   };

//   const calculatePriceDetails = (): PriceDetails => {
//     const subtotal = cartItems.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
//     const gst = subtotal * 0.18; // 18% GST
//     const shipping = subtotal > 500 ? 0 : 40; // Free shipping above ₹500
//     const total = subtotal + gst + shipping;

//     return { subtotal, gst, shipping, total };
//   };

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }
//     // Navigate to checkout page
//     window.location.href = "/checkout";
//   };

//   const continueShopping = () => {
//     window.location.href = "/books";
//   };

//   const priceDetails = calculatePriceDetails();

//   if (loading) {
//     return (
//       <div className="cart-container">
//         <div className="cart-loading">
//           <div className="loading-spinner"></div>
//           <p>Loading your cart...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <div className="cart-page">
//         {/* Header */}
//         <div className="cart-header">
//           <div className="header-content">
//             <h1><FaShoppingBag className="header-icon" /> Shopping Cart</h1>
//             <p>Review and manage your items</p>
//           </div>
//           <div className="cart-stats">
//             <span className="items-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
//           </div>
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="empty-cart">
//             <div className="empty-cart-content">
//               <div className="empty-cart-icon">🛒</div>
//               <h3>Your Cart is Empty</h3>
//               <p>Looks like you haven't added any books to your cart yet.</p>
//               <button onClick={continueShopping} className="continue-shopping-btn">
//                 <FaArrowLeft className="btn-icon" />
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="cart-content">
//             {/* Cart Items */}
//             <div className="cart-items-section">
//               <div className="section-header">
//                 <h2>Cart Items</h2>
//                 <span className="items-count">({cartItems.length} items)</span>
//               </div>

//               <div className="cart-items">
//                 {cartItems.map((item) => (
//                   <div key={item._id} className="cart-item">
//                     <div className="item-image">
//                       <img src={item.image1} alt={item.bookName} onError={(e) => {
//                         e.currentTarget.src = "/default-book.jpg";
//                       }} />
//                     </div>

//                     <div className="item-details">
//                       <h3 className="item-title">{item.bookName}</h3>
//                       <p className="item-author">by {item.authorName || "Unknown Author"}</p>
                      
//                       <div className="price-info">
//                         <span className="current-price">₹{item.salePrice.toLocaleString()}</span>
//                         {item.salePrice < item.mrpPrice && (
//                           <span className="original-price">₹{item.mrpPrice.toLocaleString()}</span>
//                         )}
//                       </div>

//                       <div className="quantity-controls">
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                           className="quantity-btn"
//                           disabled={item.quantity <= 1}
//                         >
//                           <FaMinus />
//                         </button>
//                         <span className="quantity-display">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                           className="quantity-btn"
//                         >
//                           <FaPlus />
//                         </button>
//                       </div>

//                       <div className="item-total">
//                         ₹{(item.salePrice * item.quantity).toLocaleString()}
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => removeItem(item._id)}
//                       className="remove-btn"
//                       aria-label="Remove item"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="order-summary">
//               <div className="summary-card">
//                 <h3>Order Summary</h3>

//                 <div className="summary-details">
//                   <div className="summary-row">
//                     <span>Subtotal ({cartItems.length} items)</span>
//                     <span>₹{priceDetails.subtotal.toLocaleString()}</span>
//                   </div>

//                   <div className="summary-row">
//                     <span>Shipping</span>
//                     <span className={priceDetails.shipping === 0 ? "free-shipping" : ""}>
//                       {priceDetails.shipping === 0 ? "FREE" : `₹${priceDetails.shipping}`}
//                     </span>
//                   </div>

//                   <div className="summary-row">
//                     <span>GST (18%)</span>
//                     <span>₹{priceDetails.gst.toFixed(2)}</span>
//                   </div>

//                   <div className="summary-divider"></div>

//                   <div className="summary-row total-row">
//                     <span>Total Amount</span>
//                     <span className="total-amount">₹{priceDetails.total.toFixed(2)}</span>
//                   </div>

//                   {priceDetails.subtotal < 500 && (
//                     <div className="shipping-notice">
//                       Add ₹{(500 - priceDetails.subtotal).toFixed(2)} more for FREE shipping!
//                     </div>
//                   )}
//                 </div>

//                 <button onClick={handleCheckout} className="checkout-btn">
//                   Proceed to Checkout
//                   <FaArrowRight className="btn-icon" />
//                 </button>

//                 <button onClick={continueShopping} className="continue-btn">
//                   <FaArrowLeft className="btn-icon" />
//                   Continue Shopping
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












// "use client";

// import React, { useState, useEffect } from "react";
// import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import "./cart.css";

// interface CartItem {
//   _id: string;
//   bookName: string;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// interface PriceDetails {
//   subtotal: number;
//   gst: number;
//   shipping: number;
//   total: number;
// }

// export default function Cart() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadCartItems();
//   }, []);

//   const loadCartItems = () => {
//     try {
//       const savedCart = localStorage.getItem("bookCart");
//       if (savedCart) {
//         const parsedCart = JSON.parse(savedCart);
//         // Ensure all items have required fields with defaults
//         const validatedCart = parsedCart.map((item: any) => ({
//           _id: item._id || "",
//           bookName: item.bookName || "Unknown Book",
//           mrpPrice: item.mrpPrice || 0,
//           image1: item.image1 || item.frontImage || "/default-book.jpg",
//           quantity: item.quantity || 1,
//         }));
//         setCartItems(validatedCart);
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveCartToStorage = (items: CartItem[]) => {
//     localStorage.setItem("bookCart", JSON.stringify(items));
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;

//     const updatedCart = cartItems.map(item =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     saveCartToStorage(updatedCart);
//   };

//   const removeItem = (id: string) => {
//     const updatedCart = cartItems.filter(item => item._id !== id);
//     setCartItems(updatedCart);
//     saveCartToStorage(updatedCart);
//   };

//   const calculatePriceDetails = (): PriceDetails => {
//     const subtotal = cartItems.reduce((sum, item) => sum + (item.mrpPrice * item.quantity), 0);
//     const gst = subtotal * 0.18; // 18% GST
//     const shipping = subtotal > 500 ? 0 : 40; // Free shipping above ₹500
//     const total = subtotal + gst + shipping;

//     return { subtotal, gst, shipping, total };
//   };

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }
//     // Navigate to checkout page
//     window.location.href = "/checkout";
//   };

//   const continueShopping = () => {
//     window.location.href = "/books";
//   };

//   const priceDetails = calculatePriceDetails();

//   if (loading) {
//     return (
//       <div className="cart-container">
//         <div className="cart-loading">
//           <div className="loading-spinner"></div>
//           <p>Loading your cart...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <div className="cart-page">
//         {/* Header */}
//         <div className="cart-header">
//           <div className="header-content">
//             <h1><FaShoppingBag className="header-icon" /> Shopping Cart</h1>
//             <p>Review and manage your items</p>
//           </div>
//           <div className="cart-stats">
//             <span className="items-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
//           </div>
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="empty-cart">
//             <div className="empty-cart-content">
//               <div className="empty-cart-icon">🛒</div>
//               <h3>Your Cart is Empty</h3>
//               <p>Looks like you haven't added any books to your cart yet.</p>
//               <button onClick={continueShopping} className="continue-shopping-btn">
//                 <FaArrowLeft className="btn-icon" />
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="cart-content">
//             {/* Cart Items */}
//             <div className="cart-items-section">
//               <div className="section-header">
//                 <h2>Cart Items</h2>
//                 <span className="items-count">({cartItems.length} items)</span>
//               </div>

//               <div className="cart-items">
//                 {cartItems.map((item) => (
//                   <div key={item._id} className="cart-item">
//                     <div className="item-image">
//                       <img 
//                         src={item.image1} 
//                         alt={item.bookName} 
//                         onError={(e) => {
//                           e.currentTarget.src = "/default-book.jpg";
//                         }} 
//                       />
//                     </div>

//                     <div className="item-details">
//                       <h3 className="item-title">{item.bookName}</h3>
                      
//                       <div className="price-info">
//                         <span className="current-price">₹{item.mrpPrice.toLocaleString()}</span>
//                       </div>

//                       <div className="quantity-controls">
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                           className="quantity-btn"
//                           disabled={item.quantity <= 1}
//                         >
//                           <FaMinus />
//                         </button>
//                         <span className="quantity-display">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                           className="quantity-btn"
//                         >
//                           <FaPlus />
//                         </button>
//                       </div>

//                       <div className="item-total">
//                         ₹{(item.mrpPrice * item.quantity).toLocaleString()}
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => removeItem(item._id)}
//                       className="remove-btn"
//                       aria-label="Remove item"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="order-summary">
//               <div className="summary-card">
//                 <h3>Order Summary</h3>

//                 <div className="summary-details">
//                   <div className="summary-row">
//                     <span>Subtotal ({cartItems.length} items)</span>
//                     <span>₹{priceDetails.subtotal.toLocaleString()}</span>
//                   </div>

//                   <div className="summary-row">
//                     <span>Shipping</span>
//                     <span className={priceDetails.shipping === 0 ? "free-shipping" : ""}>
//                       {priceDetails.shipping === 0 ? "FREE" : `₹${priceDetails.shipping}`}
//                     </span>
//                   </div>

//                   <div className="summary-row">
//                     <span>GST (18%)</span>
//                     <span>₹{priceDetails.gst.toFixed(2)}</span>
//                   </div>

//                   <div className="summary-divider"></div>

//                   <div className="summary-row total-row">
//                     <span>Total Amount</span>
//                     <span className="total-amount">₹{priceDetails.total.toFixed(2)}</span>
//                   </div>

//                   {priceDetails.subtotal < 500 && (
//                     <div className="shipping-notice">
//                       Add ₹{(500 - priceDetails.subtotal).toFixed(2)} more for FREE shipping!
//                     </div>
//                   )}
//                 </div>

//                 <button onClick={handleCheckout} className="checkout-btn">
//                   Proceed to Checkout
//                   <FaArrowRight className="btn-icon" />
//                 </button>

//                 <button onClick={continueShopping} className="continue-btn">
//                   <FaArrowLeft className="btn-icon" />
//                   Continue Shopping
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











"use client";

import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./cart.css";

interface CartItem {
  _id: string;
  bookName: string;
  mrpPrice: number;
  pageNumber: number; // Added pageNumber
  image1: string;
  quantity: number;
}

interface PriceDetails {
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const savedCart = localStorage.getItem("bookCart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure all items have required fields with defaults
        const validatedCart = parsedCart.map((item: any) => ({
          _id: item._id || "",
          bookName: item.bookName || "Unknown Book",
          mrpPrice: item.mrpPrice || 0,
          pageNumber: item.pageNumber || 0, // Added pageNumber
          image1: item.image1 || item.frontImage || "/default-book.jpg",
          quantity: item.quantity || 1,
        }));
        setCartItems(validatedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToStorage = (items: CartItem[]) => {
    localStorage.setItem("bookCart", JSON.stringify(items));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const calculatePriceDetails = (): PriceDetails => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.mrpPrice * item.quantity), 0);
    const gst = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 500 ? 0 : 40; // Free shipping above ₹500
    const total = subtotal + gst + shipping;

    return { subtotal, gst, shipping, total };
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Navigate to checkout page
    window.location.href = "/payment";
  };

  const continueShopping = () => {
    window.location.href = "/books";
  };

  const priceDetails = calculatePriceDetails();

  if (loading) {
    return (
      <div className="cart-container">
        <div className="cart-loading">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-page">
        {/* Header */}
        <div className="cart-header">
          <div className="header-content">
            <h1><FaShoppingBag className="header-icon" /> Shopping Cart</h1>
            <p>Review and manage your items</p>
          </div>
          <div className="cart-stats">
            <span className="items-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your Cart is Empty</h3>
              <p>Looks like you haven't added any books to your cart yet.</p>
              <button onClick={continueShopping} className="continue-shopping-btn">
                <FaArrowLeft className="btn-icon" />
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="section-header">
                <h2>Cart Items</h2>
                <span className="items-count">({cartItems.length} items)</span>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.image1} 
                        alt={item.bookName} 
                        onError={(e) => {
                          e.currentTarget.src = "/default-book.jpg";
                        }} 
                      />
                    </div>

                    <div className="item-details">
                      <h3 className="item-title">{item.bookName}</h3>
                      
                      {/* Added Page Number Display with inline CSS */}
                      {item.pageNumber > 0 && (
                        <div style={{
                          margin: '5px 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <span style={{
                            fontSize: '14px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <span style={{ fontSize: '12px' }}>📄</span>
                            {item.pageNumber} pages
                          </span>
                        </div>
                      )}
                      
                      <div className="price-info">
                        <span className="current-price">₹{item.mrpPrice.toLocaleString()}</span>
                      </div>

                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="item-total">
                        ₹{(item.mrpPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{priceDetails.subtotal.toLocaleString()}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <span className={priceDetails.shipping === 0 ? "free-shipping" : ""}>
                      {priceDetails.shipping === 0 ? "FREE" : `₹${priceDetails.shipping}`}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>GST (18%)</span>
                    <span>₹{priceDetails.gst.toFixed(2)}</span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row total-row">
                    <span>Total Amount</span>
                    <span className="total-amount">₹{priceDetails.total.toFixed(2)}</span>
                  </div>

                  {priceDetails.subtotal < 500 && (
                    <div className="shipping-notice">
                      Add ₹{(500 - priceDetails.subtotal).toFixed(2)} more for FREE shipping!
                    </div>
                  )}
                </div>

                <button onClick={handleCheckout} className="checkout-btn">
                  Proceed to Checkout
                  <FaArrowRight className="btn-icon" />
                </button>

                <button onClick={continueShopping} className="continue-btn">
                  <FaArrowLeft className="btn-icon" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}