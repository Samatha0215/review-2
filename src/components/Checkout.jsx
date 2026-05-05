import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CreditCard, CheckCircle } from 'lucide-react';

const Checkout = ({ ticketPrice, eventName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { applyCoupon, executeBooking } = useContext(AppContext);
  
  const bookingData = location.state?.bookingData;
  const initialTotal = bookingData ? bookingData.tickets * ticketPrice : 0;

  const [couponCode, setCouponCode] = useState('');
  const [discountMsg, setDiscountMsg] = useState({ text: '', type: '' });
  const [finalTotal, setFinalTotal] = useState(initialTotal);
  
  const [paymentForm, setPaymentForm] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    if(!bookingData) navigate('/'); // Prevent direct access
  }, [bookingData, navigate]);

  const handleApplyCoupon = () => {
    const coupon = applyCoupon(couponCode);
    if(coupon) {
      setFinalTotal(initialTotal - (initialTotal * coupon.discount / 100));
      setDiscountMsg({ text: `Success: ${coupon.discount}% applied!`, type: 'success' });
    } else {
      setDiscountMsg({ text: 'Invalid coupon code', type: 'error' });
      setFinalTotal(initialTotal);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if(paymentForm.cardNumber.length < 16) return setDiscountMsg({ text: 'Invalid card number', type: 'error' });
    
    // Simulate successful payment
    const newBk = executeBooking(bookingData, { amountPaid: finalTotal, method: 'Credit Card (Simulated)' });
    setSuccessBooking(newBk);
  };

  if(successBooking) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ color: 'var(--success)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={32} /> <h2 style={{ margin: 0 }}>Payment Successful!</h2>
        </div>
        
        <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', background: '#fff', color: '#000', margin: '1rem 0' }}>
          <h2 style={{ borderBottom: '2px dashed #ccc', paddingBottom: '1rem', color: '#0f111a', margin:0 }}>EVENT TICKET</h2>
          <div style={{ padding: '2rem 1rem', display:'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{eventName}</div>
            <div style={{ fontSize: '1.2rem' }}>Name: {successBooking.name}</div>
            <div style={{ fontSize: '1.2rem' }}>Department: {successBooking.department}</div>
            <div style={{ color: '#666' }}>Admits: {successBooking.tickets}</div>
            <div style={{ fontSize: '1.1rem', color: '#f43f5e', fontWeight: 'bold' }}>Final Amount: ${successBooking.paymentData.amountPaid}</div>
            <div style={{ background: '#eee', padding: '1rem', borderRadius: '4px', marginTop: '1rem', letterSpacing: '2px' }}>
              Booking ID: {successBooking.id}
            </div>
          </div>
        </div>

        <button className="btn" style={{ maxWidth: '300px', marginTop: '1rem' }} onClick={() => window.print()}>
          Download / Print Ticket
        </button>
        <button className="btn btn-secondary" style={{ maxWidth: '300px', marginTop: '1rem' }} onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  if(!bookingData) return null;

  return (
    <div className="content-grid">
      <div className="card">
        <h2>Order Summary</h2>
        <div className="detail-item"><span>Event</span><span>{eventName}</span></div>
        <div className="detail-item"><span>Tickets</span><span>{bookingData.tickets} x ${ticketPrice}</span></div>
        <div className="detail-item" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
          <span>Original Price</span><span>${initialTotal}</span>
        </div>
        {initialTotal !== finalTotal && (
          <div className="detail-item" style={{ color: 'var(--success)' }}>
            <span>Discount Amount</span><span>-${initialTotal - finalTotal}</span>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <input type="text" placeholder="Coupon Code" value={couponCode} onChange={e => setCouponCode(e.target.value)} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
          <button onClick={handleApplyCoupon} className="btn btn-secondary" style={{ width: 'auto', margin: 0 }}>Apply</button>
        </div>
        {discountMsg.text && (
          <p style={{ color: discountMsg.type === 'error' ? 'var(--error)' : 'var(--success)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {discountMsg.text}
          </p>
        )}

        <div className="detail-item" style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '1.5rem', color: 'var(--primary)' }}>
          <span>Final Price</span><span>${finalTotal}</span>
        </div>
      </div>

      <div className="card">
        <h2><CreditCard size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Payment Details</h2>
        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Name on Card</label>
            <input type="text" required value={paymentForm.cardName} onChange={e => setPaymentForm({...paymentForm, cardName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" maxLength={16} required placeholder="1234 5678 9101 1121" value={paymentForm.cardNumber} onChange={e => setPaymentForm({...paymentForm, cardNumber: e.target.value})} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" required value={paymentForm.expiry} onChange={e => setPaymentForm({...paymentForm, expiry: e.target.value})} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>CVV</label>
              <input type="text" maxLength={4} required value={paymentForm.cvv} onChange={e => setPaymentForm({...paymentForm, cvv: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Proceed to Payment (${finalTotal})</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
