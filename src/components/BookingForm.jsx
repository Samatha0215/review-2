import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ availableTickets, ticketPrice }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    tickets: 1,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    if (!formData.tickets) {
      newErrors.tickets = 'Number of tickets is required';
    } else if (Number(formData.tickets) <= 0) {
      newErrors.tickets = 'Tickets must be a positive number';
    } else if (Number(formData.tickets) > availableTickets) {
      newErrors.tickets = `Only ${availableTickets} tickets available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed to checkout with the form data via React Router state
      navigate('/checkout', { state: { bookingData: formData } });
    }
  };

  return (
    <div className="card">
      <h2>Book Tickets</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder="E.g., Computer Science" />
          {errors.department && <span className="error-text">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="tickets">Number of Tickets *</label>
          <input type="number" id="tickets" name="tickets" min="1" max={availableTickets} value={formData.tickets} onChange={handleChange} />
          {errors.tickets && <span className="error-text">{errors.tickets}</span>}
        </div>
        
        <div style={{ margin: '1.5rem 0', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Estimated Total:</span>
          <span>${(Number(formData.tickets) || 0) * ticketPrice}</span>
        </div>

        <button type="submit" className="btn" disabled={availableTickets === 0}>
          {availableTickets === 0 ? 'Sold Out' : 'Proceed to Checkout'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
