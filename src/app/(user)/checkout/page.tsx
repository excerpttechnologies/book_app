'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiCreditCard, FiClock, FiEdit2 } from 'react-icons/fi';

declare global { interface Window { Razorpay: any; } }

const INDIA_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh','Puducherry'];

const emptyAddress = { firstName:'', lastName:'', company:'', addressLine1:'', addressLine2:'', city:'', state:'Tamil Nadu', country:'India', pincode:'', phone:'', email:'', gstin:'' };

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState(emptyAddress);
  const [useExisting, setUseExisting] = useState(false);
  const [payMethod, setPayMethod] = useState<'razorpay'|'pay_later'>('razorpay');
  const [placing, setPlacing] = useState(false);
  const [step, setStep] = useState<'address'|'payment'>('address');

  const subtotal = cart.reduce((s, i) => s + (i.book?.price || 0) * i.quantity, 0);

  useEffect(() => {
    if (!session) return;
    Promise.all([
      fetch('/api/cart').then(r => r.json()),
      fetch(`/api/users/${session.user.id}`).then(r => r.json()),
    ]).then(([c, u]) => {
      setCart(c.cart || []);
      setUser(u.user);
      if (u.user?.addresses?.length) {
        const def = u.user.addresses.find((a: any) => a.isDefault) || u.user.addresses[0];
        setAddress({ ...emptyAddress, ...def });
        setUseExisting(true);
      } else {
        setAddress(a => ({ ...a, email: session.user?.email || '', firstName: (session.user?.name || '').split(' ')[0], lastName: (session.user?.name || '').split(' ').slice(1).join(' ') }));
      }
    });
  }, [session]);

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.head.appendChild(s);
  }, []);

  const handlePlaceOrder = async () => {
    if (!address.firstName || !address.addressLine1 || !address.city || !address.pincode || !address.phone) {
      toast.error('Please fill all required address fields'); return;
    }
    setPlacing(true);

    try {
      if (payMethod === 'razorpay') {
        const rpRes = await fetch('/api/payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: subtotal }) });
        const { order: rpOrder } = await rpRes.json();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: rpOrder.amount,
          currency: 'INR',
          name: 'OM Spiritual',
          description: 'Book Purchase',
          order_id: rpOrder.id,
          prefill: { name: `${address.firstName} ${address.lastName}`, email: address.email, contact: address.phone },
          handler: async (response: any) => {
            const orderRes = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart.map(i => ({ bookId: i.bookId, quantity: i.quantity })), billingAddress: address, paymentMethod: 'razorpay', razorpayOrderId: rpOrder.id }) });
            const { order } = await orderRes.json();
            await fetch('/api/payment/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...response, orderId: order._id }) });

            // Save address if new
            if (!useExisting) {
              await fetch(`/api/users/${session!.user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ addresses: [...(user?.addresses || []), { ...address, isDefault: true }] }) });
            }
            toast.success('Order placed successfully!');
            router.push(`/orders?new=${order._id}`);
          },
          modal: { ondismiss: () => { setPlacing(false); toast.error('Payment cancelled'); } },
          theme: { color: '#B5451B' },
        };
        new window.Razorpay(options).open();
      } else {
        const orderRes = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart.map(i => ({ bookId: i.bookId, quantity: i.quantity })), billingAddress: address, paymentMethod: 'pay_later' }) });
        const { order } = await orderRes.json();
        if (!useExisting) {
          await fetch(`/api/users/${session!.user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ addresses: [...(user?.addresses || []), { ...address, isDefault: true }] }) });
        }
        toast.success('Order placed! Pay later.');
        router.push(`/orders?new=${order._id}`);
      }
    } catch (err) {
      toast.error('Failed to place order');
      setPlacing(false);
    }
  };

  if (!session) return <div style={{ padding: 60, textAlign: 'center' }}><p style={{ marginBottom: 20 }}>Please sign in to checkout</p><button onClick={() => signIn('google')} className="btn-primary">Sign in with Google</button></div>;
  if (cart.length === 0) return <div style={{ padding: 60, textAlign: 'center' }}><h2>Your cart is empty</h2></div>;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 32 }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 28 }}>
        {/* Left - Address + Payment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Address */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Billing Details</h2>
              {user?.addresses?.length > 0 && (
                <button onClick={() => setUseExisting(!useExisting)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                  <FiEdit2 size={12} /> {useExisting ? 'Edit' : 'Use Saved'}
                </button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'First Name *', key: 'firstName', full: false },
                { label: 'Last Name *', key: 'lastName', full: false },
                { label: 'Company (Optional)', key: 'company', full: true },
                { label: 'Address Line 1 *', key: 'addressLine1', full: true },
                { label: 'Address Line 2', key: 'addressLine2', full: true },
                { label: 'City *', key: 'city', full: false },
                { label: 'Pincode *', key: 'pincode', full: false },
                { label: 'Mobile *', key: 'phone', full: false },
                { label: 'Email *', key: 'email', full: false },
                { label: 'GSTIN (Optional)', key: 'gstin', full: true },
              ].map(field => (
                <div key={field.key} style={{ gridColumn: field.full ? '1/-1' : undefined }}>
                  <label className="label">{field.label}</label>
                  {field.key === 'state' ? (
                    <select className="input" value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}>
                      {INDIA_STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  ) : (
                    <input className="input" value={(address as any)[field.key]} onChange={e => setAddress(a => ({ ...a, [field.key]: e.target.value }))} />
                  )}
                </div>
              ))}
              {/* State */}
              <div>
                <label className="label">State *</label>
                <select className="input" value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}>
                  {INDIA_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Country *</label>
                <input className="input" value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 16 }}>Payment Method</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, border: `2px solid ${payMethod === 'razorpay' ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', background: payMethod === 'razorpay' ? 'var(--accent-light)' : 'var(--surface)' }}>
                <input type="radio" checked={payMethod === 'razorpay'} onChange={() => setPayMethod('razorpay')} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
                <FiCreditCard size={18} color="var(--accent)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Pay Now (Razorpay)</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>UPI, Cards, Net Banking, Wallet</div>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, border: `2px solid ${payMethod === 'pay_later' ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', background: payMethod === 'pay_later' ? 'var(--gold-light)' : 'var(--surface)' }}>
                <input type="radio" checked={payMethod === 'pay_later'} onChange={() => setPayMethod('pay_later')} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
                <FiClock size={18} color="var(--gold)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Pay Later</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Pay when our team contacts you</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div>
          <div className="card" style={{ padding: 24, position: 'sticky', top: 90 }}>
            <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 16 }}>Cart Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {cart.map(item => (
                <div key={item.bookId} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={item.book?.images?.[0] || ''} alt={item.book?.title} style={{ width: 44, aspectRatio: '3/4', objectFit: 'cover', borderRadius: 6 }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/44x59/f5efe6/b5451b?text=B'; }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{item.book?.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>₹{(item.book?.price * item.quantity).toFixed(0)}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Added at dispatch</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: 'var(--text-secondary)', margin: '16px 0', lineHeight: 1.6 }}>
              🚚 <strong>Note:</strong> Delivery charges are applicable and will be added separately at dispatch. Our team will call you to confirm.
              <br /><span style={{ opacity: 0.7 }}>டெலிவரி கட்டணம் அனுப்பும்போது சேர்க்கப்படும். | డెలివరీ చార్జీలు రవాణా సమయంలో జోడించబడతాయి.</span>
            </div>

            <button onClick={handlePlaceOrder} disabled={placing} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: '0.95rem' }}>
              {placing ? <><div className="spinner" style={{ width: 16, height: 16, marginRight: 8 }} />Processing...</> : payMethod === 'razorpay' ? '💳 Place Order & Pay' : '📦 Place Order (Pay Later)'}
            </button>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              Your personal data will be used to process your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
