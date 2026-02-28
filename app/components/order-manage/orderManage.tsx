
"use client";

import React, { useMemo, useState, useEffect } from "react";
import "../ordermanage.css";

type Product = {
  id: string;
  title: string;
  qty: number;
};

type Order = {
  id: string;
  userName: string;
  email: string;
  paidAmount: number;
  booksCount: number;
  products: Product[];
  paymentStatus: "success" | "failed" | "pending";
  orderDate: string;
  statuses: {
    confirmed: boolean;
    packed: boolean;
    readyForDispatch: boolean;
    outTomorrow: boolean;
    outToday: boolean;
    delivered: boolean;
    onHold: boolean;
    cancelled: boolean;
    returned: boolean;
  };
};

export default function OrderManage() {
    
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState<string>("all");

  // Fetch orders from your API - UPDATED WITH BETTER DEBUGGING
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching orders from /api/orders...');
        
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📊 API Response:', {
          count: data.length,
          dataType: Array.isArray(data) ? 'array' : typeof data,
          firstItem: data[0] ? JSON.stringify(data[0], null, 2).substring(0, 500) : 'No data'
        });
        
        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error('❌ Expected array but got:', typeof data, data);
          throw new Error('Invalid response format: expected array');
        }
        
        // Transform MongoDB data to your Order type
        const transformedOrders: Order[] = data.map((order: any, index: number) => {
          console.log(`Processing order ${index + 1}:`, {
            hasOrderNumber: !!order.orderNumber,
            hasRazorpayOrderId: !!order.razorpayOrderId,
            hasUserName: !!order.userName,
            hasPriceDetails: !!order.priceDetails,
            hasItems: !!order.items,
            paymentStatus: order.paymentStatus,
            status: order.status
          });
          
          // Extract ID from various possible fields
          let orderId = '';
          if (order.orderNumber) {
            orderId = order.orderNumber;
          } else if (order.orderId) {
            orderId = order.orderId;
          } else if (order.razorpayOrderId) {
            orderId = order.razorpayOrderId;
          } else if (order._id) {
            orderId = typeof order._id === 'string' ? order._id : order._id.$oid || order._id.toString();
          } else {
            orderId = `unknown-${index}`;
          }
          
          // Extract user info
          let userName = 'Unknown';
          let email = 'No email';
          
          if (order.userName && order.userEmail) {
            userName = order.userName;
            email = order.userEmail;
          } else if (order.billingAddress) {
            userName = order.billingAddress.name || 'Unknown';
            email = order.billingAddress.email || 'No email';
          } else if (order.shippingAddress) {
            userName = order.shippingAddress.name || 'Unknown';
            email = order.shippingAddress.email || 'No email';
          }
          
          // Extract payment status
          let paymentStatus: "success" | "failed" | "pending" = 'pending';
          if (order.paymentStatus === 'paid' || order.paymentStatus === 'completed') {
            paymentStatus = 'success';
          } else if (order.paymentStatus === 'failed') {
            paymentStatus = 'failed';
          } else if (order.status === 'completed' || order.status === 'confirmed') {
            paymentStatus = 'success';
          }
          
          // Extract items
          const items = order.items || [];
          
          // Extract total amount
          let totalAmount = 0;
          if (order.priceDetails?.total) {
            totalAmount = order.priceDetails.total;
          } else if (order.totalAmount) {
            totalAmount = order.totalAmount;
          }
          
          // Extract date
          let orderDate = new Date().toISOString().split('T')[0];
          if (order.createdAt) {
            try {
              if (typeof order.createdAt === 'string') {
                orderDate = new Date(order.createdAt).toISOString().split('T')[0];
              } else if (order.createdAt.$date) {
                orderDate = new Date(order.createdAt.$date).toISOString().split('T')[0];
              } else if (order.createdAt instanceof Date) {
                orderDate = order.createdAt.toISOString().split('T')[0];
              }
            } catch (dateError) {
              console.error('Error parsing date:', dateError);
            }
          }
          
          // Determine order status from existing data
          const orderStatus = order.status || 'pending';
          
          return {
            id: orderId,
            userName: userName,
            email: email,
            paidAmount: totalAmount,
            booksCount: items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0),
            products: items.map((item: any) => ({
              id: item.bookId || item._id || '',
              title: item.bookName || 'Unknown Book',
              qty: item.quantity || 0
            })),
            paymentStatus: paymentStatus,
            orderDate: orderDate,
            statuses: {
              confirmed: orderStatus === 'confirmed' || orderStatus === 'paid' || orderStatus === 'completed',
              packed: orderStatus === 'packed' || orderStatus === 'shipped',
              readyForDispatch: orderStatus === 'readyForDispatch',
              outTomorrow: false,
              outToday: false,
              delivered: orderStatus === 'delivered',
              onHold: orderStatus === 'onHold',
              cancelled: orderStatus === 'cancelled',
              returned: orderStatus === 'returned',
            }
          };
        });
        
        console.log('✅ Transformed orders:', {
          total: transformedOrders.length,
          successOrders: transformedOrders.filter(o => o.paymentStatus === 'success').length,
          sample: transformedOrders[0]
        });
        
        setOrders(transformedOrders);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to update order status in MongoDB
  const updateOrderStatusInDB = async (orderId: string, newStatus: string) => {
    try {
      console.log('🔄 Updating order status:', { orderId, newStatus });
      const response = await fetch(`/api/orders?orderId=${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error updating order:', err);
      throw err;
    }
  };

  const onlySuccessOrders = orders.filter((o) => o.paymentStatus === "success");
  
  console.log('📈 Orders summary:', {
    totalOrders: orders.length,
    successOrders: onlySuccessOrders.length,
    filteredOrders: onlySuccessOrders.filter(o => {
      const q = query.toLowerCase();
      const matchesQuery = o.userName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q);
      return matchesQuery;
    }).length
  });

  const summary = useMemo(() => {
    const uniqueUsers = new Set(onlySuccessOrders.map((o) => o.email)).size;
    const totalBooks = onlySuccessOrders.reduce((s, o) => s + o.booksCount, 0);
    const totalAmount = onlySuccessOrders.reduce((s, o) => s + o.paidAmount, 0);
    return { uniqueUsers, totalBooks, totalAmount };
  }, [orders]);

  async function toggleStatus(orderId: string, key: keyof Order["statuses"]) {
    const statusMap: Record<keyof Order["statuses"], string> = {
      confirmed: "confirmed",
      packed: "packed",
      readyForDispatch: "readyForDispatch",
      outTomorrow: "outTomorrow",
      outToday: "outToday",
      delivered: "delivered",
      onHold: "onHold",
      cancelled: "cancelled",
      returned: "returned"
    };

    const newStatus = statusMap[key];
    
    try {
      await updateOrderStatusInDB(orderId, newStatus);
      
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { 
                ...o, 
                statuses: { 
                  ...o.statuses, 
                  [key]: !o.statuses[key],
                  ...(key === 'cancelled' && { 
                    confirmed: false,
                    packed: false,
                    delivered: false 
                  })
                } 
              }
            : o
        )
      );
    } catch (err) {
      alert('Failed to update order status. Please try again.');
    }
  }

  const filtered = onlySuccessOrders.filter((o) => {
    const q = query.toLowerCase();
    const matchesQuery =
      o.userName.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q);

    const matchesMonth =
      monthFilter === "all" ||
      new Date(o.orderDate).toISOString().slice(0, 7) === monthFilter;

    return matchesQuery && matchesMonth;
  });

  const monthOptions = Array.from(
    new Set(onlySuccessOrders.map((o) => o.orderDate.slice(0, 7)))
  );

  if (loading) {
    return (
      <div className="container7">
        <div className="loading7">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 30, maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 20 }}>Order Management</h2>
        <div style={{ 
          padding: 40, 
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <p style={{ color: '#dc2626', marginBottom: 10 }}>Error: {error}</p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="container7">
      <header className="header7">
        <h1 className="heading7">Order Management</h1>
        <p className="para7">View orders & update delivery status</p>
      </header>

      <section className="topRow7">
        <div className="summaryCard7">
          <div className="label7">Registered Users</div>
          <div className="value7">{summary.uniqueUsers}</div>
        </div>
        <div className="summaryCard7">
          <div className="label7">Books Sold</div>
          <div className="value7">{summary.totalBooks}</div>
        </div>
        <div className="summaryCard7">
          <div className="label7">Total Paid</div>
          <div className="value7">₹ {summary.totalAmount.toFixed(2)}</div>
        </div>

        <div className="controls7">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email or order ID"
            className="search7"
          />
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="filter7"
          >
            <option value="all">All Months</option>
            {monthOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="tableWrapper7">
        {filtered.length === 0 ? (
          <div className="noOrders7">
            <p>No orders found</p>
            <p>Total orders in system: {orders.length}</p>
            <p>Successful orders: {onlySuccessOrders.length}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ marginTop: '10px', padding: '8px 16px' }}
            >
              Refresh
            </button>
          </div>
        ) : (
          <table className="table7">
            <thead>
              <tr>
                <th className="th7">User</th>
                <th className="th7">Books</th>
                <th className="th7">Paid</th>
                <th className="th7">Order ID</th>
                <th className="th7">Products</th>
                <th className="th7">Date</th>
                <th className="th7">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="tr7">
                  <td className="td7">
                    <div className="userName7">{o.userName}</div>
                    <div className="userEmail7 para7">{o.email}</div>
                  </td>

                  <td className="td7 center7">{o.booksCount}</td>

                  <td className="td7">₹ {o.paidAmount.toFixed(2)}</td>

                  <td className="td7 mono7">{o.id}</td>

                  <td className="td7">
                    <ul className="prodList7">
                      {o.products.map((p) => (
                        <li key={p.id} className="prodItem7">
                          {p.title} <span className="qty7">x{p.qty}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="td7">{o.orderDate}</td>

                  <td className="td7">
                    <details className="dropdown7">
                      <summary className="summary7">Update ▾</summary>

                      <label className="chkRow7">
                        <input
                          type="checkbox"
                          checked={o.statuses.confirmed}
                          onChange={() => toggleStatus(o.id, "confirmed")}
                          className="checkbox7"
                        />
                        <span className="text7">Confirmed</span>
                      </label>

                      <label className="chkRow7">
                        <input
                          type="checkbox"
                          checked={o.statuses.packed}
                          onChange={() => toggleStatus(o.id, "packed")}
                          className="checkbox7"
                        />
                        <span className="text7">Packed</span>
                      </label>

                      <label className="chkRow7">
                        <input
                          type="checkbox"
                          checked={o.statuses.readyForDispatch}
                          onChange={() =>
                            toggleStatus(o.id, "readyForDispatch")
                          }
                          className="checkbox7"
                        />
                        <span className="text7">Ready for Dispatch</span>
                      </label>

                      <hr className="sep7" />

                      <label className="chkRow7">
                        <input
                          type="checkbox"
                          checked={o.statuses.onHold}
                          onChange={() => toggleStatus(o.id, "onHold")}
                          className="checkbox7"
                        />
                        <span className="text7">On Hold</span>
                      </label>

                      <label className="chkRow7">
                        <input
                          type="checkbox"
                          checked={o.statuses.cancelled}
                          onChange={() => toggleStatus(o.id, "cancelled")}
                          className="checkbox7"
                        />
                        <span className="text7">Cancelled</span>
                      </label>

                      <label className="chkRow7">
                        <input
                          type="checkbox"
                          checked={o.statuses.returned}
                          onChange={() => toggleStatus(o.id, "returned")}
                          className="checkbox7"
                        />
                        <span className="text7">Returned / Refund</span>
                      </label>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}