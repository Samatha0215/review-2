import React from 'react';

const EventDetails = ({ availableTickets, ticketPrice, eventData }) => {
  return (
    <div className="card">
      <h2>Event Details</h2>
      <div className="detail-item">
        <span className="detail-label">Event Name</span>
        <span className="detail-value">{eventData.name}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Department</span>
        <span className="detail-value">{eventData.department}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Date & Time</span>
        <span className="detail-value">{eventData.dateTime}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Venue</span>
        <span className="detail-value">{eventData.venue}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Ticket Price</span>
        <span className="detail-value highlight-value">${ticketPrice}</span>
      </div>
      <div className="detail-item" style={{ marginTop: '1.5rem' }}>
        <span className="detail-label">Available Tickets</span>
        <span className={`available-badge ${availableTickets < 10 ? 'low-stock' : ''}`}>
          {availableTickets}
        </span>
      </div>
    </div>
  );
};

export default EventDetails;
