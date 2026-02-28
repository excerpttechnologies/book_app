// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { FaShoppingCart, FaHeart, FaShareAlt, FaRupeeSign, FaTag, FaSearch, FaFilter } from "react-icons/fa";
// import { FiShare2, FiHeart } from "react-icons/fi";
// import { IoCartOutline, IoCart, IoChevronForward, IoChevronBack } from "react-icons/io5";
// import { BsBook } from "react-icons/bs";
// import { TbLayoutGrid } from "react-icons/tb";

// interface Book {
//   _id: string;
//   bookName: string;
//   authorName: string;
//   description: string;
//   mrpPrice: number;
//   salePrice: number;
//   status: string;
//   frontImage: string;
// backImage: string;
//   createdAt: string;
// }

// interface CartItem {
//   _id: string;
//   bookName: string;
//   authorName: string;
//   salePrice: number;
//   mrpPrice: number;
//   image1: string;
//   quantity: number;
// }

// export default function Books() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [hoveredBook, setHoveredBook] = useState<string | null>(null);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Search and Filter states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showAll, setShowAll] = useState(false);

//   // Mobile responsive state
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     fetchBooks();
//     loadCartItems();
//     checkMobile();

//     // Add resize listener for responsive behavior
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     filterAndSortBooks();
//   }, [books, searchQuery, sortBy]);

//   const checkMobile = () => {
//     setIsMobile(window.innerWidth < 768);
//   };

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/books");
//       if (response.ok) {
//         const data = await response.json();
//         const activeBooks = data;
//         setBooks(activeBooks);
//         setFilteredBooks(activeBooks);
//       } else {
//         setError("Failed to fetch books.");
//       }
//     } catch (error) {
//       setError("Network error. Check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCartItems = () => {
//     const savedCart = localStorage.getItem("bookCart");
//     if (savedCart) setCartItems(JSON.parse(savedCart));
//   };

//   const filterAndSortBooks = () => {
//     let result = [...books];

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(book =>
//         book.bookName.toLowerCase().includes(query) ||
//         book.authorName.toLowerCase().includes(query) ||
//         book.description.toLowerCase().includes(query)
//       );
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.salePrice - b.salePrice);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.salePrice - a.salePrice);
//         break;
//       case "name":
//         result.sort((a, b) => a.bookName.localeCompare(b.bookName));
//         break;
//       case "newest":
//         result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         break;
//       default:
//         // "featured" - default sorting
//         break;
//     }

//     setFilteredBooks(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   };

//   const handleAddToCart = (book: Book) => {
//     const existingCart = JSON.parse(localStorage.getItem("bookCart") || "[]");

//     const itemIndex = existingCart.findIndex((i: CartItem) => i._id === book._id);

//     if (itemIndex >= 0) {
//       existingCart[itemIndex].quantity += 1;
//     } else {
//       existingCart.push({
//         _id: book._id,
//         bookName: book.bookName,
//         authorName: book.authorName,
//         salePrice: book.salePrice,
//         mrpPrice: book.mrpPrice,
//        frontImage: book.frontImage,
//         quantity: 1,
//       });
//     }

//     localStorage.setItem("bookCart", JSON.stringify(existingCart));
//     setCartItems(existingCart);

//     // Animation feedback
//     const button = document.getElementById(`cart-btn-${book._id}`);
//     if (button) {
//       button.style.transform = 'scale(0.95)';
//       setTimeout(() => {
//         button.style.transform = 'scale(1)';
//       }, 150);
//     }
//   };

//   const handleAddToWatchlist = (book: Book) => {
//     const watchlist = JSON.parse(localStorage.getItem("bookWatchlist") || "[]");

//     if (watchlist.find((b: Book) => b._id === book._id)) {
//       alert("Already in wishlist!");
//       return;
//     }

//     watchlist.push(book);
//     localStorage.setItem("bookWatchlist", JSON.stringify(watchlist));

//     // Animation feedback
//     const button = document.getElementById(`wishlist-btn-${book._id}`);
//     if (button) {
//       button.style.color = '#ff4757';
//       button.style.transform = 'scale(1.2)';
//       setTimeout(() => {
//         button.style.transform = 'scale(1)';
//       }, 300);
//     }

//     alert("Added to wishlist ❤️");
//   };

//   const handleShare = async (book: Book) => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: book.bookName,
//           text: `${book.bookName} by ${book.authorName}`,
//           url: window.location.href,
//         });
//       } else {
//         await navigator.clipboard.writeText(
//           `${book.bookName} by ${book.authorName} - ₹${book.salePrice}`
//         );
//         alert("Copied to clipboard!");
//       }
//     } catch { }
//   };

//   const calculateDiscount = (mrp: number, sale: number) =>
//     Math.round(((mrp - sale) / mrp) * 100);

//   const getCartCount = (id: string) => {
//     const found = cartItems.find((i) => i._id === id);
//     return found ? found.quantity : 0;
//   };

//   // Pagination logic
//   const totalItems = filteredBooks.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Calculate items to show based on pagination or showAll
//   const displayedBooks = showAll
//     ? filteredBooks
//     : filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleShowAll = () => {
//     setShowAll(!showAll);
//     if (!showAll) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: '1600px',
//       margin: '0 auto',
//       padding: isMobile ? '1rem 0.5rem' : '2rem 1rem',
//       backgroundColor: '#ffffff',
//       minHeight: '100vh'
//     }}>
//       {/* Header Section */}
//       <div style={{
//         textAlign: 'center',
//         marginBottom: isMobile ? '1.5rem' : '2rem',
//         padding: isMobile ? '1.5rem 1rem' : '2rem',
//         background: 'linear-gradient(135deg, #99bbcf 0%, #87aec9 100%)',
//         borderRadius: isMobile ? '15px' : '20px',
//         boxShadow: '0 10px 30px rgba(153, 187, 207, 0.2)'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: isMobile ? '10px' : '15px',
//           marginBottom: isMobile ? '0.8rem' : '1rem'
//         }}>
//           <BsBook style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', color: '#2c3e50' }} />
//           <h1 style={{
//             fontSize: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 3rem)',
//             fontWeight: '800',
//             color: '#2c3e50',
//             margin: 0
//           }}>
//             Discover Amazing Books
//           </h1>
//         </div>
//         <p style={{
//           fontSize: isMobile ? '1rem' : '1.2rem',
//           color: '#4a5568',
//           maxWidth: '600px',
//           margin: `0 auto ${isMobile ? '1.5rem' : '2rem'}`,
//           lineHeight: '1.6'
//         }}>
//           Explore our curated collection of handpicked books
//         </p>

//         {/* Search Bar */}
//         <div style={{
//           maxWidth: '800px',
//           margin: '0 auto',
//           position: 'relative'
//         }}>
//           <div style={{
//             display: 'flex',
//             gap: isMobile ? '8px' : '10px',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             flexDirection: isMobile ? 'column' : 'row'
//           }}>
//             <div style={{
//               position: 'relative',
//               flex: '1',
//               minWidth: isMobile ? '100%' : '300px'
//             }}>
//               <FaSearch style={{
//                 position: 'absolute',
//                 left: isMobile ? '15px' : '20px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#99bbcf',
//                 fontSize: isMobile ? '1rem' : '1.2rem'
//               }} />
//               <input
//                 type="text"
//                 placeholder="Search books by title, author, or description..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={{
//                   width: '80%',
//                   padding: isMobile ? '12px 15px 12px 40px' : '16px 20px 16px 50px',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   border: '2px solid #e2e8f0',
//                   borderRadius: '50px',
//                   outline: 'none',
//                   transition: 'all 0.3s ease',
//                   backgroundColor: 'white'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#99bbcf';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(153, 187, 207, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#e2e8f0';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             {/* Sort Dropdown */}
//             <div style={{
//               position: 'relative',
//               minWidth: isMobile ? '100%' : '200px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 backgroundColor: 'white',
//                 padding: isMobile ? '12px 15px' : '16px 20px',
//                 borderRadius: '50px',
//                 border: '2px solid #e2e8f0',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = '#99bbcf';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = '#e2e8f0';
//                 }}
//               >
//                 <FaFilter style={{ color: '#99bbcf', fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   style={{
//                     border: 'none',
//                     outline: 'none',
//                     fontSize: isMobile ? '0.9rem' : '1rem',
//                     color: '#4a5568',
//                     backgroundColor: 'transparent',
//                     cursor: 'pointer',
//                     width: '100%'
//                   }}
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="name">Name: A to Z</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Search Results Count */}
//           <div style={{
//             textAlign: 'center',
//             marginTop: isMobile ? '0.8rem' : '1rem',
//             color: '#4a5568',
//             fontSize: isMobile ? '0.85rem' : '0.95rem'
//           }}>
//             Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
//             {searchQuery && (
//               <span> for "<strong>{searchQuery}</strong>"</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Books Grid - Responsive columns */}
//       {loading ? (
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: isMobile ? '300px' : '400px'
//         }}>
//           <div style={{
//             fontSize: isMobile ? '1rem' : '1.2rem',
//             color: '#99bbcf',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             flexDirection: isMobile ? 'column' : 'row'
//           }}>
//             <div style={{
//               width: isMobile ? '30px' : '40px',
//               height: isMobile ? '30px' : '40px',
//               border: '4px solid #f3f3f3',
//               borderTop: '4px solid #99bbcf',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite'
//             }} />
//             Loading Books...
//           </div>
//         </div>
//       ) : error ? (
//         <div style={{
//           textAlign: 'center',
//           padding: isMobile ? '2rem 1rem' : '3rem',
//           backgroundColor: '#fee',
//           borderRadius: '15px',
//           border: '2px solid #fcc'
//         }}>
//           <p style={{ color: '#e53e3e', fontSize: isMobile ? '1rem' : '1.1rem' }}>{error}</p>
//         </div>
//       ) : (
//         <>
//           {/* Books Grid Container - Responsive */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
//             gap: isMobile ? '0.75rem' : '1.5rem',
//             padding: isMobile ? '0.5rem 0' : '1rem 0'
//           }}>
//             {displayedBooks.map((book) => {
//               const qty = getCartCount(book._id);
//               const discount = calculateDiscount(book.mrpPrice, book.salePrice);

//               return (
//                 <div
//                   key={book._id}
//                   style={{
//                     backgroundColor: '#ffffff',
//                     borderRadius: isMobile ? '12px' : '15px',
//                     overflow: 'hidden',
//                     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
//                     transition: 'all 0.3s ease',
//                     border: '1px solid #e2e8f0',
//                     position: 'relative',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: '100%'
//                   }}
//                   onMouseEnter={() => setHoveredBook(book._id)}
//                   onMouseLeave={() => setHoveredBook(null)}
//                   onMouseOver={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.transform = 'translateY(-5px)';
//                       e.currentTarget.style.boxShadow = '0 10px 25px rgba(153, 187, 207, 0.15)';
//                     }
//                   }}
//                   onMouseOut={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.transform = 'translateY(0)';
//                       e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
//                     }
//                   }}
//                 >
//                   {/* Discount Badge */}
//                   {book.salePrice < book.mrpPrice && (
//                     <div style={{
//                       position: 'absolute',
//                       top: isMobile ? '6px' : '10px',
//                       left: isMobile ? '6px' : '10px',
//                       backgroundColor: '#ff4757',
//                       color: 'white',
//                       padding: isMobile ? '2px 6px' : '4px 10px',
//                       borderRadius: '15px',
//                       fontSize: isMobile ? '0.65rem' : '0.8rem',
//                       fontWeight: '600',
//                       zIndex: 2,
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px',
//                       boxShadow: '0 3px 8px rgba(255, 71, 87, 0.3)'
//                     }}>
//                       {/* <FaTag style={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }} /> */}
//                       {/* {discount}% OFF */}
//                     </div>
//                   )}

//                   {/* Image Section */}
//                   <div style={{
//                     height: isMobile ? '120px' : '180px',
//                     overflow: 'hidden',
//                     position: 'relative',
//                     backgroundColor: '#f8fafc',
//                     padding: isMobile ? '0.5rem' : '1rem'
//                   }}>
//                     <img
//                       src={hoveredBook === book._id && book.backImage ? bo : book.image1}
//                       alt={book.bookName}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'contain',
//                         transition: 'all 0.5s ease',
//                         transform: hoveredBook === book._id ? 'scale(1.05)' : 'scale(1)'
//                       }}
//                     />
//                   </div>

//                   {/* Content Section */}
//                   <div style={{
//                     padding: isMobile ? '0.75rem' : '1rem',
//                     flexGrow: 1,
//                     display: 'flex',
//                     flexDirection: 'column'
//                   }}>
//                     {/* Book Title */}
//                     <h3 style={{
//                       fontSize: isMobile ? '0.85rem' : '0.95rem',
//                       fontWeight: '700',
//                       color: '#2c3e50',
//                       marginBottom: isMobile ? '0.2rem' : '0.3rem',
//                       lineHeight: '1.3',
//                       height: isMobile ? '2.2rem' : '2.5rem',
//                       overflow: 'hidden',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical'
//                     }}>
//                       {book.bookName}
//                     </h3>

//                     {/* Author */}
//                     <p style={{
//                       color: '#718096',
//                       fontSize: isMobile ? '0.75rem' : '0.85rem',
//                       marginBottom: isMobile ? '0.4rem' : '0.5rem',
//                       height: '1.2rem',
//                       overflow: 'hidden',
//                       whiteSpace: 'nowrap',
//                       textOverflow: 'ellipsis'
//                     }}>
//                       by {book.authorName}
//                     </p>

//                     {/* Price Section */}
//                     <div style={{
//                       marginBottom: isMobile ? '0.6rem' : '0.8rem',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between'
//                     }}>
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'baseline',
//                         gap: isMobile ? '4px' : '6px'
//                       }}>
//                         <span style={{
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           fontWeight: '700',
//                           color: '#2c3e50',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '2px'
//                         }}>
//                           <FaRupeeSign style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }} />
//                           {book.salePrice}
//                         </span>

//                         {book.salePrice < book.mrpPrice && (
//                           <span style={{
//                             fontSize: isMobile ? '0.75rem' : '0.85rem',
//                             color: '#718096',
//                             textDecoration: 'line-through',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '2px'
//                           }}>
//                             <FaRupeeSign style={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }} />
//                             {book.mrpPrice}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div style={{
//                       display: 'flex',
//                       gap: isMobile ? '6px' : '8px',
//                       marginTop: 'auto'
//                     }}>
//                       <button
//                         id={`cart-btn-${book._id}`}
//                         onClick={() => handleAddToCart(book)}
//                         style={{
//                           flex: 1,
//                           backgroundColor: qty > 0 ? '#99bbcf' : '#2c3e50',
//                           color: 'white',
//                           border: 'none',
//                           padding: isMobile ? '6px 8px' : '8px 12px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           fontSize: isMobile ? '0.75rem' : '0.85rem',
//                           fontWeight: '600',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           gap: isMobile ? '4px' : '6px',
//                           transition: 'all 0.3s ease',
//                           minHeight: isMobile ? '32px' : '36px'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = qty > 0 ? '#87aec9' : '#1a202c';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = qty > 0 ? '#99bbcf' : '#2c3e50';
//                           }
//                         }}
//                       >
//                         {qty > 0 ? (
//                           <IoCart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                         ) : (
//                           <IoCartOutline style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                         )}
//                         {qty > 0 ? `${qty}` : 'Add'}
//                       </button>

//                       <button
//                         id={`wishlist-btn-${book._id}`}
//                         onClick={() => handleAddToWatchlist(book)}
//                         style={{
//                           width: isMobile ? '32px' : '36px',
//                           height: isMobile ? '32px' : '36px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           backgroundColor: '#f8fafc',
//                           border: '1px solid #e2e8f0',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           cursor: 'pointer',
//                           transition: 'all 0.3s ease',
//                           color: '#718096'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#f8fafc';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                             e.currentTarget.style.color = '#718096';
//                           }
//                         }}
//                       >
//                         <FiHeart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                       </button>

//                       <button
//                         onClick={() => handleShare(book)}
//                         style={{
//                           width: isMobile ? '32px' : '36px',
//                           height: isMobile ? '32px' : '36px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           backgroundColor: '#f8fafc',
//                           border: '1px solid #e2e8f0',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           cursor: 'pointer',
//                           transition: 'all 0.3s ease',
//                           color: '#718096'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#f8fafc';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                             e.currentTarget.style.color = '#718096';
//                           }
//                         }}
//                       >
//                         <FiShare2 style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Status Badge */}
//                   <div style={{
//                     position: 'absolute',
//                     bottom: isMobile ? '6px' : '10px',
//                     right: isMobile ? '6px' : '10px',
//                     backgroundColor: book.status === 'Available' ? '#c6f6d5' : '#fed7d7',
//                     color: book.status === 'Available' ? '#22543d' : '#742a2a',
//                     padding: isMobile ? '1px 6px' : '2px 8px',
//                     borderRadius: '10px',
//                     fontSize: isMobile ? '0.6rem' : '0.7rem',
//                     fontWeight: '600'
//                   }}>
//                     {book.status}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination / Show More Controls */}
//           {!showAll && totalPages > 1 && (
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               gap: isMobile ? '0.5rem' : '1rem',
//               marginTop: isMobile ? '1.5rem' : '3rem',
//               padding: isMobile ? '1rem' : '1.5rem',
//               backgroundColor: '#f8fafc',
//               borderRadius: isMobile ? '12px' : '15px',
//               border: '1px solid #e2e8f0',
//               flexDirection: isMobile ? 'column' : 'row'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 gap: isMobile ? '0.5rem' : '1rem',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: isMobile ? '100%' : 'auto'
//               }}>
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: isMobile ? '8px 12px' : '10px 20px',
//                     backgroundColor: currentPage === 1 ? '#e2e8f0' : '#99bbcf',
//                     color: currentPage === 1 ? '#a0aec0' : 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: isMobile ? '0.85rem' : '0.95rem',
//                     transition: 'all 0.3s ease',
//                     opacity: currentPage === 1 ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isMobile && currentPage !== 1) {
//                       e.currentTarget.style.backgroundColor = '#87aec9';
//                       e.currentTarget.style.transform = 'translateX(-2px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile && currentPage !== 1) {
//                       e.currentTarget.style.backgroundColor = '#99bbcf';
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }
//                   }}
//                 >
//                   <IoChevronBack /> Prev
//                 </button>

//                 <div style={{
//                   display: 'flex',
//                   gap: '5px',
//                   alignItems: 'center',
//                   flexWrap: 'wrap',
//                   justifyContent: 'center'
//                 }}>
//                   {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= (isMobile ? 3 : 5)) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 2) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 1) {
//                       pageNum = totalPages - (isMobile ? 2 : 4) + i;
//                     } else {
//                       pageNum = currentPage - 1 + i;
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => handlePageChange(pageNum)}
//                         style={{
//                           width: isMobile ? '32px' : '40px',
//                           height: isMobile ? '32px' : '40px',
//                           borderRadius: '8px',
//                           backgroundColor: currentPage === pageNum ? '#2c3e50' : 'white',
//                           color: currentPage === pageNum ? 'white' : '#4a5568',
//                           cursor: 'pointer',
//                           fontWeight: '600',
//                           fontSize: isMobile ? '0.85rem' : '0.95rem',
//                           transition: 'all 0.3s ease',
//                           border: currentPage === pageNum ? 'none' : '1px solid #e2e8f0'
//                         }}

//                         onMouseEnter={(e) => {
//                           if (!isMobile && currentPage !== pageNum) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile && currentPage !== pageNum) {
//                             e.currentTarget.style.backgroundColor = 'white';
//                             e.currentTarget.style.color = '#4a5568';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                           }
//                         }}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}

//                   {!isMobile && totalPages > 5 && currentPage < totalPages - 2 && (
//                     <>
//                       <span style={{ color: '#a0aec0' }}>...</span>
//                       <button
//                         onClick={() => handlePageChange(totalPages)}
//                         style={{
//                           width: '40px',
//                           height: '40px',
//                           borderRadius: '8px',
//                           backgroundColor: 'white',
//                           color: '#4a5568',
//                           cursor: 'pointer',
//                           fontWeight: '600',
//                           fontSize: '0.95rem',
//                           transition: 'all 0.3s ease',
//                           border: '1px solid #e2e8f0'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = '#99bbcf';
//                           e.currentTarget.style.color = 'white';
//                           e.currentTarget.style.borderColor = '#99bbcf';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = 'white';
//                           e.currentTarget.style.color = '#4a5568';
//                           e.currentTarget.style.borderColor = '#e2e8f0';
//                         }}
//                       >
//                         {totalPages}
//                       </button>

//                     </>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: isMobile ? '8px 12px' : '10px 20px',
//                     backgroundColor: currentPage === totalPages ? '#e2e8f0' : '#99bbcf',
//                     color: currentPage === totalPages ? '#a0aec0' : 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: isMobile ? '0.85rem' : '0.95rem',
//                     transition: 'all 0.3s ease',
//                     opacity: currentPage === totalPages ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isMobile && currentPage !== totalPages) {
//                       e.currentTarget.style.backgroundColor = '#87aec9';
//                       e.currentTarget.style.transform = 'translateX(2px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile && currentPage !== totalPages) {
//                       e.currentTarget.style.backgroundColor = '#99bbcf';
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }
//                   }}
//                 >
//                   Next <IoChevronForward />
//                 </button>
//               </div>

//               <div style={{
//                 marginLeft: isMobile ? '0' : '2rem',
//                 paddingLeft: isMobile ? '0' : '2rem',
//                 borderLeft: isMobile ? 'none' : '2px solid #e2e8f0',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: isMobile ? '0.5rem' : '1rem',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 borderTop: isMobile ? '2px solid #e2e8f0' : 'none',
//                 paddingTop: isMobile ? '1rem' : '0',
//                 width: isMobile ? '100%' : 'auto',
//                 justifyContent: 'center'
//               }}>
//                 <span style={{
//                   color: '#4a5568',
//                   fontSize: isMobile ? '0.85rem' : '0.95rem'
//                 }}>
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <select
//                   value={itemsPerPage}
//                   onChange={(e) => {
//                     setItemsPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                   style={{
//                     padding: isMobile ? '6px 10px' : '8px 12px',
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0',
//                     backgroundColor: 'white',
//                     color: '#4a5568',
//                     fontSize: isMobile ? '0.85rem' : '0.9rem',
//                     outline: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value={10}>10 per page</option>
//                   <option value={20}>20 per page</option>
//                   <option value={30}>30 per page</option>
//                   <option value={50}>50 per page</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Show More/Less Button */}
//           {filteredBooks.length > itemsPerPage && (
//             <div style={{
//               textAlign: 'center',
//               marginTop: isMobile ? '1.5rem' : '2rem'
//             }}>
//               <button
//                 onClick={handleShowAll}
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   padding: isMobile ? '10px 20px' : '12px 30px',
//                   backgroundColor: '#99bbcf',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '50px',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 5px 15px rgba(153, 187, 207, 0.3)'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = '#87aec9';
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(153, 187, 207, 0.4)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = '#99bbcf';
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = '0 5px 15px rgba(153, 187, 207, 0.3)';
//                   }
//                 }}
//               >
//                 <TbLayoutGrid style={{ fontSize: isMobile ? '1rem' : '1.2rem' }} />
//                 {showAll ? 'Show Less' : `Show All Books (${filteredBooks.length})`}
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* Cart Summary Floating Button */}
//       {cartItems.length > 0 && (
//         <div style={{
//           position: 'fixed',
//           bottom: isMobile ? '1rem' : '2rem',
//           right: isMobile ? '1rem' : '2rem',
//           backgroundColor: '#99bbcf',
//           color: 'white',
//           padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
//           borderRadius: '50px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           boxShadow: '0 8px 25px rgba(153, 187, 207, 0.4)',
//           cursor: 'pointer',
//           zIndex: 1000,
//           transition: 'all 0.3s ease',
//           fontSize: isMobile ? '0.85rem' : '1rem'
//         }}
//           onMouseEnter={(e) => {
//             if (!isMobile) {
//               e.currentTarget.style.transform = 'scale(1.05)';
//               e.currentTarget.style.boxShadow = '0 12px 30px rgba(153, 187, 207, 0.6)';
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!isMobile) {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(153, 187, 207, 0.4)';
//             }
//           }}
//           onClick={() => {
//             alert(`You have ${cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in cart!`);
//           }}
//         >
//           <IoCart style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
//           <span style={{ fontWeight: '600' }}>
//             {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
//           </span>
//           <div style={{
//             height: '20px',
//             width: '1px',
//             backgroundColor: 'rgba(255,255,255,0.3)',
//             margin: '0 6px'
//           }} />
//           <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
//             <FaRupeeSign />
//             {cartItems.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0)}
//           </span>
//         </div>
//       )}

//       {/* Animation Styles */}
//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         /* Tablet view */
//         @media (min-width: 768px) and (max-width: 1024px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: repeat(3, 1fr) !important;
//             gap: 1rem !important;
//           }
//         }
        
//         /* Large tablet to small desktop */
//         @media (min-width: 1025px) and (max-width: 1400px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: repeat(4, 1fr) !important;
//           }
//         }
        
//         /* Mobile-specific adjustments */
//         @media (max-width: 480px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: 1fr !important;
//             gap: 1rem !important;
//           }
          
//           h1[style*="fontSize"] {
//             font-size: 1.3rem !important;
//           }
          
//           div[style*="padding: 2rem"] {
//             padding: 1rem 0.75rem !important;
//           }
          
//           div[style*="display: flex; gap: 1rem; marginTop: 3rem"] {
//             margin-top: 1rem !important;
//           }
//         }
        
//         /* Extra small mobile */
//         @media (max-width: 360px) {
//           div[style*="height: 120px"] {
//             height: 100px !important;
//           }
          
//           div[style*="padding: 0.75rem"] {
//             padding: 0.5rem !important;
//           }
          
//           h3[style*="fontSize"] {
//             font-size: 0.8rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }







// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { FaShoppingCart, FaHeart, FaShareAlt, FaRupeeSign, FaTag, FaSearch, FaFilter } from "react-icons/fa";
// import { FiShare2, FiHeart } from "react-icons/fi";
// import { IoCartOutline, IoCart, IoChevronForward, IoChevronBack } from "react-icons/io5";
// import { BsBook } from "react-icons/bs";
// import { TbLayoutGrid } from "react-icons/tb";

// interface Book {
//   _id: string;
//   bookName: string;
//   mrpPrice: number;
//   status: string;
//   pageNumber: number;
//   frontImage: string;  // Changed from image1
//   backImage: string;   // Changed from image2
//   createdAt: string;
//   // Optional fields for compatibility
//   salePrice?: number;
//   authorName?: string;
//   description?: string;
// }

// interface CartItem {
//   _id: string;
//   bookName: string;
//   salePrice: number;
//   mrpPrice: number;
//   frontImage: string;  // Changed from image1
//   quantity: number;
// }

// export default function Books() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [hoveredBook, setHoveredBook] = useState<string | null>(null);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Search and Filter states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showAll, setShowAll] = useState(false);

//   // Mobile responsive state
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     fetchBooks();
//     loadCartItems();
//     checkMobile();

//     // Add resize listener for responsive behavior
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     filterAndSortBooks();
//   }, [books, searchQuery, sortBy]);

//   const checkMobile = () => {
//     setIsMobile(window.innerWidth < 768);
//   };

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/books");
      
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Fetched books:", data); // Debug log
        
//         // Map backend data to frontend structure with fallback values
//         const activeBooks = Array.isArray(data) ? data : [];
        
//         const mappedBooks = activeBooks.map((book: any) => ({
//           _id: book._id,
//           bookName: book.bookName,
//           mrpPrice: book.mrpPrice,
//           salePrice: book.mrpPrice * 0.9, // Default 10% discount
//           status: book.status,
//           pageNumber: book.pageNumber,
//           frontImage: book.frontImage,
//           backImage: book.backImage,
//           createdAt: book.createdAt,
//           authorName: "", // Default value
//           description: "A wonderful book to read." // Default value
//         }));
        
//         setBooks(mappedBooks);
//         setFilteredBooks(mappedBooks);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || "Failed to fetch books.");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setError("Network error. Check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCartItems = () => {
//     const savedCart = localStorage.getItem("bookCart");
//     if (savedCart) {
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         // Map old cart items to new structure
//         const updatedCart = parsedCart.map((item: any) => ({
//           _id: item._id,
//           bookName: item.bookName,
//           salePrice: item.salePrice || item.mrpPrice,
//           mrpPrice: item.mrpPrice,
//           frontImage: item.frontImage || item.image1 || "",
//           quantity: item.quantity || 1
//         }));
//         setCartItems(updatedCart);
//       } catch (error) {
//         console.error("Error parsing cart:", error);
//         setCartItems([]);
//       }
//     }
//   };

//   const filterAndSortBooks = () => {
//     let result = [...books];

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(book =>
//         book.bookName.toLowerCase().includes(query) ||
//         (book.authorName?.toLowerCase() || "").includes(query) ||
//         (book.description?.toLowerCase() || "").includes(query)
//       );
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => (a.salePrice || a.mrpPrice) - (b.salePrice || b.mrpPrice));
//         break;
//       case "price-high":
//         result.sort((a, b) => (b.salePrice || b.mrpPrice) - (a.salePrice || a.mrpPrice));
//         break;
//       case "name":
//         result.sort((a, b) => a.bookName.localeCompare(b.bookName));
//         break;
//       case "newest":
//         result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         break;
//       default:
//         // "featured" - default sorting
//         break;
//     }

//     setFilteredBooks(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   };

//   const handleAddToCart = (book: Book) => {
//     const existingCart = JSON.parse(localStorage.getItem("bookCart") || "[]");

//     const itemIndex = existingCart.findIndex((i: CartItem) => i._id === book._id);

//     if (itemIndex >= 0) {
//       existingCart[itemIndex].quantity += 1;
//     } else {
//       existingCart.push({
//         _id: book._id,
//         bookName: book.bookName,
//         salePrice: book.salePrice || book.mrpPrice,
//         mrpPrice: book.mrpPrice,
//         frontImage: book.frontImage,
//         quantity: 1,
//       });
//     }

//     localStorage.setItem("bookCart", JSON.stringify(existingCart));
//     setCartItems(existingCart);

//     // Animation feedback
//     const button = document.getElementById(`cart-btn-${book._id}`);
//     if (button) {
//       button.style.transform = 'scale(0.95)';
//       setTimeout(() => {
//         button.style.transform = 'scale(1)';
//       }, 150);
//     }
//   };

//   const handleAddToWatchlist = (book: Book) => {
//     const watchlist = JSON.parse(localStorage.getItem("bookWatchlist") || "[]");

//     if (watchlist.find((b: Book) => b._id === book._id)) {
//       alert("Already in wishlist!");
//       return;
//     }

//     watchlist.push(book);
//     localStorage.setItem("bookWatchlist", JSON.stringify(watchlist));

//     // Animation feedback
//     const button = document.getElementById(`wishlist-btn-${book._id}`);
//     if (button) {
//       button.style.color = '#ff4757';
//       button.style.transform = 'scale(1.2)';
//       setTimeout(() => {
//         button.style.transform = 'scale(1)';
//       }, 300);
//     }

//     alert("Added to wishlist ❤️");
//   };

//   const handleShare = async (book: Book) => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: book.bookName,
//           text: `${book.bookName} by ${book.authorName || "Unknown Author"}`,
//           url: window.location.href,
//         });
//       } else {
//         await navigator.clipboard.writeText(
//           `${book.bookName} by ${book.authorName || "Unknown Author"} - ₹${book.salePrice || book.mrpPrice}`
//         );
//         alert("Copied to clipboard!");
//       }
//     } catch { }
//   };

//   const calculateDiscount = (mrp: number, sale: number) =>
//     Math.round(((mrp - sale) / mrp) * 100);

//   const getCartCount = (id: string) => {
//     const found = cartItems.find((i) => i._id === id);
//     return found ? found.quantity : 0;
//   };

//   // Pagination logic
//   const totalItems = filteredBooks.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Calculate items to show based on pagination or showAll
//   const displayedBooks = showAll
//     ? filteredBooks
//     : filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleShowAll = () => {
//     setShowAll(!showAll);
//     if (!showAll) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: '1600px',
//       margin: '0 auto',
//       padding: isMobile ? '1rem 0.5rem' : '2rem 1rem',
//       backgroundColor: '#ffffff',
//       minHeight: '100vh'
//     }}>
//       {/* Header Section */}
//       <div style={{
//         textAlign: 'center',
//         marginBottom: isMobile ? '1.5rem' : '2rem',
//         padding: isMobile ? '1.5rem 1rem' : '2rem',
//         background: 'linear-gradient(135deg, #99bbcf 0%, #87aec9 100%)',
//         borderRadius: isMobile ? '15px' : '20px',
//         boxShadow: '0 10px 30px rgba(153, 187, 207, 0.2)'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: isMobile ? '10px' : '15px',
//           marginBottom: isMobile ? '0.8rem' : '1rem'
//         }}>
//           <BsBook style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', color: '#2c3e50' }} />
//           <h1 style={{
//             fontSize: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 3rem)',
//             fontWeight: '800',
//             color: '#2c3e50',
//             margin: 0
//           }}>
//             Discover Amazing Books
//           </h1>
//         </div>
//         <p style={{
//           fontSize: isMobile ? '1rem' : '1.2rem',
//           color: '#4a5568',
//           maxWidth: '600px',
//           margin: `0 auto ${isMobile ? '1.5rem' : '2rem'}`,
//           lineHeight: '1.6'
//         }}>
//           Explore our curated collection of handpicked books
//         </p>

//         {/* Search Bar */}
//         <div style={{
//           maxWidth: '800px',
//           margin: '0 auto',
//           position: 'relative'
//         }}>
//           <div style={{
//             display: 'flex',
//             gap: isMobile ? '8px' : '10px',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             flexDirection: isMobile ? 'column' : 'row'
//           }}>
//             <div style={{
//               position: 'relative',
//               flex: '1',
//               minWidth: isMobile ? '100%' : '300px'
//             }}>
//               <FaSearch style={{
//                 position: 'absolute',
//                 left: isMobile ? '15px' : '20px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: '#99bbcf',
//                 fontSize: isMobile ? '1rem' : '1.2rem'
//               }} />
//               <input
//                 type="text"
//                 placeholder="Search books by title, author, or description..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={{
//                   width: '80%',
//                   padding: isMobile ? '12px 15px 12px 40px' : '16px 20px 16px 50px',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   border: '2px solid #e2e8f0',
//                   borderRadius: '50px',
//                   outline: 'none',
//                   transition: 'all 0.3s ease',
//                   backgroundColor: 'white'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#99bbcf';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(153, 187, 207, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#e2e8f0';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             {/* Sort Dropdown */}
//             <div style={{
//               position: 'relative',
//               minWidth: isMobile ? '100%' : '200px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 backgroundColor: 'white',
//                 padding: isMobile ? '12px 15px' : '16px 20px',
//                 borderRadius: '50px',
//                 border: '2px solid #e2e8f0',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = '#99bbcf';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = '#e2e8f0';
//                 }}
//               >
//                 <FaFilter style={{ color: '#99bbcf', fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   style={{
//                     border: 'none',
//                     outline: 'none',
//                     fontSize: isMobile ? '0.9rem' : '1rem',
//                     color: '#4a5568',
//                     backgroundColor: 'transparent',
//                     cursor: 'pointer',
//                     width: '100%'
//                   }}
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="name">Name: A to Z</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Search Results Count */}
//           <div style={{
//             textAlign: 'center',
//             marginTop: isMobile ? '0.8rem' : '1rem',
//             color: '#4a5568',
//             fontSize: isMobile ? '0.85rem' : '0.95rem'
//           }}>
//             Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
//             {searchQuery && (
//               <span> for "<strong>{searchQuery}</strong>"</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Books Grid - Responsive columns */}
//       {loading ? (
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: isMobile ? '300px' : '400px'
//         }}>
//           <div style={{
//             fontSize: isMobile ? '1rem' : '1.2rem',
//             color: '#99bbcf',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             flexDirection: isMobile ? 'column' : 'row'
//           }}>
//             <div style={{
//               width: isMobile ? '30px' : '40px',
//               height: isMobile ? '30px' : '40px',
//               border: '4px solid #f3f3f3',
//               borderTop: '4px solid #99bbcf',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite'
//             }} />
//             Loading Books...
//           </div>
//         </div>
//       ) : error ? (
//         <div style={{
//           textAlign: 'center',
//           padding: isMobile ? '2rem 1rem' : '3rem',
//           backgroundColor: '#fee',
//           borderRadius: '15px',
//           border: '2px solid #fcc'
//         }}>
//           <p style={{ color: '#e53e3e', fontSize: isMobile ? '1rem' : '1.1rem' }}>{error}</p>
//         </div>
//       ) : (
//         <>
//           {/* Books Grid Container - Responsive */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
//             gap: isMobile ? '0.75rem' : '1.5rem',
//             padding: isMobile ? '0.5rem 0' : '1rem 0'
//           }}>
//             {displayedBooks.map((book) => {
//               const qty = getCartCount(book._id);
//               const salePrice = book.salePrice || book.mrpPrice * 0.9;
//               const discount = calculateDiscount(book.mrpPrice, salePrice);

//               return (
//                 <div
//                   key={book._id}
//                   style={{
//                     backgroundColor: '#ffffff',
//                     borderRadius: isMobile ? '12px' : '15px',
//                     overflow: 'hidden',
//                     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
//                     transition: 'all 0.3s ease',
//                     border: '1px solid #e2e8f0',
//                     position: 'relative',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: '100%'
//                   }}
//                   onMouseEnter={() => setHoveredBook(book._id)}
//                   onMouseLeave={() => setHoveredBook(null)}
//                   onMouseOver={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.transform = 'translateY(-5px)';
//                       e.currentTarget.style.boxShadow = '0 10px 25px rgba(153, 187, 207, 0.15)';
//                     }
//                   }}
//                   onMouseOut={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.transform = 'translateY(0)';
//                       e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
//                     }
//                   }}
//                 >
//                   {/* Discount Badge */}
//                   {salePrice < book.mrpPrice && (
//                     <div style={{
//                       position: 'absolute',
//                       top: isMobile ? '6px' : '10px',
//                       left: isMobile ? '6px' : '10px',
//                       backgroundColor: '#ff4757',
//                       color: 'white',
//                       padding: isMobile ? '2px 6px' : '4px 10px',
//                       borderRadius: '15px',
//                       fontSize: isMobile ? '0.65rem' : '0.8rem',
//                       fontWeight: '600',
//                       zIndex: 2,
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px',
//                       boxShadow: '0 3px 8px rgba(255, 71, 87, 0.3)'
//                     }}>
//                       <FaTag style={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }} />
//                       {discount}% OFF
//                     </div>
//                   )}

//                   {/* Image Section - Fixed image fields */}
//                   <div style={{
//                     height: isMobile ? '120px' : '180px',
//                     overflow: 'hidden',
//                     position: 'relative',
//                     backgroundColor: '#f8fafc',
//                     padding: isMobile ? '0.5rem' : '1rem'
//                   }}>
//                     <img
//                       src={hoveredBook === book._id && book.backImage ? book.backImage : book.frontImage}
//                       alt={book.bookName}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'contain',
//                         transition: 'all 0.5s ease',
//                         transform: hoveredBook === book._id ? 'scale(1.05)' : 'scale(1)'
//                       }}
//                       onError={(e) => {
//                         console.error(`Failed to load image for book ${book.bookName}:`, e);
//                         e.currentTarget.src = '/book-placeholder.png'; // Fallback image
//                       }}
//                     />
//                   </div>

//                   {/* Content Section */}
//                   <div style={{
//                     padding: isMobile ? '0.75rem' : '1rem',
//                     flexGrow: 1,
//                     display: 'flex',
//                     flexDirection: 'column'
//                   }}>
//                     {/* Book Title */}
//                     <h3 style={{
//                       fontSize: isMobile ? '0.85rem' : '0.95rem',
//                       fontWeight: '700',
//                       color: '#2c3e50',
//                       marginBottom: isMobile ? '0.2rem' : '0.3rem',
//                       lineHeight: '1.3',
//                       height: isMobile ? '2.2rem' : '2.5rem',
//                       overflow: 'hidden',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical'
//                     }}>
//                       {book.bookName}
//                     </h3>

//                     {/* Author */}
//                     <p style={{
//                       color: '#718096',
//                       fontSize: isMobile ? '0.75rem' : '0.85rem',
//                       marginBottom: isMobile ? '0.4rem' : '0.5rem',
//                       height: '1.2rem',
//                       overflow: 'hidden',
//                       whiteSpace: 'nowrap',
//                       textOverflow: 'ellipsis'
//                     }}>
//                       by {book.authorName || "Unknown Author"}
//                     </p>

//                     {/* Price Section */}
//                     <div style={{
//                       marginBottom: isMobile ? '0.6rem' : '0.8rem',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between'
//                     }}>
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'baseline',
//                         gap: isMobile ? '4px' : '6px'
//                       }}>
//                         <span style={{
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           fontWeight: '700',
//                           color: '#2c3e50',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '2px'
//                         }}>
//                           <FaRupeeSign style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }} />
//                           {salePrice.toFixed(2)}
//                         </span>

//                         {salePrice < book.mrpPrice && (
//                           <span style={{
//                             fontSize: isMobile ? '0.75rem' : '0.85rem',
//                             color: '#718096',
//                             textDecoration: 'line-through',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '2px'
//                           }}>
//                             <FaRupeeSign style={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }} />
//                             {book.mrpPrice.toFixed(2)}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div style={{
//                       display: 'flex',
//                       gap: isMobile ? '6px' : '8px',
//                       marginTop: 'auto'
//                     }}>
//                       <button
//                         id={`cart-btn-${book._id}`}
//                         onClick={() => handleAddToCart(book)}
//                         style={{
//                           flex: 1,
//                           backgroundColor: qty > 0 ? '#99bbcf' : '#2c3e50',
//                           color: 'white',
//                           border: 'none',
//                           padding: isMobile ? '6px 8px' : '8px 12px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           fontSize: isMobile ? '0.75rem' : '0.85rem',
//                           fontWeight: '600',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           gap: isMobile ? '4px' : '6px',
//                           transition: 'all 0.3s ease',
//                           minHeight: isMobile ? '32px' : '36px'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = qty > 0 ? '#87aec9' : '#1a202c';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = qty > 0 ? '#99bbcf' : '#2c3e50';
//                           }
//                         }}
//                       >
//                         {qty > 0 ? (
//                           <IoCart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                         ) : (
//                           <IoCartOutline style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                         )}
//                         {qty > 0 ? `${qty}` : 'Add'}
//                       </button>

//                       <button
//                         id={`wishlist-btn-${book._id}`}
//                         onClick={() => handleAddToWatchlist(book)}
//                         style={{
//                           width: isMobile ? '32px' : '36px',
//                           height: isMobile ? '32px' : '36px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           backgroundColor: '#f8fafc',
//                           border: '1px solid #e2e8f0',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           cursor: 'pointer',
//                           transition: 'all 0.3s ease',
//                           color: '#718096'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#f8fafc';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                             e.currentTarget.style.color = '#718096';
//                           }
//                         }}
//                       >
//                         <FiHeart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                       </button>

//                       <button
//                         onClick={() => handleShare(book)}
//                         style={{
//                           width: isMobile ? '32px' : '36px',
//                           height: isMobile ? '32px' : '36px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           backgroundColor: '#f8fafc',
//                           border: '1px solid #e2e8f0',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           cursor: 'pointer',
//                           transition: 'all 0.3s ease',
//                           color: '#718096'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#f8fafc';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                             e.currentTarget.style.color = '#718096';
//                           }
//                         }}
//                       >
//                         <FiShare2 style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Status Badge */}
//                   <div style={{
//                     position: 'absolute',
//                     bottom: isMobile ? '6px' : '10px',
//                     right: isMobile ? '6px' : '10px',
//                     backgroundColor: book.status === 'active' ? '#c6f6d5' : '#fed7d7',
//                     color: book.status === 'active' ? '#22543d' : '#742a2a',
//                     padding: isMobile ? '1px 6px' : '2px 8px',
//                     borderRadius: '10px',
//                     fontSize: isMobile ? '0.6rem' : '0.7rem',
//                     fontWeight: '600'
//                   }}>
//                     {book.status}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination / Show More Controls */}
//           {!showAll && totalPages > 1 && (
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               gap: isMobile ? '0.5rem' : '1rem',
//               marginTop: isMobile ? '1.5rem' : '3rem',
//               padding: isMobile ? '1rem' : '1.5rem',
//               backgroundColor: '#f8fafc',
//               borderRadius: isMobile ? '12px' : '15px',
//               border: '1px solid #e2e8f0',
//               flexDirection: isMobile ? 'column' : 'row'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 gap: isMobile ? '0.5rem' : '1rem',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: isMobile ? '100%' : 'auto'
//               }}>
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: isMobile ? '8px 12px' : '10px 20px',
//                     backgroundColor: currentPage === 1 ? '#e2e8f0' : '#99bbcf',
//                     color: currentPage === 1 ? '#a0aec0' : 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: isMobile ? '0.85rem' : '0.95rem',
//                     transition: 'all 0.3s ease',
//                     opacity: currentPage === 1 ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isMobile && currentPage !== 1) {
//                       e.currentTarget.style.backgroundColor = '#87aec9';
//                       e.currentTarget.style.transform = 'translateX(-2px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile && currentPage !== 1) {
//                       e.currentTarget.style.backgroundColor = '#99bbcf';
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }
//                   }}
//                 >
//                   <IoChevronBack /> Prev
//                 </button>

//                 <div style={{
//                   display: 'flex',
//                   gap: '5px',
//                   alignItems: 'center',
//                   flexWrap: 'wrap',
//                   justifyContent: 'center'
//                 }}>
//                   {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= (isMobile ? 3 : 5)) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 2) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 1) {
//                       pageNum = totalPages - (isMobile ? 2 : 4) + i;
//                     } else {
//                       pageNum = currentPage - 1 + i;
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => handlePageChange(pageNum)}
//                         style={{
//                           width: isMobile ? '32px' : '40px',
//                           height: isMobile ? '32px' : '40px',
//                           borderRadius: '8px',
//                           backgroundColor: currentPage === pageNum ? '#2c3e50' : 'white',
//                           color: currentPage === pageNum ? 'white' : '#4a5568',
//                           cursor: 'pointer',
//                           fontWeight: '600',
//                           fontSize: isMobile ? '0.85rem' : '0.95rem',
//                           transition: 'all 0.3s ease',
//                           border: currentPage === pageNum ? 'none' : '1px solid #e2e8f0'
//                         }}

//                         onMouseEnter={(e) => {
//                           if (!isMobile && currentPage !== pageNum) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile && currentPage !== pageNum) {
//                             e.currentTarget.style.backgroundColor = 'white';
//                             e.currentTarget.style.color = '#4a5568';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                           }
//                         }}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}

//                   {!isMobile && totalPages > 5 && currentPage < totalPages - 2 && (
//                     <>
//                       <span style={{ color: '#a0aec0' }}>...</span>
//                       <button
//                         onClick={() => handlePageChange(totalPages)}
//                         style={{
//                           width: '40px',
//                           height: '40px',
//                           borderRadius: '8px',
//                           backgroundColor: 'white',
//                           color: '#4a5568',
//                           cursor: 'pointer',
//                           fontWeight: '600',
//                           fontSize: '0.95rem',
//                           transition: 'all 0.3s ease',
//                           border: '1px solid #e2e8f0'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.backgroundColor = '#99bbcf';
//                           e.currentTarget.style.color = 'white';
//                           e.currentTarget.style.borderColor = '#99bbcf';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = 'white';
//                           e.currentTarget.style.color = '#4a5568';
//                           e.currentTarget.style.borderColor = '#e2e8f0';
//                         }}
//                       >
//                         {totalPages}
//                       </button>

//                     </>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: isMobile ? '8px 12px' : '10px 20px',
//                     backgroundColor: currentPage === totalPages ? '#e2e8f0' : '#99bbcf',
//                     color: currentPage === totalPages ? '#a0aec0' : 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: isMobile ? '0.85rem' : '0.95rem',
//                     transition: 'all 0.3s ease',
//                     opacity: currentPage === totalPages ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isMobile && currentPage !== totalPages) {
//                       e.currentTarget.style.backgroundColor = '#87aec9';
//                       e.currentTarget.style.transform = 'translateX(2px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile && currentPage !== totalPages) {
//                       e.currentTarget.style.backgroundColor = '#99bbcf';
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }
//                   }}
//                 >
//                   Next <IoChevronForward />
//                 </button>
//               </div>

//               <div style={{
//                 marginLeft: isMobile ? '0' : '2rem',
//                 paddingLeft: isMobile ? '0' : '2rem',
//                 borderLeft: isMobile ? 'none' : '2px solid #e2e8f0',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: isMobile ? '0.5rem' : '1rem',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 borderTop: isMobile ? '2px solid #e2e8f0' : 'none',
//                 paddingTop: isMobile ? '1rem' : '0',
//                 width: isMobile ? '100%' : 'auto',
//                 justifyContent: 'center'
//               }}>
//                 <span style={{
//                   color: '#4a5568',
//                   fontSize: isMobile ? '0.85rem' : '0.95rem'
//                 }}>
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <select
//                   value={itemsPerPage}
//                   onChange={(e) => {
//                     setItemsPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                   style={{
//                     padding: isMobile ? '6px 10px' : '8px 12px',
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0',
//                     backgroundColor: 'white',
//                     color: '#4a5568',
//                     fontSize: isMobile ? '0.85rem' : '0.9rem',
//                     outline: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value={10}>10 per page</option>
//                   <option value={20}>20 per page</option>
//                   <option value={30}>30 per page</option>
//                   <option value={50}>50 per page</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Show More/Less Button */}
//           {filteredBooks.length > itemsPerPage && (
//             <div style={{
//               textAlign: 'center',
//               marginTop: isMobile ? '1.5rem' : '2rem'
//             }}>
//               <button
//                 onClick={handleShowAll}
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   padding: isMobile ? '10px 20px' : '12px 30px',
//                   backgroundColor: '#99bbcf',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '50px',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 5px 15px rgba(153, 187, 207, 0.3)'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = '#87aec9';
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(153, 187, 207, 0.4)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = '#99bbcf';
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = '0 5px 15px rgba(153, 187, 207, 0.3)';
//                   }
//                 }}
//               >
//                 <TbLayoutGrid style={{ fontSize: isMobile ? '1rem' : '1.2rem' }} />
//                 {showAll ? 'Show Less' : `Show All Books (${filteredBooks.length})`}
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* Cart Summary Floating Button */}
//       {cartItems.length > 0 && (
//         <div style={{
//           position: 'fixed',
//           bottom: isMobile ? '1rem' : '2rem',
//           right: isMobile ? '1rem' : '2rem',
//           backgroundColor: '#99bbcf',
//           color: 'white',
//           padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
//           borderRadius: '50px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           boxShadow: '0 8px 25px rgba(153, 187, 207, 0.4)',
//           cursor: 'pointer',
//           zIndex: 1000,
//           transition: 'all 0.3s ease',
//           fontSize: isMobile ? '0.85rem' : '1rem'
//         }}
//           onMouseEnter={(e) => {
//             if (!isMobile) {
//               e.currentTarget.style.transform = 'scale(1.05)';
//               e.currentTarget.style.boxShadow = '0 12px 30px rgba(153, 187, 207, 0.6)';
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!isMobile) {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(153, 187, 207, 0.4)';
//             }
//           }}
//           onClick={() => {
//             alert(`You have ${cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in cart!`);
//           }}
//         >
//           <IoCart style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
//           <span style={{ fontWeight: '600' }}>
//             {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
//           </span>
//           <div style={{
//             height: '20px',
//             width: '1px',
//             backgroundColor: 'rgba(255,255,255,0.3)',
//             margin: '0 6px'
//           }} />
//           <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
//             <FaRupeeSign />
//             {cartItems.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0).toFixed(2)}
//           </span>
//         </div>
//       )}

//       {/* Animation Styles */}
//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         /* Tablet view */
//         @media (min-width: 768px) and (max-width: 1024px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: repeat(3, 1fr) !important;
//             gap: 1rem !important;
//           }
//         }
        
//         /* Large tablet to small desktop */
//         @media (min-width: 1025px) and (max-width: 1400px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: repeat(4, 1fr) !important;
//           }
//         }
        
//         /* Mobile-specific adjustments */
//         @media (max-width: 480px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: 1fr !important;
//             gap: 1rem !important;
//           }
          
//           h1[style*="fontSize"] {
//             font-size: 1.3rem !important;
//           }
          
//           div[style*="padding: 2rem"] {
//             padding: 1rem 0.75rem !important;
//           }
          
//           div[style*="display: flex; gap: 1rem; marginTop: 3rem"] {
//             margin-top: 1rem !important;
//           }
//         }
        
//         /* Extra small mobile */
//         @media (max-width: 360px) {
//           div[style*="height: 120px"] {
//             height: 100px !important;
//           }
          
//           div[style*="padding: 0.75rem"] {
//             padding: 0.5rem !important;
//           }
          
//           h3[style*="fontSize"] {
//             font-size: 0.8rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

















// "use client";

// import React, { useState, useEffect } from "react";
// import { FaRupeeSign, FaSearch, FaFilter } from "react-icons/fa";
// import { FiShare2, FiHeart } from "react-icons/fi";
// import { IoCartOutline, IoCart, IoChevronForward, IoChevronBack } from "react-icons/io5";
// import { BsBook } from "react-icons/bs";
// import { TbLayoutGrid } from "react-icons/tb";

// interface Book {
//   _id: string;
//   bookName: string;
//   mrpPrice: number;
//   status: string;
//   pageNumber: number;
//   frontImage: string;
//   backImage: string;
//   createdAt: string;
// }

// interface CartItem {
//   _id: string;
//   bookName: string;
//   salePrice: number;
//   mrpPrice: number;
//   frontImage: string;
//   quantity: number;
// }

// export default function Books() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [hoveredBook, setHoveredBook] = useState<string | null>(null);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Search and Filter states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showAll, setShowAll] = useState(false);

//   // Mobile responsive state
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     fetchBooks();
//     loadCartItems();
//     checkMobile();

//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     filterAndSortBooks();
//   }, [books, searchQuery, sortBy]);

//   const checkMobile = () => {
//     setIsMobile(window.innerWidth < 768);
//   };

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/books");
      
//       if (response.ok) {
//         const data = await response.json();
//         const activeBooks = Array.isArray(data) ? data : [];
        
//         setBooks(activeBooks);
//         setFilteredBooks(activeBooks);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || "Failed to fetch books.");
//       }
//     } catch (error) {
//       setError("Network error. Check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCartItems = () => {
//     const savedCart = localStorage.getItem("bookCart");
//     if (savedCart) {
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         setCartItems(parsedCart);
//       } catch (error) {
//         setCartItems([]);
//       }
//     }
//   };

//   const filterAndSortBooks = () => {
//     let result = [...books];

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(book =>
//         book.bookName.toLowerCase().includes(query)
//       );
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.mrpPrice - b.mrpPrice);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.mrpPrice - a.mrpPrice);
//         break;
//       case "name":
//         result.sort((a, b) => a.bookName.localeCompare(b.bookName));
//         break;
//       case "newest":
//         result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         break;
//       default:
//         // "featured" - default sorting
//         break;
//     }

//     setFilteredBooks(result);
//     setCurrentPage(1);
//   };

//   const handleAddToCart = (book: Book) => {
//     const existingCart = JSON.parse(localStorage.getItem("bookCart") || "[]");

//     const itemIndex = existingCart.findIndex((i: CartItem) => i._id === book._id);

//     if (itemIndex >= 0) {
//       existingCart[itemIndex].quantity += 1;
//     } else {
//       existingCart.push({
//         _id: book._id,
//         bookName: book.bookName,
//         salePrice: book.mrpPrice,
//         mrpPrice: book.mrpPrice,
//         frontImage: book.frontImage,
//         quantity: 1,
//       });
//     }

//     localStorage.setItem("bookCart", JSON.stringify(existingCart));
//     setCartItems(existingCart);

//     // Animation feedback
//     const button = document.getElementById(`cart-btn-${book._id}`);
//     if (button) {
//       button.style.transform = 'scale(0.95)';
//       setTimeout(() => {
//         button.style.transform = 'scale(1)';
//       }, 150);
//     }
//   };

//   const handleAddToWatchlist = (book: Book) => {
//     const watchlist = JSON.parse(localStorage.getItem("bookWatchlist") || "[]");

//     if (watchlist.find((b: Book) => b._id === book._id)) {
//       alert("Already in wishlist!");
//       return;
//     }

//     watchlist.push(book);
//     localStorage.setItem("bookWatchlist", JSON.stringify(watchlist));

//     const button = document.getElementById(`wishlist-btn-${book._id}`);
//     if (button) {
//       button.style.color = '#ff4757';
//       button.style.transform = 'scale(1.2)';
//       setTimeout(() => {
//         button.style.transform = 'scale(1)';
//       }, 300);
//     }

//     alert("Added to wishlist ❤️");
//   };

//   const handleShare = async (book: Book) => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: book.bookName,
//           text: `${book.bookName}`,
//           url: window.location.href,
//         });
//       } else {
//         await navigator.clipboard.writeText(
//           `${book.bookName} - ₹${book.mrpPrice}`
//         );
//         alert("Copied to clipboard!");
//       }
//     } catch { }
//   };

//   const getCartCount = (id: string) => {
//     const found = cartItems.find((i) => i._id === id);
//     return found ? found.quantity : 0;
//   };

//   // Pagination logic
//   const totalItems = filteredBooks.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const displayedBooks = showAll
//     ? filteredBooks
//     : filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleShowAll = () => {
//     setShowAll(!showAll);
//     if (!showAll) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: '1600px',
//       margin: '0 auto',
//       padding: isMobile ? '1rem 0.5rem' : '2rem 1rem',
//       backgroundColor: '#ffffff',
//       minHeight: '100vh'
//     }}>
//       {/* Header Section */}
//       <div style={{
//         textAlign: 'center',
//         marginBottom: isMobile ? '1.5rem' : '2rem',
//         padding: isMobile ? '1.5rem 1rem' : '2rem',
//         background: 'linear-gradient(135deg, #99bbcf 0%, #87aec9 100%)',
//         borderRadius: isMobile ? '15px' : '20px',
//         boxShadow: '0 10px 30px rgba(153, 187, 207, 0.2)'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: isMobile ? '10px' : '15px',
//           marginBottom: isMobile ? '0.8rem' : '1rem'
//         }}>
//           <BsBook style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', color: '#2c3e50' }} />
//           <h1 style={{
//             fontSize: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 3rem)',
//             fontWeight: '800',
//             color: '#2c3e50',
//             margin: 0
//           }}>
//             Discover Amazing Books
//           </h1>
//         </div>
//         <p style={{
//           fontSize: isMobile ? '1rem' : '1.2rem',
//           color: '#4a5568',
//           maxWidth: '600px',
//           margin: `0 auto ${isMobile ? '1.5rem' : '2rem'}`,
//           lineHeight: '1.6'
//         }}>
//           Explore our curated collection of handpicked books
//         </p>

//         {/* Search Bar */}
//         <div style={{
//           maxWidth: '800px',
//           margin: '0 auto',
//           position: 'relative'
//         }}>
//           <div style={{
//             display: 'flex',
//             gap: isMobile ? '8px' : '10px',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             flexDirection: isMobile ? 'column' : 'row'
//           }}>
//             <div style={{
//               position: 'relative',
//               flex: '1',
//               minWidth: isMobile ? '100%' : '300px'
//             }}>
//               <FaSearch style={{
//                 position: 'absolute',
//                 left: isMobile ? '25px' : '50px',
//                 top: '50%',
                
//                 transform: 'translateY(-50%)',
//                 color: '#99bbcf',
//                 fontSize: isMobile ? '1rem' : '1.2rem'
//               }} />
//               <input
//                 type="text"
//                 placeholder="Search books by title..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={{
//                   width: '80%',
//                   padding: isMobile ? '12px 15px 12px 40px' : '16px 20px 16px 50px',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   border: '2px solid #e2e8f0',
//                   borderRadius: '50px',
//                   outline: 'none',
//                   transition: 'all 0.3s ease',
//                   backgroundColor: 'white'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#99bbcf';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(153, 187, 207, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#e2e8f0';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             {/* Sort Dropdown */}
//             <div style={{
//               position: 'relative',
//               minWidth: isMobile ? '100%' : '200px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 backgroundColor: 'white',
//                 padding: isMobile ? '12px 15px' : '16px 20px',
//                 borderRadius: '50px',
//                 border: '2px solid #e2e8f0',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = '#99bbcf';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = '#e2e8f0';
//                 }}
//               >
//                 <FaFilter style={{ color: '#99bbcf', fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   style={{
//                     border: 'none',
//                     outline: 'none',
//                     fontSize: isMobile ? '0.9rem' : '1rem',
//                     color: '#4a5568',
//                     backgroundColor: 'transparent',
//                     cursor: 'pointer',
//                     width: '100%'
//                   }}
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="name">Name: A to Z</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Search Results Count */}
//           <div style={{
//             textAlign: 'center',
//             marginTop: isMobile ? '0.8rem' : '1rem',
//             color: '#4a5568',
//             fontSize: isMobile ? '0.85rem' : '0.95rem'
//           }}>
//             Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
//             {searchQuery && (
//               <span> for "<strong>{searchQuery}</strong>"</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Books Grid */}
//       {loading ? (
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: isMobile ? '300px' : '400px'
//         }}>
//           <div style={{
//             fontSize: isMobile ? '1rem' : '1.2rem',
//             color: '#99bbcf',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             flexDirection: isMobile ? 'column' : 'row'
//           }}>
//             <div style={{
//               width: isMobile ? '30px' : '40px',
//               height: isMobile ? '30px' : '40px',
//               border: '4px solid #f3f3f3',
//               borderTop: '4px solid #99bbcf',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite'
//             }} />
//             Loading Books...
//           </div>
//         </div>
//       ) : error ? (
//         <div style={{
//           textAlign: 'center',
//           padding: isMobile ? '2rem 1rem' : '3rem',
//           backgroundColor: '#fee',
//           borderRadius: '15px',
//           border: '2px solid #fcc'
//         }}>
//           <p style={{ color: '#e53e3e', fontSize: isMobile ? '1rem' : '1.1rem' }}>{error}</p>
//         </div>
//       ) : (
//         <>
//           {/* Books Grid Container */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
//             gap: isMobile ? '0.75rem' : '1.5rem',
//             padding: isMobile ? '0.5rem 0' : '1rem 0'
//           }}>
//             {displayedBooks.map((book) => {
//               const qty = getCartCount(book._id);

//               return (
//                 <div
//                   key={book._id}
//                   style={{
//                     backgroundColor: '#ffffff',
//                     borderRadius: isMobile ? '12px' : '15px',
//                     overflow: 'hidden',
//                     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
//                     transition: 'all 0.3s ease',
//                     border: '1px solid #e2e8f0',
//                     position: 'relative',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: '100%'
//                   }}
//                   onMouseEnter={() => setHoveredBook(book._id)}
//                   onMouseLeave={() => setHoveredBook(null)}
//                   onMouseOver={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.transform = 'translateY(-5px)';
//                       e.currentTarget.style.boxShadow = '0 10px 25px rgba(153, 187, 207, 0.15)';
//                     }
//                   }}
//                   onMouseOut={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.transform = 'translateY(0)';
//                       e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
//                     }
//                   }}
//                 >
//                   {/* Image Section */}
//                   <div style={{
//                     height: isMobile ? '120px' : '180px',
//                     overflow: 'hidden',
//                     position: 'relative',
//                     backgroundColor: '#f8fafc',
//                     padding: isMobile ? '0.5rem' : '1rem'
//                   }}>
//                     <img
//                       src={hoveredBook === book._id && book.backImage ? book.backImage : book.frontImage}
//                       alt={book.bookName}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'contain',
//                         transition: 'all 0.5s ease',
//                         transform: hoveredBook === book._id ? 'scale(1.05)' : 'scale(1)'
//                       }}
//                       onError={(e) => {
//                         e.currentTarget.src = '/book-placeholder.png';
//                       }}
//                     />
//                   </div>

//                   {/* Content Section */}
//                   <div style={{
//                     padding: isMobile ? '0.75rem' : '1rem',
//                     flexGrow: 1,
//                     display: 'flex',
//                     flexDirection: 'column'
//                   }}>
//                     {/* Book Title */}
//                     <h3 style={{
//                       fontSize: isMobile ? '0.85rem' : '0.95rem',
//                       fontWeight: '700',
//                       color: '#2c3e50',
//                       marginBottom: isMobile ? '0.2rem' : '0.3rem',
//                       lineHeight: '1.3',
//                       height: isMobile ? '2.2rem' : '2.5rem',
//                       overflow: 'hidden',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical'
//                     }}>
//                       {book.bookName}
//                     </h3>

//                     {/* Page Number */}
//                     <p style={{
//                       color: '#718096',
//                       fontSize: isMobile ? '0.75rem' : '0.85rem',
//                       marginBottom: isMobile ? '0.4rem' : '0.5rem',
//                     }}>
//                       Pages: {book.pageNumber}
//                     </p>

//                     {/* Price Section */}
//                     <div style={{
//                       marginBottom: isMobile ? '0.6rem' : '0.8rem',
//                     }}>
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'baseline',
//                         gap: isMobile ? '4px' : '6px'
//                       }}>
//                         <span style={{
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           fontWeight: '700',
//                           color: '#2c3e50',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '2px'
//                         }}>
//                           <FaRupeeSign style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }} />
//                           {book.mrpPrice.toFixed(2)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div style={{
//                       display: 'flex',
//                       gap: isMobile ? '6px' : '8px',
//                       marginTop: 'auto'
//                     }}>
//                       <button
//                         id={`cart-btn-${book._id}`}
//                         onClick={() => handleAddToCart(book)}
//                         style={{
//                           flex: 1,
//                           backgroundColor: qty > 0 ? '#99bbcf' : '#2c3e50',
//                           color: 'white',
//                           border: 'none',
//                           padding: isMobile ? '6px 8px' : '8px 12px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           fontSize: isMobile ? '0.75rem' : '0.85rem',
//                           fontWeight: '600',
//                           cursor: 'pointer',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           gap: isMobile ? '4px' : '6px',
//                           transition: 'all 0.3s ease',
//                           minHeight: isMobile ? '32px' : '36px'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = qty > 0 ? '#87aec9' : '#1a202c';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = qty > 0 ? '#99bbcf' : '#2c3e50';
//                           }
//                         }}
//                       >
//                         {qty > 0 ? (
//                           <IoCart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                         ) : (
//                           <IoCartOutline style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                         )}
//                         {qty > 0 ? `${qty}` : 'Add'}
//                       </button>

//                       <button
//                         id={`wishlist-btn-${book._id}`}
//                         onClick={() => handleAddToWatchlist(book)}
//                         style={{
//                           width: isMobile ? '32px' : '36px',
//                           height: isMobile ? '32px' : '36px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           backgroundColor: '#f8fafc',
//                           border: '1px solid #e2e8f0',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           cursor: 'pointer',
//                           transition: 'all 0.3s ease',
//                           color: '#718096'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#f8fafc';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                             e.currentTarget.style.color = '#718096';
//                           }
//                         }}
//                       >
//                         <FiHeart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                       </button>

//                       <button
//                         onClick={() => handleShare(book)}
//                         style={{
//                           width: isMobile ? '32px' : '36px',
//                           height: isMobile ? '32px' : '36px',
//                           borderRadius: isMobile ? '6px' : '8px',
//                           backgroundColor: '#f8fafc',
//                           border: '1px solid #e2e8f0',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           cursor: 'pointer',
//                           transition: 'all 0.3s ease',
//                           color: '#718096'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile) {
//                             e.currentTarget.style.backgroundColor = '#f8fafc';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                             e.currentTarget.style.color = '#718096';
//                           }
//                         }}
//                       >
//                         <FiShare2 style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Status Badge */}
//                   <div style={{
//                     position: 'absolute',
//                     bottom: isMobile ? '6px' : '10px',
//                     right: isMobile ? '6px' : '10px',
//                     backgroundColor: book.status === 'active' ? '#c6f6d5' : '#fed7d7',
//                     color: book.status === 'active' ? '#22543d' : '#742a2a',
//                     padding: isMobile ? '1px 6px' : '2px 8px',
//                     borderRadius: '10px',
//                     fontSize: isMobile ? '0.6rem' : '0.7rem',
//                     fontWeight: '600'
//                   }}>
//                     {book.status}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination / Show More Controls */}
//           {!showAll && totalPages > 1 && (
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               gap: isMobile ? '0.5rem' : '1rem',
//               marginTop: isMobile ? '1.5rem' : '3rem',
//               padding: isMobile ? '1rem' : '1.5rem',
//               backgroundColor: '#f8fafc',
//               borderRadius: isMobile ? '12px' : '15px',
//               border: '1px solid #e2e8f0',
//               flexDirection: isMobile ? 'column' : 'row'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 gap: isMobile ? '0.5rem' : '1rem',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: isMobile ? '100%' : 'auto'
//               }}>
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: isMobile ? '8px 12px' : '10px 20px',
//                     backgroundColor: currentPage === 1 ? '#e2e8f0' : '#99bbcf',
//                     color: currentPage === 1 ? '#a0aec0' : 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: isMobile ? '0.85rem' : '0.95rem',
//                     transition: 'all 0.3s ease',
//                     opacity: currentPage === 1 ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isMobile && currentPage !== 1) {
//                       e.currentTarget.style.backgroundColor = '#87aec9';
//                       e.currentTarget.style.transform = 'translateX(-2px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile && currentPage !== 1) {
//                       e.currentTarget.style.backgroundColor = '#99bbcf';
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }
//                   }}
//                 >
//                   <IoChevronBack /> Prev
//                 </button>

//                 <div style={{
//                   display: 'flex',
//                   gap: '5px',
//                   alignItems: 'center',
//                   flexWrap: 'wrap',
//                   justifyContent: 'center'
//                 }}>
//                   {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= (isMobile ? 3 : 5)) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 2) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 1) {
//                       pageNum = totalPages - (isMobile ? 2 : 4) + i;
//                     } else {
//                       pageNum = currentPage - 1 + i;
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => handlePageChange(pageNum)}
//                         style={{
//                           width: isMobile ? '32px' : '40px',
//                           height: isMobile ? '32px' : '40px',
//                           borderRadius: '8px',
//                           backgroundColor: currentPage === pageNum ? '#2c3e50' : 'white',
//                           color: currentPage === pageNum ? 'white' : '#4a5568',
//                           cursor: 'pointer',
//                           fontWeight: '600',
//                           fontSize: isMobile ? '0.85rem' : '0.95rem',
//                           transition: 'all 0.3s ease',
//                           border: currentPage === pageNum ? 'none' : '1px solid #e2e8f0'
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!isMobile && currentPage !== pageNum) {
//                             e.currentTarget.style.backgroundColor = '#99bbcf';
//                             e.currentTarget.style.color = 'white';
//                             e.currentTarget.style.borderColor = '#99bbcf';
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!isMobile && currentPage !== pageNum) {
//                             e.currentTarget.style.backgroundColor = 'white';
//                             e.currentTarget.style.color = '#4a5568';
//                             e.currentTarget.style.borderColor = '#e2e8f0';
//                           }
//                         }}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: isMobile ? '8px 12px' : '10px 20px',
//                     backgroundColor: currentPage === totalPages ? '#e2e8f0' : '#99bbcf',
//                     color: currentPage === totalPages ? '#a0aec0' : 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: isMobile ? '0.85rem' : '0.95rem',
//                     transition: 'all 0.3s ease',
//                     opacity: currentPage === totalPages ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isMobile && currentPage !== totalPages) {
//                       e.currentTarget.style.backgroundColor = '#87aec9';
//                       e.currentTarget.style.transform = 'translateX(2px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile && currentPage !== totalPages) {
//                       e.currentTarget.style.backgroundColor = '#99bbcf';
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }
//                   }}
//                 >
//                   Next <IoChevronForward />
//                 </button>
//               </div>

//               <div style={{
//                 marginLeft: isMobile ? '0' : '2rem',
//                 paddingLeft: isMobile ? '0' : '2rem',
//                 borderLeft: isMobile ? 'none' : '2px solid #e2e8f0',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: isMobile ? '0.5rem' : '1rem',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 borderTop: isMobile ? '2px solid #e2e8f0' : 'none',
//                 paddingTop: isMobile ? '1rem' : '0',
//                 width: isMobile ? '100%' : 'auto',
//                 justifyContent: 'center'
//               }}>
//                 <span style={{
//                   color: '#4a5568',
//                   fontSize: isMobile ? '0.85rem' : '0.95rem'
//                 }}>
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <select
//                   value={itemsPerPage}
//                   onChange={(e) => {
//                     setItemsPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                   style={{
//                     padding: isMobile ? '6px 10px' : '8px 12px',
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0',
//                     backgroundColor: 'white',
//                     color: '#4a5568',
//                     fontSize: isMobile ? '0.85rem' : '0.9rem',
//                     outline: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value={10}>10 per page</option>
//                   <option value={20}>20 per page</option>
//                   <option value={30}>30 per page</option>
//                   <option value={50}>50 per page</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Show More/Less Button */}
//           {filteredBooks.length > itemsPerPage && (
//             <div style={{
//               textAlign: 'center',
//               marginTop: isMobile ? '1.5rem' : '2rem'
//             }}>
//               <button
//                 onClick={handleShowAll}
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   padding: isMobile ? '10px 20px' : '12px 30px',
//                   backgroundColor: '#99bbcf',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '50px',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 5px 15px rgba(153, 187, 207, 0.3)'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = '#87aec9';
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(153, 187, 207, 0.4)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = '#99bbcf';
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = '0 5px 15px rgba(153, 187, 207, 0.3)';
//                   }
//                 }}
//               >
//                 <TbLayoutGrid style={{ fontSize: isMobile ? '1rem' : '1.2rem' }} />
//                 {showAll ? 'Show Less' : `Show All Books (${filteredBooks.length})`}
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* Cart Summary Floating Button */}
//       {cartItems.length > 0 && (
//         <div style={{
//           position: 'fixed',
//           bottom: isMobile ? '1rem' : '2rem',
//           right: isMobile ? '1rem' : '2rem',
//           backgroundColor: '#99bbcf',
//           color: 'white',
//           padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
//           borderRadius: '50px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           boxShadow: '0 8px 25px rgba(153, 187, 207, 0.4)',
//           cursor: 'pointer',
//           zIndex: 1000,
//           transition: 'all 0.3s ease',
//           fontSize: isMobile ? '0.85rem' : '1rem'
//         }}
//           onMouseEnter={(e) => {
//             if (!isMobile) {
//               e.currentTarget.style.transform = 'scale(1.05)';
//               e.currentTarget.style.boxShadow = '0 12px 30px rgba(153, 187, 207, 0.6)';
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!isMobile) {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(153, 187, 207, 0.4)';
//             }
//           }}
//           onClick={() => {
//             alert(`You have ${cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in cart!`);
//           }}
//         >
//           <IoCart style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
//           <span style={{ fontWeight: '600' }}>
//             {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
//           </span>
//           <div style={{
//             height: '20px',
//             width: '1px',
//             backgroundColor: 'rgba(255,255,255,0.3)',
//             margin: '0 6px'
//           }} />
//           <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
//             <FaRupeeSign />
//             {cartItems.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0).toFixed(2)}
//           </span>
//         </div>
//       )}

//       {/* Animation Styles */}
//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         @media (min-width: 768px) and (max-width: 1024px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: repeat(3, 1fr) !important;
//             gap: 1rem !important;
//           }
//         }
        
//         @media (min-width: 1025px) and (max-width: 1400px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: repeat(4, 1fr) !important;
//           }
//         }
        
//         @media (max-width: 480px) {
//           div[style*="gridTemplateColumns"] {
//             grid-template-columns: 1fr !important;
//             gap: 1rem !important;
//           }
          
//           h1[style*="fontSize"] {
//             font-size: 1.3rem !important;
//           }
          
//           div[style*="padding: 2rem"] {
//             padding: 1rem 0.75rem !important;
//           }
          
//           div[style*="display: flex; gap: 1rem; marginTop: 3rem"] {
//             margin-top: 1rem !important;
//           }
//         }
        
//         @media (max-width: 360px) {
//           div[style*="height: 120px"] {
//             height: 100px !important;
//           }
          
//           div[style*="padding: 0.75rem"] {
//             padding: 0.5rem !important;
//           }
          
//           h3[style*="fontSize"] {
//             font-size: 0.8rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }













"use client";

import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaSearch, FaFilter } from "react-icons/fa";
import { FiShare2, FiHeart } from "react-icons/fi";
import { IoCartOutline, IoCart, IoChevronForward, IoChevronBack } from "react-icons/io5";
import { BsBook } from "react-icons/bs";
import { TbLayoutGrid } from "react-icons/tb";
import { MdShoppingBag } from "react-icons/md"; // Added for BUY icon

interface Book {
  _id: string;
  bookName: string;
  mrpPrice: number;
  status: string;
  pageNumber: number;
  frontImage: string;
  backImage: string;
  createdAt: string;
}

interface CartItem {
  _id: string;
  bookName: string;
  salePrice: number;
  mrpPrice: number;
  frontImage: string;
  quantity: number;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAll, setShowAll] = useState(false);

  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchBooks();
    loadCartItems();
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchQuery, sortBy]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/books");
      
      if (response.ok) {
        const data = await response.json();
        const activeBooks = Array.isArray(data) ? data : [];
        
        setBooks(activeBooks);
        setFilteredBooks(activeBooks);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch books.");
      }
    } catch (error) {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadCartItems = () => {
    const savedCart = localStorage.getItem("bookCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        setCartItems([]);
      }
    }
  };

  const filterAndSortBooks = () => {
    let result = [...books];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.bookName.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.mrpPrice - b.mrpPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.mrpPrice - a.mrpPrice);
        break;
      case "name":
        result.sort((a, b) => a.bookName.localeCompare(b.bookName));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // "featured" - default sorting
        break;
    }

    setFilteredBooks(result);
    setCurrentPage(1);
  };

  const handleAddToCart = (book: Book) => {
    const existingCart = JSON.parse(localStorage.getItem("bookCart") || "[]");

    const itemIndex = existingCart.findIndex((i: CartItem) => i._id === book._id);

    if (itemIndex >= 0) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({
        _id: book._id,
        bookName: book.bookName,
        salePrice: book.mrpPrice,
        mrpPrice: book.mrpPrice,
        frontImage: book.frontImage,
        quantity: 1,
      });
    }

    localStorage.setItem("bookCart", JSON.stringify(existingCart));
    setCartItems(existingCart);

    // Animation feedback
    const button = document.getElementById(`cart-btn-${book._id}`);
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  };

  const handleBuyNow = (book: Book) => {
    // First add to cart
    handleAddToCart(book);
    // Then redirect to checkout or show buy now modal
    // You can modify this based on your checkout flow
    setTimeout(() => {
      alert(`Proceeding to checkout for ${book.bookName}`);
      // window.location.href = '/checkout'; // Uncomment if you have checkout page
    }, 300);
  };

  const handleAddToWatchlist = (book: Book) => {
    const watchlist = JSON.parse(localStorage.getItem("bookWatchlist") || "[]");

    if (watchlist.find((b: Book) => b._id === book._id)) {
      alert("Already in wishlist!");
      return;
    }

    watchlist.push(book);
    localStorage.setItem("bookWatchlist", JSON.stringify(watchlist));

    const button = document.getElementById(`wishlist-btn-${book._id}`);
    if (button) {
      button.style.color = '#ff4757';
      button.style.transform = 'scale(1.2)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 300);
    }

    alert("Added to wishlist ❤️");
  };

  const handleShare = async (book: Book) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: book.bookName,
          text: `${book.bookName}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `${book.bookName} - ₹${book.mrpPrice}`
        );
        alert("Copied to clipboard!");
      }
    } catch { }
  };

  const getCartCount = (id: string) => {
    const found = cartItems.find((i) => i._id === id);
    return found ? found.quantity : 0;
  };

  // Pagination logic
  const totalItems = filteredBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayedBooks = showAll
    ? filteredBooks
    : filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      padding: isMobile ? '1rem 0.5rem' : '2rem 1rem',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '1.5rem' : '2rem',
        padding: isMobile ? '1.5rem 1rem' : '2rem',
        background: 'linear-gradient(135deg, #99bbcf 0%, #87aec9 100%)',
        borderRadius: isMobile ? '15px' : '20px',
        boxShadow: '0 10px 30px rgba(153, 187, 207, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '10px' : '15px',
          marginBottom: isMobile ? '0.8rem' : '1rem'
        }}>
          <BsBook style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', color: '#2c3e50' }} />
          <h1 style={{
            fontSize: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            color: '#2c3e50',
            margin: 0
          }}>
            Discover Amazing Books
          </h1>
        </div>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: '#4a5568',
          maxWidth: '600px',
          margin: `0 auto ${isMobile ? '1.5rem' : '2rem'}`,
          lineHeight: '1.6'
        }}>
          Explore our curated collection of handpicked books
        </p>

        {/* Search Bar */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            gap: isMobile ? '8px' : '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{
              position: 'relative',
              flex: '1',
              minWidth: isMobile ? '100%' : '300px'
            }}>
              <FaSearch style={{
                position: 'absolute',
                left: isMobile ? '25px' : '50px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#99bbcf',
                fontSize: isMobile ? '1rem' : '1.2rem'
              }} />
              <input
                type="text"
                placeholder="Search books by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '80%',
                  padding: isMobile ? '12px 15px 12px 40px' : '16px 20px 16px 50px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '50px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#99bbcf';
                  e.target.style.boxShadow = '0 0 0 3px rgba(153, 187, 207, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{
              position: 'relative',
              minWidth: isMobile ? '100%' : '200px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                padding: isMobile ? '12px 15px' : '16px 20px',
                borderRadius: '50px',
                border: '2px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#99bbcf';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <FaFilter style={{ color: '#99bbcf', fontSize: isMobile ? '0.9rem' : '1rem' }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: '#4a5568',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results Count */}
          <div style={{
            textAlign: 'center',
            marginTop: isMobile ? '0.8rem' : '1rem',
            color: '#4a5568',
            fontSize: isMobile ? '0.85rem' : '0.95rem'
          }}>
            Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
            {searchQuery && (
              <span> for "<strong>{searchQuery}</strong>"</span>
            )}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: isMobile ? '300px' : '400px'
        }}>
          <div style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: '#99bbcf',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{
              width: isMobile ? '30px' : '40px',
              height: isMobile ? '30px' : '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #99bbcf',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Loading Books...
          </div>
        </div>
      ) : error ? (
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '2rem 1rem' : '3rem',
          backgroundColor: '#fee',
          borderRadius: '15px',
          border: '2px solid #fcc'
        }}>
          <p style={{ color: '#e53e3e', fontSize: isMobile ? '1rem' : '1.1rem' }}>{error}</p>
        </div>
      ) : (
        <>
          {/* Books Grid Container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
            gap: isMobile ? '0.75rem' : '1.5rem',
            padding: isMobile ? '0.5rem 0' : '1rem 0'
          }}>
            {displayedBooks.map((book) => {
              const qty = getCartCount(book._id);

              return (
                <div
                  key={book._id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: isMobile ? '12px' : '15px',
                    overflow: 'hidden',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e2e8f0',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                  onMouseEnter={() => setHoveredBook(book._id)}
                  onMouseLeave={() => setHoveredBook(null)}
                  onMouseOver={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(153, 187, 207, 0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                    }
                  }}
                >
                  {/* Image Section */}
                  <div style={{
                    height: isMobile ? '120px' : '180px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#f8fafc',
                    padding: isMobile ? '0.5rem' : '1rem'
                  }}>
                    <img
                      src={hoveredBook === book._id && book.backImage ? book.backImage : book.frontImage}
                      alt={book.bookName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'all 0.5s ease',
                        transform: hoveredBook === book._id ? 'scale(1.05)' : 'scale(1)'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/book-placeholder.png';
                      }}
                    />
                  </div>

                  {/* Content Section */}
                  <div style={{
                    padding: isMobile ? '0.75rem' : '1rem',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Book Title */}
                    <h3 style={{
                      fontSize: isMobile ? '0.85rem' : '0.95rem',
                      fontWeight: '700',
                      color: '#2c3e50',
                      marginBottom: isMobile ? '0.2rem' : '0.3rem',
                      lineHeight: '1.3',
                      height: isMobile ? '2.2rem' : '2.5rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {book.bookName}
                    </h3>

                    {/* Page Number */}
                    <p style={{
                      color: '#718096',
                      fontSize: isMobile ? '0.75rem' : '0.85rem',
                      marginBottom: isMobile ? '0.4rem' : '0.5rem',
                    }}>
                      Pages: {book.pageNumber}
                    </p>

                    {/* Price Section */}
                    <div style={{
                      marginBottom: isMobile ? '0.6rem' : '0.8rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: isMobile ? '4px' : '6px'
                      }}>
                        <span style={{
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          fontWeight: '700',
                          color: '#2c3e50',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}>
                          <FaRupeeSign style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }} />
                          {book.mrpPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons - Updated with BUY icon on left */}
                    <div style={{
                      display: 'flex',
                      gap: isMobile ? '6px' : '8px',
                      marginTop: 'auto'
                    }}>
                     

                      {/* Add to Cart Button */}
                      <button
                        id={`cart-btn-${book._id}`}
                        onClick={() => handleAddToCart(book)}
                        style={{
                          flex: 1,
                          backgroundColor: qty > 0 ? '#99bbcf' : '#2c3e50',
                          color: 'white',
                          border: 'none',
                          padding: isMobile ? '6px 8px' : '8px 12px',
                          borderRadius: isMobile ? '6px' : '8px',
                          fontSize: isMobile ? '0.75rem' : '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: isMobile ? '4px' : '6px',
                          transition: 'all 0.3s ease',
                          minHeight: isMobile ? '32px' : '36px'
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile) {
                            e.currentTarget.style.backgroundColor = qty > 0 ? '#87aec9' : '#1a202c';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile) {
                            e.currentTarget.style.backgroundColor = qty > 0 ? '#99bbcf' : '#2c3e50';
                          }
                        }}
                      >
                        {qty > 0 ? (
                          <IoCart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
                        ) : (
                          <IoCartOutline style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
                        )}
                        {qty > 0 ? `${qty}` : 'Add'}
                      </button>

                      {/* Wishlist Button */}
                      <button
                        id={`wishlist-btn-${book._id}`}
                        onClick={() => handleAddToWatchlist(book)}
                        style={{
                          width: isMobile ? '32px' : '36px',
                          height: isMobile ? '32px' : '36px',
                          borderRadius: isMobile ? '6px' : '8px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          color: '#718096'
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile) {
                            e.currentTarget.style.backgroundColor = '#99bbcf';
                            e.currentTarget.style.borderColor = '#99bbcf';
                            e.currentTarget.style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile) {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                            e.currentTarget.style.color = '#718096';
                          }
                        }}
                      >
                        <FiHeart style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(book)}
                        style={{
                          width: isMobile ? '32px' : '36px',
                          height: isMobile ? '32px' : '36px',
                          borderRadius: isMobile ? '6px' : '8px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          color: '#718096'
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile) {
                            e.currentTarget.style.backgroundColor = '#99bbcf';
                            e.currentTarget.style.borderColor = '#99bbcf';
                            e.currentTarget.style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile) {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                            e.currentTarget.style.color = '#718096';
                          }
                        }}
                      >
                        <FiShare2 style={{ fontSize: isMobile ? '0.9rem' : '1rem' }} />
                      </button>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: isMobile ? '6px' : '10px',
                    right: isMobile ? '6px' : '10px',
                    backgroundColor: book.status === 'active' ? '#c6f6d5' : '#fed7d7',
                    color: book.status === 'active' ? '#22543d' : '#742a2a',
                    padding: isMobile ? '1px 6px' : '2px 8px',
                    borderRadius: '10px',
                    fontSize: isMobile ? '0.6rem' : '0.7rem',
                    fontWeight: '600'
                  }}>
                    {book.status}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination / Show More Controls */}
          {!showAll && totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isMobile ? '0.5rem' : '1rem',
              marginTop: isMobile ? '1.5rem' : '3rem',
              padding: isMobile ? '1rem' : '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: isMobile ? '12px' : '15px',
              border: '1px solid #e2e8f0',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '0.5rem' : '1rem',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '100%' : 'auto'
              }}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: isMobile ? '8px 12px' : '10px 20px',
                    backgroundColor: currentPage === 1 ? '#e2e8f0' : '#99bbcf',
                    color: currentPage === 1 ? '#a0aec0' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                    transition: 'all 0.3s ease',
                    opacity: currentPage === 1 ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile && currentPage !== 1) {
                      e.currentTarget.style.backgroundColor = '#87aec9';
                      e.currentTarget.style.transform = 'translateX(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile && currentPage !== 1) {
                      e.currentTarget.style.backgroundColor = '#99bbcf';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <IoChevronBack /> Prev
                </button>

                <div style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= (isMobile ? 3 : 5)) {
                      pageNum = i + 1;
                    } else if (currentPage <= 2) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageNum = totalPages - (isMobile ? 2 : 4) + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        style={{
                          width: isMobile ? '32px' : '40px',
                          height: isMobile ? '32px' : '40px',
                          borderRadius: '8px',
                          backgroundColor: currentPage === pageNum ? '#2c3e50' : 'white',
                          color: currentPage === pageNum ? 'white' : '#4a5568',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: isMobile ? '0.85rem' : '0.95rem',
                          transition: 'all 0.3s ease',
                          border: currentPage === pageNum ? 'none' : '1px solid #e2e8f0'
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile && currentPage !== pageNum) {
                            e.currentTarget.style.backgroundColor = '#99bbcf';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = '#99bbcf';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile && currentPage !== pageNum) {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#4a5568';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                          }
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: isMobile ? '8px 12px' : '10px 20px',
                    backgroundColor: currentPage === totalPages ? '#e2e8f0' : '#99bbcf',
                    color: currentPage === totalPages ? '#a0aec0' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                    transition: 'all 0.3s ease',
                    opacity: currentPage === totalPages ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile && currentPage !== totalPages) {
                      e.currentTarget.style.backgroundColor = '#87aec9';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile && currentPage !== totalPages) {
                      e.currentTarget.style.backgroundColor = '#99bbcf';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  Next <IoChevronForward />
                </button>
              </div>

              <div style={{
                marginLeft: isMobile ? '0' : '2rem',
                paddingLeft: isMobile ? '0' : '2rem',
                borderLeft: isMobile ? 'none' : '2px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.5rem' : '1rem',
                flexDirection: isMobile ? 'column' : 'row',
                borderTop: isMobile ? '2px solid #e2e8f0' : 'none',
                paddingTop: isMobile ? '1rem' : '0',
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: '#4a5568',
                  fontSize: isMobile ? '0.85rem' : '0.95rem'
                }}>
                  Page {currentPage} of {totalPages}
                </span>

                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: isMobile ? '6px 10px' : '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    color: '#4a5568',
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={30}>30 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          )}

          {/* Show More/Less Button */}
          {filteredBooks.length > itemsPerPage && (
            <div style={{
              textAlign: 'center',
              marginTop: isMobile ? '1.5rem' : '2rem'
            }}>
              <button
                onClick={handleShowAll}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: isMobile ? '10px 20px' : '12px 30px',
                  backgroundColor: '#99bbcf',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(153, 187, 207, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#87aec9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(153, 187, 207, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#99bbcf';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(153, 187, 207, 0.3)';
                  }
                }}
              >
                <TbLayoutGrid style={{ fontSize: isMobile ? '1rem' : '1.2rem' }} />
                {showAll ? 'Show Less' : `Show All Books (${filteredBooks.length})`}
              </button>
            </div>
          )}
        </>
      )}

      {/* Cart Summary Floating Button */}
      {cartItems.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '1rem' : '2rem',
          right: isMobile ? '1rem' : '2rem',
          backgroundColor: '#99bbcf',
          color: 'white',
          padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 25px rgba(153, 187, 207, 0.4)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          fontSize: isMobile ? '0.85rem' : '1rem'
        }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(153, 187, 207, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(153, 187, 207, 0.4)';
            }
          }}
          onClick={() => {
            alert(`You have ${cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in cart!`);
          }}
        >
          <IoCart style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
          <span style={{ fontWeight: '600' }}>
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
          <div style={{
            height: '20px',
            width: '1px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            margin: '0 6px'
          }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <FaRupeeSign />
            {cartItems.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0).toFixed(2)}
          </span>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (min-width: 768px) and (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
          }
        }
        
        @media (min-width: 1025px) and (max-width: 1400px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          h1[style*="fontSize"] {
            font-size: 1.3rem !important;
          }
          
          div[style*="padding: 2rem"] {
            padding: 1rem 0.75rem !important;
          }
          
          div[style*="display: flex; gap: 1rem; marginTop: 3rem"] {
            margin-top: 1rem !important;
          }
        }
        
        @media (max-width: 360px) {
          div[style*="height: 120px"] {
            height: 100px !important;
          }
          
          div[style*="padding: 0.75rem"] {
            padding: 0.5rem !important;
          }
          
          h3[style*="fontSize"] {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}