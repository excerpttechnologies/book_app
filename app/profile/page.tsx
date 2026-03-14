"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  bookId: string;
  bookName: string;
  authorName: string;
  salePrice: number;
  mrpPrice: number;
  image1: string;
  quantity: number;
}

interface BillingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface PaymentDetails {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
}

interface PriceDetails {
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
}

interface Order {
  _id: string;
  orderId: string;
  orderNumber?: string;
  items: OrderItem[];
  billingAddress: BillingAddress;
  shippingAddress?: BillingAddress;
  paymentDetails: PaymentDetails;
  priceDetails: PriceDetails;
  orderStatus: string;
  status?: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  createdAt: string | { $date: string };
  updatedAt: string | { $date: string };
}

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{name: string, email: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        // Get user info from localStorage (as stored in your login)
        const userEmail = localStorage.getItem("userEmail");
        const userName = localStorage.getItem("userName");
        
        if (!userEmail) {
          setError("Please login to view your orders");
          setLoading(false);
          return;
        }

        if (userName && userEmail) {
          setUserInfo({ name: userName, email: userEmail });
        }

        console.log("Fetching orders for user:", userEmail);
        
        // Use the correct endpoint with email parameter
        const response = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("User orders fetched:", data.length);
        
        // Transform the data to match our interface
        const formattedOrders = data.map((order: any) => ({
          ...order,
          orderId: order.orderId || order.orderNumber || order._id,
          orderStatus: order.orderStatus || order.status || 'pending',
          paymentDetails: order.paymentDetails || {
            razorpayOrderId: order.razorpayOrderId || '',
            razorpayPaymentId: order.razorpayPaymentId || '',
            razorpaySignature: order.razorpaySignature || '',
            amount: order.priceDetails?.total || order.totalAmount || 0,
            currency: 'INR',
            status: order.paymentStatus || 'completed',
            paymentMethod: 'razorpay'
          },
          priceDetails: order.priceDetails || {
            subtotal: order.subtotal || 0,
            gst: order.gst || 0,
            shipping: order.shipping || 0,
            total: order.totalAmount || 0
          },
          billingAddress: order.billingAddress || order.shippingAddress || {
            name: order.userName || 'Customer',
            email: order.userEmail || userEmail,
            phone: order.userPhone || '',
            address: '',
            city: '',
            state: '',
            pincode: ''
          }
        }));
        
        setOrders(formattedOrders);
        
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [router]);

  // Helper function to format date
  const formatDate = (dateInput: string | { $date: string } | Date): string => {
    try {
      let date: Date;
      
      if (typeof dateInput === 'object' && dateInput && '$date' in dateInput) {
        date = new Date((dateInput as any).$date);
      } else if (typeof dateInput === 'string') {
        date = new Date(dateInput);
      } else if (dateInput instanceof Date) {
        date = dateInput;
      } else {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return 'Invalid date';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'paid':
        return '#10b981';
      case 'processing':
        return '#f59e0b';
      case 'shipped':
        return '#3b82f6';
      case 'delivered':
        return '#8b5cf6';
      case 'cancelled':
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        flexDirection: 'column',
        gap: 20
      }}>
        <div style={{
          width: 50,
          height: 50,
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#6b7280' }}>Loading your orders...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // User not logged in
  if (!localStorage.getItem("userEmail")) {
    return (
      <div style={{ padding: 30, maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 20 }}>My Orders</h2>
        <div style={{ 
          padding: 40, 
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: 12,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🔒</div>
          <p style={{ color: '#0369a1', marginBottom: 20, fontSize: 18 }}>
            Please login to view your orders
          </p>
          <button
            onClick={handleLoginRedirect}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 500
            }}
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 30, maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 20 }}>My Orders</h2>
        <div style={{ 
          padding: 40, 
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p style={{ color: '#dc2626', marginBottom: 10, fontSize: 16 }}>Error: {error}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 30, maxWidth: 1200, margin: '0 auto' }}>
      {/* User Info Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 30,
        padding: '20px 24px',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        border: '1px solid #e2e8f0'
      }}>
        <div>
          <h2 style={{ margin: 0, marginBottom: 8 }}>My Orders</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
            {userInfo ? `Welcome back, ${userInfo.name}!` : 'Your order history'}
          </p>
          {userInfo && (
            <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: 14 }}>
              {userInfo.email}
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: '1px solid #cbd5e1',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Logout
        </button>
      </div>

      {/* Orders Count */}
      <div style={{ marginBottom: 20, padding: '12px 16px', backgroundColor: '#f0f9ff', borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#0369a1' }}>
          📦 Showing {orders.length} order{orders.length !== 1 ? 's' : ''} for your account.
        </p>
      </div>

      {orders.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: 60, 
          border: '1px dashed #ddd',
          borderRadius: 12,
          backgroundColor: '#fafafa'
        }}>
          <div style={{ fontSize: 48, marginBottom: 20, color: '#cbd5e1' }}>📦</div>
          <p style={{ fontSize: 18, color: '#64748b', marginBottom: 12 }}>No orders yet</p>
          <p style={{ fontSize: 14, color: '#94a3b8', maxWidth: 400, margin: '0 auto' }}>
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
          <button
            onClick={() => router.push("/")}
            style={{
              marginTop: 24,
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {orders.map(order => {
            const orderStatus = order.orderStatus || order.status || 'pending';
            return (
            <div
              key={order._id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 24,
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Order Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: 16,
                borderBottom: '1px solid #f3f4f6',
                paddingBottom: 16
              }}>
                <div>
                  <h4 style={{ margin: 0, marginBottom: 8 }}>
                    Order #{order.orderNumber || order.orderId}
                  </h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div style={{ 
                  padding: '6px 12px', 
                  backgroundColor: getStatusColor(orderStatus) + '15',
                  color: getStatusColor(orderStatus),
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500
                }}>
                  {orderStatus.toUpperCase()}
                </div>
              </div>

              {/* Order Items */}
              <div style={{ marginBottom: 24 }}>
                <h5 style={{ marginBottom: 12, fontSize: 16 }}>Items</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {order.items && order.items.map((item, index) => (
                    <div
                      key={index}
                      style={{ 
                        display: "flex", 
                        gap: 16, 
                        padding: 12,
                        backgroundColor: '#f9fafb',
                        borderRadius: 8
                      }}
                    >
                      <img
                        src={item.image1 || '/placeholder-book.jpg'}
                        alt={item.bookName}
                        width={80}
                        height={100}
                        style={{ 
                          objectFit: "cover", 
                          borderRadius: 6,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, marginBottom: 4, fontWeight: 600 }}>
                          {item.bookName || 'Unknown Book'}
                        </p>
                        <p style={{ margin: 0, marginBottom: 4, color: '#6b7280', fontSize: 14 }}>
                          by {item.authorName || 'Unknown Author'}
                        </p>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                          <span style={{ fontWeight: 600, color: '#111827' }}>
                            ₹{(item.salePrice / 100).toFixed(2)}
                          </span>
                          {item.mrpPrice > item.salePrice && (
                            <span style={{ 
                              textDecoration: 'line-through', 
                              color: '#9ca3af',
                              fontSize: 14
                            }}>
                              ₹{(item.mrpPrice / 100).toFixed(2)}
                            </span>
                          )}
                          <span style={{ marginLeft: 'auto', color: '#4b5563' }}>
                            Qty: {item.quantity || 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Details */}
              <div style={{ 
                backgroundColor: '#f8fafc', 
                padding: 16, 
                borderRadius: 8,
                marginBottom: 24 
              }}>
                <h5 style={{ marginBottom: 12, fontSize: 16 }}>Price Details</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span>₹{((order.priceDetails?.subtotal || 0) / 100).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GST (18%)</span>
                    <span>₹{((order.priceDetails?.gst || 0) / 100).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping</span>
                    <span>₹{((order.priceDetails?.shipping || 0) / 100).toFixed(2)}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: 12,
                    marginTop: 4,
                    fontWeight: 600,
                    fontSize: 16
                  }}>
                    <span>Total Amount</span>
                    <span>₹{((order.priceDetails?.total || 0) / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping and Payment Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Shipping Address */}
                {(order.billingAddress || order.shippingAddress) && (
                  <div>
                    <h5 style={{ marginBottom: 8, fontSize: 16 }}>Shipping Address</h5>
                    <div style={{ 
                      backgroundColor: '#f8fafc', 
                      padding: 16, 
                      borderRadius: 8,
                      fontSize: 14 
                    }}>
                      <p style={{ margin: 0, fontWeight: 600, marginBottom: 4 }}>
                        {(order.billingAddress || order.shippingAddress)?.name || 'N/A'}
                      </p>
                      <p style={{ margin: 0, marginBottom: 4 }}>
                        {(order.billingAddress || order.shippingAddress)?.address || 'N/A'}
                      </p>
                      <p style={{ margin: 0, marginBottom: 4 }}>
                        {(order.billingAddress || order.shippingAddress)?.city || ''}, 
                        {(order.billingAddress || order.shippingAddress)?.state || ''} - 
                        {(order.billingAddress || order.shippingAddress)?.pincode || ''}
                      </p>
                      <p style={{ margin: 0, marginBottom: 4 }}>
                        📞 {(order.billingAddress || order.shippingAddress)?.phone || 'N/A'}
                      </p>
                      <p style={{ margin: 0 }}>
                        ✉️ {(order.billingAddress || order.shippingAddress)?.email || userInfo?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                {order.paymentDetails && (
                  <div>
                    <h5 style={{ marginBottom: 8, fontSize: 16 }}>Payment Information</h5>
                    <div style={{ 
                      backgroundColor: '#f8fafc', 
                      padding: 16, 
                      borderRadius: 8,
                      fontSize: 14 
                    }}>
                      {order.paymentDetails.razorpayPaymentId && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span>Payment ID:</span>
                          <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                            {order.paymentDetails.razorpayPaymentId.substring(0, 12)}...
                          </span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>Status:</span>
                        <span style={{ 
                          color: (order.paymentDetails.status || '').toLowerCase() === 'completed' || 'paid' ? '#10b981' : '#f59e0b',
                          fontWeight: 500
                        }}>
                          {(order.paymentDetails.status || 'PAID').toUpperCase()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>Method:</span>
                        <span style={{ textTransform: 'capitalize' }}>
                          {order.paymentDetails.paymentMethod || 'razorpay'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Amount Paid:</span>
                        <span style={{ fontWeight: 600 }}>
                          ₹{((order.paymentDetails.amount || order.priceDetails?.total || 0) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}