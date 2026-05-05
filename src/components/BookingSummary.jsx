import React from 'react';

const BookingSummary = ({ bookingData, eventName, ticketPrice, onReset }) => {
  const totalAmount = bookingData.tickets * ticketPrice;

  return (
    <div className="card summary-container">
      <div className="success-icon">✓</div>
      <h2>Booking Confirmed!</h2>
      <p style={{ color: 'var(--text-muted)' }}>
        Thank you, {bookingData.name}. Your tickets have been successfully booked.
      </p>

      <div className="summary-details">
        <div className="summary-item">
          <span>Event</span>
          <span>{eventName}</span>
        </div>
        <div className="summary-item">
          <span>Name</span>
          <span>{bookingData.name}</span>
        </div>
        <div className="summary-item">
          <span>Department</span>
          <span>{bookingData.department}</span>
        </div>
        <div className="summary-item">
          <span>Tickets Booked</span>
          <span>{bookingData.tickets}</span>
        </div>
        <div className="summary-item">
          <span>Total Amount Paid</span>
          <span>${totalAmount}</span>
        </div>
      </div>

      <button className="btn btn-secondary" onClick={onReset} style={{ marginTop: '2rem' }}>
        Book Another Ticket
      </button>
    </div>
  );
};

export default BookingSummary;
