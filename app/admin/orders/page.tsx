"use client";

import React, { useMemo, useState, useEffect } from "react";
import "../ordermanage.css";

type Product = {
  id: string;
  title: string;
  qty: number;
  price: number;
  image: string;
  author: string;
};

type Address = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type PriceDetails = {
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
};

type Order = {
  id: string;
  orderNumber: string;
  userName: string;
  email: string;
  phone: string;
  paidAmount: number;
  booksCount: number;
  products: Product[];
  paymentStatus: "success" | "failed" | "pending";
  orderDate: string;
  billingAddress: Address;
  shippingAddress: Address;
  priceDetails: PriceDetails;
  status: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export default function OrderManage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching orders from /api/orders...');
      
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 Raw API Response:', data);
      
      let ordersArray: any[] = [];
      
      if (Array.isArray(data)) {
        ordersArray = data;
      } else if (data.orders && Array.isArray(data.orders)) {
        ordersArray = data.orders;
      } else if (data.data && Array.isArray(data.data)) {
        ordersArray = data.data;
      } else if (data.success && data.orders) {
        ordersArray = data.orders;
      }
      
      console.log(`🔄 Processing ${ordersArray.length} orders...`);
      
      const transformedOrders: Order[] = ordersArray.map((order) => {
        console.log('📦 Processing order:', order);
        
        const orderId = order._id?.$oid || order._id || order.orderNumber;
        const items = order.items || [];
        
        // Helper function to safely extract address
        const extractAddress = (addressObj: any): Address => {
          if (!addressObj) {
            return {
              name: order.userName || 'N/A',
              email: order.userEmail || 'N/A',
              phone: order.userPhone || 'N/A',
              address: 'N/A',
              city: 'N/A',
              state: 'N/A',
              pincode: 'N/A'
            };
          }
          
          return {
            name: addressObj.name || order.userName || 'N/A',
            email: addressObj.email || order.userEmail || 'N/A',
            phone: addressObj.phone || order.userPhone || 'N/A',
            address: addressObj.address || 'N/A',
            city: addressObj.city || 'N/A',
            state: addressObj.state || 'N/A',
            pincode: addressObj.pincode || 'N/A'
          };
        };
        
        // Helper function to extract price details
        const extractPriceDetails = (priceObj: any): PriceDetails => {
          if (!priceObj) {
            const subtotal = items.reduce((sum: number, item: any) => 
              sum + ((item.salePrice || 0) * (item.quantity || 0)), 0
            );
            const gst = subtotal * 0.18;
            const shipping = subtotal > 500 ? 0 : 40;
            return {
              subtotal,
              gst,
              shipping,
              total: subtotal + gst + shipping
            };
          }
          
          return {
            subtotal: priceObj.subtotal || 0,
            gst: priceObj.gst || 0,
            shipping: priceObj.shipping || 0,
            total: priceObj.total || 0
          };
        };
        
        const billingAddress = extractAddress(order.billingAddress);
        const shippingAddress = extractAddress(order.shippingAddress || order.billingAddress);
        const priceDetails = extractPriceDetails(order.priceDetails);
        
        return {
          id: orderId,
          orderNumber: order.orderNumber || orderId,
          userName: order.userName || billingAddress.name || "Unknown",
          email: order.userEmail || billingAddress.email || "N/A",
          phone: order.userPhone || billingAddress.phone || "N/A",
          paidAmount: priceDetails.total,
          booksCount: items.reduce((sum: number, item: any) => 
            sum + (item.quantity || 0), 0
          ),
          products: items.map((item: any) => ({
            id: item.bookId || item._id?.$oid || item._id || "",
            title: item.bookName || "Unknown Book",
            qty: item.quantity || 0,
            price: item.salePrice || 0,
            image: item.image1 || '/default-book.jpg',
            author: item.authorName || 'Unknown Author'
          })),
          paymentStatus: order.paymentStatus === "paid" ? "success" : 
                        order.paymentStatus === "failed" ? "failed" : "pending",
          orderDate: order.createdAt?.$date 
            ? new Date(order.createdAt.$date).toISOString().split('T')[0]
            : order.createdAt
            ? new Date(order.createdAt).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          billingAddress,
          shippingAddress,
          priceDetails,
          status: order.status || "pending",
          razorpayOrderId: order.razorpayOrderId || "N/A",
          razorpayPaymentId: order.razorpayPaymentId || "N/A",
          razorpaySignature: order.razorpaySignature || "N/A"
        };
      });
      
      console.log('✅ Transformed orders:', transformedOrders);
      console.log('📋 Sample order details:', transformedOrders[0]);
      
      setOrders(transformedOrders);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders?orderId=${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update order');
      
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
      );
      
      alert(`✅ Order status updated to: ${newStatus}`);
    } catch (err) {
      console.error('Error updating order:', err);
      alert('❌ Failed to update order status');
    }
  };

  const viewOrderDetails = (order: Order) => {
    console.log('👁️ Viewing order details:', order);
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const closeModal = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  const printOrder = () => {
    if (!selectedOrder) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order #${selectedOrder.orderNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
          .row { display: flex; justify-content: space-between; margin: 10px 0; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
          .total { font-weight: bold; font-size: 1.2em; }
        </style>
      </head>
      <body>
        <h1>Order Invoice</h1>
        <div class="section">
          <h2>Order Information</h2>
          <p><strong>Order Number:</strong> ${selectedOrder.orderNumber}</p>
          <p><strong>Order Date:</strong> ${selectedOrder.orderDate}</p>
          <p><strong>Status:</strong> ${selectedOrder.status}</p>
          <p><strong>Payment Status:</strong> ${selectedOrder.paymentStatus}</p>
        </div>
        
        <div class="section">
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> ${selectedOrder.userName}</p>
          <p><strong>Email:</strong> ${selectedOrder.email}</p>
          <p><strong>Phone:</strong> ${selectedOrder.phone}</p>
        </div>
        
        <div class="section">
          <h2>Shipping Address</h2>
          <p>${selectedOrder.shippingAddress.name}</p>
          <p>${selectedOrder.shippingAddress.address}</p>
          <p>${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state} - ${selectedOrder.shippingAddress.pincode}</p>
          <p>Phone: ${selectedOrder.shippingAddress.phone}</p>
        </div>
        
        <div class="section">
          <h2>Order Items</h2>
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${selectedOrder.products.map(p => `
                <tr>
                  <td>${p.title}</td>
                  <td>${p.author}</td>
                  <td>${p.qty}</td>
                  <td>₹${p.price}</td>
                  <td>₹${(p.price * p.qty).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2>Price Breakdown</h2>
          <div class="row"><span>Subtotal:</span><span>₹${selectedOrder.priceDetails.subtotal.toFixed(2)}</span></div>
          <div class="row"><span>GST (18%):</span><span>₹${selectedOrder.priceDetails.gst.toFixed(2)}</span></div>
          <div class="row"><span>Shipping:</span><span>₹${selectedOrder.priceDetails.shipping.toFixed(2)}</span></div>
          <div class="row total"><span>Total Amount:</span><span>₹${selectedOrder.priceDetails.total.toFixed(2)}</span></div>
        </div>
        
        <div class="section">
          <h2>Payment Details</h2>
          <p><strong>Razorpay Order ID:</strong> ${selectedOrder.razorpayOrderId}</p>
          <p><strong>Razorpay Payment ID:</strong> ${selectedOrder.razorpayPaymentId}</p>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  const onlySuccessOrders = orders.filter(o => o.paymentStatus === "success");

  const summary = useMemo(() => {
    const uniqueUsers = new Set(onlySuccessOrders.map(o => o.email)).size;
    const totalBooks = onlySuccessOrders.reduce((s, o) => s + o.booksCount, 0);
    const totalAmount = onlySuccessOrders.reduce((s, o) => s + o.paidAmount, 0);
    return { uniqueUsers, totalBooks, totalAmount };
  }, [onlySuccessOrders]);

  const filtered = onlySuccessOrders.filter(o => {
    const q = query.toLowerCase();
    const matchesQuery =
      o.userName.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.phone.includes(q);

    const matchesMonth =
      monthFilter === "all" ||
      o.orderDate.slice(0, 7) === monthFilter;

    return matchesQuery && matchesMonth;
  });

  const monthOptions = Array.from(
    new Set(onlySuccessOrders.map(o => o.orderDate.slice(0, 7)))
  ).sort().reverse();

  if (loading) {
    return (
      <div className="container7">
        <div className="loading7">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container7">
        <div className="error7">
          <h3>⚠️ Error Loading Orders</h3>
          <p>{error}</p>
          <button onClick={fetchOrders} className="retry-btn">
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container7">
      <header className="header7">
        <h1 className="heading7">📦 Order Management Dashboard</h1>
        <p className="para7">Manage all customer orders and delivery status</p>
      </header>

      <section className="topRow7">
        <div className="summaryCard7">
          <div className="label7">👥 Registered Users</div>
          <div className="value7">{summary.uniqueUsers}</div>
        </div>
        <div className="summaryCard7">
          <div className="label7">📚 Books Sold</div>
          <div className="value7">{summary.totalBooks}</div>
        </div>
        <div className="summaryCard7">
          <div className="label7">💰 Total Revenue</div>
          <div className="value7">₹{summary.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
        </div>

        <div className="controls7">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search by name, email, phone or order ID"
            className="search7"
          />
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="filter7"
          >
            <option value="all">All Months</option>
            {monthOptions.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="tableWrapper7">
        {filtered.length === 0 ? (
          <div className="noOrders7">
            <p>📭 No orders found</p>
            <p style={{fontSize: '0.9em', color: '#666', marginTop: '10px'}}>
              Total orders: {orders.length} | Successful: {onlySuccessOrders.length}
            </p>
          </div>
        ) : (
          <table className="table7">
            <thead>
              <tr>
                <th className="th7">Order ID</th>
                <th className="th7">Customer</th>
                <th className="th7">Books</th>
                <th className="th7">Amount</th>
                <th className="th7">Date</th>
                <th className="th7">Status</th>
                <th className="th7">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="tr7">
                  <td className="td7 mono7">{order.orderNumber}</td>
                  <td className="td7">
                    <div className="userName7">{order.userName}</div>
                    <div className="userEmail7">{order.email}</div>
                    <div className="userEmail7">{order.phone}</div>
                  </td>
                  <td className="td7 center7">{order.booksCount}</td>
                  <td className="td7">₹{order.paidAmount.toLocaleString('en-IN')}</td>
                  <td className="td7">{order.orderDate}</td>
                  <td className="td7">
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="td7">
                    <button 
                      onClick={() => viewOrderDetails(order)}
                      className="view-btn"
                    >
                      👁️ View
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {showDetails && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 Complete Order Details</h2>
              <button onClick={closeModal} className="close-btn">✕</button>
            </div>
            
            <div className="modal-body">
              {/* Order Information Section */}
              <div className="detail-section">
                <h3>📦 Order Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Order Number:</span>
                    <span className="detail-value">{selectedOrder.orderNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Order Date:</span>
                    <span className="detail-value">{selectedOrder.orderDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Order Status:</span>
                    <span className={`status-badge status-${selectedOrder.status}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Payment Status:</span>
                    <span className={`status-badge status-${selectedOrder.paymentStatus}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Details Section */}
              <div className="detail-section">
                <h3>💳 Payment Details</h3>
                <div className="detail-grid">
                  <div className="detail-item full-width">
                    <span className="detail-label">Razorpay Order ID:</span>
                    <span className="detail-value mono">{selectedOrder.razorpayOrderId}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="detail-label">Razorpay Payment ID:</span>
                    <span className="detail-value mono">{selectedOrder.razorpayPaymentId}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="detail-label">Payment Signature:</span>
                    <span className="detail-value mono small">{selectedOrder.razorpaySignature}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details Section */}
              <div className="detail-section">
                <h3>👤 Customer Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedOrder.userName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedOrder.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedOrder.phone}</span>
                  </div>
                </div>
              </div>

              {/* Billing Address Section */}
              <div className="detail-section">
                <h3>📄 Billing Address</h3>
                <div className="address-box">
                  <p><strong>{selectedOrder.billingAddress.name}</strong></p>
                  <p>{selectedOrder.billingAddress.address}</p>
                  <p>{selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state}</p>
                  <p>PIN: {selectedOrder.billingAddress.pincode}</p>
                  <p>Phone: {selectedOrder.billingAddress.phone}</p>
                  <p>Email: {selectedOrder.billingAddress.email}</p>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="detail-section">
                <h3>🚚 Shipping Address</h3>
                <div className="address-box">
                  <p><strong>{selectedOrder.shippingAddress.name}</strong></p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                  <p>PIN: {selectedOrder.shippingAddress.pincode}</p>
                  <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                  <p>Email: {selectedOrder.shippingAddress.email}</p>
                </div>
              </div>

              {/* Order Items Section */}
              <div className="detail-section">
                <h3>📚 Order Items ({selectedOrder.products.length})</h3>
                <div className="items-list">
                  {selectedOrder.products.map((p, idx) => (
                    <div key={p.id || idx} className="item-card">
                      <img 
                        src={p.image} 
                        alt={p.title}
                        className="item-image"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-book.jpg';
                        }}
                      />
                      <div className="item-details">
                        <h4>{p.title}</h4>
                        <p className="item-author">by {p.author}</p>
                        <div className="item-meta">
                          <span className="item-qty">Qty: {p.qty}</span>
                          <span className="item-price">₹{p.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="item-total">
                        ₹{(p.price * p.qty).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown Section */}
              <div className="detail-section">
                <h3>💰 Price Breakdown</h3>
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.priceDetails.subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                  </div>
                  <div className="price-row">
                    <span>GST (18%):</span>
                    <span>₹{selectedOrder.priceDetails.gst.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>Shipping:</span>
                    <span>{selectedOrder.priceDetails.shipping === 0 ? 'FREE' : `₹${selectedOrder.priceDetails.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="price-row price-total">
                    <strong>Total Amount:</strong>
                    <strong>₹{selectedOrder.priceDetails.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button onClick={printOrder} className="print-btn">
                  🖨️ Print Invoice
                </button>
                <button onClick={closeModal} className="close-action-btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}