'use client';

import { useState, useEffect } from 'react';

export default function DigitalRecordsArchive({ onSelectBill }) {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBills = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bills', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch bills from server');
      const data = await res.json();
      setBills(data.bills || []);
    } catch (err) {
      setError(err.message || 'Could not load bills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this digitized bill record?')) return;
    try {
      const res = await fetch(`/api/bills/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setBills(bills.filter(b => b.id !== id));
    } catch (err) {
      alert(err.message || 'Could not delete record');
    }
  };

  const filteredBills = bills.filter(b =>
    (b.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.sap || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-sec">
      <div className="card" style={{ borderLeft: '4px solid var(--g)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h2 style={{ fontSize: 18, margin: '0 0 4px', color: 'var(--g)' }}>
              📂 Digitized Employee Records &amp; Bills Archive
            </h2>
            <div style={{ fontSize: 13, color: '#555' }}>
              Central repository of saved Form T.R.22 Arrears Pay Bills, payroll records, and employee history
            </div>
          </div>
          <button onClick={loadBills} style={{ fontSize: 13, padding: '5px 10px' }}>🔄 Refresh Records</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
        <div className="card" style={{ padding: '12px 14px', background: '#f5faf7', borderColor: '#c2decb' }}>
          <div style={{ fontSize: 12, color: '#555' }}>Total Digitized Bills</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--g)', marginTop: 2 }}>{bills.length}</div>
        </div>
        <div className="card" style={{ padding: '12px 14px', background: '#f0f7ff', borderColor: '#bfdbfe' }}>
          <div style={{ fontSize: 12, color: '#555' }}>System Capacity</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1d4ed8', marginTop: 2 }}>80 Bills Storage</div>
        </div>
        <div className="card" style={{ padding: '12px 14px', background: '#fafaf9', borderColor: '#e7e5e4' }}>
          <div style={{ fontSize: 12, color: '#555' }}>Data Security</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#44403c', marginTop: 6 }}>Automated PIFRA Validation</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <input
          type="text"
          placeholder="Search by Employee Name or SAP ID / PID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', fontSize: 14, border: '1px solid var(--ln)', borderRadius: 6 }}
        />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>Loading digitized records...</div>
        ) : error ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#dc2626' }}>{error}</div>
        ) : filteredBills.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#666' }}>
            {search ? 'No matching bills found.' : 'No bills saved yet on the server. You can generate and save a bill from the Form T.R.22 module.'}
          </div>
        ) : (
          <table className="t" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', width: 45 }}>#</th>
                <th style={{ textAlign: 'left' }}>Employee Name</th>
                <th style={{ textAlign: 'left', width: 140 }}>SAP ID / PID</th>
                <th style={{ textAlign: 'left', width: 180 }}>Last Modified</th>
                <th style={{ textAlign: 'center', width: 170 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((b, i) => (
                <tr key={b.id}>
                  <td style={{ textAlign: 'left' }}>{i + 1}</td>
                  <td style={{ textAlign: 'left', fontWeight: 600 }}>
                    {b.name || 'Untitled Bill'}
                  </td>
                  <td style={{ textAlign: 'left', fontFamily: 'monospace', color: 'var(--g)', fontWeight: 600 }}>
                    {b.sap || '—'}
                  </td>
                  <td style={{ textAlign: 'left', color: '#666', fontSize: 12 }}>
                    {b.updatedAt ? new Date(b.updatedAt).toLocaleString() : '—'}
                  </td>
                  <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <a
                      href={`/api/bills/${encodeURIComponent(b.id)}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ fontSize: 12, padding: '4px 8px', textDecoration: 'none', marginRight: 6 }}
                      title="Download server-generated PDF"
                    >
                      📥 PDF
                    </a>
                    <button
                      className="pri"
                      onClick={() => onSelectBill && onSelectBill(b.id)}
                      style={{ fontSize: 12, padding: '4px 8px', marginRight: 6 }}
                    >
                      ✏ Open &amp; Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      style={{ fontSize: 12, padding: '4px 8px', color: '#dc2626' }}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

