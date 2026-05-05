import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import Navigation from './components/Navigation';

import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';

import Login from './components/Login';
import Register from './components/Register';
import Checkout from './components/Checkout';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

// Static event data
const EVENT_DATA = {
  name: "Tech Symposium 2026",
  department: "Computer Science",
  dateTime: "November 15, 2026 (10:00 AM PST)",
  venue: "Main Auditorium, Building A",
  price: 50 // Ticket price in USD
};

const Home = () => {
  const { availableTickets } = useContext(AppContext);
  return (
    <>
      <EventDetails 
        eventData={EVENT_DATA} 
        availableTickets={availableTickets}
        ticketPrice={EVENT_DATA.price}
      />
      <BookingForm 
        availableTickets={availableTickets} 
        ticketPrice={EVENT_DATA.price}
      />
    </>
  );
};

function App() {
  const { currentUser } = useContext(AppContext);

  return (
    <div className="app-container">
      <Navigation />
      <header>
        <h1>{EVENT_DATA.name}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Ticket Booking Portal</p>
      </header>

      <main className="content-grid" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/checkout" element={currentUser ? <Checkout ticketPrice={EVENT_DATA.price} eventName={EVENT_DATA.name} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={currentUser && currentUser.role === 'user' ? <UserDashboard /> : <Navigate to={currentUser?.role === 'admin' ? '/admin' : '/login'} />} />
          <Route path="/admin" element={currentUser && currentUser.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
