import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Download, XCircle } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser, bookings, cancelBooking } = useContext(AppContext);
  const [downloadModal, setDownloadModal] = useState(null);

  const userBookings = bookings.filter(b => b.userEmail === currentUser.email);

  return (
    <div style={{ width: '100%', maxWidth: '1000px' }}>
      <h2 style={{ marginBottom: '2rem' }}>Welcome, {currentUser.name}</h2>
      
      <div className="card">
        <h3>My Bookings</h3>
        {userBookings.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>You have no bookings yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {userBookings.map((b) => (
              <div key={b.id} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.1)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.25rem' }}>ID: {b.id}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Date: {new Date(b.date).toLocaleDateString()}</div>
                  <div style={{ marginTop: '0.5rem' }}>Tickets: <strong>{b.tickets}</strong></div>
                  <div>Amount Paid: <strong>${b.paymentData.amountPaid}</strong></div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={() => setDownloadModal(b)}>
                    <Download size={16} /> Download
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', margin: 0, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={() => cancelBooking(b.id)}>
                    <XCircle size={16} /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {downloadModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="card" style={{ width: '400px', textAlign: 'center', background: '#fff', color: '#000' }}>
            <h2 style={{ borderBottom: '2px dashed #ccc', paddingBottom: '1rem', color: '#0f111a' }}>EVENT TICKET</h2>
            <div style={{ padding: '2rem 1rem', display:'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{downloadModal.name}</div>
              <div style={{ fontSize: '1.2rem' }}>Department: {downloadModal.department}</div>
              <div style={{ color: '#666' }}>Admits: {downloadModal.tickets}</div>
              <div style={{ background: '#eee', padding: '1rem', borderRadius: '4px', marginTop: '1rem', letterSpacing: '2px' }}>
                ID: {downloadModal.id}
              </div>
            </div>
            <button className="btn" style={{ background: '#6366f1' }} onClick={() => setDownloadModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
