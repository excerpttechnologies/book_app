'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BookCard from '@/components/user/BookCard';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const CATEGORIES = ['Books', 'God Photos', 'Framed Calendar', 'Wall Hanging', 'Musical Box', 'Other Items'];
const LANGUAGES = ['Tamil', 'Telugu', 'English', 'Hindi', 'Sanskrit'];
const SORTS = [
  { label: 'Latest', value: 'createdAt_desc' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Sellers', value: 'soldCount_desc' },
  { label: 'Top Rated', value: 'rating_desc' },
];

function ShopContent() {
  const sp = useSearchParams();
  const router = useRouter();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: sp.get('search') || '',
    category: sp.get('category') || '',
    language: sp.get('language') || '',
    minPrice: sp.get('minPrice') || '',
    maxPrice: sp.get('maxPrice') || '',
    sort: 'createdAt_desc',
  });

  const fetchBooks = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.language) params.set('language', filters.language);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    const [sortField, sortOrder] = filters.sort.split('_');
    params.set('sort', sortField);
    params.set('order', sortOrder);
    params.set('page', String(page));
    params.set('limit', '20');

    const r = await fetch(`/api/books?${params}`);
    const d = await r.json();
    setBooks(d.books || []);
    setTotal(d.pagination?.total || 0);
    setLoading(false);
  };

  useEffect(() => { fetchBooks(); }, [filters, page]);

  const FilterPanel = () => (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>Filters</h3>

      {/* Category */}
      <div style={{ marginBottom: 20 }}>
        <label className="label">Category</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => setFilters(f => ({ ...f, category: '' }))}
            style={{ textAlign: 'left', background: !filters.category ? 'var(--accent-light)' : 'none', color: !filters.category ? 'var(--accent)' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '6px 0', fontSize: 14, fontWeight: !filters.category ? 600 : 400 }}>
            All Categories
          </button>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilters(f => ({ ...f, category: cat }))}
              style={{ textAlign: 'left', background: filters.category === cat ? 'var(--accent-light)' : 'none', color: filters.category === cat ? 'var(--accent)' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '6px 0', fontSize: 14, fontWeight: filters.category === cat ? 600 : 400 }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div style={{ marginBottom: 20 }}>
        <label className="label">Language</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => setFilters(f => ({ ...f, language: '' }))}
            style={{ textAlign: 'left', background: !filters.language ? 'var(--accent-light)' : 'none', color: !filters.language ? 'var(--accent)' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '6px 0', fontSize: 14 }}>
            All Languages
          </button>
          {LANGUAGES.map(lang => (
            <button key={lang} onClick={() => setFilters(f => ({ ...f, language: lang }))}
              style={{ textAlign: 'left', background: filters.language === lang ? 'var(--accent-light)' : 'none', color: filters.language === lang ? 'var(--accent)' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', padding: '6px 0', fontSize: 14 }}>
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: 20 }}>
        <label className="label">Price Range</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input className="input" type="number" placeholder="Min" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} style={{ padding: '7px 10px', fontSize: 13 }} />
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>to</span>
          <input className="input" type="number" placeholder="Max" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} style={{ padding: '7px 10px', fontSize: 13 }} />
        </div>
      </div>

      {(filters.category || filters.language || filters.minPrice || filters.maxPrice) && (
        <button onClick={() => setFilters(f => ({ ...f, category: '', language: '', minPrice: '', maxPrice: '' }))}
          className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '8px' }}>
          <FiX size={14} /> Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>
            {filters.category || filters.language || filters.search ? `Results for "${filters.category || filters.language || filters.search}"` : 'All Books'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{total} items found</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>
            <FiFilter size={14} /> Filters
          </button>
          <select className="input" value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
            style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: filtersOpen ? '240px 1fr' : '1fr', gap: 24 }}>
        {filtersOpen && <FilterPanel />}
        <div>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{ aspectRatio: '3/4', background: 'var(--bg-secondary)', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ height: 12, background: 'var(--bg-secondary)', borderRadius: 4, marginBottom: 8 }} />
                    <div style={{ height: 10, background: 'var(--bg-secondary)', borderRadius: 4, width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📚</div>
              <h3 style={{ marginBottom: 8 }}>No books found</h3>
              <p style={{ fontSize: 14 }}>Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                {books.map(book => <BookCard key={book._id} book={book} />)}
              </div>
              {/* Pagination */}
              {total > 20 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
                  {[...Array(Math.ceil(total / 20))].map((_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}
                      style={{ width: 36, height: 36, borderRadius: 8, border: '1.5px solid', borderColor: page === i + 1 ? 'var(--accent)' : 'var(--border)', background: page === i + 1 ? 'var(--accent)' : 'var(--surface)', color: page === i + 1 ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontSize: 14 }}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>}><ShopContent /></Suspense>;
}
