'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, FiUpload, FiX } from 'react-icons/fi';

const CATEGORIES = ['Books', 'God Photos', 'Framed Calendar', 'Wall Hanging', 'Musical Box', 'Other Items'];
const LANGUAGES = ['Tamil', 'Telugu', 'English', 'Hindi', 'Sanskrit', 'Other'];

const emptyBook = {
  title: '', author: '', description: '', shortDescription: '', isbn: '', publisher: '',
  publicationYear: '', pages: '', bookLanguage: 'Tamil', category: 'Books', subCategory: '',
  tags: '', price: '', originalPrice: '', stock: '', sku: '', weight: '',
  shippingCharge: '', expressShipping: false, status: 'draft',
  featured: false, bestSeller: false, newArrival: false, images: [] as string[],
};

export default function AdminBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyBook);
  const [saving, setSaving] = useState(false);
  const [uploadingImgs, setUploadingImgs] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchBooks = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20', ...(search && { search }), ...(filterStatus && { status: filterStatus }) });
    fetch(`/api/books?${params}&admin=true`).then(r => r.json()).then(d => {
      setBooks(d.books || []);
      setTotal(d.pagination?.total || 0);
      setLoading(false);
    });
  };

  useEffect(() => { fetchBooks(); }, [page, search, filterStatus]);

  const openCreate = () => { setForm(emptyBook); setEditBook(null); setShowModal(true); };
 const openEdit = (book: any) => {
  setEditBook(book);
  setForm({ 
    ...emptyBook, 
    ...book,
    bookLanguage: book.bookLanguage || book.language || 'Tamil', // ← handles both old and new docs
    tags: book.tags?.join(', ') || '', 
    publicationYear: book.publicationYear || '', 
    pages: book.pages || '' 
  });
  setShowModal(true);
};

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploadingImgs(true);
    const fd = new FormData();
    Array.from(files).forEach(f => fd.append('files', f));
    fd.append('folder', 'books');
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await r.json();
    setForm((f: any) => ({ ...f, images: [...(f.images || []), ...(d.urls || [])] }));
    setUploadingImgs(false);
    toast.success('Images uploaded!');
  };

  const removeImage = (idx: number) => setForm((f: any) => ({ ...f, images: f.images.filter((_: any, i: number) => i !== idx) }));

  const save = async () => {
    if (!form.title || !form.price || !form.category) { toast.error('Fill required fields'); return; }
    setSaving(true);
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()) : [], price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined, stock: parseInt(form.stock) || 0, pages: form.pages ? parseInt(form.pages) : undefined, publicationYear: form.publicationYear ? parseInt(form.publicationYear) : undefined, shippingCharge: form.shippingCharge ? parseFloat(form.shippingCharge) : undefined };

    const url = editBook ? `/api/books/${editBook._id}` : '/api/books';
    const method = editBook ? 'PUT' : 'POST';
    const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (r.ok) {
      toast.success(editBook ? 'Book updated!' : 'Book created!');
      setShowModal(false);
      fetchBooks();
    } else { toast.error('Failed to save'); }
    setSaving(false);
  };

  const deleteBook = async (id: string) => {
    if (!confirm('Delete this book?')) return;
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    toast.success('Book deleted');
    fetchBooks();
  };

  const changeStatus = async (id: string, status: string) => {
    await fetch(`/api/books/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    toast.success(`Status changed to ${status}`);
    fetchBooks();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Books ({total})</h1>
        <button onClick={openCreate} className="btn-primary"><FiPlus size={16} /> Add Book</button>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <FiSearch size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Search books..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
        <select className="input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Category</th>
                <th>Language</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <tr key={i}><td colSpan={7}><div style={{ height: 20, background: 'var(--bg-secondary)', borderRadius: 4 }} /></td></tr>)
              ) : books.map(book => (
                <tr key={book._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={book.images?.[0] || ''} alt="" style={{ width: 36, height: 48, objectFit: 'cover', borderRadius: 4 }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/36x48/f5efe6/b5451b?text=B'; }} />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>by {book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{book.category}</td>
                  <td style={{ fontSize: 13 }}>{book.bookLanguage}</td>
                  <td style={{ fontWeight: 600, fontSize: 14 }}>₹{book.price}</td>
                  <td>
                    <span className={`badge ${book.stock > 0 ? 'badge-green' : 'badge-red'}`}>{book.stock}</span>
                  </td>
                  <td>
                    <select value={book.status} onChange={e => changeStatus(book._id, e.target.value)}
                      style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)', cursor: 'pointer' }}>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(book)} style={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'var(--text-secondary)' }}><FiEdit2 size={14} /></button>
                      <button onClick={() => deleteBook(book._id)} style={{ background: 'var(--accent-light)', border: 'none', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'var(--accent)' }}><FiTrash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > 20 && (
          <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[...Array(Math.ceil(total / 20))].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid', borderColor: page === i+1 ? 'var(--accent)' : 'var(--border)', background: page === i+1 ? 'var(--accent)' : 'var(--surface)', color: page === i+1 ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontSize: 13 }}>{i + 1}</button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="overlay">
          <div style={{ background: 'var(--surface)', borderRadius: 16, width: '90vw', maxWidth: 700, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{editBook ? 'Edit Book' : 'Add New Book'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}><FiX size={20} /></button>
            </div>

            <div style={{ overflow: 'auto', padding: 24, flex: 1 }}>
              {/* Images */}
              <div style={{ marginBottom: 20 }}>
                <label className="label">Book Images (max 2)</label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                  {form.images?.map((url: string, i: number) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={url} alt="" style={{ width: 70, height: 93, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)' }} />
                      <button onClick={() => removeImage(i)} style={{ position: 'absolute', top: -6, right: -6, background: 'var(--accent)', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiX size={11} /></button>
                    </div>
                  ))}
                  {(!form.images || form.images.length < 2) && (
                    <label style={{ width: 70, height: 93, border: '2px dashed var(--border)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 11, gap: 4 }}>
                      {uploadingImgs ? <div className="spinner" style={{ width: 16, height: 16 }} /> : <><FiUpload size={18} /><span>Upload</span></>}
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { label: 'Title *', key: 'title', full: true },
                  { label: 'Author *', key: 'author', full: false },
                  { label: 'Publisher', key: 'publisher', full: false },
                  { label: 'ISBN', key: 'isbn', full: false },
                  { label: 'Publication Year', key: 'publicationYear', full: false },
                  { label: 'No. of Pages', key: 'pages', full: false },
                  { label: 'SKU', key: 'sku', full: false },
                  { label: 'Price (₹) *', key: 'price', full: false },
                  { label: 'Original Price (₹)', key: 'originalPrice', full: false },
                  { label: 'Stock Quantity *', key: 'stock', full: false },
                  { label: 'Shipping Charge (₹)', key: 'shippingCharge', full: false },
                  { label: 'Weight (grams)', key: 'weight', full: false },
                  { label: 'Tags (comma separated)', key: 'tags', full: true },
                  { label: 'Short Description', key: 'shortDescription', full: true },
                ].map(({ label, key, full }) => (
                  <div key={key} style={{ gridColumn: full ? '1/-1' : undefined }}>
                    <label className="label">{label}</label>
                    {key === 'shortDescription' ? (
                      <textarea className="input" value={form[key] || ''} onChange={e => setForm((f: any) => ({ ...f, [key]: e.target.value }))} rows={2} style={{ resize: 'vertical' }} />
                    ) : (
                      <input className="input" type={['price','originalPrice','stock','pages','publicationYear','shippingCharge','weight'].includes(key) ? 'number' : 'text'} value={form[key] || ''} onChange={e => setForm((f: any) => ({ ...f, [key]: e.target.value }))} />
                    )}
                  </div>
                ))}

                <div>
                  <label className="label">Language *</label>
                  <select className="input" value={form.bookLanguage} onChange={e => setForm((f: any) => ({ ...f, bookLanguage: e.target.value }))}>
                    {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Category *</label>
                  <select className="input" value={form.category} onChange={e => setForm((f: any) => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Status</label>
                  <select className="input" value={form.status} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="label">Sub Category</label>
                  <input className="input" value={form.subCategory || ''} onChange={e => setForm((f: any) => ({ ...f, subCategory: e.target.value }))} />
                </div>

                {/* Checkboxes */}
                <div style={{ gridColumn: '1/-1', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  {[['featured', 'Featured'], ['bestSeller', 'Best Seller'], ['newArrival', 'New Arrival'], ['expressShipping', 'Express Shipping']].map(([key, label]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                      <input type="checkbox" checked={!!form[key]} onChange={e => setForm((f: any) => ({ ...f, [key]: e.target.checked }))} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
                      {label}
                    </label>
                  ))}
                </div>

                <div style={{ gridColumn: '1/-1' }}>
                  <label className="label">Full Description</label>
                  <textarea className="input" value={form.description || ''} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))} rows={4} style={{ resize: 'vertical' }} />
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-primary">
                {saving ? 'Saving...' : editBook ? 'Update Book' : 'Add Book'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
