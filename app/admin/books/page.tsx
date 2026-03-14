// "use client";

// import React, { useState, useEffect } from "react";

// interface Book {
//   _id: string;
//   bookName: string;
//   mrpPrice: number;
//   status: "draft" | "active";
//   pageNumber: number;
//   frontImage: string;
//   backImage: string;
//   createdAt: string;
// }

// export default function BooksManagement() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState<"view" | "edit" | "">("");
//   const [editForm, setEditForm] = useState<Partial<Book>>({});
//   const [editImages, setEditImages] = useState<{ frontImage?: File; backImage?: File }>({});
//   const [imagePreviews, setImagePreviews] = useState<{ frontImage?: string; backImage?: string }>({});
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/books");
//       const data = await response.json();
//       setBooks(Array.isArray(data) ? data : (data.books || []));
//       if (!response.ok) {
//         throw new Error(data.error || "Failed to fetch books");
//       }
//     } catch (error: any) {
//       console.error("Error fetching books:", error);
//       setMessage(error.message || "Error fetching books");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this book? This cannot be undone.")) return;

//     try {
//       const response = await fetch(`/api/books?id=${id}`, {
//         method: "DELETE",
//       });

//       const responseText = await response.text();
//       let data;
      
//       if (responseText.trim() === "") {
//         data = { error: "Empty response from server" };
//       } else {
//         data = JSON.parse(responseText);
//       }

//       if (response.ok) {
//         setMessage("Book deleted successfully");
//         fetchBooks();
//       } else {
//         setMessage(data.error || "Error deleting book");
//       }
//     } catch (error: any) {
//       console.error(error);
//       setMessage(error.message || "Network error. Please try again.");
//     }
//   };

//   const handleStatusChange = async (id: string, newStatus: "draft" | "active") => {
//     try {
//       const response = await fetch(`/api/books?id=${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const responseText = await response.text();
//       console.log("Raw response:", responseText);
      
//       let data;
//       if (responseText.trim() === "") {
//         data = { error: "Backend returned empty response" };
//       } else {
//         try {
//           data = JSON.parse(responseText);
//         } catch (parseError) {
//           console.error("Failed to parse JSON:", parseError);
//           data = { error: "Invalid JSON response from server" };
//         }
//       }

//       if (response.ok) {
//         setMessage("Status updated successfully");
//         fetchBooks();
//       } else {
//         setMessage(data.error || `Error: ${response.status} ${response.statusText}`);
//       }
//     } catch (error: any) {
//       console.error("Network error:", error);
//       setMessage(error.message || "Network error. Please check if backend is running.");
//     }
//   };

//   const openModal = (book: Book, type: "view" | "edit") => {
//     setSelectedBook(book);
//     setModalType(type);
//     setEditForm(book);
//     setEditImages({});
//     setImagePreviews({});
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedBook(null);
//     setModalType("");
//     setEditForm({});
//     setEditImages({});
//     setImagePreviews({});
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (type === 'front') {
//         setEditImages((p) => ({ ...p, frontImage: file }));
//         setImagePreviews((p) => ({ ...p, frontImage: URL.createObjectURL(file) }));
//       } else {
//         setEditImages((p) => ({ ...p, backImage: file }));
//         setImagePreviews((p) => ({ ...p, backImage: URL.createObjectURL(file) }));
//       }
//     }
//   };

//   const removeImage = (type: 'front' | 'back') => {
//     if (type === 'front') {
//       setEditImages((p) => ({ ...p, frontImage: undefined }));
//       setImagePreviews((p) => ({ ...p, frontImage: undefined }));
//     } else {
//       setEditImages((p) => ({ ...p, backImage: undefined }));
//       setImagePreviews((p) => ({ ...p, backImage: undefined }));
//     }
//   };

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedBook) return;

//     try {
//       const formData = new FormData();

//       formData.append("bookName", editForm.bookName || "");
//       formData.append("mrpPrice", String(editForm.mrpPrice || 0));
//       formData.append("pageNumber", String(editForm.pageNumber || 0));
//       formData.append("status", editForm.status || "draft");

//       if (editImages.frontImage) formData.append("frontImage", editImages.frontImage);
//       if (editImages.backImage) formData.append("backImage", editImages.backImage);

//       const response = await fetch(`/api/books?id=${selectedBook._id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const responseText = await response.text();
//       let data;
      
//       if (responseText.trim() === "") {
//         data = { error: "Empty response from server" };
//       } else {
//         data = JSON.parse(responseText);
//       }

//       if (response.ok) {
//         setMessage("Book updated successfully");
//         fetchBooks();
//         closeModal();
//       } else {
//         setMessage(data.error || "Error updating book");
//       }
//     } catch (error: any) {
//       console.error(error);
//       setMessage(error.message || "Network error");
//     }
//   };

//   if (loading) return <div style={{
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     fontSize: "18px",
//     color: "#666"
//   }}>Loading books...</div>;

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
//       <div style={{ marginBottom: "30px" }}>
//         <h1 style={{ fontSize: "28px", color: "#333", margin: 0 }}>Books Management</h1>
//       </div>

//       {message && (
//         <div style={{
//           padding: "10px 15px",
//           marginBottom: "20px",
//           borderRadius: "5px",
//           backgroundColor: message.toLowerCase().includes("success") ? "#d4edda" : "#f8d7da",
//           color: message.toLowerCase().includes("success") ? "#155724" : "#721c24",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           border: `1px solid ${message.toLowerCase().includes("success") ? "#c3e6cb" : "#f5c6cb"}`
//         }}>
//           <span>{message}</span>
//           <button 
//             onClick={() => setMessage("")}
//             style={{
//               background: "none",
//               border: "none",
//               fontSize: "20px",
//               cursor: "pointer",
//               color: "inherit",
//               padding: 0,
//               width: "24px",
//               height: "24px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center"
//             }}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       <div style={{
//         backgroundColor: "white",
//         borderRadius: "10px",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         overflow: "hidden"
//       }}>
//         <table style={{
//           width: "100%",
//           borderCollapse: "collapse"
//         }}>
//           <thead>
//             <tr style={{ backgroundColor: "#f8f9fa" }}>
//               <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6", fontWeight: "600" }}>Book Name</th>
//               <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6", fontWeight: "600" }}>Page Number</th>
//               <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6", fontWeight: "600" }}>MRP Price</th>
//               <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6", fontWeight: "600" }}>Status</th>
//               <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6", fontWeight: "600" }}>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {books.length === 0 ? (
//               <tr>
//                 <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#666" }}>
//                   No books found. Add some books first.
//                 </td>
//               </tr>
//             ) : (
//               books.map((book) => (
//                 <tr key={book._id} style={{ borderBottom: "1px solid #dee2e6", transition: "background-color 0.2s" }}>
//                   <td style={{ padding: "15px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                       <img 
//                         src={book.frontImage} 
//                         style={{
//                           width: "40px",
//                           height: "50px",
//                           objectFit: "cover",
//                           borderRadius: "4px",
//                           border: "1px solid #ddd"
//                         }} 
//                         alt={book.bookName} 
//                       />
//                       <span style={{ fontWeight: "500" }}>{book.bookName}</span>
//                     </div>
//                   </td>

//                   <td style={{ padding: "15px" }}>{book.pageNumber}</td>
//                   <td style={{ padding: "15px" }}>₹{book.mrpPrice}</td>

//                   <td style={{ padding: "15px" }}>
//                     <span style={{
//                       padding: "5px 10px",
//                       borderRadius: "20px",
//                       fontSize: "12px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       backgroundColor: book.status === "active" ? "#d4edda" : "#fff3cd",
//                       color: book.status === "active" ? "#155724" : "#856404"
//                     }}>
//                       {book.status}
//                     </span>
//                   </td>

//                   <td style={{ padding: "15px" }}>
//                     <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
//                       <button 
//                         onClick={() => openModal(book, "view")}
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#17a2b8",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                           transition: "background-color 0.2s"
//                         }}
//                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#138496"}
//                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#17a2b8"}
//                       >
//                         👁️ View
//                       </button>

//                       <button 
//                         onClick={() => openModal(book, "edit")}
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#28a745",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                           transition: "background-color 0.2s"
//                         }}
//                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#218838"}
//                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#28a745"}
//                       >
//                         ✏️ Edit
//                       </button>

//                       <button 
//                         onClick={() => handleDelete(book._id)}
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#dc3545",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                           transition: "background-color 0.2s"
//                         }}
//                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#c82333"}
//                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#dc3545"}
//                       >
//                         🗑️ Delete
//                       </button>

//                       <select
//                         value={book.status}
//                         onChange={(e) => handleStatusChange(book._id, e.target.value as "draft" | "active")}
//                         style={{
//                           padding: "6px 12px",
//                           border: "1px solid #ddd",
//                           borderRadius: "4px",
//                           backgroundColor: "white",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                           minWidth: "100px"
//                         }}
//                       >
//                         <option value="draft">Draft</option>
//                         <option value="active">Active</option>
//                       </select>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {showModal && selectedBook && (
//         <div 
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//             padding: "20px"
//           }}
//           onClick={closeModal}
//         >
//           <div 
//             style={{
//               backgroundColor: "white",
//               borderRadius: "10px",
//               width: "100%",
//               maxWidth: "600px",
//               maxHeight: "80vh",
//               overflowY: "auto",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div style={{
//               padding: "20px",
//               borderBottom: "1px solid #dee2e6",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               position: "sticky",
//               top: 0,
//               backgroundColor: "white",
//               zIndex: 1
//             }}>
//               <h2 style={{ margin: 0, fontSize: "20px" }}>{modalType === "view" ? "Book Details" : "Edit Book"}</h2>
//               <button 
//                 onClick={closeModal}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   fontSize: "24px",
//                   cursor: "pointer",
//                   color: "#666",
//                   padding: "0",
//                   width: "30px",
//                   height: "30px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: "50%",
//                   transition: "background-color 0.2s"
//                 }}
//                 onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
//                 onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
//               >
//                 ×
//               </button>
//             </div>

//             <div style={{ padding: "20px" }}>
//               {modalType === "view" ? (
//                 <>
//                   <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
//                     <div style={{ flex: 1 }}>
//                       <h4 style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>Front Cover</h4>
//                       <img 
//                         src={selectedBook.frontImage} 
//                         style={{
//                           width: "100%",
//                           height: "200px",
//                           objectFit: "contain",
//                           border: "1px solid #ddd",
//                           borderRadius: "5px",
//                           backgroundColor: "#f8f9fa"
//                         }} 
//                         alt="Front Cover" 
//                       />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <h4 style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>Back Cover</h4>
//                       <img 
//                         src={selectedBook.backImage} 
//                         style={{
//                           width: "100%",
//                           height: "200px",
//                           objectFit: "contain",
//                           border: "1px solid #ddd",
//                           borderRadius: "5px",
//                           backgroundColor: "#f8f9fa"
//                         }} 
//                         alt="Back Cover" 
//                       />
//                     </div>
//                   </div>

//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Book Name:</label>
//                       <div style={{ margin: "5px 0 0 0", padding: "8px", backgroundColor: "#f8f9fa", borderRadius: "4px", minHeight: "36px", display: "flex", alignItems: "center" }}>
//                         {selectedBook.bookName}
//                       </div>
//                     </div>
//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Page Number:</label>
//                       <div style={{ margin: "5px 0 0 0", padding: "8px", backgroundColor: "#f8f9fa", borderRadius: "4px", minHeight: "36px", display: "flex", alignItems: "center" }}>
//                         {selectedBook.pageNumber}
//                       </div>
//                     </div>
//                   </div>

//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>MRP Price:</label>
//                       <div style={{ margin: "5px 0 0 0", padding: "8px", backgroundColor: "#f8f9fa", borderRadius: "4px", minHeight: "36px", display: "flex", alignItems: "center" }}>
//                         ₹{selectedBook.mrpPrice}
//                       </div>
//                     </div>
//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Status:</label>
//                       <div style={{ margin: "5px 0 0 0", padding: "8px", backgroundColor: "#f8f9fa", borderRadius: "4px", minHeight: "36px", display: "flex", alignItems: "center" }}>
//                         <span style={{
//                           padding: "3px 8px",
//                           borderRadius: "20px",
//                           fontSize: "12px",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           backgroundColor: selectedBook.status === "active" ? "#d4edda" : "#fff3cd",
//                           color: selectedBook.status === "active" ? "#155724" : "#856404"
//                         }}>
//                           {selectedBook.status}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Created At:</label>
//                     <div style={{ margin: "5px 0 0 0", padding: "8px", backgroundColor: "#f8f9fa", borderRadius: "4px", minHeight: "36px", display: "flex", alignItems: "center" }}>
//                       {new Date(selectedBook.createdAt).toLocaleDateString()} {new Date(selectedBook.createdAt).toLocaleTimeString()}
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <form onSubmit={handleEditSubmit}>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Book Name</label>
//                       <input
//                         type="text"
//                         value={editForm.bookName || ""}
//                         onChange={(e) => setEditForm({ ...editForm, bookName: e.target.value })}
//                         style={{
//                           width: "100%",
//                           padding: "8px",
//                           border: "1px solid #ddd",
//                           borderRadius: "4px",
//                           boxSizing: "border-box",
//                           fontSize: "14px"
//                         }}
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Page Number</label>
//                       <input
//                         type="number"
//                         value={editForm.pageNumber || ""}
//                         onChange={(e) => setEditForm({ ...editForm, pageNumber: parseInt(e.target.value) || 0 })}
//                         style={{
//                           width: "100%",
//                           padding: "8px",
//                           border: "1px solid #ddd",
//                           borderRadius: "4px",
//                           boxSizing: "border-box",
//                           fontSize: "14px"
//                         }}
//                         min="1"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>MRP Price</label>
//                       <input
//                         type="number"
//                         step="0.01"
//                         value={editForm.mrpPrice || ""}
//                         onChange={(e) => setEditForm({ ...editForm, mrpPrice: parseFloat(e.target.value) || 0 })}
//                         style={{
//                           width: "100%",
//                           padding: "8px",
//                           border: "1px solid #ddd",
//                           borderRadius: "4px",
//                           boxSizing: "border-box",
//                           fontSize: "14px"
//                         }}
//                         min="0"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Status</label>
//                       <select
//                         value={editForm.status || "draft"}
//                         onChange={(e) => setEditForm({ ...editForm, status: e.target.value as "draft" | "active" })}
//                         style={{
//                           width: "100%",
//                           padding: "8px",
//                           border: "1px solid #ddd",
//                           borderRadius: "4px",
//                           backgroundColor: "white",
//                           fontSize: "14px"
//                         }}
//                       >
//                         <option value="draft">Draft</option>
//                         <option value="active">Active</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "20px" }}>
//                     <h4 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Update Images</h4>
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
//                       <div>
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Front Image</label>
//                         {imagePreviews.frontImage ? (
//                           <div style={{ position: "relative", marginBottom: "10px" }}>
//                             <img 
//                               src={imagePreviews.frontImage} 
//                               style={{
//                                 width: "100%",
//                                 height: "150px",
//                                 objectFit: "contain",
//                                 border: "1px solid #ddd",
//                                 borderRadius: "5px",
//                                 backgroundColor: "#f8f9fa"
//                               }} 
//                               alt="Front Preview" 
//                             />
//                             <button 
//                               type="button"
//                               onClick={() => removeImage('front')}
//                               style={{
//                                 position: "absolute",
//                                 top: "5px",
//                                 right: "5px",
//                                 background: "#dc3545",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "50%",
//                                 width: "25px",
//                                 height: "25px",
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 fontSize: "14px",
//                                 padding: 0
//                               }}
//                             >
//                               ×
//                             </button>
//                           </div>
//                         ) : (
//                           <div 
//                             style={{
//                               border: "2px dashed #ddd",
//                               borderRadius: "5px",
//                               padding: "20px",
//                               textAlign: "center",
//                               cursor: "pointer",
//                               marginBottom: "10px",
//                               backgroundColor: "#f8f9fa",
//                               transition: "border-color 0.2s"
//                             }}
//                             onClick={() => document.getElementById('frontImageInput')?.click()}
//                             onMouseOver={(e) => e.currentTarget.style.borderColor = "#007bff"}
//                             onMouseOut={(e) => e.currentTarget.style.borderColor = "#ddd"}
//                           >
//                             <div style={{ fontSize: "24px", color: "#666", marginBottom: "5px" }}>📷</div>
//                             <div style={{ color: "#666", fontSize: "14px" }}>Click to upload front image</div>
//                           </div>
//                         )}
//                         <input
//                           id="frontImageInput"
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => handleImageChange(e, 'front')}
//                           style={{ display: "none" }}
//                         />
//                       </div>

//                       <div>
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Back Image</label>
//                         {imagePreviews.backImage ? (
//                           <div style={{ position: "relative", marginBottom: "10px" }}>
//                             <img 
//                               src={imagePreviews.backImage} 
//                               style={{
//                                 width: "100%",
//                                 height: "150px",
//                                 objectFit: "contain",
//                                 border: "1px solid #ddd",
//                                 borderRadius: "5px",
//                                 backgroundColor: "#f8f9fa"
//                               }} 
//                               alt="Back Preview" 
//                             />
//                             <button 
//                               type="button"
//                               onClick={() => removeImage('back')}
//                               style={{
//                                 position: "absolute",
//                                 top: "5px",
//                                 right: "5px",
//                                 background: "#dc3545",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "50%",
//                                 width: "25px",
//                                 height: "25px",
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 fontSize: "14px",
//                                 padding: 0
//                               }}
//                             >
//                               ×
//                             </button>
//                           </div>
//                         ) : (
//                           <div 
//                             style={{
//                               border: "2px dashed #ddd",
//                               borderRadius: "5px",
//                               padding: "20px",
//                               textAlign: "center",
//                               cursor: "pointer",
//                               marginBottom: "10px",
//                               backgroundColor: "#f8f9fa",
//                               transition: "border-color 0.2s"
//                             }}
//                             onClick={() => document.getElementById('backImageInput')?.click()}
//                             onMouseOver={(e) => e.currentTarget.style.borderColor = "#007bff"}
//                             onMouseOut={(e) => e.currentTarget.style.borderColor = "#ddd"}
//                           >
//                             <div style={{ fontSize: "24px", color: "#666", marginBottom: "5px" }}>📸</div>
//                             <div style={{ color: "#666", fontSize: "14px" }}>Click to upload back image</div>
//                           </div>
//                         )}
//                         <input
//                           id="backImageInput"
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => handleImageChange(e, 'back')}
//                           style={{ display: "none" }}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <button 
//                     type="submit"
//                     style={{
//                       padding: "10px 20px",
//                       backgroundColor: "#28a745",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                       fontSize: "16px",
//                       fontWeight: "500",
//                       width: "100%",
//                       transition: "background-color 0.2s"
//                     }}
//                     onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#218838"}
//                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#28a745"}
//                   >
//                     Save Changes
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }













"use client";

import React, { useState, useEffect } from "react";

interface Book {
  _id: string;
  bookName: string;
  mrpPrice: number;
  status: "draft" | "active";
  pageNumber: number;
  frontImage: string;
  backImage: string;
  createdAt: string;
}

export default function BooksManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"view" | "edit" | "">("");
  const [editForm, setEditForm] = useState<Partial<Book>>({});
  const [editImages, setEditImages] = useState<{ frontImage?: File; backImage?: File }>({});
  const [imagePreviews, setImagePreviews] = useState<{ frontImage?: string; backImage?: string }>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(Array.isArray(data) ? data : (data.books || []));
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch books");
      }
    } catch (error: any) {
      console.error("Error fetching books:", error);
      setMessage(error.message || "Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book? This cannot be undone.")) return;

    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: "DELETE",
      });

      const responseText = await response.text();
      let data;
      
      if (responseText.trim() === "") {
        data = { error: "Empty response from server" };
      } else {
        data = JSON.parse(responseText);
      }

      if (response.ok) {
        setMessage("Book deleted successfully");
        fetchBooks();
      } else {
        setMessage(data.error || "Error deleting book");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "Network error. Please try again.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: "draft" | "active") => {
    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      let data;
      if (responseText.trim() === "") {
        data = { error: "Backend returned empty response" };
      } else {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError);
          data = { error: "Invalid JSON response from server" };
        }
      }

      if (response.ok) {
        setMessage("Status updated successfully");
        fetchBooks();
      } else {
        setMessage(data.error || `Error: ${response.status} ${response.statusText}`);
      }
    } catch (error: any) {
      console.error("Network error:", error);
      setMessage(error.message || "Network error. Please check if backend is running.");
    }
  };

  const openModal = (book: Book, type: "view" | "edit") => {
    setSelectedBook(book);
    setModalType(type);
    setEditForm(book);
    setEditImages({});
    setImagePreviews({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setModalType("");
    setEditForm({});
    setEditImages({});
    setImagePreviews({});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'front') {
        setEditImages((p) => ({ ...p, frontImage: file }));
        setImagePreviews((p) => ({ ...p, frontImage: URL.createObjectURL(file) }));
      } else {
        setEditImages((p) => ({ ...p, backImage: file }));
        setImagePreviews((p) => ({ ...p, backImage: URL.createObjectURL(file) }));
      }
    }
  };

  const removeImage = (type: 'front' | 'back') => {
    if (type === 'front') {
      setEditImages((p) => ({ ...p, frontImage: undefined }));
      setImagePreviews((p) => ({ ...p, frontImage: undefined }));
    } else {
      setEditImages((p) => ({ ...p, backImage: undefined }));
      setImagePreviews((p) => ({ ...p, backImage: undefined }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) return;

    try {
      const formData = new FormData();

      formData.append("bookName", editForm.bookName || "");
      formData.append("mrpPrice", String(editForm.mrpPrice || 0));
      formData.append("pageNumber", String(editForm.pageNumber || 0));
      formData.append("status", editForm.status || "draft");

      if (editImages.frontImage) formData.append("frontImage", editImages.frontImage);
      if (editImages.backImage) formData.append("backImage", editImages.backImage);

      const response = await fetch(`/api/books?id=${selectedBook._id}`, {
        method: "PUT",
        body: formData,
      });

      const responseText = await response.text();
      let data;
      
      if (responseText.trim() === "") {
        data = { error: "Empty response from server" };
      } else {
        data = JSON.parse(responseText);
      }

      if (response.ok) {
        setMessage("Book updated successfully");
        fetchBooks();
        closeModal();
      } else {
        setMessage(data.error || "Error updating book");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "Network error");
    }
  };

  if (loading) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "16px",
      color: "#666"
    }}>Loading books...</div>
  );

  return (
    <div style={{ 
      padding: "12px", 
      maxWidth: "100%", 
      margin: "0 auto", 
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <div style={{ 
        marginBottom: "20px",
        padding: "0 4px"
      }}>
        <h1 style={{ 
          fontSize: "24px", 
          color: "#333", 
          margin: 0,
          fontWeight: "600"
        }}>Books Management</h1>
      </div>

      {message && (
        <div style={{
          padding: "12px 16px",
          marginBottom: "16px",
          borderRadius: "8px",
          backgroundColor: message.toLowerCase().includes("success") ? "#d4edda" : "#f8d7da",
          color: message.toLowerCase().includes("success") ? "#155724" : "#721c24",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: `1px solid ${message.toLowerCase().includes("success") ? "#c3e6cb" : "#f5c6cb"}`,
          fontSize: "14px"
        }}>
          <span>{message}</span>
          <button 
            onClick={() => setMessage("")}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "inherit",
              padding: "0 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "44px",
              minHeight: "44px"
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Mobile Card View */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        {books.length === 0 ? (
          <div style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "#666",
            backgroundColor: "white",
            borderRadius: "12px",
            fontSize: "16px"
          }}>
            No books found. Add some books first.
          </div>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: "1px solid #eee"
              }}
            >
              {/* Book Header with Image and Title */}
              <div style={{
                display: "flex",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <img 
                  src={book.frontImage} 
                  style={{
                    width: "60px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }} 
                  alt={book.bookName} 
                />
                <div style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}>
                  <h3 style={{
                    margin: "0 0 4px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    lineHeight: "1.3"
                  }}>{book.bookName}</h3>
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    flexWrap: "wrap"
                  }}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "16px",
                      fontSize: "11px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      backgroundColor: book.status === "active" ? "#d4edda" : "#fff3cd",
                      color: book.status === "active" ? "#155724" : "#856404"
                    }}>
                      {book.status}
                    </span>
                    <span style={{
                      fontSize: "13px",
                      color: "#666"
                    }}>📄 {book.pageNumber} pages</span>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px"
              }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#666", marginBottom: "2px" }}>MRP Price</div>
                  <div style={{ fontSize: "15px", fontWeight: "600", color: "#28a745" }}>₹{book.mrpPrice}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#666", marginBottom: "2px" }}>Created</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {new Date(book.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Touch Optimized */}
              <div style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap"
              }}>
                <button 
                  onClick={() => openModal(book, "view")}
                  style={{
                    flex: 1,
                    padding: "12px 8px",
                    backgroundColor: "#17a2b8",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    minHeight: "44px",
                    touchAction: "manipulation"
                  }}
                >
                  👁️ View
                </button>

                <button 
                  onClick={() => openModal(book, "edit")}
                  style={{
                    flex: 1,
                    padding: "12px 8px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    minHeight: "44px",
                    touchAction: "manipulation"
                  }}
                >
                  ✏️ Edit
                </button>

                <button 
                  onClick={() => handleDelete(book._id)}
                  style={{
                    flex: 1,
                    padding: "12px 8px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    minHeight: "44px",
                    touchAction: "manipulation"
                  }}
                >
                  🗑️ Delete
                </button>
              </div>

              {/* Status Selector */}
              <div style={{
                marginTop: "12px"
              }}>
                <select
                  value={book.status}
                  onChange={(e) => handleStatusChange(book._id, e.target.value as "draft" | "active")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    minHeight: "44px",
                    touchAction: "manipulation"
                  }}
                >
                  <option value="draft">📝 Draft</option>
                  <option value="active">✅ Active</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL - Mobile Optimized */}
      {showModal && selectedBook && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            zIndex: 1000,
            padding: "0"
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 -5px 20px rgba(0,0,0,0.2)",
              animation: "slideUp 0.3s ease-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style jsx>{`
              @keyframes slideUp {
                from {
                  transform: translateY(100%);
                }
                to {
                  transform: translateY(0);
                }
              }
            `}</style>

            <div style={{
              padding: "20px",
              borderBottom: "1px solid #dee2e6",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1
            }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
                {modalType === "view" ? "Book Details" : "Edit Book"}
              </h2>
              <button 
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#666",
                  padding: "0",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  touchAction: "manipulation"
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "20px" }}>
              {modalType === "view" ? (
                <>
                  {/* Images Section */}
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column",
                    gap: "15px", 
                    marginBottom: "20px" 
                  }}>
                    <div>
                      <h4 style={{ 
                        marginBottom: "8px", 
                        fontSize: "14px", 
                        color: "#666",
                        fontWeight: "500" 
                      }}>Front Cover</h4>
                      <img 
                        src={selectedBook.frontImage} 
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          backgroundColor: "#f8f9fa"
                        }} 
                        alt="Front Cover" 
                      />
                    </div>
                    <div>
                      <h4 style={{ 
                        marginBottom: "8px", 
                        fontSize: "14px", 
                        color: "#666",
                        fontWeight: "500" 
                      }}>Back Cover</h4>
                      <img 
                        src={selectedBook.backImage} 
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          backgroundColor: "#f8f9fa"
                        }} 
                        alt="Back Cover" 
                      />
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div style={{
                      padding: "12px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px"
                    }}>
                      <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>Book Name</div>
                      <div style={{ fontSize: "16px", fontWeight: "500" }}>{selectedBook.bookName}</div>
                    </div>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px"
                    }}>
                      <div style={{
                        padding: "12px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px"
                      }}>
                        <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>Page Number</div>
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>{selectedBook.pageNumber}</div>
                      </div>
                      <div style={{
                        padding: "12px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px"
                      }}>
                        <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>MRP Price</div>
                        <div style={{ fontSize: "16px", fontWeight: "500", color: "#28a745" }}>₹{selectedBook.mrpPrice}</div>
                      </div>
                    </div>

                    <div style={{
                      padding: "12px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px"
                    }}>
                      <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>Created At</div>
                      <div style={{ fontSize: "14px" }}>
                        {new Date(selectedBook.createdAt).toLocaleDateString()} at {new Date(selectedBook.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleEditSubmit}>
                  {/* Edit Form Fields */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div>
                      <label style={{ 
                        display: "block", 
                        marginBottom: "6px", 
                        fontWeight: "500", 
                        fontSize: "14px",
                        color: "#333"
                      }}>Book Name</label>
                      <input
                        type="text"
                        value={editForm.bookName || ""}
                        onChange={(e) => setEditForm({ ...editForm, bookName: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          boxSizing: "border-box",
                          fontSize: "16px",
                          minHeight: "44px"
                        }}
                        required
                      />
                    </div>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px"
                    }}>
                      <div>
                        <label style={{ 
                          display: "block", 
                          marginBottom: "6px", 
                          fontWeight: "500", 
                          fontSize: "14px",
                          color: "#333"
                        }}>Page Number</label>
                        <input
                          type="number"
                          value={editForm.pageNumber || ""}
                          onChange={(e) => setEditForm({ ...editForm, pageNumber: parseInt(e.target.value) || 0 })}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                            fontSize: "16px",
                            minHeight: "44px"
                          }}
                          min="1"
                          required
                        />
                      </div>

                      <div>
                        <label style={{ 
                          display: "block", 
                          marginBottom: "6px", 
                          fontWeight: "500", 
                          fontSize: "14px",
                          color: "#333"
                        }}>MRP Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.mrpPrice || ""}
                          onChange={(e) => setEditForm({ ...editForm, mrpPrice: parseFloat(e.target.value) || 0 })}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                            fontSize: "16px",
                            minHeight: "44px"
                          }}
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ 
                        display: "block", 
                        marginBottom: "6px", 
                        fontWeight: "500", 
                        fontSize: "14px",
                        color: "#333"
                      }}>Status</label>
                      <select
                        value={editForm.status || "draft"}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as "draft" | "active" })}
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          fontSize: "16px",
                          minHeight: "44px"
                        }}
                      >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                      </select>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                      <h4 style={{ 
                        marginBottom: "12px", 
                        fontSize: "16px", 
                        color: "#333",
                        fontWeight: "600" 
                      }}>Update Images</h4>
                      
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                      }}>
                        {/* Front Image */}
                        <div>
                          <label style={{ 
                            display: "block", 
                            marginBottom: "8px", 
                            fontWeight: "500", 
                            fontSize: "14px",
                            color: "#333"
                          }}>Front Image</label>
                          {imagePreviews.frontImage ? (
                            <div style={{ position: "relative", marginBottom: "8px" }}>
                              <img 
                                src={imagePreviews.frontImage} 
                                style={{
                                  width: "100%",
                                  height: "180px",
                                  objectFit: "contain",
                                  border: "1px solid #ddd",
                                  borderRadius: "8px",
                                  backgroundColor: "#f8f9fa"
                                }} 
                                alt="Front Preview" 
                              />
                              <button 
                                type="button"
                                onClick={() => removeImage('front')}
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "8px",
                                  background: "#dc3545",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "36px",
                                  height: "36px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "20px",
                                  padding: 0,
                                  touchAction: "manipulation"
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div 
                              style={{
                                border: "2px dashed #ddd",
                                borderRadius: "8px",
                                padding: "24px",
                                textAlign: "center",
                                cursor: "pointer",
                                marginBottom: "8px",
                                backgroundColor: "#f8f9fa",
                                minHeight: "100px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                touchAction: "manipulation"
                              }}
                              onClick={() => document.getElementById('frontImageInput')?.click()}
                            >
                              <div style={{ fontSize: "32px", color: "#666", marginBottom: "8px" }}>📷</div>
                              <div style={{ color: "#666", fontSize: "14px" }}>Tap to upload front image</div>
                            </div>
                          )}
                          <input
                            id="frontImageInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'front')}
                            style={{ display: "none" }}
                          />
                        </div>

                        {/* Back Image */}
                        <div>
                          <label style={{ 
                            display: "block", 
                            marginBottom: "8px", 
                            fontWeight: "500", 
                            fontSize: "14px",
                            color: "#333"
                          }}>Back Image</label>
                          {imagePreviews.backImage ? (
                            <div style={{ position: "relative", marginBottom: "8px" }}>
                              <img 
                                src={imagePreviews.backImage} 
                                style={{
                                  width: "100%",
                                  height: "180px",
                                  objectFit: "contain",
                                  border: "1px solid #ddd",
                                  borderRadius: "8px",
                                  backgroundColor: "#f8f9fa"
                                }} 
                                alt="Back Preview" 
                              />
                              <button 
                                type="button"
                                onClick={() => removeImage('back')}
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "8px",
                                  background: "#dc3545",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "36px",
                                  height: "36px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "20px",
                                  padding: 0,
                                  touchAction: "manipulation"
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div 
                              style={{
                                border: "2px dashed #ddd",
                                borderRadius: "8px",
                                padding: "24px",
                                textAlign: "center",
                                cursor: "pointer",
                                marginBottom: "8px",
                                backgroundColor: "#f8f9fa",
                                minHeight: "100px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                touchAction: "manipulation"
                              }}
                              onClick={() => document.getElementById('backImageInput')?.click()}
                            >
                              <div style={{ fontSize: "32px", color: "#666", marginBottom: "8px" }}>📸</div>
                              <div style={{ color: "#666", fontSize: "14px" }}>Tap to upload back image</div>
                            </div>
                          )}
                          <input
                            id="backImageInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'back')}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      style={{
                        padding: "14px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "600",
                        width: "100%",
                        minHeight: "48px",
                        marginTop: "8px",
                        touchAction: "manipulation"
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}