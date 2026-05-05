import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AdminDashboard = () => {
  const { users, bookings, coupons, setCoupons, cancelBooking, availableTickets, setAvailableTickets } = useContext(AppContext);
  
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if(newCoupon.code && newCoupon.discount) {
      setCoupons([...coupons, { code: newCoupon.code.toUpperCase(), discount: Number(newCoupon.discount) }]);
      setNewCoupon({ code: '', discount: '' });
    }
  };

  const removeCoupon = (code) => {
    setCoupons(coupons.filter(c => c.code !== code));
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <h2 style={{ marginBottom: '2rem', color: 'var(--accent)' }}>System Administration</h2>
      
      <div className="content-grid">
        {/* Statistics */}
        <div className="card">
          <h3>Overview</h3>
          <div className="detail-item"><span>Total Users</span><span className="highlight-value">{users.length}</span></div>
          <div className="detail-item"><span>Total Bookings</span><span className="highlight-value">{bookings.length}</span></div>
          <div className="detail-item"><span>Revenue</span><span className="highlight-value">${bookings.reduce((sum, b) => sum + b.paymentData.amountPaid, 0)}</span></div>
          <div className="detail-item" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <span>Available Tickets</span>
            <span>
              <input type="number" value={availableTickets} onChange={e => setAvailableTickets(Number(e.target.value))} style={{ width: '80px', padding: '0.2rem', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '4px' }} />
            </span>
          </div>
        </div>

        {/* Coupons Management */}
        <div className="card">
          <h3>Coupons</h3>
          <form onSubmit={handleAddCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input type="text" placeholder="Code" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value})} required style={{ width: '40%' }} />
            <input type="number" placeholder="%" value={newCoupon.discount} onChange={e => setNewCoupon({...newCoupon, discount: e.target.value})} required style={{ width: '30%' }} />
            <button type="submit" className="btn" style={{ margin: 0, width: 'auto' }}>Add</button>
          </form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {coupons.map(c => (
              <div key={c.code} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                <span>{c.code} ({c.discount}%)</span>
                <button onClick={() => removeCoupon(c.code)} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Bookings Table */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Global Bookings</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem' }}>ID</th>
                <th style={{ padding: '1rem' }}>User Email</th>
                <th style={{ padding: '1rem' }}>Tickets</th>
                <th style={{ padding: '1rem' }}>Paid</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '1rem', textAlign: 'center' }}>No bookings found.</td></tr>
              ) : (
                bookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px dotted var(--border)' }}>
                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{b.id}</td>
                    <td style={{ padding: '1rem' }}>{b.userEmail}</td>
                    <td style={{ padding: '1rem' }}>{b.tickets}</td>
                    <td style={{ padding: '1rem' }}>${b.paymentData.amountPaid}</td>
                    <td style={{ padding: '1rem' }}>{new Date(b.date).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem', margin: 0, color: 'var(--accent)' }} onClick={() => { if(window.confirm('Delete booking?')) cancelBooking(b.id) }}>
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
