'use client';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FiUser, FiPhone, FiMapPin, FiEdit2, FiPlus, FiTrash2, FiSave, FiLogOut } from 'react-icons/fi';

const INDIA_STATES = ['Andhra Pradesh','Tamil Nadu','Telangana','Karnataka','Kerala','Maharashtra','Delhi','Gujarat','Rajasthan','Uttar Pradesh','West Bengal','Other'];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ phone: '' });
  const [saving, setSaving] = useState(false);
  const [addingAddr, setAddingAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ firstName:'', lastName:'', addressLine1:'', city:'', state:'Tamil Nadu', country:'India', pincode:'', phone:'', email:'', isDefault:false });

  useEffect(() => {
    if (!session) return;
    fetch(`/api/users/${session.user.id}`).then(r => r.json()).then(d => {
      setUser(d.user);
      setForm({ phone: d.user?.phone || '' });
    });
  }, [session]);

  const saveProfile = async () => {
    setSaving(true);
    const r = await fetch(`/api/users/${session!.user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const d = await r.json();
    setUser(d.user);
    setEditMode(false);
    setSaving(false);
    toast.success('Profile updated!');
  };

  const addAddress = async () => {
    if (!newAddr.firstName || !newAddr.addressLine1 || !newAddr.city || !newAddr.pincode || !newAddr.phone) {
      toast.error('Please fill all required fields'); return;
    }
    const updatedAddresses = [...(user?.addresses || []), newAddr];
    const r = await fetch(`/api/users/${session!.user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ addresses: updatedAddresses }) });
    const d = await r.json();
    setUser(d.user);
    setAddingAddr(false);
    setNewAddr({ firstName:'', lastName:'', addressLine1:'', city:'', state:'Tamil Nadu', country:'India', pincode:'', phone:'', email:'', isDefault:false });
    toast.success('Address added!');
  };

  const removeAddress = async (idx: number) => {
    const updatedAddresses = user.addresses.filter((_: any, i: number) => i !== idx);
    const r = await fetch(`/api/users/${session!.user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ addresses: updatedAddresses }) });
    const d = await r.json();
    setUser(d.user);
    toast.success('Address removed');
  };

  if (!session) return <div style={{ padding: 60, textAlign: 'center' }}><p>Please sign in</p></div>;
  if (!user) return <div style={{ padding: 60, textAlign: 'center' }}><div className="spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 28 }}>My Profile</h1>

      {/* Profile Card */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          {user.image
            ? <img src={user.image} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-light)' }} />
            : <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1.8rem', fontWeight: 700 }}>{user.name?.[0]}</div>}
          <div>
            <h2 style={{ marginBottom: 4, fontSize: '1.2rem' }}>{user.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{user.email}</p>
            <span className={`badge ${user.status === 'active' ? 'badge-green' : 'badge-red'}`} style={{ marginTop: 6 }}>{user.status}</span>
          </div>
          <button onClick={() => setEditMode(!editMode)} className="btn-secondary" style={{ marginLeft: 'auto', padding: '8px 14px', fontSize: 13 }}>
            <FiEdit2 size={13} /> {editMode ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {editMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label className="label">Phone Number</label>
              <input className="input" value={form.phone} onChange={e => setForm({ phone: e.target.value })} placeholder="+91 XXXXXXXXXX" />
            </div>
            <button onClick={saveProfile} disabled={saving} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              <FiSave size={14} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: FiUser, label: 'Full Name', value: user.name },
              { icon: FiPhone, label: 'Phone', value: user.phone || 'Not set' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <Icon size={16} color="var(--accent)" style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Addresses */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Saved Addresses</h2>
          <button onClick={() => setAddingAddr(!addingAddr)} className="btn-secondary" style={{ padding: '8px 14px', fontSize: 13 }}>
            <FiPlus size={13} /> Add Address
          </button>
        </div>

        {addingAddr && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: 14, fontFamily: 'var(--font-body)', fontWeight: 600 }}>New Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {['firstName', 'lastName', 'addressLine1', 'city', 'pincode', 'phone', 'email'].map(k => (
                <div key={k} style={{ gridColumn: ['addressLine1', 'email'].includes(k) ? '1/-1' : undefined }}>
                  <label className="label">{k.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input className="input" value={(newAddr as any)[k]} onChange={e => setNewAddr(a => ({ ...a, [k]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label className="label">State</label>
                <select className="input" value={newAddr.state} onChange={e => setNewAddr(a => ({ ...a, state: e.target.value }))}>
                  {INDIA_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={addAddress} className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Save Address</button>
              <button onClick={() => setAddingAddr(false)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>Cancel</button>
            </div>
          </div>
        )}

        {user.addresses?.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No saved addresses yet</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {user.addresses?.map((addr: any, idx: number) => (
              <div key={idx} style={{ border: `1.5px solid ${addr.isDefault ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 10, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <FiMapPin size={16} color="var(--accent)" style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{addr.firstName} {addr.lastName}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.6 }}>
                      {addr.addressLine1}{addr.addressLine2 && `, ${addr.addressLine2}`}<br />
                      {addr.city}, {addr.state} - {addr.pincode}<br />
                      📞 {addr.phone}
                    </div>
                    {addr.isDefault && <span className="badge badge-green" style={{ marginTop: 6 }}>Default</span>}
                  </div>
                </div>
                <button onClick={() => removeAddress(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', padding: 4 }}>
                  <FiTrash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sign Out */}
      <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-secondary" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
        <FiLogOut size={15} /> Sign Out
      </button>
    </div>
  );
}
